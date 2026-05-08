import { motion } from 'framer-motion';
import { Mail, Github, AtSign, Briefcase, Users, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const contactLinks = [
  {
    icon: Mail,
    label: '2822937768@qq.com',
    href: 'mailto:2822937768@qq.com?subject=Portfolio Contact',
  },
  {
    icon: AtSign,
    label: 'x.com/cloudbit441506',
    href: 'https://x.com/cloudbit441506',
  },
  {
    icon: Github,
    label: 'github.com/Timelovers',
    href: 'https://github.com/Timelovers',
  },
];

const Contact = () => {
  const { t } = useLanguage();

  const opportunities = [
    { icon: Briefcase, labelKey: 'contact.fullTime' },
    { icon: Users, labelKey: 'contact.freelance' },
    { icon: GraduationCap, labelKey: 'contact.collaboration' },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-gradient">{t('contact.title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-2xl font-bold mb-6">{t('contact.getInTouch')}</h3>
            <ul className="space-y-4">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm md:text-base">{link.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Open to Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-2xl font-bold mb-6">{t('contact.opportunities')}</h3>
            <ul className="space-y-4">
              {opportunities.map((opp) => (
                <li
                  key={opp.labelKey}
                  className="flex items-center gap-4 text-muted-foreground"
                >
                  <div className="p-2 rounded-lg bg-secondary">
                    <opp.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span>{t(opp.labelKey)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            {t('contact.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
