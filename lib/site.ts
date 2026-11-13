/** Подтверждённые данные детского сада. Меняйте только здесь. */
export const site = {
  name: "ALMASADAM",
  // Задайте NEXT_PUBLIC_SITE_URL в Vercel, когда появится собственный домен.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  phone: "+7 700 204 50 50",
  phoneHref: "tel:+77002045050",
  whatsappNumber: "77002045050",
  instagramHandle: "@almasadam.sad",
  instagramUrl: "https://www.instagram.com/almasadam.sad/",
  /**
   * 2ГИС — проверенная карточка организации «Almasadam» (частный детский сад),
   * ул. Рудаки, 95, Турксибский район, Алматы; телефон в карточке совпадает с site.phone.
   * Координаты взяты из этой же карточки 2ГИС.
   * Ссылка https://2gis.kz/… на телефоне открывает приложение 2ГИС (если установлено), иначе — веб-версию.
   */
  twoGis: {
    firmId: "70000001018142693",
    url: "https://2gis.kz/almaty/firm/70000001018142693",
    lat: 43.306922,
    lon: 76.936615,
  },
  hours: { opens: "08:00", closes: "19:00" },
} as const;

/** Встраиваемая карта 2ГИС (официальный виджет «Организации на карте») с точкой ALMASADAM */
export const twoGisWidgetUrl =
  "https://widgets.2gis.com/widget?type=firmsonmap&options=" +
  encodeURIComponent(
    JSON.stringify({
      pos: { lat: site.twoGis.lat, lon: site.twoGis.lon, zoom: 16 },
      opt: { city: "almaty" },
      org: site.twoGis.firmId,
    }),
  );

/** Ссылка WhatsApp с заранее заполненным сообщением (URL-кодирование). */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Порядок и якоря разделов (Header, мобильное меню, футер). Подписи — в locales/*.ts → nav.
 * "top" — первый экран (Главная). Изучение языков — часть раздела "programs".
 * "teachers" — «Наши педагоги» (между программами и питанием).
 */
export const sections = [
  "top",
  "about",
  "programs",
  "teachers",
  "food",
  "gallery",
  "news",
  "documents",
  "contacts",
] as const;

export type SectionId = (typeof sections)[number];
