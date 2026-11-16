/**
 * Copy for the isolated design demo.
 * Strings are taken from the current repo (homepage translations, project
 * cards, contact links, blog posts, and the shipped PromptVault / 求职智航 bundles).
 * Nothing here adds employers, dates, metrics, or contact channels.
 */
import { blogPosts } from '@/lib/blogPosts';

export const identity = {
  greeting: '你好，我是',
  name: 'Sara Alice',
  title: 'AI 应用工程师 · 5年编程经验',
  motto: '值得去的地方，没有捷径。',
  description: '了解自己，认识世界。把一些从未有过的故事带到这个世界。',
  about: [
    '我是一名 AI 应用工程师，在过去五年里，我一直在代码和产品之间寻找那个最有趣的交汇点。',
    '从最初写第一行代码的好奇，到现在构建多智能体协作系统，我始终相信技术是手段而非目的——真正让人兴奋的，是用 AI 解决真实问题的过程。',
    '我热衷于 AI Agent 系统的设计与实现，在多智能体协作、工作流编排、AI 工程化落地方面积累了丰富的实战经验。同时，全栈 Web 开发也是我的基础能力，让我能够从 0 到 1 把想法变成可用的产品。',
  ],
  traits: ['问题解决者', '构建者', '团队协作者', '终身学习者'],
  nameNote:
    '主页署名为 Sara Alice。技能广场页面另行署名为 Wendell。两处都在当前仓库里，这份演示跟随主页署名。',
};

export const contactLinks = [
  {
    label: '邮箱',
    value: '2822937768@qq.com',
    href: 'mailto:2822937768@qq.com?subject=Portfolio%20Contact',
  },
  {
    label: 'X',
    value: 'x.com/cloudbit441506',
    href: 'https://x.com/cloudbit441506',
  },
  {
    label: 'GitHub',
    value: 'github.com/Timelovers',
    href: 'https://github.com/Timelovers',
  },
  {
    label: '简历 PDF',
    value: 'Sara_Alice_Resume.pdf',
    href: '/resume.pdf',
  },
];

export const opportunities = ['全职职位', '自由项目', '开源协作'];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: '编程语言',
    items: ['TypeScript/JavaScript', 'Python', 'SQL', 'Bash', 'Git/GitHub'],
  },
  {
    title: '后端 & 云服务',
    items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Cloud Deployment (OpenCloud/Vercel)'],
  },
  {
    title: '前端 & 移动端',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  },
  {
    title: 'AI Agent 与 LLM 系统',
    items: [
      'LangChain',
      'LangGraph',
      'AutoGen',
      'MetaGPT',
      'Hermes Agent',
      'RAG + Vector DB (pgvector/Chroma)',
    ],
  },
];

export type StageLink = {
  id: string;
  kicker: string;
  title: string;
  caption: string;
  href: string;
  action: string;
  tone: 'coral' | 'cyan' | 'ink';
  rot: number;
  fx: number;
  fy: number;
};

export const stageLinks: StageLink[] = [
  {
    id: 'promptvault',
    kicker: '提示词库',
    title: 'PromptVault',
    caption: '一键填空、复制、收进你的库',
    href: '/design-demo/work/promptvault',
    action: '看案例',
    tone: 'coral',
    rot: -7,
    fx: 18,
    fy: 12,
  },
  {
    id: 'career-coach',
    kicker: '求职作品',
    title: '求职智航',
    caption: '项目挖掘、JD、简历、面试',
    href: '/design-demo/work/career-coach',
    action: '看案例',
    tone: 'cyan',
    rot: 6,
    fx: -20,
    fy: 14,
  },
  {
    id: 'bookmarks',
    kicker: '书签',
    title: '书签库',
    caption: '93 条目 · 11 分类',
    href: '/cyberpunk-bookmarks.html',
    action: '打开',
    tone: 'ink',
    rot: 4,
    fx: 14,
    fy: -16,
  },
  {
    id: 'punchbeat',
    kicker: '交互',
    title: 'PunchBeat',
    caption: '用 Mannus 构建的交互式拳击游戏',
    href: 'https://punchbeat-3igmmbsf.manus.space',
    action: '打开',
    tone: 'cyan',
    rot: -5,
    fx: -16,
    fy: -12,
  },
];

export type FlowStep = { title: string; body: string[] };
export type CaseLink = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  aka?: string;
  thesis: string;
  tags: string[];
  meta: { label: string; value: string }[];
  links: CaseLink[];
  problem: string[];
  approach: string[];
  flow: FlowStep[];
  boundaries: string[];
  draft?: { title: string; body: string; href: string; hrefLabel: string };
  related: { slug: string; note: string }[];
  sources: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'promptvault',
    index: '01',
    eyebrow: '站内作品',
    title: 'PromptVault',
    thesis: '发现好用的提示词，一键填空、复制、收进你的库。',
    tags: ['Prompt Engineering', 'Knowledge Base', 'Productivity'],
    meta: [
      { label: '作品集里的一句', value: '个人提示词库，用于系统化整理、优化与复用 Prompt 资产。' },
      { label: '站内演示', value: '/promptvault/' },
      { label: '代码', value: 'github.com/Timelovers/promptvault' },
      { label: '数据放在哪', value: '浏览器 localStorage。密钥不进静态包。' },
    ],
    links: [
      { label: '打开站内演示', href: '/promptvault/' },
      { label: 'GitHub 仓库', href: 'https://github.com/Timelovers/promptvault' },
      { label: '提示词页', href: '/prompts/promptvault' },
      { label: '书签库收录的地址', href: 'https://timelovers.github.io/promptvault/' },
    ],
    problem: [
      '站点上的项目简介把它定义成个人提示词库：整理、优化、复用。提示词页建议覆盖四类任务：检索、归档、重写、优化。',
      '打包进仓库的页面把同一件事说得更具体：广场上发现模板，用占位符填空，复制，再收进自己的库。',
    ],
    approach: [
      '广场按场景放模板。分类写在页面里：办公效率、编程开发、学习成长、产品设计、内容创作、AI 绘图、职场求职、通用。',
      '模板用 {{变量}} 标出要填的地方。填完可以复制，也可以收藏，或加入「我的库」继续改。',
      '我的库存在本机。编辑正文时，界面写明：修改正文会保存为新版本，旧版本仍留在时间线里。',
      'AI 优化是可选的。先在设置里填写自己的 Gemini API Key，密钥只留在这台浏览器。',
    ],
    flow: [
      {
        title: '广场',
        body: [
          '可以搜索标题、描述和标签。内置模板标题包括：周报生成器、代码审查助手、费曼学习法导师、PRD 需求拆解、小红书爆款标题、SQL 生成与解释、读书笔记提炼、电商主图描述、英文邮件润色、面试模拟官、Mermaid 流程图、短视频分镜脚本、竞品分析框架、水彩插画风格、正则表达式解释器、职业规划对话、会议纪要整理、Bug 报告改写。',
        ],
      },
      {
        title: '填空与复制',
        body: ['变量填好后复制成一条能直接用的提示词。复制失败时，页面提示改为手动选择文本。'],
      },
      {
        title: '我的库',
        body: [
          '本地数据键是 prompt_vault_data，收藏键是 prompt_vault_square_favs，主题键是 prompt_vault_theme。库为空时，页面会请人去广场挑几条。',
        ],
      },
      {
        title: '版本',
        body: ['界面说明：修改正文会保存为新版本，旧版本仍留在时间线里。可以写版本备注。'],
      },
      {
        title: 'AI 优化',
        body: [
          '未填写 Gemini API Key 时不能优化。打包脚本里的默认模型 id 是 gemini-3-flash-preview，请求发往 generativelanguage.googleapis.com。密钥键是 prompt_vault_gemini_key。',
        ],
      },
      {
        title: '导入导出',
        body: [
          '导出 JSON 只包含提示词，不含 API Key。文件上限 5MB，一次最多导入 2000 条。本地库读不出来或格式无法识别时，会停止自动保存，以免覆盖。',
        ],
      },
    ],
    boundaries: [
      '密钥仅保存在本机浏览器，不会上传到服务器。',
      '导出文件不含 API Key。',
      '读不出本地数据时停止自动保存，避免把库覆盖掉。',
      '仓库没有写作者、工期或使用人数。案例里因此不放这些字段。',
    ],
    related: [
      {
        slug: 'keep-the-before-version',
        note: '这篇文章写的是另一件工作：改分析 demo 之前先留下「修复前」。不是 PromptVault 的开发日志。放在一起，是因为产品界面自己也写了保留旧版本。',
      },
    ],
    sources:
      'src/contexts/LanguageContext.tsx 的项目简介；src/components/Projects.tsx 的链接与标签；src/lib/projectPrompts.ts；public/promptvault/index.html；public/promptvault/assets 里的界面文案与存储键。',
  },
  {
    slug: 'career-coach',
    index: '02',
    eyebrow: '站内作品',
    title: 'AI 求职智航',
    aka: '作品集卡片上的名字是 AI Creator Coaching Navigation。',
    thesis: '面向技术岗求职者的项目挖掘、JD 解析、简历对齐和模拟面试。模型密钥由使用者保存在自己的浏览器里。',
    tags: ['TypeScript', 'AI Product', 'Creator Coaching'],
    meta: [
      { label: '卡片上的一句', value: '对话式 AI 导师，帮助技术人梳理项目、对齐 JD 要求并打磨面试叙事。' },
      { label: '站内演示', value: '/career-coach/' },
      { label: '代码', value: 'github.com/Timelovers/AI-Career-Coaching-Navigator-' },
      { label: '数据放在哪', value: '浏览器 localStorage。密钥不进静态包，也不上传到站点服务器。' },
    ],
    links: [
      { label: '打开站内演示', href: '/career-coach/' },
      { label: 'GitHub 仓库', href: 'https://github.com/Timelovers/AI-Career-Coaching-Navigator-' },
      { label: '提示词页', href: '/prompts/ai-career-coaching-navigator' },
    ],
    problem: [
      '页面要帮技术岗求职者把项目讲清楚，再对齐一份 JD，写成简历，并拿来做模拟面试。',
      '提示词要求只使用材料里已经出现的事实。没有数字时不能编百分比，要标成待补充。',
    ],
    approach: [
      '四个步骤写在界面上：项目挖掘、JD 解析、简历生成、模拟面试。',
      '项目挖掘每次只问一个问题，围绕背景、任务、行动、结果、技术栈和难点。可以打字，也可以让浏览器语音识别把话写进输入框。麦克风不可用时，页面改为文字输入。',
      '也可以把项目介绍贴进去做结构化，或手动添加。手动添加至少要有项目名称。字段包括项目名称、背景、你的任务、关键行动、结果、技术栈、难点。',
      'JD 解析抽出公司、职位、关键词和胜任力。无法确定时不猜测公司或职级。关键词和胜任力各不超过 8 条。',
      '简历按 STAR 写成 3 到 6 行，只突出和 JD 重合的部分。没有数字时写成「待补充：具体指标」。',
      '模拟面试每次一个问题。结束后生成复盘：具体缺口，并引用素材库里的项目名称。没有可用素材时，引用列表为空。',
    ],
    flow: [
      {
        title: '项目挖掘',
        body: [
          '规则写在提示词里：每次只问一个问题；引导对方给出真实指标，但不要替对方编造数字；不要直接生成完整简历。素材刷新后仍会保留。',
        ],
      },
      {
        title: 'JD 解析',
        body: ['粘贴职位描述。还没解析过时，后面的简历步骤会要求先选择一个目标职位。'],
      },
      {
        title: '简历生成',
        body: [
          '需要至少一条项目素材，以及一个已选中的 JD。matchScore 按证据重合度打 0 到 1，提示词写明不要一律给高分。可以复制全部。',
        ],
      },
      {
        title: '模拟面试',
        body: [
          '还没选定 JD 时，面试改为基于已有素材做通用追问。问题要落到素材里的行动、取舍或结果。结束并生成复盘后，缺口和素材引用会留在页面上。',
        ],
      },
      {
        title: '模型',
        body: [
          '三档接口：Gemini、DeepSeek、OpenAI 兼容。默认 Gemini 模型 id 是 gemini-2.0-flash，结构化步骤走 generateContent。DeepSeek 默认 deepseek-chat，可选 deepseek-reasoner，请求发往 https://api.deepseek.com/chat/completions。自定义网关默认 Base URL 是 https://api.openai.com/v1，页面写明线上来源要允许 https://lijiaxing.com.cn 跨域。',
        ],
      },
      {
        title: '本机保存',
        body: [
          '设置文案：密钥只写入本机 localStorage，不会打进静态包，也不会上传到站点服务器。供应商设置键是 career-coach.provider，业务数据键是 career-coach.state。清除业务数据时，密钥会保留。',
        ],
      },
    ],
    boundaries: [
      '不得编造公司、指标、人数、百分比或未出现的技术。缺失的数据写成待补充。',
      '提示词页同时写明：不得输出歧视性建议，或承诺保 offer。',
      '生成简历前需要素材和已选中的 JD。素材库为空时，复盘没有可引用的项目。',
      '仓库没有写作者、工期或使用人数。案例里因此不放这些字段。',
    ],
    draft: {
      title: '提示词页里更宽的一稿',
      body: '同仓库的提示词页还写了电话接入、Azure Speech 或 Google Speech-to-Text，以及 asrService / jdParser / resumeBuilder / interviewEngine 这组服务名。嵌入站点的 /career-coach/ 实际文案是：文字面试可用，麦克风只负责把话写进输入框。演示把这两层分开，避免把提示词稿说成已经接上的电话功能。',
      href: '/prompts/ai-career-coaching-navigator',
      hrefLabel: '打开提示词页',
    },
    related: [
      {
        slug: 'let-llm-choose-not-invent',
        note: '这篇文章写的是根因分析原型：候选项由程序生成，模型只负责选。不是求职智航的复盘。放在一起，是因为这个产品的提示词也要求模型不要编造材料里没有的事实。',
      },
    ],
    sources:
      'public/career-coach/index.html；public/career-coach/assets 里的界面文案、模型 id 与存储键；src/components/Projects.tsx；src/contexts/LanguageContext.tsx；src/lib/projectPrompts.ts。',
  },
];

export function caseBySlug(slug: string | undefined) {
  return caseStudies.find((item) => item.slug === slug);
}

export const recentWriting = blogPosts.slice(0, 3).map((post) => ({
  slug: post.slug,
  date: post.date,
  title: post.title.zh,
  excerpt: post.excerpt.zh,
  tags: post.tags,
}));

export function writingBySlug(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return null;
  return {
    slug: post.slug,
    date: post.date,
    title: post.title.zh,
    excerpt: post.excerpt.zh,
  };
}

export const otherWorks = [
  {
    title: 'PunchBeat',
    text: '用 Mannus 构建的交互式拳击游戏。',
    tags: ['Mannerus', 'Interactive Game', 'Web Experience'],
    links: [
      { label: '在线体验', href: 'https://punchbeat-3igmmbsf.manus.space' },
      { label: '提示词页', href: '/prompts/punchbeat' },
    ],
  },
  {
    title: 'Bookmark Visualizer',
    text: '复古终端风格的浏览器书签可视化工具，帮助更高效地浏览与管理链接集合。',
    tags: ['Claude Agent Skill', 'Bookmark Tools', 'Visualization'],
    links: [
      { label: '打开书签库', href: '/cyberpunk-bookmarks.html' },
      { label: 'GitHub', href: 'https://github.com/Timelovers/bookmark-visualizer-skill' },
      { label: '提示词页', href: '/prompts/bookmark-visualizer' },
    ],
  },
];
