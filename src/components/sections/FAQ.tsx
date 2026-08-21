import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { faqItems } from '../../data/faq';
import SectionHeading from '../ui/SectionHeading';
import AccordionItem from '../ui/AccordionItem';

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="faq" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Часто задаваемые вопросы"
          subtitle="Ответы на главные вопросы об аренде"
        />

        <div
          className={`mt-12 divide-y divide-graphite/10 transition-all duration-700 ease-premium ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}