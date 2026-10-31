import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BentoClock from '@/components/skill-plaza/BentoClock';
import BentoTimer from '@/components/skill-plaza/BentoTimer';
import { CATEGORY_NAV, SITE_TITLE, type SkillCategory } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import {
  Brain,
  Briefcase,
  Code2,
  Palette,
  Sparkles,
  Star,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const widgetMotion = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const CATEGORY_ICONS: Record<SkillCategory, LucideIcon> = {
  development: Code2,
  design: Palette,
  data: Brain,
  tools: Wrench,
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return '夜深了';
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Night';
}

interface SkillPlazaBentoProps {
  activeCategory: SkillCategory | 'all';
  onCategoryChange: (id: SkillCategory | 'all') => void;
}

const SkillPlazaBento = ({ activeCategory, onCategoryChange }: SkillPlazaBentoProps) => {
  const handleCategory = (id: SkillCategory | 'all') => {
    onCategoryChange(id);
  };

  return (
    <motion.div
      className="sp-bento"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
    >
      {/* Nav */}
      <motion.nav
        {...widgetMotion}
        transition={{ duration: 0.45, delay: 0.04 }}
        className="sp-area-nav sp-widget flex flex-col gap-0.5 p-2.5"
        aria-label="主导航"
      >
        <div className="mb-2 flex items-center gap-2 px-1">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
            style={{ background: 'linear-gradient(135deg, #35bfab, #1fc9e7)' }}
          >
            🦊
          </div>
          <div>
            <p className="sp-display text-xs font-bold leading-tight">Wendell</p>
            <p className="sp-text-secondary text-[9px]">Skill Plaza</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCategory('all')}
          className={cn(
            'flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[11px] font-medium transition-all duration-300',
            activeCategory === 'all' ? 'sp-nav-active' : 'sp-text-secondary sp-nav-idle',
          )}
        >
          <Sparkles className={cn('h-3.5 w-3.5 shrink-0', activeCategory === 'all' && 'text-[#35bfab]')} />
          <span>全部技能</span>
          {activeCategory === 'all' && (
            <Star className="ml-auto h-3 w-3 shrink-0 fill-[#35bfab] text-[#35bfab]" />
          )}
        </button>

        <Link
          to="/"
          className="sp-text-secondary flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-white/50"
        >
          <Briefcase className="h-3.5 w-3.5 shrink-0" />
          作品集
        </Link>

        <div className="my-1 h-px bg-white/55" />

        <p className="sp-text-secondary px-2.5 pb-0.5 pt-1 text-[9px] font-medium uppercase tracking-wider">
          分类
        </p>

        {CATEGORY_NAV.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id];
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id)}
              className={cn(
                'flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[11px] font-medium transition-all duration-300',
                active ? 'sp-nav-active' : 'sp-text-secondary sp-nav-idle',
              )}
            >
              <Icon className={cn('h-3.5 w-3.5 shrink-0', active && 'text-[#35bfab]')} />
              <span className="truncate">{cat.label}</span>
            </button>
          );
        })}
      </motion.nav>

      {/* Hero */}
      <motion.section
        {...widgetMotion}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="sp-area-hero sp-widget-solid flex flex-col items-center justify-center px-4 py-6 text-center sm:py-8"
      >
        <div
          className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-md"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(212,235,228,0.85))',
            border: '2px solid rgba(255,255,255,0.98)',
          }}
        >
          🦊
        </div>
        <p className="sp-text-secondary text-[11px]">{getGreeting()}</p>
        <h1 className="sp-display mt-0.5 text-lg font-bold sm:text-xl">
          I&apos;m <span className="sp-text-brand">Wendell</span>
        </h1>
        <p className="sp-text-secondary mt-1.5 max-w-[240px] text-[11px] leading-relaxed sm:text-xs">
          Nice to meet you! {SITE_TITLE}
        </p>
        <p className="sp-text-secondary mt-3 text-[10px] opacity-80">
          点击左侧分类查看技能列表
        </p>
      </motion.section>

      {/* Clock + Timer */}
      <motion.div
        {...widgetMotion}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="sp-area-timecol flex min-h-[140px] flex-col gap-[var(--sp-gap)]"
      >
        <BentoClock />
        <BentoTimer />
      </motion.div>
    </motion.div>
  );
};

export default SkillPlazaBento;
