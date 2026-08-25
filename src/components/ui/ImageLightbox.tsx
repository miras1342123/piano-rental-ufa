import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, caption, onClose }: Props) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="review-lightbox fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center bg-graphite/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Отзыв от ${alt.replace(/^Отзыв от /, '')}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-3 top-3 z-[10001] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:right-6 sm:top-6"
        aria-label="Закрыть отзыв"
      >
        <X size={22} />
      </button>

      {/*
        Отзыв всегда вписывается целиком в окно браузера.
        Больше нет растянутого scroll-контейнера, который визуально
        приближал длинные скриншоты и обрезал их сверху/снизу.
      */}
      <figure
        className="review-lightbox-figure relative flex max-h-[calc(100dvh-96px)] max-w-[calc(100vw-24px)] flex-col items-center justify-center sm:max-h-[calc(100dvh-120px)] sm:max-w-[calc(100vw-48px)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="review-lightbox-image block max-h-[calc(100dvh-96px)] max-w-[calc(100vw-24px)] rounded-xl object-contain shadow-[0_30px_90px_rgba(0,0,0,.35)] sm:max-h-[calc(100dvh-120px)] sm:max-w-[calc(100vw-48px)] sm:rounded-2xl"
          onError={(e) => {
            e.currentTarget.classList.add('hidden');
          }}
        />
        {caption && (
          <figcaption className="mt-3 max-w-full text-center text-xs text-white/75 sm:mt-4 sm:text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body
  );
}
