import { FRIEND_LINKS } from '@/lib/skillPlazaData';
import { ExternalLink, Users } from 'lucide-react';

const FriendLinks = () => {
  return (
    <section className="sp-widget p-4">
      <div className="mb-3 flex items-center gap-2">
        <Users className="h-4 w-4 text-[#35bfab]" />
        <h3 className="text-sm font-semibold">友情链接</h3>
      </div>
      <p className="sp-text-secondary mb-3 text-xs">发现更多创作者博客与 Skill 广场</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {FRIEND_LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-pill flex items-start gap-2 rounded-2xl p-2.5 transition-all hover:bg-white/75 hover:shadow-sm"
            >
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#35bfab]" />
              <span className="min-w-0">
                <span className="block text-xs font-semibold">{link.name}</span>
                <span className="sp-text-secondary block text-[10px] leading-snug">
                  {link.description}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FriendLinks;
