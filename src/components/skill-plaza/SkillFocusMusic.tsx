import { useEffect, useRef, useState } from 'react';
import { FOCUS_MUSIC } from '@/lib/skillPlazaData';
import { cn } from '@/lib/utils';
import { Music2, Pause, Play, Volume2 } from 'lucide-react';

const SkillFocusMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(FOCUS_MUSIC.audioUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    audio.addEventListener('canplaythrough', () => setReady(true));
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <div className="sp-music sp-widget fixed bottom-5 right-5 z-50 flex max-w-[min(100vw-2rem,280px)] items-center gap-2 px-3 py-2 shadow-lg">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          playing ? 'bg-[#35bfab]/20' : 'bg-white/50',
        )}
      >
        <Music2 className={cn('h-4 w-4', playing && 'text-[#35bfab]')} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold">{FOCUS_MUSIC.title}</p>
        <p className="sp-text-secondary truncate text-[9px]">{FOCUS_MUSIC.artist}</p>
      </div>
      <Volume2 className="sp-text-secondary hidden h-3.5 w-3.5 sm:block" />
      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, #35bfab, #2aab98)',
          boxShadow: '0 2px 10px rgba(53, 191, 171, 0.35)',
        }}
        aria-label={playing ? '暂停音乐' : '播放专注音乐'}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
    </div>
  );
};

export default SkillFocusMusic;
