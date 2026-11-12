# ALMASADAM — сайт частного детского сада

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.
Одностраничный сайт с переключением RU / KZ, готов к деплою на Vercel.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
npm run start
npm run lint
npm run typecheck
```

## Как добавлять файлы (видео, логотип, маскот, фото)

Сайт сам проверяет, какие файлы лежат в `public/` (скрипт `scripts/check-assets.mjs`
запускается перед `dev` и `build`). Пока файла нет — показывается фирменная заглушка,
без сломанных картинок и запросов с 404. **После добавления файлов перезапустите
`npm run dev` или выполните `npm run assets`.**

| Что | Куда положить |
|---|---|
| Логотип | `public/images/logo.png` (или `.webp`) |
| Видео первого экрана | `public/videos/almasadam-hero.mp4` (или `.webm`) |
| Постер видео | `public/images/hero-poster.jpg` |
| Картинка для соцсетей (OG) | `public/images/og-image.jpg` (1200×630) |
| Фото «О нас» | `public/images/about-1.jpg`, `about-2.jpg` |
| Маскот Әлем | `public/mascot/adam-welcome.png`, `adam-about`, `adam-reading`, `adam-languages`, `adam-food`, `adam-news`, `adam-contact` (`.png` или `.webp`, прозрачный фон) |
| Галерея | любые `.jpg/.png/.webp/.avif` в `public/gallery/` — появятся автоматически |
| Иконка вкладки | замените `app/icon.svg` (сейчас временная нейтральная) на `app/icon.png` из фирменных файлов |

Видео: без звука, автозапуск, по кругу, `playsInline` (iPhone), без элементов управления
(есть только маленькая кнопка паузы). Рамка принимает реальные пропорции ролика — видео не обрезается.

## Где редактировать данные

- **Все тексты** — `locales/ru.ts` и `locales/kz.ts` (структура общая, TypeScript не даст пропустить перевод).
- **Контакты, ссылки, WhatsApp** — `lib/site.ts`.
- **Направления (программы)** — `data/programs.ts` (предварительные категории; удалите/добавьте объект, тексты — в `locales → programs.items`).
- **Приёмы пищи** — `data/meals.ts`, названия — `locales → food.meals`.
- **Новости** — `data/news.ts` (пока пусто → показывается аккуратное пустое состояние; пример формата в комментарии).
- **Порядок и подписи фото галереи** — `data/gallery.ts`.

## Деплой на Vercel

Импортируйте репозиторий в Vercel — настройки по умолчанию подходят.
Когда появится свой домен, задайте переменную окружения `NEXT_PUBLIC_SITE_URL`
(например `https://almasadam.kz`) — она используется в canonical, Open Graph, sitemap и robots.

## Структура

```
app/                 layout (SEO, шрифты, JSON-LD), page, robots, sitemap, icon
components/
  layout/            Header, Footer, LangSwitch, FloatingActions (WhatsApp + помощник Әлем)
  desktop/           DesktopNav, ProgramsDesktop — отдельные десктопные композиции
  mobile/            MobileMenu, ProgramsMobile — отдельные мобильные композиции
  hero/              HeroVideo, HeroVideoPlaceholder
  sections/          Hero, About, Programs, Languages, Food, Gallery, News, Contacts
  gallery/           Lightbox (свайпы, стрелки, Escape, клик по фону)
  ui/                Mascot, Logo, PhotoSlot, Decor, Reveal, SectionHeading
data/                редактируемые списки
locales/             ru.ts, kz.ts
lib/                 i18n, site, assets (+ сгенерированный манифест), hooks
```
