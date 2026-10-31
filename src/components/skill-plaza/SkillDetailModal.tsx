import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CATEGORY_META, type SkillItem } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface SkillDetailModalProps {
  skill: SkillItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SkillDetailModal = ({ skill, open, onOpenChange }: SkillDetailModalProps) => {
  if (!skill) return null;

  const meta = CATEGORY_META[skill.category];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="skill-plaza-dialog max-h-[90vh] max-w-3xl overflow-y-auto p-0 sm:rounded-[28px] [&+button]:hidden">
        <div className="grid gap-0 sm:grid-cols-[240px_1fr]">

          <div className={cn('border-b border-white/60 p-6 sm:border-b-0 sm:border-r', meta.panelClass)}>
            <DialogHeader className="space-y-4 text-left">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-4xl shadow-sm backdrop-blur-sm">
                {skill.icon}
              </div>
              <div>
                <span
                  className={cn(
                    'inline-block rounded-lg border px-2.5 py-0.5 text-xs font-medium',
                    meta.tagClass,
                  )}
                >
                  {meta.label}
                </span>
                <DialogTitle className="sp-display mt-2 text-xl">{skill.title}</DialogTitle>
                <DialogDescription className="sp-text-secondary mt-1">
                  {skill.summary}
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-semibold">详细介绍</h3>
            <p className="sp-text-secondary mt-2 text-sm leading-relaxed">{skill.detail}</p>

            <h3 className="mt-5 text-sm font-semibold">使用示例</h3>
            <ul className="mt-2 space-y-1.5">
              {skill.examples.map((ex) => (
                <li key={ex} className="sp-text-secondary flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#35bfab]" />
                  {ex}
                </li>
              ))}
            </ul>

            {skill.links.length > 0 && (
              <>
                <h3 className="mt-5 text-sm font-semibold">相关链接</h3>
                <ul className="mt-2 space-y-2">
                  {skill.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sp-link inline-flex items-center gap-1.5 text-sm hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-white/60 bg-white/30 px-6 py-4 backdrop-blur-sm sm:justify-center">
          <Button
            type="button"
            variant="outline"
            className="min-w-[120px] border-white/80 bg-white/50 hover:border-[#35bfab]/50 hover:bg-[rgba(53,191,171,0.1)] hover:text-[#35bfab]"
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDetailModal;