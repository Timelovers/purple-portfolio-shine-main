import JSZip from 'jszip';
import type { SkillCategory, SkillPackage, SkillSource } from '@/lib/skillTypes';

const DEFAULT_CATEGORY: SkillCategory = 'tools';

export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url.trim());
    if (!u.hostname.includes('github.com')) return null;
    const parts = u.pathname.replace(/^\//, '').replace(/\.git$/, '').split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

export function githubArchiveUrl(owner: string, repo: string, branch = 'main'): string {
  return `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/${branch}/`;
}

export function githubZipDownloadPage(owner: string, repo: string): string {
  return `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
}

async function fetchZipBlob(url: string): Promise<Blob> {
  const parsed = parseGithubUrl(url);
  if (parsed) {
    const proxyPath = `/gh-zip/${parsed.owner}/${parsed.repo}/zip/refs/heads/main/`;
    const proxyRes = await fetch(proxyPath);
    if (proxyRes.ok) return proxyRes.blob();
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`下载失败 (${res.status})`);
  return res.blob();
}

function parseFrontmatter(raw: string): { name?: string; description?: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  const description = block
    .match(/^description:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/^["']|["']$/g, '');
  return { name, description };
}

function guessCategory(text: string): SkillCategory {
  const lower = text.toLowerCase();
  if (/design|ui|ux|figma/.test(lower)) return 'design';
  if (/data|ai|llm|agent|rag|model/.test(lower)) return 'data';
  if (/react|node|api|code|dev|typescript/.test(lower)) return 'development';
  return 'tools';
}

function pickSkillMdPath(files: string[]): string | undefined {
  const exact = files.find((f) => /(^|\/)SKILL\.md$/i.test(f));
  if (exact) return exact;
  return files.find((f) => f.toLowerCase().endsWith('skill.md'));
}

function pickManifest(files: string[]): string | undefined {
  return files.find((f) => /skill\.json$/i.test(f));
}

export async function parseSkillZip(
  zipBlob: Blob,
  options: {
    source: SkillSource;
    githubUrl?: string;
    fallbackName?: string;
  },
): Promise<{ skill: SkillPackage; zipBlob: Blob }> {
  const zip = await JSZip.loadAsync(zipBlob);
  const paths = Object.keys(zip.files).filter((p) => !zip.files[p].dir);

  let name = options.fallbackName ?? 'Imported Skill';
  let summary = '从压缩包解析的 Cursor Agent Skill';
  let description = '';
  let category = DEFAULT_CATEGORY;
  const links: SkillPackage['links'] = [];

  const manifestPath = pickManifest(paths);
  if (manifestPath) {
    try {
      const json = JSON.parse(await zip.file(manifestPath)!.async('string'));
      name = json.name ?? json.title ?? name;
      summary = json.summary ?? json.description ?? summary;
      description = json.description ?? json.readme ?? description;
      if (json.category) category = json.category;
      if (json.github) links.push({ label: 'GitHub', url: json.github });
      if (Array.isArray(json.links)) {
        json.links.forEach((l: { label?: string; url?: string }) => {
          if (l.url) links.push({ label: l.label ?? '链接', url: l.url });
        });
      }
    } catch {
      /* ignore invalid json */
    }
  }

  const skillMdPath = pickSkillMdPath(paths);
  let skillMdPreview = '';
  if (skillMdPath) {
    const raw = await zip.file(skillMdPath)!.async('string');
    const fm = parseFrontmatter(raw);
    if (fm.name) name = fm.name;
    if (fm.description) summary = fm.description;
    const body = raw.replace(/^---[\s\S]*?---\r?\n?/, '').trim();
    description = body.slice(0, 1200);
    skillMdPreview = body.slice(0, 400);
    category = guessCategory(`${name} ${summary} ${body.slice(0, 200)}`);
  }

  if (options.githubUrl) {
    links.unshift({ label: 'GitHub 仓库', url: options.githubUrl });
    const gh = parseGithubUrl(options.githubUrl);
    if (gh) {
      links.push({
        label: '下载 ZIP',
        url: githubZipDownloadPage(gh.owner, gh.repo),
      });
    }
  }

  const id = `skill-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const skill: SkillPackage = {
    id,
    name,
    summary,
    description: description || summary,
    category,
    icon: '📦',
    githubUrl: options.githubUrl,
    downloadUrl: options.githubUrl
      ? (() => {
          const gh = parseGithubUrl(options.githubUrl!);
          return gh ? githubZipDownloadPage(gh.owner, gh.repo) : undefined;
        })()
      : undefined,
    hotScore: Math.floor(Date.now() / 1000) % 100000,
    links,
    source: options.source,
    addedAt: new Date().toISOString(),
    fileList: paths.slice(0, 30),
    skillMdPreview,
  };

  return { skill, zipBlob };
}

export async function importSkillFromGithub(url: string): Promise<{ skill: SkillPackage; zipBlob: Blob }> {
  const gh = parseGithubUrl(url);
  if (!gh) throw new Error('无效的 GitHub 链接，请使用 https://github.com/owner/repo 格式');

  const archiveUrl = githubArchiveUrl(gh.owner, gh.repo);
  const zipBlob = await fetchZipBlob(archiveUrl);
  const { skill, zipBlob: blob } = await parseSkillZip(zipBlob, {
    source: 'github',
    githubUrl: `https://github.com/${gh.owner}/${gh.repo}`,
    fallbackName: gh.repo,
  });
  return { skill, zipBlob: blob };
}

export async function importSkillFromFile(file: File): Promise<{ skill: SkillPackage; zipBlob: Blob }> {
  if (!file.name.toLowerCase().endsWith('.zip')) {
    throw new Error('请上传 .zip 格式的 Skill 压缩包');
  }
  const zipBlob = file;
  const baseName = file.name.replace(/\.zip$/i, '');
  return parseSkillZip(zipBlob, { source: 'upload', fallbackName: baseName });
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function base64ToBlob(base64: string, mime = 'application/zip'): Blob {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}
