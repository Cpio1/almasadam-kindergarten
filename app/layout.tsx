import type { Metadata, Viewport } from "next";
import { Nunito, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import { assets } from "@/lib/assets";
import { STORAGE_KEY } from "@/lib/storage-key";
import "./globals.css";

// cyrillic-ext содержит казахские буквы: ә і ң ғ ү ұ қ ө һ
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "ALMASADAM — Частный детский сад в Алматы";
const description =
  "ALMASADAM — частный детский сад в Алматы по адресу Рудаки, 95. Русский язык обучения, дополнительное изучение казахского и английского, пятиразовое питание.";

const ogImage = assets.ogImage ?? assets.heroPoster ?? assets.logo;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: "ALMASADAM",
  keywords: [
    "детский сад Алматы",
    "частный детский сад",
    "ALMASADAM",
    "детский сад Рудаки",
    "балабақша Алматы",
    "жекеменшік балабақша",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ALMASADAM",
    title,
    description,
    locale: "ru_RU",
    alternateLocale: ["kk_KZ"],
    ...(ogImage
      ? { images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: "ALMASADAM" }] }
      : {}),
  },
  twitter: {
    card: ogImage ? "summary_large_image" : "summary",
    title,
    description,
  },
  formatDetection: { telephone: true, address: false, email: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFCF5",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ChildCare", "Preschool"],
  name: "ALMASADAM",
  alternateName: "Частный детский сад ALMASADAM",
  description,
  url: site.url,
  telephone: "+77002045050",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Рудаки, 95",
    addressLocality: "Алматы",
    addressCountry: "KZ",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  sameAs: [site.instagramUrl],
  ...(assets.logo ? { logo: new URL(assets.logo.src, site.url).toString() } : {}),
};

/**
 * Если пользователь ранее выбрал казахский — скрываем контент до гидратации,
 * чтобы не мелькал русский текст. Страховка: снимаем через 1.5 с в любом случае.
 */
const langScript = `try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})==="kz"){var d=document.documentElement;d.classList.add("i18n-pending");d.lang="kk";setTimeout(function(){d.classList.remove("i18n-pending")},1500)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
