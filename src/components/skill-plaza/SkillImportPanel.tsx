import { useRef, useState } from 'react';
import { Loader2, Link2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SkillImportPanelProps {
  onUpload: (file: File) => Promise<unknown>;
  onGithub: (url: string) => Promise<unknown>;
}

const SkillImportPanel = ({ onUpload, onGithub }: SkillImportPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState<'upload' | 'github' | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading('upload');
    try {
      await onUpload(file);
    } finally {
      setLoading(null);
      e.target.value = '';
    }
  };

  const handleGithub = async () => {
    if (!githubUrl.trim()) return;
    setLoading('github');
    try {
      await onGithub(githubUrl.trim());
      setGithubUrl('');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="sp-widget p-4">
      <h3 className="text-sm font-semibold">导入 Skill</h3>
      <p className="sp-text-secondary mt-1 text-xs leading-relaxed">
        上传 .zip 压缩包（含 SKILL.md），或粘贴 GitHub 仓库链接自动拉取并解析。
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".zip,application/zip"
        className="hidden"
        onChange={handleFile}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-full border-white/80 bg-white/40"
          disabled={loading !== null}
          onClick={() => inputRef.current?.click()}
        >
          {loading === 'upload' ? (
            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
          ) : (
            <Upload className="mr-1.5 h-3.5 w-3.5" />
          )}
          上传压缩包
        </Button>
      </div>

      <div className="mt-3 flex gap-2">
        <Input
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          className="h-9 flex-1 rounded-full border-white/80 bg-white/50 text-xs"
          onKeyDown={(e) => e.key === 'Enter' && handleGithub()}
        />
        <Button
          type="button"
          size="sm"
          className="shrink-0 rounded-full"
          disabled={loading !== null || !githubUrl.trim()}
          onClick={handleGithub}
        >
          {loading === 'github' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Link2 className="mr-1 h-3.5 w-3.5" />
          )}
          拉取
        </Button>
      </div>
    </section>
  );
};

export default SkillImportPanel;
