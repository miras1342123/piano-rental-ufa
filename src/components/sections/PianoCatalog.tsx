import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { pianos } from '../../data/pianos';
import PianoCard from '../ui/PianoCard';

export default function PianoCatalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const featured = pianos.find((p) => p.featured);
  const others = pianos.filter((p) => !p.featured);

  return (
    <section
      id="catalog"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-cream"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-graphite leading-tight tracking-tight transition-all duration-700 ease-premium ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Пианино <span className="text-brass">в наличии</span>
          </h2>
          <p
            className={`mt-4 text-lg text-graphite/70 transition-all duration-700 ease-premium delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Выберите инструмент под свои задачи и бюджет.
          </p>
        </div>

        {featured && (
          <div
            className={`mb-16 transition-all duration-700 ease-premium delay-150 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <PianoCard piano={featured} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((piano, idx) => (
            <div
              key={piano.id}
              className={`transition-all duration-700 ease-premium ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + idx * 100}ms` }}
            >
              <PianoCard piano={piano} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}