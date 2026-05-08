import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.bookmarks': 'Bookmarks',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    
    // Hero
    'hero.greeting': "Hello, I'm",
    'hero.name': 'Sara Alice',
    'hero.title': 'AI Application Engineer · 5 Years of Programming Experience',
    'hero.motto': 'There are no shortcuts to places worth going.',
    'hero.description': 'Know yourself, understand the world, and bring stories into this world that did not exist before.',
    'hero.cta': 'View My Work',
    
    // About
    'about.title': 'About Me',
    'about.p1': 'I am an AI application engineer. Over the past five years, I have been exploring the most exciting intersection between code and product.',
    'about.p2': 'From the curiosity of writing my first line of code to building multi-agent collaboration systems today, I have always believed that technology is a means, not an end. What truly excites me is using AI to solve real problems.',
    'about.p3': 'I am passionate about designing and implementing AI Agent systems, with strong hands-on experience in multi-agent collaboration, workflow orchestration, and AI engineering delivery. At the same time, full-stack web development is my foundation, allowing me to turn ideas into usable products from 0 to 1.',
    'about.trait.builder': 'Builder',
    'about.trait.problemSolver': 'Problem Solver',
    'about.trait.learner': 'Lifelong Learner',
    'about.trait.collaborator': 'Team Collaborator',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'From ideas to products, each project is a practical experiment in AI implementation and an iteration of self-awareness.',
    'projects.viewCode': 'View Code',
    'projects.liveDemo': 'Live Experience',
    'projects.comingSoon': 'Coming Soon',
    'projects.viewPrompts': '查看提示词',
    
    // Project 1
    'projects.1.title': 'PunchBeat',
    'projects.1.description': '用 Mannus 构建的交互式拳击游戏。',
    
    // Project 2
    'projects.2.title': 'AI Creator Coaching Navigation',
    'projects.2.description': 'A conversational AI mentor that helps engineers structure projects, align with JD requirements, and improve interview storytelling.',
    
    // Project 3
    'projects.3.title': 'Bookmark Visualizer',
    'projects.3.description': 'A retro terminal-style browser bookmark visualization tool for clearer, faster exploration of link collections.',

    // Project 4
    'projects.4.title': 'PromptVault',
    'projects.4.description': 'A personal prompt library for organizing, refining, and reusing prompt assets systematically.',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Compact notes on AI products, engineering decisions, and systems thinking.',
    'blog.readMore': 'Read more',
    'blog.viewAll': 'View all posts',
    'blog.1.title': 'Building AI Features That Stay Useful',
    'blog.1.description': 'Make model output usable, reliable, and product-ready.',
    'blog.2.title': 'From Prototype to Production',
    'blog.2.description': 'The gap between a working demo and a dependable product.',
    'blog.3.title': 'Learning Systems by Building Them',
    'blog.3.description': 'Small builds as a way to understand larger systems.',

    // Bookmarks
    'bookmarks.title': 'Bookmarks',
    'bookmarks.subtitle': 'A featured gateway to my full bookmark archive.',
    'bookmarks.previewTitle': 'BOOKMARK ARCHIVE',
    'bookmarks.previewDescription': '93 entries · 11 categories · Curated tools for AI, coding, and growth.',
    'bookmarks.openArchive': 'Open Archive',
    
    // Skills
    'skills.title': 'Skills',
    'skills.languages': 'Languages',
    'skills.backend': 'Backend & Cloud',
    'skills.frontend': 'Frontend & Mobile',
    'skills.data': 'AI Agents & LLM Systems',
    
    // Contact
    'contact.title': "Let's Connect",
    'contact.subtitle': 'Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
    'contact.getInTouch': 'Get in Touch',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.opportunities': 'Open to Opportunities',
    'contact.fullTime': 'Full-time Positions',
    'contact.freelance': 'Freelance Projects',
    'contact.collaboration': 'Open Source Collaboration',
    'contact.footer': 'Designed & Built by Sara Alice',
  },
  zh: {
    // Navbar
    'nav.about': '关于我',
    'nav.projects': '项目',
    'nav.blog': '博客',
    'nav.bookmarks': '书签',
    'nav.skills': '技能',
    'nav.contact': '联系',
    'nav.resume': '简历',
    
    // Hero
    'hero.greeting': '你好，我是',
    'hero.name': 'Sara Alice',
    'hero.title': 'AI 应用工程师 · 5年编程经验',
    'hero.motto': '值得去的地方，没有捷径。',
    'hero.description': '了解自己，认识世界。把一些从未有过的故事带到这个世界。',
    'hero.cta': '查看我的作品',
    
    // About
    'about.title': '关于我',
    'about.p1': '我是一名 AI 应用工程师，在过去五年里，我一直在代码和产品之间寻找那个最有趣的交汇点。',
    'about.p2': '从最初写第一行代码的好奇，到现在构建多智能体协作系统，我始终相信技术是手段而非目的——真正让人兴奋的，是用 AI 解决真实问题的过程。',
    'about.p3': '我热衷于 AI Agent 系统的设计与实现，在多智能体协作、工作流编排、AI 工程化落地方面积累了丰富的实战经验。同时，全栈 Web 开发也是我的基础能力，让我能够从 0 到 1 把想法变成可用的产品。',
    'about.trait.builder': '构建者',
    'about.trait.problemSolver': '问题解决者',
    'about.trait.learner': '终身学习者',
    'about.trait.collaborator': '团队协作者',
    
    // Projects
    'projects.title': '项目展示',
    'projects.subtitle': '从想法到产品，每个项目都是一次 AI 能力的落地实验，也是一次自我认知的迭代。',
    'projects.viewCode': '查看代码',
    'projects.liveDemo': '在线体验',
    'projects.comingSoon': '即将上线',
    'projects.viewPrompts': '查看提示词',
    
    // Project 1
    'projects.1.title': 'PunchBeat',
    'projects.1.description': '用 Mannus 构建的交互式拳击游戏。',
    
    // Project 2
    'projects.2.title': 'AI Creator Coaching Navigation',
    'projects.2.description': '对话式 AI 导师，帮助技术人梳理项目、对齐 JD 要求并打磨面试叙事。',
    
    // Project 3
    'projects.3.title': 'Bookmark Visualizer',
    'projects.3.description': '复古终端风格的浏览器书签可视化工具，帮助更高效地浏览与管理链接集合。',

    // Project 4
    'projects.4.title': 'PromptVault',
    'projects.4.description': '个人提示词库，用于系统化整理、优化与复用 Prompt 资产。',
    
    // Blog
    'blog.title': '博客',
    'blog.subtitle': '关于 AI 产品、工程决策和系统思维的短记录。',
    'blog.readMore': '阅读全文',
    'blog.viewAll': '查看全部思考',
    'blog.1.title': '构建真正有用的 AI 功能',
    'blog.1.description': '让模型输出变得可用、可靠、可产品化。',
    'blog.2.title': '从原型到生产环境',
    'blog.2.description': '从可运行 Demo 到可靠产品之间的距离。',
    'blog.3.title': '通过构建来学习系统',
    'blog.3.description': '用小型构建理解更大的系统结构。',

    // Bookmarks
    'bookmarks.title': '书签',
    'bookmarks.subtitle': '一个入口，打开我的完整书签库。',
    'bookmarks.previewTitle': '书签库总览',
    'bookmarks.previewDescription': '93 条目 · 11 分类 · 覆盖 AI、编程与个人成长工具。',
    'bookmarks.openArchive': '打开书签库',
    
    // Skills
    'skills.title': '技能专长',
    'skills.languages': '编程语言',
    'skills.backend': '后端 & 云服务',
    'skills.frontend': '前端 & 移动端',
    'skills.data': 'AI Agent 与 LLM 系统',
    
    // Contact
    'contact.title': '联系我',
    'contact.subtitle': '随时欢迎讨论新项目、创意想法，或成为您愿景的一部分。',
    'contact.getInTouch': '联系方式',
    'contact.email': '邮箱',
    'contact.linkedin': '领英',
    'contact.github': 'GitHub',
    'contact.opportunities': '开放机会',
    'contact.fullTime': '全职职位',
    'contact.freelance': '自由项目',
    'contact.collaboration': '开源协作',
    'contact.footer': '由 Sara Alice 设计与开发',
  },
};

const defaultLanguage: Language = 'en';

const fallbackContext: LanguageContextType = {
  language: defaultLanguage,
  setLanguage: () => undefined,
  t: (key: string) => translations[defaultLanguage][key as keyof typeof translations['en']] || key,
};

const LanguageContext = createContext<LanguageContextType>(fallbackContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return defaultLanguage;
    }

    const saved = window.localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
