/**
 * Конфигурация галереи.
 *
 * Как добавить фото:
 *   1. Положите файлы (.jpg / .png / .webp / .avif) в public/gallery/.
 *   2. Перезапустите `npm run dev` (или выполните `npm run assets`).
 *   Все найденные файлы появятся в галерее автоматически (сортировка по имени: 01.jpg, 02.jpg…).
 *
 * Здесь можно задать порядок и подписи (alt) для конкретных файлов.
 * Файлы, которых нет в папке, просто не отображаются — сломанных картинок не будет.
 */
export type GalleryEntry = {
  /** Путь от корня public, например "/gallery/01.jpg" */
  src: string;
  alt?: { ru: string; kz: string };
};

export const galleryConfig: GalleryEntry[] = [
  { src: "/gallery/01-facade.jpeg", alt: { ru: "Наш детский сад", kz: "Біздің балабақша" } },
  { src: "/gallery/02-hall.jpeg", alt: { ru: "Уютный холл", kz: "Жайлы холл" } },
  { src: "/gallery/03-tree-mural.jpeg", alt: { ru: "Сказочное дерево", kz: "Ертегі ағашы" } },
  { src: "/gallery/04-blue-bedroom.jpeg", alt: { ru: "Голубая спальня", kz: "Көгілдір жатын бөлме" } },
  { src: "/gallery/05-classroom.jpeg", alt: { ru: "Учимся играя", kz: "Ойнап үйренеміз" } },
  { src: "/gallery/06-festive-hall.jpeg", alt: { ru: "Праздничный зал", kz: "Мерекелік зал" } },
  { src: "/gallery/07-butterfly-stairs.jpeg", alt: { ru: "Лестница с бабочками", kz: "Көбелекті баспалдақ" } },
  { src: "/gallery/08-bedroom.jpeg", alt: { ru: "Спальня", kz: "Жатын бөлме" } },
  { src: "/gallery/09-group-room.jpeg", alt: { ru: "Групповая комната", kz: "Топ бөлмесі" } },
  { src: "/gallery/10-playroom.jpeg", alt: { ru: "Игровая комната", kz: "Ойын бөлмесі" } },
  { src: "/gallery/11-art-corner.jpeg", alt: { ru: "Уголок творчества", kz: "Шығармашылық бұрышы" } },
];

/** Сколько фото показывать сразу и сколько добавлять по кнопке «Показать больше». */
export const GALLERY_PAGE_SIZE = 8;
