import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { steps } from '../../data/steps';
import SectionHeading from '../ui/SectionHeading';

export default function RentalSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Как арендовать"
          subtitle="Шесть простых шагов к вашему инструменту"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`group relative transition-all duration-700 ease-premium ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center text-brass font-heading font-bold text-xl transition-all duration-300 group-hover:bg-brass group-hover:text-white group-hover:scale-110">
                  {step.id}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-graphite">{step.title}</h3>
                  <p className="mt-1 text-sm text-graphite/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}