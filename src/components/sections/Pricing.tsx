import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { pricingData, additionalTerms } from '../../data/pricing';
import SectionHeading from '../ui/SectionHeading';

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="prices" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Цены на аренду"
          subtitle="Прозрачные тарифы без скрытых платежей"
        />

        <div
          className={`overflow-x-auto transition-all duration-700 ease-premium ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-graphite/10">
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-graphite/50 whitespace-nowrap">Модель</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-graphite/50 text-right whitespace-nowrap">1 неделя</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-graphite/50 text-right whitespace-nowrap">2 недели</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-graphite/50 text-right whitespace-nowrap">Месяц</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item) => (
                <tr key={item.name} className="border-b border-graphite/5 hover:bg-brass/5 transition-colors duration-300">
                  <td className="py-4 px-4 font-medium text-graphite whitespace-nowrap">{item.name}</td>
                  {item.prices.map((p) => (
                    <td key={p.period} className="py-4 px-4 text-right text-graphite/80 whitespace-nowrap">
                      {p.price} ₽
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-700 ease-premium delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {additionalTerms.map((term) => (
            <div key={term} className="flex items-center gap-3 text-sm text-graphite/70 bg-cream/50 hover:bg-cream px-4 py-3 rounded-full transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brass flex-shrink-0" />
              {term}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}