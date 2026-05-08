import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { blogPosts } from '@/lib/blogPosts';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPage = () => {
  const { language, t } = useLanguage();
  const [activeTag, setActiveTag] = useState<string>('All');

  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.flatMap((post) => post.tags)))],
    []
  );

  const visiblePosts = useMemo(
    () => (activeTag === 'All' ? blogPosts : blogPosts.filter((post) => post.tags.includes(activeTag))),
    [activeTag]
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />
      <main className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'zh' ? '返回首页' : 'Back to Home'}</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-heading text-gradient mb-4">{t('blog.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                activeTag === tag
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span className="mono text-sm">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 leading-snug">
                {language === 'zh' ? post.title.zh : post.title.en}
              </h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">
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
      </main>
    </div>
  );
};

export default BlogPage;
