import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts } from '@/lib/blogPosts';

const Blog = () => {
  const { t, language } = useLanguage();
  const featuredPosts = blogPosts.slice(0, 3);

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ratioX = (x / rect.width) - 0.5;
    const ratioY = (y / rect.height) - 0.5;
    const offsetX = ratioX * 14;
    const offsetY = ratioY * 14;
    const rotateX = ratioX * 6;
    const rotateY = -ratioY * 6;
    element.style.setProperty('--mx', `${x}px`);
    element.style.setProperty('--my', `${y}px`);
    element.style.setProperty('--tilt-x', `${offsetX}px`);
    element.style.setProperty('--tilt-y', `${offsetY}px`);
    element.style.setProperty('--rot-x', `${rotateX}deg`);
    element.style.setProperty('--rot-y', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    element.style.setProperty('--tilt-x', '0px');
    element.style.setProperty('--tilt-y', '0px');
    element.style.setProperty('--rot-x', '0deg');
    element.style.setProperty('--rot-y', '0deg');
  };

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient mb-4">{t('blog.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {featuredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="interactive-card group min-h-[250px] p-5 rounded-2xl bg-card/80 border border-border hover:border-primary/50 hover:bg-card transition-all duration-300 flex flex-col"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span className="mono text-sm">{post.date}</span>
              </div>

              <h3 className="text-xl font-bold mb-3 leading-snug">
                {language === 'zh' ? post.title.zh : post.title.en}
              </h3>
              <p className="text-muted-foreground text-base mb-5 leading-relaxed">
                {language === 'zh' ? post.excerpt.zh : post.excerpt.en}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto mb-5">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm rounded-full bg-secondary text-primary mono">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-base font-medium"
              >
                <span>{t('blog.readMore')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.article>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors"
          >
            {t('blog.viewAll')}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;