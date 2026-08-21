export interface Review {
  id: string;
  name: string;
  text: string;
  model?: string;
  avatar?: string; // путь к фото клиента
  date?: string;   // опционально дата
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Анна',
    text: 'Взяли пианино для дочери, которая пошла в музыкальную школу. Очень удобно, что не пришлось сразу покупать дорогой инструмент. Дочка занимается с удовольствием!',
    model: 'Yamaha P-45B',
    avatar: '/images/reviews/review-1.jpg',
  },
  {
    id: '2',
    name: 'Михаил',
    text: 'Давно хотел научиться играть, но не был уверен, что хватит времени. Аренда — отличный вариант. Инструмент привезли, собрали, всё объяснили. Рекомендую!',
    model: 'Casio CDP-S110 BK',
    avatar: '/images/reviews/review-2.jpg',
  },
  {
    id: '3',
    name: 'Екатерина',
    text: 'Приехали в Уфу на несколько месяцев, не хотели прерывать занятия. Арендовали пианино, всё просто и быстро. Спасибо!',
    model: 'Yamaha P-35B',
    avatar: '/images/reviews/review-3.jpg',
  },
  {
    id: '4',
    name: 'Дмитрий',
    text: 'Пробовал разные модели, чтобы понять, что лучше. Мне заменили инструмент без проблем. Очень доволен сервисом.',
    model: 'Casio CDP-S110 WE',
    avatar: '/images/reviews/review-4.jpg',
  },
  {
    id: '5',
    name: 'Ольга',
    text: 'Сын занимается уже 2 месяца, продлили аренду. Цены адекватные, условия прозрачные. Спасибо!',
    model: 'Yamaha P-45B',
    avatar: '/images/reviews/review-5.jpg',
  },
  {
    id: '6',
    name: 'Алексей',
    text: 'Всё понравилось. Инструмент в идеальном состоянии, доставили вовремя. Буду рекомендовать друзьям.',
    model: 'Casio CDP-S110 BK',
    avatar: '/images/reviews/review-6.jpg',
  },
  {
    id: '7',
    name: 'Марина',
    text: 'Брала пианино на месяц, чтобы понять, стоит ли покупать. Очень удобно, что можно вернуть без проблем.',
    model: 'Yamaha P-35B',
    avatar: '/images/reviews/review-7.jpg',
  },
  {
    id: '8',
    name: 'Сергей',
    text: 'Отличный сервис! Помогли с выбором, всё рассказали. Инструмент приехал чистый, настроенный. 5 звёзд!',
    model: 'Casio CDP-S110 WE',
    avatar: '/images/reviews/review-8.jpg',
  },
  {
    id: '9',
    name: 'Ирина',
    text: 'Дочка в восторге! Аренда — отличное решение, чтобы не покупать кота в мешке. Обязательно продлим.',
    model: 'Yamaha P-45B',
    avatar: '/images/reviews/review-9.jpg',
  },
];