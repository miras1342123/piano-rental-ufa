import { useRef } from 'react';
import { X, Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import SectionHeading from '../ui/SectionHeading';

const pairs = [
  {
    problem: 'Покупать пианино дорого, особенно если ребёнок только начинает.',
    solution: 'Начните заниматься сразу — возьмите инструмент в аренду.',
  },
  {
    problem: 'Непонятно, продолжит ли ребёнок или взрослый заниматься через пару месяцев.',
    solution: 'Проверьте это без риска — аренда на любой удобный срок.',
  },
  {
    problem: 'Не знаете, какая модель подойдёт — Yamaha, Casio, механика полегче или потяжелее.',
    solution: 'Попробуйте несколько моделей и выберите ту, что понравится.',
  },
  {
    problem: 'Не знаете, точно ли вам нужен именно этот инструмент навсегда, или лучше сначала проверить.',
    solution: 'Возьмите пианино в аренду на пробу — а решение о покупке примете уже осознанно.',
  },
];

export default function WhyRent() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="why-rent" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={
            <>
              Зачем покупать, если можно сначала <span className="text-brass">арендовать?</span>
            </>
          }
          subtitle="Мы убрали все «но», из-за которых обычно откладывают занятия музыкой"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 lg:gap-y-14">
          {/* Заголовки колонок — видно только на десктопе, на мобильном пары идут карточками */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphite/40">
            <X size={16} /> Что обычно мешает
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brass">
            <Check size={16} /> Как решает PianoRent
          </div>

          {pairs.map((pair, idx) => (
            <div key={idx} className="contents">
              <div
                className={`flex items-start gap-3 transition-all duration-700 ease-premium ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-graphite/5 text-graphite/40 flex items-center justify-center mt-0.5">
                  <X size={14} />
                </span>
                <p className="text-base sm:text-lg text-graphite/60 leading-relaxed">{pair.problem}</p>
              </div>
              <div
                className={`flex items-start gap-3 bg-white rounded-2xl px-5 py-4 ring-1 ring-brass/10 shadow-sm transition-all duration-700 ease-premium hover:ring-brass/30 hover:-translate-y-0.5 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}
                style={{ transitionDelay: `${idx * 120 + 80}ms` }}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brass/15 text-brass flex items-center justify-center mt-0.5">
                  <Check size={14} />
                </span>
                <p className="text-base sm:text-lg text-graphite font-medium leading-relaxed">
                  {pair.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 ease-premium delay-300 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-graphite/90 tracking-wide">
            Сначала попробуйте. <span className="font-bold text-brass">Потом решайте.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
