import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  blobToBase64,
  importSkillFromFile,
  importSkillFromGithub,
} from '@/lib/skillParser';
import { getAllSkills, getFeaturedSkill, removeCustomSkill, upsertCustomSkill } from '@/lib/skillStorage';
import type { SkillPackage } from '@/lib/skillTypes';

const MAX_ZIP_STORAGE_MB = 4;

export function useSkillLibrary() {
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const skills = useMemo(() => {
    void version;
    return getAllSkills();
  }, [version]);

  const featured = useMemo(() => getFeaturedSkill(skills), [skills]);

  const importFromFile = useCallback(
    async (file: File) => {
      const { skill, zipBlob } = await importSkillFromFile(file);
      const mb = zipBlob.size / (1024 * 1024);
      let zipBase64: string | undefined;
      if (mb <= MAX_ZIP_STORAGE_MB) {
        zipBase64 = await blobToBase64(zipBlob);
      } else {
        toast.message(`压缩包较大 (${mb.toFixed(1)}MB)，未离线保存，可直接下载一次`);
      }
      upsertCustomSkill({ ...skill, zipBase64 }, zipBase64);
      refresh();
      toast.success(`已导入 Skill：${skill.name}`);
      return skill;
    },
    [refresh],
  );

  const importFromGithub = useCallback(
    async (url: string) => {
      const { skill, zipBlob } = await importSkillFromGithub(url);
      const mb = zipBlob.size / (1024 * 1024);
      let zipBase64: string | undefined;
      if (mb <= MAX_ZIP_STORAGE_MB) {
        zipBase64 = await blobToBase64(zipBlob);
      }
      upsertCustomSkill({ ...skill, zipBase64 }, zipBase64);
      refresh();
      toast.success(`已从 GitHub 导入：${skill.name}`);
      return skill;
    },
    [refresh],
  );

  const removeSkill = useCallback(
    (id: string) => {
      removeCustomSkill(id);
      refresh();
      toast.success('已移除该 Skill');
    },
    [refresh],
  );

  return {
    skills,
    featured,
    importFromFile,
    importFromGithub,
    removeSkill,
    refresh,
  };
}
