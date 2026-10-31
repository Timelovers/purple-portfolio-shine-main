export type SkillCategory = 'development' | 'design' | 'data' | 'tools';
export type SkillSource = 'builtin' | 'upload' | 'github';

export interface SkillLink {
  label: string;
  url: string;
}

export interface SkillPackage {
  id: string;
  name: string;
  summary: string;
  description: string;
  category: SkillCategory;
  icon: string;
  githubUrl?: string;
  downloadUrl?: string;
  hotScore: number;
  featured?: boolean;
  links: SkillLink[];
  source: SkillSource;
  addedAt: string;
  fileList?: string[];
  skillMdPreview?: string;
}

/** 仅存 localStorage 的自定义 Skill（zip 以 base64 保存） */
export interface StoredSkillRecord extends SkillPackage {
  zipBase64?: string;
}
