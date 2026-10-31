import { motion } from 'framer-motion';
import type { SkillPackage } from '@/lib/skillTypes';
import { CATEGORY_META } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import { Download, ExternalLink, Flame, Github } from 'lucide-react';

interface FeaturedSkillCardProps {
  skill: SkillPackage;
  onOpen: () => void;
  onDownload: () => void;
}

const FeaturedSkillCard = ({ skill, onOpen, onDownload }: FeaturedSkillCardProps) => {
  const meta = CATEGORY_META[skill.category];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sp-widget-solid relative overflow-hidden p-5 sm:p-6"
    >

      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #35bfab 0%, transparent 70%)' }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[#35bfab]">
          <Flame className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">本周最热推荐</span>
        </div>
        <span
          className={cn(
            'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
            meta.tagClass,
          )}
        >
          {meta.label}
        </span>
      </div>

      <button type="button" onClick={onOpen} className="relative mt-4 w-full text-left">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-3xl shadow-sm">
            {skill.icon}
          </span>


          <div className="min-w-0 flex-1">
            <h2 className="sp-display text-xl font-bold sm:text-2xl">{skill.name}</h2>
            <p className="sp-text-secondary mt-1 text-sm leading-relaxed">{skill.summary}</p>
          </div>
        </div>
      </button>

      <div className="relative mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #35bfab, #2aab98)',
            boxShadow: '0 3px 12px rgba(53, 191, 171, 0.35)',
          }}
        >
          <Download className="h-3.5 w-3.5" />
          下载 Skill 压缩包
        </button>
        {skill.githubUrl && (
          <a
            href={skill.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sp-pill inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="sp-pill inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium"
        >
          查看详情
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.section>
  );
};

export default FeaturedSkillCard;
