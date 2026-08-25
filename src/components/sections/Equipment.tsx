import { useRef } from 'react';
import { CircleCheck, CircleX } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { equipmentItems } from '../../data/equipment';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';

export default function Equipment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="equipment" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Что входит в комплект"
          subtitle="Всё необходимое для комфортных занятий"
        />

        <p className="mt-6 max-w-2xl mx-auto text-center text-graphite/70 leading-relaxed">
          Вместе с пианино вы получаете педаль, пюпитр, провод питания и подставку —
          она бывает двух видов, выбирайте, какая удобнее:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {equipmentItems.map((item, idx) => (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl shadow-sm ring-1 ring-transparent hover:ring-brass/20 hover:shadow-xl hover:shadow-graphite/5 overflow-hidden transition-all duration-700 ease-premium ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-graphite/5 to-brass/5 flex items-center justify-center overflow-hidden p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 ease-premium group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const parent = img.parentElement!;
                    const fallback = document.createElement('div');
                    fallback.className =
                      'w-full h-full flex items-center justify-center text-graphite/30 text-lg';
                    fallback.textContent = '🖼️ ' + item.name;
                    parent.appendChild(fallback);
                  }}
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-heading font-bold text-graphite">{item.name}</h3>
                  <Badge variant="primary">{item.type}</Badge>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm font-medium text-graphite/70"><CircleCheck size={17} className="text-brass" /> Плюсы</li>
                  {item.pros.map((pro) => (
                    <li key={pro} className="text-sm text-graphite/80 flex items-start gap-2">
                      <CircleCheck size={16} className="mt-0.5 shrink-0 text-brass" /> {pro}
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-sm font-medium text-graphite/70"><CircleX size={17} className="text-graphite/45" /> Минусы</li>
                  {item.cons.map((con) => (
                    <li key={con} className="text-sm text-graphite/60 flex items-start gap-2">
                      <CircleX size={16} className="mt-0.5 shrink-0 text-graphite/35" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}