import { useEffect, useState } from 'react';

// Тонкая полоска прогресса прокрутки вверху экрана — ненавязчивый премиальный
// штрих движения, который есть почти незаметно, но ощущается на всём сайте.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[80] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brass/60 via-brass to-brass/80"
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  );
}
