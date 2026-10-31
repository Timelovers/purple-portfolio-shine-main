import type { SkillPackage, StoredSkillRecord } from '@/lib/skillTypes';
import { BUILTIN_SKILLS } from '@/lib/skillPlazaData';

const STORAGE_KEY = 'skill-plaza-custom-v1';
const ZIP_MAP_KEY = 'skill-plaza-zip-map-v1';

type ZipMap = Record<string, string>;

function loadCustom(): StoredSkillRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredSkillRecord[];
  } catch {
    return [];
  }
}

function saveCustom(skills: StoredSkillRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

function loadZipMap(): ZipMap {
  try {
    const raw = localStorage.getItem(ZIP_MAP_KEY);
    return raw ? (JSON.parse(raw) as ZipMap) : {};
  } catch {
    return {};
  }
}

function saveZipMap(map: ZipMap) {
  localStorage.setItem(ZIP_MAP_KEY, JSON.stringify(map));
}

export function getCustomSkills(): StoredSkillRecord[] {
  return loadCustom();
}

export function upsertCustomSkill(skill: StoredSkillRecord, zipBase64?: string) {
  const list = loadCustom().filter((s) => s.id !== skill.id);
  list.unshift({ ...skill, zipBase64: zipBase64 ?? skill.zipBase64 });
  saveCustom(list);

  if (zipBase64) {
    const map = loadZipMap();
    map[skill.id] = zipBase64;
    saveZipMap(map);
  }
}

export function removeCustomSkill(id: string) {
  saveCustom(loadCustom().filter((s) => s.id !== id));
  const map = loadZipMap();
  delete map[id];
  saveZipMap(map);
}

export function getZipBase64(skillId: string): string | undefined {
  return loadZipMap()[skillId];
}

export function getAllSkills(): SkillPackage[] {
  const builtinIds = new Set(BUILTIN_SKILLS.map((s) => s.id));
  const custom = loadCustom().filter((s) => !builtinIds.has(s.id));
  return [...BUILTIN_SKILLS, ...custom].sort((a, b) => b.hotScore - a.hotScore);
}

export function getFeaturedSkill(skills: SkillPackage[]): SkillPackage | null {
  if (skills.length === 0) return null;
  return skills.find((s) => s.featured) ?? skills[0];
}
