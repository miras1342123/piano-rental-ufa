import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import { Phone, Send } from 'lucide-react';
import { contacts } from '../../data/contacts';

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-graphite text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ease-premium ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
            Готовы попробовать?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы поможем подобрать инструмент под ваши задачи.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<Phone size={20} />}
              onClick={() => window.location.href = `tel:${contacts.phone}`}
            >
              Позвонить
            </Button>
            {contacts.telegram && (
              <Button
                variant="outline"
                size="lg"
                icon={<Send size={20} />}
                onClick={() => window.open(contacts.telegram, '_blank')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Написать в Telegram
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}