import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
}

const SkillPlazaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blobs: Blob[] = [
      { x: 0.2, y: 0.25, r: 0.28, vx: 0.0001, vy: 0.00007, color: 'rgba(53, 191, 171, 0.45)' },
      { x: 0.75, y: 0.35, r: 0.22, vx: -0.00009, vy: 0.0001, color: 'rgba(31, 201, 231, 0.35)' },
      { x: 0.55, y: 0.7, r: 0.24, vx: 0.00008, vy: -0.00009, color: 'rgba(250, 230, 180, 0.35)' },
      { x: 0.12, y: 0.68, r: 0.18, vx: 0.0001, vy: -0.00007, color: 'rgba(212, 235, 228, 0.5)' },
    ];

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0.08 || b.x > 0.92) b.vx *= -1;
        if (b.y < 0.08 || b.y > 0.92) b.vy *= -1;

        const radius = Math.min(w, h) * b.r;
        const gradient = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, radius);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, 'rgba(232, 242, 239, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x * w, b.y * h, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
  <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{
        background: 'linear-gradient(128deg, #d4ebe4 0%, #eef6f2 42%, #faf6e8 100%)',
      }}
    >
      <div className="absolute inset-0" style={{ filter: 'blur(56px)', opacity: 0.9 }}>
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default SkillPlazaBackground;
