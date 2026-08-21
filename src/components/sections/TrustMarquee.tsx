const items = [
  'Yamaha и Casio',
  'Без скрытых платежей',
  'Проверяем каждый инструмент лично',
  'Меняем модель в любое время',
  'Доставка по Уфе',
  'Гибкие условия аренды',
];

// Бегущая строка с фактами о сервисе — лёгкое движение без необходимости
// в дополнительных фотографиях.
export default function TrustMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative py-8 bg-graphite overflow-hidden">
      <div className="flex w-max animate-marquee">
        {loop.map((item, idx) => (
          <div key={idx} className="flex items-center flex-shrink-0 px-6 sm:px-8">
            <span className="text-lg sm:text-xl font-heading font-medium text-white/80 whitespace-nowrap">
              {item}
            </span>
            <span className="ml-6 sm:ml-8 w-1.5 h-1.5 rounded-full bg-brass flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Мягкое затухание по краям, чтобы бег строки не обрывался резко */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-graphite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-graphite to-transparent" />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
}
