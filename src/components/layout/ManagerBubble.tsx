import { useEffect, useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { contacts } from '../../data/contacts';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Ненавязчивый плавающий виджет "есть вопрос?" — появляется после того,
// как посетитель немного прокрутил сайт, и добавляет живости странице.
// Показывается только на десктопе — на мобильном для этого есть MobileStickyCTA.
export default function ManagerBubble() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) setHasScrolled(true);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isDesktop || !hasScrolled || isDismissed) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3"
      style={{ animation: 'bubbleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {isOpen && (
        <div
          className="relative w-72 bg-white rounded-2xl shadow-2xl shadow-graphite/20 ring-1 ring-graphite/5 p-5"
          style={{ animation: 'bubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-graphite/40 hover:text-graphite transition-colors"
            aria-label="Закрыть"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brass/15 flex items-center justify-center text-brass font-heading font-bold flex-shrink-0">
              PR
            </div>
            <div>
              <p className="text-sm font-semibold text-graphite">Есть вопрос?</p>
              <p className="text-xs text-graphite/50">Обычно отвечаем за пару минут</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-graphite/70 leading-relaxed">
            Подскажем, какая модель подойдёт именно вам — просто напишите нам.
          </p>
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-4 w-full inline-flex items-center justify-center gap-2 bg-brass text-white text-sm font-medium rounded-full px-4 py-2.5 hover:bg-brass/95 transition-colors"
          >
            <Send size={16} />
            Написать в Telegram
          </a>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="relative w-14 h-14 rounded-full bg-brass text-white shadow-xl shadow-brass/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300"
          aria-label="Задать вопрос менеджеру"
        >
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-brass animate-ping opacity-40" />
          )}
          <MessageCircle size={24} className="relative" />
        </button>
        {!isOpen && (
          <button
            onClick={() => setIsDismissed(true)}
            className="text-xs text-graphite/40 hover:text-graphite/70 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm transition-colors"
          >
            скрыть
          </button>
        )}
      </div>

      <style>{`
        @keyframes bubbleIn {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
