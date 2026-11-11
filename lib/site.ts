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
  // Поиск по точному адресу — без подстановки координат.
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Алматы, улица Рудаки, 95"),
  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Алматы, улица Рудаки, 95") +
    "&z=16&output=embed",
  hours: { opens: "08:00", closes: "19:00" },
} as const;

/** Ссылка WhatsApp с заранее заполненным сообщением (URL-кодирование). */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Порядок и якоря разделов. Подписи — в locales/*.ts → nav. */
export const sections = [
  "about",
  "programs",
  "languages",
  "food",
  "gallery",
  "news",
  "contacts",
] as const;

export type SectionId = (typeof sections)[number];
