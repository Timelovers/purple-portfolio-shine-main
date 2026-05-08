import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy } from 'lucide-react';
import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import { projectPrompts } from '@/lib/projectPrompts';

const ProjectPromptPage = () => {
  const { slug } = useParams();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const promptPage = projectPrompts.find((item) => item.slug === slug);

  const handleCopyPrompt = async () => {
    if (!promptPage) return;

    try {
      await navigator.clipboard.writeText(promptPage.promptTemplate);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }

    window.setTimeout(() => {
      setCopyStatus('idle');
    }, 1600);
  };

  if (!promptPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />
      <main className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回项目展示</span>
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-2xl bg-card border border-border p-8 md:p-10"
        >
          <p className="mono text-sm text-primary mb-3">{promptPage.projectName}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{promptPage.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{promptPage.intro}</p>

          <div className="rounded-xl border border-border bg-background/70 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium">提示词（可复制）</p>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copyStatus === 'idle' && '复制'}
                {copyStatus === 'success' && '已复制'}
                {copyStatus === 'error' && '复制失败'}
              </button>
            </div>
            <pre className="mono text-sm whitespace-pre-wrap text-foreground/90">{promptPage.promptTemplate}</pre>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectPromptPage;
