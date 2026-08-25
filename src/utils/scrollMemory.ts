// Простое хранилище позиции прокрутки в памяти — нужно, чтобы после
// закрытия карточки "Подробнее" вернуть пользователя туда же, где он был,
// а не перекидывать его в начало каталога.
let savedScrollY: number | null = null;

export function rememberScroll() {
  savedScrollY = window.scrollY;
}

export function restoreScroll(): number | null {
  const y = savedScrollY;
  savedScrollY = null;
  return y;
}
