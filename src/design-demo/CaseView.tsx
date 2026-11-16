import { useState } from 'react';
import DemoLink from './DemoLink';
import { caseStudies, writingBySlug, type CaseStudy } from './content';

const rail = [
  { href: '#problem', label: '问题' },
  { href: '#approach', label: '做法' },
  { href: '#structure', label: '结构' },
  { href: '#boundaries', label: '边界' },
  { href: '#writing', label: '文章' },
];

export default function CaseView({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(0);
  const step = study.flow[open];

  return (
    <article className="dd-case dd-wrap" data-testid="case-study">
      <div className="dd-case-top">
        <DemoLink className="dd-textlink" href="/design-demo">返回演示首页</DemoLink>
        <div className="dd-switch">
          {caseStudies.map((item) => (
            <DemoLink
              key={item.slug}
              href={`/design-demo/work/${item.slug}`}
              aria-current={item.slug === study.slug ? 'page' : undefined}
            >
              {item.title}
            </DemoLink>
          ))}
        </div>
      </div>

      <p className="dd-kicker">{study.eyebrow} · {study.index}</p>
      <h1 data-testid="case-title">{study.title}</h1>
      {study.aka ? <p className="dd-aka">{study.aka}</p> : null}
      <p className="dd-thesis">{study.thesis}</p>
      <div className="dd-tags">
        {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <div className="dd-meta">
        {study.meta.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="dd-linkrow">
        {study.links.map((link) => (
          <DemoLink className="dd-button-ghost" href={link.href} key={link.href}>{link.label}</DemoLink>
        ))}
      </div>
      <p className="dd-note">功能描述来自仓库里已经写上的页面和打包文案，不补充未出现的雇主、工期或人数。</p>

      <div className="dd-case-grid">
        <nav className="dd-rail" aria-label="案例章节">
          {rail.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div>
          <section className="dd-block" id="problem">
            <h2>问题</h2>
            {study.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section className="dd-block" id="approach">
            <h2>做法</h2>
            <ol>
              {study.approach.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
          <section className="dd-block" id="structure">
            <h2>结构</h2>
            <div className="dd-flow">
              <div className="dd-flow-nav" role="tablist" aria-label="结构分段">
                {study.flow.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={open === index}
                    onClick={() => setOpen(index)}
                  >
                    <span>0{index + 1}</span>
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="dd-card dd-flow-panel" role="tabpanel" data-testid="flow-panel">
                <h3>{step.title}</h3>
                {step.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>
          <section className="dd-block" id="boundaries">
            <h2>边界</h2>
            <ul>
              {study.boundaries.map((item) => <li key={item}>{item}</li>)}
            </ul>
            {study.draft ? (
              <div className="dd-card dd-draft" style={{ marginTop: 16 }}>
                <h3>{study.draft.title}</h3>
                <p>{study.draft.body}</p>
                <div className="dd-textlinks">
                  <DemoLink className="dd-textlink" href={study.draft.href}>{study.draft.hrefLabel}</DemoLink>
                </div>
              </div>
            ) : null}
          </section>
          <section className="dd-block" id="writing">
            <h2>相邻的文章</h2>
            {study.related.map((item) => {
              const post = writingBySlug(item.slug);
              if (!post) return null;
              return (
                <article key={item.slug} style={{ marginBottom: 16 }}>
                  <p className="dd-mono">{post.date}</p>
                  <h3 style={{ fontFamily: '"DD Serif", serif', margin: '6px 0' }}>{post.title}</h3>
                  <p>{item.note}</p>
                  <DemoLink className="dd-textlink" href={`/blog/${post.slug}`}>阅读现有文章</DemoLink>
                </article>
              );
            })}
          </section>
          <p className="dd-sources">核对来源：{study.sources}</p>
        </div>
      </div>
    </article>
  );
}
