import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { advantages } from '../../data/advantages';
import SectionHeading from '../ui/SectionHeading';

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="advantages" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Почему выбирают нас"
          subtitle="Мы любим своё дело и отвечаем за каждый инструмент"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {advantages.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-6 shadow-sm ring-1 ring-transparent hover:ring-brass/20 hover:shadow-xl hover:shadow-graphite/5 hover:-translate-y-1 transition-all duration-500 ease-premium ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-xl font-heading font-semibold text-graphite">{item.title}</h3>
              <p className="mt-2 text-sm text-graphite/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}