import { motion } from 'framer-motion';
import { Brain, Lightbulb, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const traits = [
    { icon: Brain, labelKey: 'about.trait.problemSolver' },
    { icon: Lightbulb, labelKey: 'about.trait.builder' },
    { icon: Users, labelKey: 'about.trait.collaborator' },
    { icon: BookOpen, labelKey: 'about.trait.learner' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient">{t('about.title')}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </motion.div>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {traits.map((trait, index) => (
              <motion.div
                key={trait.labelKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors"
              >
                <trait.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-center">{t(trait.labelKey)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
