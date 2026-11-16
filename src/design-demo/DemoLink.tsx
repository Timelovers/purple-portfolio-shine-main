import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const spaPrefixes = ['/design-demo', '/blog', '/prompts', '/skill-plaza', '/cyberpunk-bookmarks'];

function isSpaHref(href: string) {
  if (href === '/' || href.startsWith('/#')) return true;
  return spaPrefixes.some((prefix) => href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}#`) || href.startsWith(`${prefix}?`));
}

type DemoLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  'aria-current'?: 'page' | undefined;
  'data-testid'?: string;
  'data-tone'?: string;
};

/** SPA links stay inside the router. Static apps and the PDF do a full load, so they are not swallowed by the catch-all route. */
export default function DemoLink({
  href,
  className,
  children,
  style,
  'aria-current': current,
  'data-testid': testId,
  'data-tone': tone,
}: DemoLinkProps) {
  if (/^https?:/i.test(href) || href.startsWith('mailto:')) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer noopener" aria-current={current} data-testid={testId} data-tone={tone} style={style}>
        {children}
      </a>
    );
  }

  if (isSpaHref(href)) {
    return (
      <Link className={className} to={href} aria-current={current} data-testid={testId} data-tone={tone} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} aria-current={current} data-testid={testId} data-tone={tone} style={style}>
      {children}
    </a>
  );
}
