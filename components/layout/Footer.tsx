"use client";

import { MapPin, Phone, Clock3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { sections, site, whatsappLink } from "@/lib/site";
import { scrollToSection } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Wave } from "@/components/ui/Decor";
import { Moon, StarField } from "@/components/ui/Shapes";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="section-clip relative bg-milk text-white">
      <Wave fill="#302079" />
      <div className="relative bg-violet">
        {/* подвал — «ночное небо»: месяц и звёздочки */}
        <Moon className="absolute right-4 top-6 w-12 animate-sway [--r:-10deg] sm:right-[6%] sm:w-14 lg:bottom-24 lg:right-[4%] lg:top-auto lg:w-16" />
        <StarField className="absolute right-16 top-4 hidden w-16 min-[400px]:block sm:w-24 animate-twinkle opacity-80 sm:right-[14%] lg:bottom-28 lg:right-[10%] lg:top-auto lg:w-28" />

        <div className="container-site grid gap-10 pb-10 pt-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr] lg:gap-12 lg:pb-10 lg:pt-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="inline-flex rounded-[20px] bg-white px-4 py-3">
              <Logo className="h-10" />
            </span>
            <p className="mt-5 font-display text-lg font-extrabold">{t.footer.name}</p>
            <p className="mt-2 max-w-md text-[0.97rem] text-white/75">{t.footer.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(t.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa !min-h-12"
              >
                <WhatsAppIcon className="size-5" />
                {t.common.writeWhatsapp}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagramHandle}`}
                className="grid size-12 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.quickLinks}>
            <h2 className="font-display text-base font-extrabold !text-sun">{t.footer.quickLinks}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-white"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-extrabold !text-sun">{t.footer.contacts}</h2>
            <ul className="mt-4 grid gap-3 text-white/85">
              <li>
                <a href={site.phoneHref} className="flex min-h-10 items-center gap-3 font-display text-lg font-extrabold text-white hover:text-sun">
                  <Phone className="size-5 shrink-0 text-sun" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden="true" />
                  {t.contacts.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden="true" />
                {t.contacts.hours}
              </li>
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                  <InstagramIcon className="size-5 shrink-0 text-sun" />
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-site flex flex-col gap-2 py-5 pb-[calc(96px+var(--safe-bottom))] text-sm text-white/60 sm:flex-row sm:justify-between lg:pb-6">
            <p>
              © <span suppressHydrationWarning>{year}</span> ALMASADAM. {t.footer.rights}
            </p>
            <p>{t.contacts.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
