import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/50 border border-primary/20 text-sm font-mono hover:border-primary/40 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`transition-opacity ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
        EN
      </span>
      <span className="text-primary">/</span>
      <span className={`transition-opacity ${language === 'zh' ? 'opacity-100' : 'opacity-50'}`}>
        中
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
