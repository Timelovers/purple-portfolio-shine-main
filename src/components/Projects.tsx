import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import projectAiDocument from '@/assets/project-ai-document.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import aiCreatorCoachingNavigationCover from '@/assets/ai-creator-coaching-navigation-cover.png';
import bookmarkVisualizerCover from '@/assets/bookmark-visualizer-cover.png';
import promptvaultCover from '@/assets/promptvault-cover.png';

const Projects = () => {
  const { t } = useLanguage();

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

  const projects = [
    {
      slug: 'punchbeat',
      titleKey: 'projects.1.title',
      descriptionKey: 'projects.1.description',
      tags: ['Mannerus', 'Interactive Game', 'Web Experience'],
      github: '',
      demo: 'https://punchbeat-3igmmbsf.manus.space',
      gradient: 'from-purple-500/20 to-pink-500/20',
      image: projectAiDocument,
      video: '/media/punch-beat.mp4',
      iconSymbol: '🥊',
    },
    {
      slug: 'ai-career-coaching-navigator',
      titleKey: 'projects.2.title',
      descriptionKey: 'projects.2.description',
      tags: ['TypeScript', 'AI Product', 'Creator Coaching'],
      github: 'https://github.com/Timelovers/AI-Career-Coaching-Navigator-',
      demo: '',
      gradient: 'from-blue-500/20 to-purple-500/20',
      image: aiCreatorCoachingNavigationCover,
      iconSymbol: '🎯',
    },
    {
      slug: 'bookmark-visualizer',
      titleKey: 'projects.3.title',
      descriptionKey: 'projects.3.description',
      tags: ['Claude Agent Skill', 'Bookmark Tools', 'Visualization'],
      github: 'https://github.com/Timelovers/bookmark-visualizer-skill',
      demo: '/cyberpunk-bookmarks.html',
      gradient: 'from-green-500/20 to-blue-500/20',
      image: bookmarkVisualizerCover,
      iconSymbol: '📑',
    },
    {
      slug: 'promptvault',
      titleKey: 'projects.4.title',
      descriptionKey: 'projects.4.description',
      tags: ['Prompt Engineering', 'Knowledge Base', 'Productivity'],
      github: 'https://github.com/Timelovers/promptvault',
      demo: '',
      gradient: 'from-pink-500/20 to-purple-500/20',
      image: promptvaultCover,
      iconSymbol: '💾',
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient">{t('projects.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.titleKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div
                className="interactive-card relative rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full flex flex-col"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Project Media */}
                <div className="aspect-video bg-secondary">
                  {project.video ? (
                    <video
                      src={project.video}
                      className="w-full h-full object-cover bg-black"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(event) => {
                        // Ensure autoplay gets retriggered on browsers that are strict about timing.
                        event.currentTarget.play().catch(() => undefined);
                      }}
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                    {project.iconSymbol && (
                      <span className="text-2xl leading-none" aria-hidden="true">
                        {project.iconSymbol}
                      </span>
                    )}
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-secondary text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 mt-auto">
                    <motion.a
                      href={project.github || project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                      <span>{t('projects.viewCode')}</span>
                    </motion.a>
                    {project.demo ? (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} />
                        <span>{t('projects.liveDemo')}</span>
                      </motion.a>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground/70 cursor-not-allowed">
                        <ExternalLink size={20} />
                        <span>{t('projects.comingSoon')}</span>
                      </span>
                    )}
                    <motion.a
                      href={`/prompts/${project.slug}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles size={20} />
                      <span>{t('projects.viewPrompts')}</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
