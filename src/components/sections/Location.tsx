import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { contacts } from '../../data/contacts';
import SectionHeading from '../ui/SectionHeading';
import { MapPin, Phone, Send } from 'lucide-react';

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="contacts" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Где мы находимся"
          subtitle="Приезжайте посмотреть инструменты или закажите доставку"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Карта */}
          <div
            className={`rounded-2xl overflow-hidden shadow-md bg-graphite/5 aspect-[4/3] transition-all duration-700 ease-premium ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=55.960039%2C54.745285&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=55.959419%2C54.745307&whatshere%5Bzoom%5D=17&z=19.51"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              title="Карта – адрес самовывоза"
            />
          </div>

          {/* Контактная информация */}
          <div
            className={`space-y-6 transition-all duration-700 ease-premium delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-brass flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-graphite">Адрес самовывоза</h3>
                <p className="text-graphite/70">{contacts.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={24} className="text-brass flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-graphite">Телефон</h3>
                <a href={`tel:${contacts.phone}`} className="text-graphite/70 hover:text-brass transition-colors">
                  {contacts.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Send size={24} className="text-brass flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-graphite">Мессенджеры</h3>
                <div className="flex gap-3 mt-2">
                  {contacts.telegram && (
                    <a
                      href={contacts.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-graphite/5 text-graphite/70 hover:bg-brass hover:text-white transition-all duration-300 ease-premium text-sm font-medium"
                    >
                      Telegram
                    </a>
                  )}
                  {contacts.whatsapp && (
                    <a
                      href={contacts.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-graphite/5 text-graphite/70 hover:bg-brass hover:text-white transition-all duration-300 ease-premium text-sm font-medium"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}