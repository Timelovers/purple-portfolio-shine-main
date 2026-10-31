import { useState } from 'react';
import '@/styles/skill-plaza.css';
import SkillPlazaBackground from '@/components/skill-plaza/SkillPlazaBackground';
import SkillPlazaBento from '@/components/skill-plaza/SkillPlazaBento';
import SkillDetailModal from '@/components/skill-plaza/SkillDetailModal';
import SkillPickerSheet from '@/components/skill-plaza/SkillPickerSheet';
import type { SkillCategory, SkillItem } from '@/lib/skillPlazaData';

const SkillPlazaPage = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleCategoryChange = (id: SkillCategory | 'all') => {
    setActiveCategory(id);
    setPickerOpen(true);
  };

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
    setDetailOpen(true);
  };

  return (
    <div className="skill-plaza relative flex min-h-screen items-center overflow-x-hidden antialiased">
      <SkillPlazaBackground />

      <div className="relative z-10 w-full py-6 sm:py-10">
        <SkillPlazaBento activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      </div>

      <SkillPickerSheet
        open={pickerOpen}
        category={activeCategory}
        onOpenChange={setPickerOpen}
        onSelectSkill={handleSelectSkill}
      />

      <SkillDetailModal
        skill={selectedSkill}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setSelectedSkill(null);
        }}
      />
    </div>
  );
};

export default SkillPlazaPage;
