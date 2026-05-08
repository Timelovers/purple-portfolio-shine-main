import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();
  const [themeVariant, setThemeVariant] = useState<'default' | 'ocean'>('default');

  useEffect(() => {
    const saved = window.localStorage.getItem('themeVariant') as 'default' | 'ocean' | null;
    const next = saved ?? 'default';
    setThemeVariant(next);
    if (next === 'ocean') {
      document.documentElement.setAttribute('data-theme-variant', 'ocean');
    } else {
      document.documentElement.removeAttribute('data-theme-variant');
    }
  }, []);

  const toggleThemeVariant = () => {
    const next = themeVariant === 'default' ? 'ocean' : 'default';
    setThemeVariant(next);
    window.localStorage.setItem('themeVariant', next);
    if (next === 'ocean') {
      document.documentElement.setAttribute('data-theme-variant', 'ocean');
    } else {
      document.documentElement.removeAttribute('data-theme-variant');
    }
  };

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.blog'), href: '#blog' },
    { label: t('nav.bookmarks'), href: '#bookmarks' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-mono text-xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;Dev/&gt;
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={toggleThemeVariant}
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {themeVariant === 'default' ? '切换配色' : '恢复紫色'}
            </motion.button>
            <LanguageToggle />
            <motion.a
              href="/resume.pdf"
              download="Sara_Alice_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span className="hidden sm:inline">{t('nav.resume')}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
