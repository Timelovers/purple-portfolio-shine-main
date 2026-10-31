export type SkillCategory = 'development' | 'design' | 'data' | 'tools';

export interface SkillItem {
  id: string;
  category: SkillCategory;
  title: string;
  summary: string;
  icon: string;
  detail: string;
  examples: string[];
  links: { label: string; url: string }[];
}

export interface RecentDoc {
  id: string;
  title: string;
  date: string;
  tag: string;
  url?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SITE_TITLE = 'Wendell 的 Skill 收藏';

export const MUSIC_TRACK = {
  title: 'Close To You',
  artist: 'Skill Plaza · Ambient',
  audioUrl: '' as string,
};

/** 左侧导航：分类项（不含「全部技能」） */
export const CATEGORY_NAV: { id: SkillCategory; label: string }[] = [
  { id: 'development', label: 'Development' },
  { id: 'design', label: 'Design' },
  { id: 'data', label: 'Data & AI' },
  { id: 'tools', label: 'Tools' },
];

/** @deprecated 使用 CATEGORY_NAV + 单独的「全部技能」 */
export const NAV_CATEGORIES: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...CATEGORY_NAV,
];

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; tagClass: string; panelClass: string }
> = {
  development: {
    label: 'Development',
    tagClass: 'bg-[rgba(53,191,171,0.18)] text-[#2a9d8a] border-[rgba(53,191,171,0.35)]',
    panelClass: 'bg-[rgba(53,191,171,0.12)]',
  },
  design: {
    label: 'Design',
    tagClass: 'bg-[rgba(31,201,231,0.18)] text-[#1a9fb8] border-[rgba(31,201,231,0.35)]',
    panelClass: 'bg-[rgba(31,201,231,0.1)]',
  },
  data: {
    label: 'Data & AI',
    tagClass: 'bg-[rgba(51,79,82,0.12)] text-[#334f52] border-[rgba(51,79,82,0.25)]',
    panelClass: 'bg-[rgba(51,79,82,0.08)]',
  },
  tools: {
    label: 'Tools',
    tagClass: 'bg-[rgba(123,136,142,0.15)] text-[#5c6b72] border-[rgba(123,136,142,0.3)]',
    panelClass: 'bg-[rgba(123,136,142,0.1)]',
  },
};

export const ANNOUNCEMENTS = [
  '欢迎访问 Skill 广场 — 持续更新技能卡片与作品照片。',
  '新增：LangGraph 多 Agent 编排实践笔记。',
  '提示：点击技能卡片可查看详细介绍与示例链接。',
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Timelovers', icon: 'github' as const },
  { name: 'X (Twitter)', url: 'https://x.com/cloudbit441506', icon: 'twitter' as const },
  { name: 'Portfolio', url: 'https://lijiaxing.com.cn', icon: 'globe' as const },
];

export const CALENDAR_EVENTS: Date[] = [
  new Date(2026, 4, 20),
  new Date(2026, 4, 28),
];

export const RECENT_DOCS: RecentDoc[] = [
  {
    id: '1',
    title: '用 React + Vite 搭建可维护的技能展示页',
    date: '2026-05-10',
    tag: 'Tutorial',
  },
  {
    id: '2',
    title: 'LangGraph 状态机：从单 Agent 到协作流',
    date: '2026-05-02',
    tag: 'Notes',
  },
  {
    id: '3',
    title: 'Tailwind 12 列网格在响应式作品集中的应用',
    date: '2026-04-18',
    tag: 'Design',
  },
  {
    id: '4',
    title: 'PostgreSQL + pgvector 入门 RAG 管线',
    date: '2026-04-05',
    tag: 'Backend',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'react',
    category: 'development',
    title: 'React / TypeScript',
    summary: '组件化 UI、Hooks 状态管理与类型安全开发。',
    icon: '⚛️',
    detail:
      '熟练使用 React 18 与 TypeScript 构建 SPA；结合 Vite、React Router 与 TanStack Query 组织数据流。注重可访问性、性能与可维护的组件拆分。',
    examples: ['作品集站点', 'Dashboard', '交互原型'],
    links: [
      { label: 'React 文档', url: 'https://react.dev' },
      { label: 'TypeScript 手册', url: 'https://www.typescriptlang.org/docs/' },
    ],
  },
  {
    id: 'node',
    category: 'development',
    title: 'Node.js / API',
    summary: 'RESTful 服务、中间件与部署流水线。',
    icon: '🟢',
    detail:
      '使用 Node.js 与 FastAPI 构建后端 API；熟悉鉴权、缓存与 Docker 容器化部署至 Vercel / 云主机。',
    examples: ['REST API', 'Webhook 集成', '定时任务'],
    links: [{ label: 'Node.js', url: 'https://nodejs.org' }],
  },
  {
    id: 'ui',
    category: 'design',
    title: 'UI / UX 设计',
    summary: '信息架构、视觉层级与交互反馈设计。',
    icon: '🎨',
    detail:
      '从用户旅程出发规划页面结构；采用明亮友好的配色与统一间距节奏；为悬停、滚动、弹窗等场景设计平滑过渡动画。',
    examples: ['Landing Page', 'Design System', '原型评审'],
    links: [{ label: 'Material Design', url: 'https://m3.material.io' }],
  },
  {
    id: 'motion',
    category: 'design',
    title: '动效设计',
    summary: 'Framer Motion 分区动效与微交互。',
    icon: '✨',
    detail:
      '在不过度干扰阅读的前提下，用 Framer Motion 实现入场、悬停与列表交错动画；控制时长与缓动曲线，避免眩晕感。',
    examples: ['Portfolio 动效', '卡片悬停', '页面过渡'],
    links: [{ label: 'Framer Motion', url: 'https://www.framer.com/motion/' }],
  },
  {
    id: 'langchain',
    category: 'data',
    title: 'LangChain / RAG',
    summary: '检索增强生成与向量库集成。',
    icon: '🧠',
    detail:
      '搭建文档切块、Embedding、向量检索与 LLM 合成的 RAG 管线；使用 pgvector / Chroma 存储与召回上下文。',
    examples: ['知识库问答', '文档助手', 'Agent 工具链'],
    links: [{ label: 'LangChain', url: 'https://python.langchain.com' }],
  },
  {
    id: 'langgraph',
    category: 'data',
    title: 'LangGraph',
    summary: '多 Agent 状态图与工作流编排。',
    icon: '🔀',
    detail:
      '用有向图建模 Agent 节点、条件边与人类在环；适合复杂任务分解、并行子任务与可观测的调试流程。',
    examples: ['协作 Agent', '审批流', '工具调用链'],
    links: [{ label: 'LangGraph', url: 'https://langchain-ai.github.io/langgraph/' }],
  },
  {
    id: 'docker',
    category: 'tools',
    title: 'Docker',
    summary: '容器化开发与一致性部署环境。',
    icon: '🐳',
    detail:
      '编写多阶段 Dockerfile；使用 docker-compose 编排本地依赖；将镜像推送至 registry 并在 CI 中自动部署。',
    examples: ['本地全栈环境', 'CI 构建', '微服务拆分'],
    links: [{ label: 'Docker Docs', url: 'https://docs.docker.com' }],
  },
  {
    id: 'git',
    category: 'tools',
    title: 'Git / GitHub',
    summary: '版本管理、PR 协作与开源维护。',
    icon: '📦',
    detail:
      '分支策略、语义化提交与 Code Review；熟悉 GitHub Actions 基础流水线与 Issue / PR 模板维护。',
    examples: ['开源项目', '团队协作', '发布流程'],
    links: [{ label: 'GitHub', url: 'https://github.com' }],
  },
];

const gallerySeeds = [
  { w: 400, h: 520 },
  { w: 400, h: 300 },
  { w: 400, h: 450 },
  { w: 400, h: 360 },
  { w: 400, h: 500 },
  { w: 400, h: 280 },
  { w: 400, h: 420 },
  { w: 400, h: 340 },
  { w: 400, h: 480 },
  { w: 400, h: 310 },
  { w: 400, h: 400 },
  { w: 400, h: 550 },
];

export const GALLERY_POOL: GalleryImage[] = gallerySeeds.map((item, i) => ({
  id: `gallery-${i + 1}`,
  src: `https://picsum.photos/seed/skillplaza${i + 1}/${item.w}/${item.h}`,
  alt: `作品集照片 ${i + 1}`,
  width: item.w,
  height: item.h,
}));

export function getSkillsByCategory(category: SkillCategory | 'all'): SkillItem[] {
  if (category === 'all') return SKILLS;
  return SKILLS.filter((s) => s.category === category);
}
