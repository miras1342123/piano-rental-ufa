import { useRef, useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import SectionHeading from '../ui/SectionHeading';
import ImageLightbox from '../ui/ImageLightbox';

interface GalleryPhoto {
  src: string;
  alt: string;
  tall?: boolean;
}

const photos: GalleryPhoto[] = [
  { src: '/images/Yamaha%20p35b(4).jpg', alt: 'Yamaha P-35B крупным планом', tall: true },
  { src: '/images/Casio%20cdp%20s110bk(3).jpg', alt: 'Casio CDP-S110 чёрный' },
  { src: '/images/Casio%20cdp%20s110we(2).jpg', alt: 'Casio CDP-S110 белый' },
  { src: '/images/stand.jpg', alt: 'Складная стойка для пианино' },
  { src: '/images/Yamaha%20p45b.jpg', alt: 'Yamaha P-45B', tall: true },
  { src: '/images/Casio%20cdp%20s110bk(5).jpg', alt: 'Casio CDP-S110 в интерьере' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Как это выглядит вживую"
          subtitle="Реальные фото инструментов, которые мы выдаём в аренду"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-12">
          {photos.map((photo, idx) => (
            <button
              key={photo.src}
              onClick={() => setActive(photo)}
              className={`group relative rounded-2xl overflow-hidden bg-graphite/5 ring-1 ring-graphite/5 hover:ring-brass/30 shadow-sm hover:shadow-xl hover:shadow-graphite/10 transition-all duration-500 ease-premium ${
                photo.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              } ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = 'none';
                  const parent = img.parentElement!;
                  const fallback = document.createElement('div');
                  fallback.className =
                    'w-full h-full flex items-center justify-center text-graphite/30 text-3xl';
                  fallback.textContent = '🎹';
                  parent.appendChild(fallback);
                }}
              />
              <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={22}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <ImageLightbox
          src={active.src}
          alt={active.alt}
          caption={active.alt}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
