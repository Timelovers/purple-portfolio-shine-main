import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';

const PRESETS = [5, 15, 25] as const;

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const BentoTimer = () => {
  const [durationMin, setDurationMin] = useState(15);
  const [remaining, setRemaining] = useState(15 * 60);
  const [running, setRunning] = useState(false);

  const reset = useCallback((minutes: number) => {
    setDurationMin(minutes);
    setRemaining(minutes * 60);
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const tick = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [running, remaining]);

  const toggle = () => {
    if (remaining <= 0) reset(durationMin);
    setRunning((r) => !r);
  };

  const done = remaining === 0 && !running;

  return (
    <div className="sp-timer sp-widget flex flex-col gap-1.5 p-2">
      <div className="flex items-center justify-between px-0.5">
        <span className="sp-text-secondary flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide">
          <Timer className="h-3 w-3" />
          定时器
        </span>
        <span
          className={cn(
            'sp-lcd text-sm font-bold tabular-nums',
            done && 'text-[#35bfab]',
            running && 'text-[#334f52]',
          )}
        >
          {formatCountdown(remaining)}
        </span>
      </div>

      <div className="flex gap-1">
        {PRESETS.map((min) => (
          <button
            key={min}
            type="button"
            onClick={() => reset(min)}
            className={cn(
              'flex-1 rounded-full py-1 text-[10px] font-medium transition-all',
              durationMin === min && !running
                ? 'bg-white/90 text-[#334f52] shadow-sm'
                : 'sp-text-secondary hover:bg-white/45',
            )}
          >
            {min}m
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-[11px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: done
            ? 'linear-gradient(135deg, #1fc9e7, #35bfab)'
            : 'linear-gradient(135deg, #35bfab, #2aab98)',
          boxShadow: '0 2px 10px rgba(53, 191, 171, 0.3)',
        }}
      >
        {running ? (
          <>
            <Pause className="h-3.5 w-3.5" />
            暂停
          </>
        ) : done ? (
          <>
            <RotateCcw className="h-3.5 w-3.5" />
            再来一次
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5" />
            开始 {durationMin} 分钟
          </>
        )}
      </button>
    </div>
  );
};

export default BentoTimer;
