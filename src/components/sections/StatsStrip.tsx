import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 4, suffix: '', label: 'модели в наличии' },
  { value: 1400, suffix: ' ₽', label: 'аренда от / неделя' },
  { value: 24, suffix: ' ч', label: 'ответим быстро' },
  { value: 0, suffix: ' ₽', label: 'скрытых платежей' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic — приятное затухание к концу
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.5 });
  const value = useCountUp(stat.value, isInView);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ease-premium ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-3xl sm:text-4xl font-heading font-bold text-white">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-white/60">{stat.label}</p>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <div className="bg-graphite py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
        {stats.map((stat, idx) => (
          <StatItem key={stat.label} stat={stat} delay={idx * 100} />
        ))}
      </div>
    </div>
  );
}
