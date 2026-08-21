import { useEffect, useRef } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { contacts } from '../../data/contacts';

const perks = [
  'Yamaha и Casio',
  'Аренда от 1 недели',
  'Самовывоз или доставка по Уфе',
  'Залог 2 000 ₽',
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-cream overflow-hidden"
    >
      {/* Декоративные градиентные пятна для глубины */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brass/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-graphite/5 rounded-full blur-3xl animate-float-slow-reverse" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4 reveal-item opacity-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight text-graphite">
              Аренда цифровых пианино
              <br />
              <span className="text-brass">в Уфе</span>
            </h1>
            <p className="text-lg sm:text-xl text-graphite/70 max-w-lg font-body">
              Попробуйте инструмент перед покупкой. Никаких обязательств – только музыка и комфорт.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 reveal-item opacity-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Выбрать пианино
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Send size={20} />}
              onClick={() => window.open(contacts.telegram, '_blank')}
            >
              Написать в Telegram
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 reveal-item opacity-0">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm text-graphite/80">
                <CheckCircle size={16} className="text-brass flex-shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

                <div className="order-1 lg:order-2 flex justify-center reveal-item opacity-0">
          <div className="relative w-full max-w-lg">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-graphite/10 to-brass/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-graphite/5">
              <img
                src="/images/Yamaha%20p35b(5).jpg"
                alt="Цифровое пианино"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement!;
                  const fallback = document.createElement('div');
                  fallback.className =
                    'w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-brass/20 text-graphite/40 font-heading text-2xl';
                  fallback.textContent = '🎹 Фото пианино';
                  parent.appendChild(fallback);
                }}
              />
            </div>

            {/* Небольшое фото-коллаж — деталь, добавляющая объём композиции */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-32 h-24 rounded-2xl overflow-hidden shadow-xl ring-4 ring-cream animate-float-slow-reverse">
              <img
                src="/images/Casio%20cdp%20s110we.jpg"
                alt="Casio CDP-S110"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Плавающая карточка-бейдж — живой акцент и доп. доверие */}
            <div className="absolute -top-5 -right-4 sm:-right-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 animate-float-slow ring-1 ring-graphite/5">
              <div className="w-9 h-9 rounded-full bg-brass/15 flex items-center justify-center text-brass font-heading font-bold text-sm">
                88
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-graphite">полноразмерных</p>
                <p className="text-xs text-graphite/50">клавиш с молоточками</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}