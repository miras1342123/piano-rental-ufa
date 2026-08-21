import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const update = () => {
      setMatches(media.matches);
    };

    // Устанавливаем начальное значение
    update();

    // Добавляем слушатель
    media.addEventListener('change', update);

    // Очищаем при размонтировании
    return () => {
      media.removeEventListener('change', update);
    };
  }, [query]);

  return matches;
}