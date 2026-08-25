import { useEffect, useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, MessageCircle, Phone, Check } from 'lucide-react';
import type { Piano } from '../../data/pianos';
import { contacts } from '../../data/contacts';
import Button from './Button';

interface Props {
  piano: Piano;
  onClose: () => void;
}

// Полноэкранная страница модели — открывается как отдельная "страница",
// а не всплывающее окно поверх сайта. У неё собственный скролл,
// свой URL (#piano/slug) и кнопка "Назад" реально возвращает в каталог.
export default function PianoDetailsPage({ piano, onClose }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { name, positioning, fullDescription, specs, prices, image } = piano;
  const gallery = piano.images && piano.images.length > 0 ? piano.images : [image];

  useEffect(() => {
    setActiveImage(0);
    // лёгкая задержка кадра — чтобы сработала transition при монтировании
    const raf = requestAnimationFrame(() => setIsVisible(true));
    window.scrollTo(0, 0);
    return () => cancelAnimationFrame(raf);
  }, [piano.id]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener('keydown', handleKeydown);
    // Подстраховка от "утечки" скролла на iOS, хотя страница и так full-bleed
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, gallery.length]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const parent = img.parentElement!;
    if (parent.querySelector('.fallback-piano')) return;
    const fallback = document.createElement('div');
    fallback.className =
      'fallback-piano w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-brass/10 text-graphite/40 text-2xl';
    fallback.textContent = '🎹 Фото пианино';
    parent.appendChild(fallback);
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-cream flex flex-col"
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(24px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out',
      }}
    >
      {/* Верхняя панель — как навигация внутри приложения, а не крестик диалога */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-graphite/10 bg-cream/95 backdrop-blur-sm z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-graphite/70 hover:text-brass transition-colors px-2 py-1.5 -ml-2 rounded-full hover:bg-brass/5"
        >
          <ArrowLeft size={18} />
          Назад к каталогу
        </button>
        <h2 className="hidden sm:block text-lg font-heading font-bold text-graphite truncate max-w-[40%]">
          {name}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-graphite/10 text-graphite/60 hover:text-graphite transition-colors"
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>
      </div>

      {/* Прокручиваемое содержимое страницы */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Галерея — object-contain вместо object-cover, чтобы фото не обрезались
              и не растягивались "в приближение": показываем их как есть, в исходных пропорциях */}
          <div
            className="relative bg-cream sm:mt-6 sm:rounded-3xl overflow-hidden sm:shadow-xl sm:ring-1 sm:ring-graphite/5 flex items-center justify-center"
            style={{ minHeight: '320px', maxHeight: '70vh' }}
          >
            <img
              key={gallery[activeImage]}
              src={gallery[activeImage]}
              alt={name}
              className="max-w-full w-auto h-auto object-contain"
              style={{ maxHeight: '70vh', animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onError={handleImgError}
            />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft size={20} className="text-graphite" />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105"
                  aria-label="Следующее фото"
                >
                  <ChevronRight size={20} className="text-graphite" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeImage ? 'w-6 bg-brass' : 'w-1.5 bg-white/70 hover:bg-white'
                      }`}
                      aria-label={`Фото ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-graphite/60 backdrop-blur-sm text-white text-xs font-medium">
                  {activeImage + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          {/* Миниатюры галереи — на десктопе удобнее кликать, чем стрелки */}
          {gallery.length > 1 && (
            <div className="hidden sm:flex gap-2 mt-3 px-1">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 transition-all duration-300 ${
                    i === activeImage ? 'ring-brass' : 'ring-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 sm:px-1 sm:pt-8 space-y-8 pb-32 sm:pb-24">
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-bold text-graphite">{name}</h1>
              <p className="mt-2 text-lg text-graphite/70">{positioning}</p>
            </div>

            {/* Стоимость аренды — сразу на видном месте */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm ring-1 ring-graphite/5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite/50 mb-4">
                Стоимость аренды
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {prices.map((p, idx) => (
                  <div
                    key={p.period}
                    className={`text-center rounded-xl py-3 ${idx === 1 ? 'bg-brass/10' : ''}`}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-brass">{p.price} ₽</p>
                    <p className="text-xs text-graphite/60 mt-0.5">{p.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Характеристики */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite/50 mb-3">
                Характеристики
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-3 bg-white rounded-lg px-4 py-3 ring-1 ring-graphite/5"
                  >
                    <dt className="font-medium text-graphite/60">{spec.label}</dt>
                    <dd className="text-graphite/90 font-medium text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Полное описание */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite/50 mb-2">
                Описание
              </h3>
              <div className="text-graphite/80 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {fullDescription}
              </div>
            </div>

            {/* В комплекте — короткая напоминалка, чтобы страница не выглядела "голой" */}
            <div className="flex flex-wrap gap-2">
              {['Стойка', 'Пюпитр', 'Педаль', 'Разъём для наушников'].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-graphite/70 bg-white ring-1 ring-graphite/5 px-3 py-1.5 rounded-full"
                >
                  <Check size={13} className="text-brass" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Закреплённая нижняя панель с действиями */}
      <div className="flex-shrink-0 flex flex-wrap gap-3 p-4 sm:p-5 border-t border-graphite/10 bg-cream">
        <div className="max-w-5xl mx-auto w-full flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1 min-w-[160px]"
            icon={<MessageCircle size={18} />}
            onClick={() => window.open(contacts.max, '_blank')}
          >
            Написать в MAX
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon={<Phone size={18} />}
            onClick={() => (window.location.href = `tel:${contacts.phone}`)}
          >
            Позвонить
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
