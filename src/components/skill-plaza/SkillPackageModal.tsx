import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { SkillPackage } from '@/lib/skillTypes';
import { CATEGORY_META } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import { Download, ExternalLink, Github } from 'lucide-react';

interface SkillPackageModalProps {
  skill: SkillPackage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
}

const SkillPackageModal = ({ skill, open, onOpenChange, onDownload }: SkillPackageModalProps) => {
  if (!skill) return null;

  const meta = CATEGORY_META[skill.category];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="skill-plaza-dialog max-h-[85vh] max-w-lg overflow-y-auto sm:rounded-[28px]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{skill.icon}</span>
            <div>
              <span
                className={cn(
                  'inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium',
                  meta.tagClass,
                )}
              >
                {meta.label}
              </span>
              <DialogTitle className="sp-display mt-1 text-left text-xl">{skill.name}</DialogTitle>
              <p className="sp-text-secondary mt-1 text-left text-sm">{skill.summary}</p>
            </div>
          </div>
        </DialogHeader>



        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold">介绍</h4>
            <p className="sp-text-secondary mt-1 whitespace-pre-wrap leading-relaxed">
              {skill.description}
            </p>
          </div>

          {skill.skillMdPreview && (
            <div>
              <h4 className="font-semibold">SKILL.md 预览</h4>
              <pre className="sp-text-secondary mt-1 max-h-32 overflow-auto rounded-xl bg-white/50 p-3 text-[11px] leading-relaxed">
                {skill.skillMdPreview}
              </pre>
            </div>
          )}

          {skill.fileList && skill.fileList.length > 0 && (
            <div>
              <h4 className="font-semibold">包内文件</h4>
              <ul className="sp-text-secondary mt-1 max-h-24 overflow-auto text-[11px]">
                {skill.fileList.map((f) => (
                  <li key={f} className="truncate font-mono">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(skill.githubUrl || skill.links.length > 0) && (
            <div>
              <h4 className="font-semibold">相关链接</h4>
              <ul className="mt-2 space-y-2">
                {skill.githubUrl && (
                  <li>
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sp-link inline-flex items-center gap-1.5 text-sm hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      GitHub 仓库
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                )}
                {skill.links
                  .filter((l) => l.url !== skill.githubUrl)
                  .map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sp-link inline-flex items-center gap-1.5 text-sm hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            className="w-full rounded-full sm:flex-1"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            下载压缩包
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full sm:flex-1"
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillPackageModal;
