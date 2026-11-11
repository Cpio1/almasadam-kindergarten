/**
 * Новости и мероприятия.
 * Пока массив пуст — на сайте показывается аккуратное пустое состояние.
 *
 * Пример добавления новости:
 * {
 *   id: "autumn-fair",
 *   date: "2026-10-15",                     // ISO-дата
 *   image: "/images/news/autumn-fair.jpg",  // необязательно; файл должен существовать в public/
 *   title: { ru: "Осенняя ярмарка", kz: "Күзгі жәрмеңке" },
 *   excerpt: { ru: "Короткое описание…", kz: "Қысқаша сипаттама…" },
 *   body: { ru: "Полный текст…", kz: "Толық мәтін…" }, // показывается по кнопке «Подробнее»
 * }
 */
export type NewsItem = {
  id: string;
  date: string;
  image?: string;
  title: { ru: string; kz: string };
  excerpt: { ru: string; kz: string };
  body?: { ru: string; kz: string };
};

export const news: NewsItem[] = [];
