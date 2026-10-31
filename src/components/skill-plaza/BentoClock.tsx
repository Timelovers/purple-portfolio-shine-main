import { useEffect, useState } from 'react';

const BentoClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return (
    <div className="sp-clock sp-widget flex flex-1 items-center justify-center px-2 py-2">
      <p className="sp-lcd text-[2.75rem] font-bold leading-none tracking-wider sm:text-[3.25rem]">
        <span>{hours}</span>
        <span className="sp-clock-colon mx-0.5 inline-block animate-pulse opacity-70">:</span>
        <span>{minutes}</span>
      </p>
    </div>
  );
};

export default BentoClock;
