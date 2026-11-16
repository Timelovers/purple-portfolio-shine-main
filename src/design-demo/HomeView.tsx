import DemoLink from './DemoLink';
import HeroStage from './HeroStage';
import {
  caseStudies,
  contactLinks,
  identity,
  opportunities,
  otherWorks,
  recentWriting,
  skillGroups,
} from './content';

type Props = { reduce: boolean; theme: 'light' | 'dark' };

export default function HomeView({ reduce, theme }: Props) {
  return (
    <>
      <section className="dd-hero dd-wrap">
        <div>
          <p className="dd-kicker">{identity.title}</p>
          <h1>
            <span className="dd-hello">{identity.greeting}</span>
            <span className="dd-name">{identity.name}</span>
          </h1>
          <p className="dd-motto">{identity.motto}</p>
          <p className="dd-lede">{identity.description}</p>
          <div className="dd-actions">
            <DemoLink className="dd-button" href="/design-demo#work">看作品</DemoLink>
            <DemoLink className="dd-button-ghost" href="https://github.com/Timelovers">GitHub</DemoLink>
          </div>
        </div>
        <HeroStage reduce={reduce} theme={theme} />
      </section>

      <section className="dd-section" id="work">
        <div className="dd-wrap">
          <div className="dd-section-head">
            <h2>作品</h2>
            <p>两则案例按仓库里的页面和打包文案写成。另外两件作品保留原来的入口，没有另写案例。</p>
          </div>
          <div className="dd-feature-grid">
            {caseStudies.map((study) => (
              <article className="dd-card dd-feature" key={study.slug}>
                <span className="dd-index">{study.index}</span>
                <h3>{study.title}</h3>
                <p>{study.thesis}</p>
                <div className="dd-chips">
                  {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="dd-actions">
                  <DemoLink className="dd-button" href={`/design-demo/work/${study.slug}`}>阅读案例</DemoLink>
                  <DemoLink className="dd-button-ghost" href={study.links[0].href}>打开现有演示</DemoLink>
                </div>
              </article>
            ))}
          </div>
          <div className="dd-other-grid" style={{ marginTop: 16 }}>
            {otherWorks.map((work) => (
              <article className="dd-card dd-other" key={work.title}>
                <h3>{work.title}</h3>
                <p>{work.text}</p>
                <div className="dd-chips">
                  {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="dd-textlinks">
                  {work.links.map((link) => (
                    <DemoLink className="dd-textlink" href={link.href} key={link.href}>{link.label}</DemoLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dd-section" id="about">
        <div className="dd-wrap">
          <div className="dd-about">
            <aside className="dd-card dd-monogram">
              <div>
                <p className="dd-kicker">About</p>
                <div className="dd-monogram-mark">SA</div>
              </div>
              <div>
                <strong>{identity.name}</strong>
                <p>{identity.title}</p>
                <p>站点没有公开肖像，所以这里用姓名缩写，不用照片。</p>
              </div>
            </aside>
            <div className="dd-about-copy">
              <p className="dd-kicker">关于</p>
              <h2>关于我</h2>
              <p className="dd-pull">{identity.motto}</p>
              {identity.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="dd-traits">
                {identity.traits.map((trait) => <span className="dd-trait" key={trait}>{trait}</span>)}
              </div>
              <p className="dd-note">{identity.nameNote}</p>
            </div>
          </div>

          <div className="dd-skill-grid">
            {skillGroups.map((group) => (
              <article className="dd-card dd-skill" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="dd-section-head" style={{ marginTop: 48 }}>
            <h2>联系</h2>
            <p>这些都是主页上已有的链接。没有表单，点开就会离开或唤起邮件。</p>
          </div>
          <div className="dd-contact-grid">
            {contactLinks.map((link) => (
              <DemoLink className="dd-contact" href={link.href} key={link.href}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </DemoLink>
            ))}
            <article className="dd-card dd-opps">
              <h3>主页上写的开放方向</h3>
              <ul>
                {opportunities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
          <p className="dd-note">技能广场仍在 <DemoLink className="dd-textlink" href="/skill-plaza">/skill-plaza</DemoLink>。</p>
        </div>
      </section>

      <section className="dd-section" id="writing">
        <div className="dd-wrap">
          <div className="dd-section-head">
            <h2>文章</h2>
            <p>取自站点文章列表最前面的三篇。点进去会打开现有文章页。</p>
          </div>
          <div className="dd-writing">
            {recentWriting.map((post) => (
              <article className="dd-card dd-post" key={post.slug}>
                <time dateTime={post.date}>{post.date}</time>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="dd-chips">
                  {post.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <DemoLink className="dd-textlink" href={`/blog/${post.slug}`}>阅读现有文章</DemoLink>
              </article>
            ))}
          </div>
          <div className="dd-actions">
            <DemoLink className="dd-button-ghost" href="/blog">全部文章</DemoLink>
          </div>
        </div>
      </section>
    </>
  );
}
