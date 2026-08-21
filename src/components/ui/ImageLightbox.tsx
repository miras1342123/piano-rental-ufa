import { useEffect } from 'react';
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
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-graphite/80 backdrop-blur-md"
      onClick={handleBackdropClick}
      style={{ animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        aria-label="Закрыть"
      >
        <X size={22} />
      </button>

      <div
        className="max-w-3xl w-full flex flex-col items-center"
        style={{ animation: 'modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {caption && (
          <p className="mt-4 text-white/80 text-sm sm:text-base text-center">{caption}</p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { transform: scale(0.94); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
