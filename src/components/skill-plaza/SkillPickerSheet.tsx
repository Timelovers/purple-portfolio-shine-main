import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CATEGORY_META,
  getSkillsByCategory,
  type SkillCategory,
  type SkillItem,
} from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';

interface SkillPickerSheetProps {
  open: boolean;
  category: SkillCategory | 'all';
  onOpenChange: (open: boolean) => void;
  onSelectSkill: (skill: SkillItem) => void;
}

const SkillPickerSheet = ({
  open,
  category,
  onOpenChange,
  onSelectSkill,
}: SkillPickerSheetProps) => {
  const skills = getSkillsByCategory(category);
  const title = category === 'all' ? '全部技能' : CATEGORY_META[category].label;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="skill-plaza-dialog max-h-[80vh] max-w-md overflow-hidden p-0 sm:rounded-[28px]">
        <DialogHeader className="border-b border-white/60 px-4 py-3 text-left">
          <DialogTitle className="sp-display text-base">{title}</DialogTitle>
          <p className="sp-text-secondary text-xs">{skills.length} 项技能</p>
        </DialogHeader>
        <ul className="max-h-[60vh] overflow-y-auto p-3">
          {skills.map((skill) => {
            const meta = CATEGORY_META[skill.category];
            return (
              <li key={skill.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectSkill(skill);
                    onOpenChange(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-[18px] p-2.5 text-left transition-colors hover:bg-white/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-xl">
                    {skill.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-medium',
                        meta.tagClass,
                      )}
                    >
                      {meta.label}
                    </span>
                    <p className="mt-0.5 text-sm font-semibold">{skill.title}</p>
                    <p className="sp-text-secondary line-clamp-1 text-[11px]">{skill.summary}</p>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SkillPickerSheet;
