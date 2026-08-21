import { useRef, useState } from 'react';
import { ZoomIn, Quote } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { reviews } from '../../data/reviews';
import type { Review } from '../../data/reviews';
import SectionHeading from '../ui/SectionHeading';
import ImageLightbox from '../ui/ImageLightbox';

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  // Если отзывов нет — показываем заглушку
  if (reviews.length === 0) {
    return (
      <section id="reviews" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Отзывы"
            subtitle="Скоро здесь появятся реальные истории наших клиентов"
          />
          <div className="mt-8 text-graphite/40 text-lg">👀 Пока нет отзывов, но вы можете стать первым!</div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Отзывы"
          subtitle="Реальные истории наших клиентов — нажмите на отзыв, чтобы увидеть его целиком"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, idx) => (
            <button
              key={review.id}
              onClick={() => review.avatar && setActiveReview(review)}
              className={`group relative text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-graphite/10 ring-1 ring-transparent hover:ring-brass/20 transition-all duration-500 ease-premium hover:-translate-y-1 ${
                review.avatar ? 'cursor-pointer' : 'cursor-default'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <Quote
                size={40}
                className="absolute top-4 right-4 text-brass/10 group-hover:text-brass/20 transition-colors duration-500"
              />

              {/* Аватарка и имя */}
              <div className="relative flex items-center gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover bg-graphite/5"
                      onError={(e) => {
                        // Если фото не загрузилось — показываем инициалы
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const parent = img.parentElement!;
                        if (parent.querySelector('.fallback-avatar')) return;
                        const fallback = document.createElement('div');
                        fallback.className =
                          'fallback-avatar w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center text-brass font-heading font-semibold text-lg';
                        fallback.textContent = review.name.charAt(0);
                        parent.appendChild(fallback);
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center text-brass font-heading font-semibold text-lg">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  {review.avatar && (
                    <div className="absolute inset-0 rounded-full bg-graphite/0 group-hover:bg-graphite/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ZoomIn size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-graphite">{review.name}</p>
                  {review.model && (
                    <p className="text-sm text-graphite/50">{review.model}</p>
                  )}
                </div>
              </div>

              {/* Текст отзыва */}
              <p className="relative text-graphite/80 leading-relaxed">&ldquo;{review.text}&rdquo;</p>

              {review.avatar && (
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={14} />
                  Смотреть отзыв целиком
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeReview && activeReview.avatar && (
        <ImageLightbox
          src={activeReview.avatar}
          alt={`Отзыв от ${activeReview.name}`}
          caption={`${activeReview.name}${activeReview.model ? ` · ${activeReview.model}` : ''}`}
          onClose={() => setActiveReview(null)}
        />
      )}
    </section>
  );
}
