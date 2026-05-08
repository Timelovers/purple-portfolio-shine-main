import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import bookmarkPreview from '@/assets/bookmark-preview.png';

const Bookmarks = () => {
  const { t } = useLanguage();

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ratioX = (x / rect.width) - 0.5;
    const ratioY = (y / rect.height) - 0.5;
    const offsetX = ratioX * 12;
    const offsetY = ratioY * 12;
    const rotateX = ratioX * 4;
    const rotateY = -ratioY * 4;
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
    <section id="bookmarks" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient">{t('bookmarks.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('bookmarks.subtitle')}</p>
        </motion.div>

        <motion.a
          href="/cyberpunk-bookmarks.html"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="interactive-card group block max-w-5xl mx-auto overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="relative aspect-[2/1]">
            <img
              src={bookmarkPreview}
              alt="Bookmark archive preview"
              className="absolute inset-0 w-full h-full object-contain bg-black pointer-events-none opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-purple-subtle mix-blend-screen opacity-35" />

            <div className="absolute left-6 right-6 bottom-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="mono text-primary text-sm mb-2">及时雨.db</p>
                <h3 className="text-2xl font-bold mb-2">{t('bookmarks.previewTitle')}</h3>
                <p className="text-muted-foreground">{t('bookmarks.previewDescription')}</p>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 group-hover:bg-primary/30 transition-colors">
                {t('bookmarks.openArchive')}
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Bookmarks;