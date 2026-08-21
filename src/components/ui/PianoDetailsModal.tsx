import { useEffect, useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Send, Phone } from 'lucide-react';
import type { Piano } from '../../data/pianos';
import { contacts } from '../../data/contacts';
import Button from './Button';

interface Props {
  piano: Piano;
  isOpen: boolean;
  onClose: () => void;
}

export default function PianoDetailsModal({ piano, isOpen, onClose }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const { name, positioning, fullDescription, specs, prices, image } = piano;
  const gallery = piano.images && piano.images.length > 0 ? piano.images : [image];

  // Сбрасываем галерею при открытии новой карточки
  useEffect(() => {
    if (isOpen) setActiveImage(0);
  }, [isOpen, piano.id]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, gallery.length]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-graphite/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div
        className="relative bg-white w-full sm:max-w-3xl sm:w-full h-[92vh] sm:h-auto sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ animation: 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Верхняя панель: понятный возврат назад + закрытие */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-graphite/10 bg-white/95 backdrop-blur-sm z-10">
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
            className="p-2 rounded-full hover:bg-graphite/5 text-graphite/60 hover:text-graphite transition-colors"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>
        </div>

        {/* Прокручиваемое содержимое */}
        <div className="flex-1 overflow-y-auto">
          {/* Галерея */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-cream">
            <img
              key={gallery[activeImage]}
              src={gallery[activeImage]}
              alt={name}
              className="w-full h-full object-cover"
              style={{ animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onError={handleImgError}
            />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft size={20} className="text-graphite" />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105"
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
              </>
            )}
          </div>

          <div className="p-6 space-y-6">
            <div className="sm:hidden">
              <h2 className="text-2xl font-heading font-bold text-graphite">{name}</h2>
            </div>

            <p className="text-lg text-graphite/80">{positioning}</p>

            {/* Стоимость аренды — сразу на видном месте */}
            <div className="bg-cream rounded-2xl p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite/50 mb-3">
                Стоимость аренды
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {prices.map((p) => (
                  <div key={p.period} className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-brass">{p.price} ₽</p>
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
                    className="flex justify-between gap-3 bg-graphite/[0.03] rounded-lg px-3 py-2.5"
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
          </div>
        </div>

        {/* Закреплённая нижняя панель с действиями */}
        <div className="flex-shrink-0 flex flex-wrap gap-3 p-4 sm:p-5 border-t border-graphite/10 bg-white">
          <Button
            variant="primary"
            size="lg"
            className="flex-1 min-w-[160px]"
            icon={<Send size={18} />}
            onClick={() => window.open(contacts.telegram, '_blank')}
          >
            Написать в Telegram
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
        @keyframes modalIn {
          from { transform: translateY(24px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @media (min-width: 640px) {
          @keyframes modalIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}
