import { motion } from 'framer-motion';
import { Code, Server, Layout, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      titleKey: 'skills.languages',
      icon: Code,
      skills: ['TypeScript/JavaScript', 'Python', 'SQL', 'Bash', 'Git/GitHub'],
    },
    {
      titleKey: 'skills.backend',
      icon: Server,
      skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Cloud Deployment (OpenCloud/Vercel)'],
    },
    {
      titleKey: 'skills.frontend',
      icon: Layout,
      skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
    },
    {
      titleKey: 'skills.data',
      icon: Brain,
      skills: [
        'LangChain',
        'LangGraph',
        'AutoGen',
        'MetaGPT',
        'Hermes Agent',
        'RAG + Vector DB (pgvector/Chroma)',
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient">{t('skills.title')}</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-purple-subtle">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t(category.titleKey)}</h3>
              </div>

              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 * skillIndex }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
