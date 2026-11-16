import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CaseView from './CaseView';
import { caseBySlug, identity } from './content';
import './design-demo.css';
import DemoLink from './DemoLink';
import HomeView from './HomeView';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  const saved = window.sessionStorage.getItem('design-demo-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function DesignDemoApp() {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [motionPref, setMotionPref] = useState<'auto' | 'off' | 'on'>(() => {
    const saved = window.sessionStorage.getItem('design-demo-motion');
    return saved === 'off' || saved === 'on' ? saved : 'auto';
  });
  const [osReduce, setOsReduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const reduce = motionPref === 'on' ? false : motionPref === 'off' ? true : osReduce;
  const path = location.pathname.replace(/\/+$/, '') || '/design-demo';
  const caseSlug = path.startsWith('/design-demo/work/') ? path.split('/').pop() : undefined;
  const study = caseBySlug(caseSlug);
  const showCase = Boolean(caseSlug);
  const aboutRoute = path === '/design-demo/about';

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setOsReduce(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    document.body.classList.add('design-demo-active');
    document.body.classList.toggle('design-demo-dark', theme === 'dark');
    const previousTitle = document.title;
    document.title = study ? `${study.title} · 设计演示` : `设计演示 · ${identity.name}`;
    return () => {
      document.body.classList.remove('design-demo-active', 'design-demo-dark');
      document.title = previousTitle;
    };
  }, [theme, study]);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.sessionStorage.getItem('design-demo-motion') === 'off';
    const behavior: ScrollBehavior = still ? 'auto' : 'smooth';
    if (aboutRoute || location.hash === '#about') {
      document.getElementById('about')?.scrollIntoView({ behavior, block: 'start' });
      return;
    }
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior, block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path, location.hash, aboutRoute]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    window.sessionStorage.setItem('design-demo-theme', next);
  };

  const toggleMotion = () => {
    const next = reduce ? 'on' : 'off';
    setMotionPref(next);
    window.sessionStorage.setItem('design-demo-motion', next);
  };

  const current = showCase ? 'case' : aboutRoute ? 'about' : 'home';

  return (
    <div className={`design-demo${reduce ? ' is-still' : ' allow-motion'}`} data-theme={theme} lang="zh-CN" data-testid="design-demo">
      <a className="dd-skip" href="#demo-main">跳到内容</a>
      <div className="dd-margin" aria-hidden="true" />
      <header className="dd-nav">
        <DemoLink className="dd-brand" href="/design-demo">
          <span className="dd-mark">Sa</span>
          <span>
            <strong>设计演示</strong>
            <small>不替换现有主页</small>
          </span>
        </DemoLink>
        <nav className="dd-nav-links" aria-label="演示导航">
          <DemoLink href="/design-demo" aria-current={current === 'home' ? 'page' : undefined}>首页</DemoLink>
          <DemoLink href="/design-demo/about" aria-current={current === 'about' ? 'page' : undefined}>关于</DemoLink>
          <DemoLink href="/design-demo/work/promptvault" aria-current={caseSlug === 'promptvault' ? 'page' : undefined}>PromptVault</DemoLink>
          <DemoLink href="/design-demo/work/career-coach" aria-current={caseSlug === 'career-coach' ? 'page' : undefined}>求职智航</DemoLink>
          <DemoLink href="/">现有主页</DemoLink>
        </nav>
        <div className="dd-nav-tools">
          <button className="dd-tool" type="button" onClick={toggleMotion} data-testid="motion-toggle">
            {reduce ? '打开动效' : '减弱动效'}
          </button>
          <button className="dd-tool" type="button" onClick={toggleTheme} data-testid="theme-toggle">
            {theme === 'dark' ? '浅色' : '深色'}
          </button>
        </div>
      </header>
      <main id="demo-main">
        {showCase && study ? <CaseView study={study} /> : null}
        {showCase && !study ? (
          <div className="dd-wrap dd-case">
            <h1>没有这一则案例</h1>
            <p className="dd-lede">演示只写了 PromptVault 和 AI 求职智航。</p>
            <DemoLink className="dd-button" href="/design-demo">返回演示首页</DemoLink>
          </div>
        ) : null}
        {!showCase ? <HomeView reduce={reduce} theme={theme} /> : null}
      </main>
      <footer className="dd-footer dd-wrap">
        <p><strong>由 Sara Alice 设计与开发。</strong> 这是独立预览，现有主页、/promptvault/ 和 /career-coach/ 都还在原来的地址。</p>
        <DemoLink className="dd-textlink" href="/">回到现有主页</DemoLink>
      </footer>
    </div>
  );
}
