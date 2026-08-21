import { useEffect, useRef, useState } from 'react';
import { Images } from 'lucide-react';
import type { Piano } from '../../data/pianos';
import { contacts } from '../../data/contacts';
import Button from './Button';

interface PianoCardProps {
  piano: Piano;
  featured?: boolean;
}

export default function PianoCard({ piano, featured = false }: PianoCardProps) {
  const { name, description, positioning, specs, prices, image, slug } = piano;
  const gallery = piano.images && piano.images.length > 1 ? piano.images : null;

  const [hoverImage, setHoverImage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = () => {
    if (!gallery) return;
    intervalRef.current = setInterval(() => {
      setHoverImage((i) => (i + 1) % gallery.length);
    }, 900);
  };

  const stopCycling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setHoverImage(0);
  };

  useEffect(() => () => stopCycling(), []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const parent = img.parentElement!;
    const fallback = document.createElement('div');
    fallback.className =
      'w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-brass/10 text-graphite/40 font-heading text-lg';
    fallback.textContent = '🎹';
    parent.appendChild(fallback);
  };

  const openDetails = () => {
    window.location.hash = `piano/${slug}`;
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-graphite/10 ring-1 ring-graphite/5 hover:ring-brass/30 transition-all duration-500 ease-premium overflow-hidden hover:-translate-y-1 ${
        featured ? 'md:flex md:items-stretch' : ''
      }`}
    >
      {featured && (
        <span className="absolute top-4 left-4 z-10 bg-brass text-white text-xs font-semibold tracking-wide px-3 py-1 rounded-full shadow-sm">
          Популярный выбор
        </span>
      )}

      <div
        className={`relative overflow-hidden bg-cream cursor-pointer ${
          featured ? 'md:w-2/5 md:flex-shrink-0' : 'w-full aspect-[4/3]'
        }`}
        onClick={openDetails}
        onMouseEnter={startCycling}
        onMouseLeave={stopCycling}
      >
        <img
          key={gallery ? gallery[hoverImage] : image}
          src={gallery ? gallery[hoverImage] : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
          style={{ animation: 'cardFade 0.3s ease-out' }}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {gallery && (
          <>
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-graphite/50 backdrop-blur-sm text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Images size={12} />
              {gallery.length} фото
            </span>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {gallery.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === hoverImage ? 'w-4 bg-brass' : 'w-1 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={`p-6 flex flex-col ${featured ? 'md:w-3/5' : ''}`}>
        <h3 className="text-2xl font-heading font-bold text-graphite">{name}</h3>
        <p className="mt-1 text-sm text-graphite/60">{positioning}</p>
        <p className="mt-3 text-graphite/80 leading-relaxed">{description}</p>

        <ul className="mt-4 space-y-1 text-sm text-graphite/70">
          {specs.slice(0, 3).map((spec) => (
            <li key={spec.label} className="flex justify-between border-b border-graphite/5 py-1">
              <span className="font-medium">{spec.label}</span>
              <span>{spec.value}</span>
            </li>
          ))}
          {specs.length > 3 && (
            <li className="text-brass text-xs font-medium">+ ещё {specs.length - 3}</li>
          )}
        </ul>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-brass">
            от {Math.min(...prices.map((p) => p.price))} ₽
          </span>
          <span className="text-xs text-graphite/50">/ неделя</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary" size="sm" onClick={openDetails}>
            Подробнее
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(contacts.telegram, '_blank')}
          >
            Написать нам
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes cardFade {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
