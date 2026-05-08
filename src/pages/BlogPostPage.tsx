import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { blogPosts } from '@/lib/blogPosts';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-purple z-50"
      />
      <main className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'zh' ? '返回博客列表' : 'Back to Blog'}</span>
          </Link>
        </motion.div>

        <article className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/80 p-8 md:p-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mono text-sm text-primary mb-4"
          >
            {post.date}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {language === 'zh' ? post.title.zh : post.title.en}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-muted-foreground text-lg mb-8"
          >
            {language === 'zh' ? post.excerpt.zh : post.excerpt.en}
          </motion.p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm rounded-full bg-secondary text-primary mono">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-5 text-base leading-8 text-foreground/90">
            {(language === 'zh' ? post.content.zh : post.content.en).map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.04 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;
