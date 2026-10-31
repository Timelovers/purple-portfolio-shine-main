import { githubZipDownloadPage, parseGithubUrl } from '@/lib/skillParser';
import { getZipBase64 } from '@/lib/skillStorage';
import { base64ToBlob } from '@/lib/skillParser';
import type { SkillPackage } from '@/lib/skillTypes';

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadSkillPackage(skill: SkillPackage): Promise<void> {
  const safeName = skill.name.replace(/[^\w\u4e00-\u9fa5-]+/g, '_') || 'skill';

  const stored = getZipBase64(skill.id);
  if (stored) {
    triggerDownload(base64ToBlob(stored), `${safeName}.zip`);
    return;
  }

  if (skill.downloadUrl) {
    const a = document.createElement('a');
    a.href = skill.downloadUrl;
    a.download = `${safeName}.zip`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
    return;
  }

  if (skill.githubUrl) {
    const gh = parseGithubUrl(skill.githubUrl);
    if (gh) {
      const a = document.createElement('a');
      a.href = githubZipDownloadPage(gh.owner, gh.repo);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
      return;
    }
  }

  throw new Error('暂无可用的压缩包下载地址');
}
