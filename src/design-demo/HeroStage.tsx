import { useEffect, useRef, useState } from 'react';
import DemoLink from './DemoLink';
import { stageLinks, type StageLink } from './content';

type Props = {
  reduce: boolean;
  theme: 'light' | 'dark';
};

function Glyph({ id }: { id: string }) {
  if (id === 'promptvault') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="12" y="14" width="40" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M12 26h40" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="32" cy="38" r="3.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M32 41.5v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'career-coach') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 48c8-18 10-16 18-8s8 2 18-18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="14" cy="48" r="3" fill="currentColor" />
        <circle cx="31" cy="38" r="3" fill="currentColor" />
        <circle cx="40" cy="42" r="3" fill="currentColor" />
        <circle cx="50" cy="22" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (id === 'bookmarks') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M22 12h22v40l-11-8-11 8V12z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 42V28M32 46V16M48 42V24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function RippleCanvas({ reduce, theme }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage || reduce) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const cyan = theme === 'dark' ? 'rgba(126, 214, 224, 0.55)' : 'rgba(12, 127, 140, 0.45)';
    const coral = theme === 'dark' ? 'rgba(255, 141, 124, 0.5)' : 'rgba(225, 90, 72, 0.4)';
    const ripples: { x: number; y: number; born: number; color: string }[] = [];
    let frame = 0;
    let lastSpawn = 0;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const onPointer = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 46) return;
      lastSpawn = now;
      const rect = stage.getBoundingClientRect();
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        born: now,
        color: ripples.length % 2 === 0 ? cyan : coral,
      });
      if (ripples.length > 18) ripples.shift();
    };

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const progress = (now - ripple.born) / 1100;
        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }
        context.beginPath();
        context.arc(ripple.x * dpr, ripple.y * dpr, (6 + progress * 110) * dpr, 0, Math.PI * 2);
        context.strokeStyle = ripple.color;
        context.globalAlpha = 1 - progress;
        context.lineWidth = (1.6 - progress) * dpr;
        context.stroke();
        context.globalAlpha = 1;
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener('pointermove', onPointer);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener('pointermove', onPointer);
    };
  }, [reduce, theme]);

  return <canvas ref={ref} className="dd-stage-canvas" aria-hidden="true" />;
}

const places = ['dd-node-a', 'dd-node-b', 'dd-node-c', 'dd-node-d'];

export default function HeroStage({ reduce, theme }: Props) {
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setPointer({ x: Math.round(event.clientX - rect.left), y: Math.round(event.clientY - rect.top) });
    if (!reduce) {
      setShift({ x: x / (rect.width / 2), y: y / (rect.height / 2) });
    }
  };

  const onLeave = () => {
    if (!reduce) setShift({ x: 0, y: 0 });
  };

  return (
    <div
      className="dd-stage"
      data-testid="hero-stage"
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
    >
      <RippleCanvas reduce={reduce} theme={theme} />
      <svg className="dd-stage-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 22 C 40 28, 58 18, 82 30" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.35" />
        <path d="M22 78 C 40 62, 62 70, 80 58" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.28" />
      </svg>
      <i className="dd-cross dd-cross-a" />
      <i className="dd-cross dd-cross-b" />
      <i className="dd-cross dd-cross-c" />
      <i className="dd-cross dd-cross-d" />
      <div className="dd-coords">
        <strong>从 0 到 1</strong>
        <span>{reduce ? '动效已关' : `${pointer.x} , ${pointer.y}`}</span>
      </div>
      {stageLinks.map((node, index) => (
        <Node key={node.id} node={node} index={index} shift={shift} reduce={reduce} />
      ))}
    </div>
  );
}

function Node({
  node,
  index,
  shift,
  reduce,
}: {
  node: StageLink;
  index: number;
  shift: { x: number; y: number };
  reduce: boolean;
}) {
  const px = reduce ? 0 : shift.x * node.fx;
  const py = reduce ? 0 : shift.y * node.fy;
  return (
    <DemoLink
      href={node.href}
      className={`dd-node ${places[index]}`}
      data-testid={`stage-${node.id}`}
      data-tone={node.tone}
      style={{
        ['--px' as string]: `${px}px`,
        ['--py' as string]: `${py}px`,
        ['--rot' as string]: `${node.rot}deg`,
      }}
    >
      <span className="dd-node-glyph"><Glyph id={node.id} /></span>
      <small>{node.kicker}</small>
      <strong>{node.title}</strong>
      <em>{node.caption}</em>
      <b>{node.action}</b>
    </DemoLink>
  );
}
