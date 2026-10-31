import type { SkillPackage } from '@/lib/skillTypes';
import { CATEGORY_META } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import { Download, Github, Trash2 } from 'lucide-react';

interface SkillPackageCardProps {
  skill: SkillPackage;
  onOpen: () => void;
  onDownload: () => void;
  onRemove?: () => void;
}

const SkillPackageCard = ({ skill, onOpen, onDownload, onRemove }: SkillPackageCardProps) => {
  const meta = CATEGORY_META[skill.category];

  return (
    <article className="sp-widget flex flex-col p-3">
      <button type="button" onClick={onOpen} className="flex flex-1 items-start gap-3 text-left">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/60 text-xl">
          {skill.icon}
        </span>
        <div className="min-w-0 flex-1">
          <span
            className={cn(
              'inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-medium',
              meta.tagClass,
            )}
          >
            {meta.label}
          </span>
          <h3 className="mt-1 line-clamp-1 text-sm font-semibold">{skill.name}</h3>
          <p className="sp-text-secondary mt-0.5 line-clamp-2 text-[11px] leading-snug">
            {skill.summary}
          </p>
          {skill.githubUrl && (
            <p className="mt-1 flex items-center gap-1 text-[10px] text-[#35bfab]">
              <Github className="h-3 w-3" />
              <span className="truncate">{skill.githubUrl.replace('https://github.com/', '')}</span>
            </p>
          )}
        </div>
      </button>

      <div className="mt-3 flex gap-1.5 border-t border-white/50 pt-2">
        <button
          type="button"
          onClick={onDownload}
          className="sp-pill flex flex-1 items-center justify-center gap-1 py-1.5 text-[10px] font-medium hover:bg-[#35bfab]/10 hover:text-[#35bfab]"
        >
          <Download className="h-3 w-3" />
          下载 ZIP
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="sp-pill flex items-center justify-center px-2 py-1.5 text-[10px] text-red-500/80 hover:bg-red-50"
            aria-label="删除"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    </article>
  );
};

export default SkillPackageCard;
