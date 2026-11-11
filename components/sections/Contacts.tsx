"use client";

import type { ComponentType } from "react";
import { MapPin, Phone, Clock3, Map as MapIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mascot } from "@/components/ui/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Cube, Sparkle } from "@/components/ui/Decor";

const twoGisUrl = "https://2gis.kz/almaty/search/" + encodeURIComponent("Рудаки 95");

export function Contacts() {
  const { t } = useI18n();

  const rows: { icon: ComponentType<{ className?: string }>; label: string; value: string; href?: string; tone: string; external?: boolean }[] = [
    { icon: MapPin, label: t.contacts.addressLabel, value: t.contacts.address, href: site.mapUrl, tone: "bg-berry text-white", external: true },
    { icon: Phone, label: t.contacts.phoneLabel, value: site.phone, href: site.phoneHref, tone: "bg-sky text-white" },
    { icon: Clock3, label: t.contacts.hoursLabel, value: t.contacts.hours, tone: "bg-sun text-violet" },
    { icon: InstagramIcon, label: t.contacts.instagramLabel, value: site.instagramHandle, href: site.instagramUrl, tone: "bg-leaf text-white", external: true },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section-clip relative bg-white">
      <div className="container-site section-y !pt-8 lg:!pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="contacts-title"
              eyebrow={t.contacts.eyebrow}
              title={t.contacts.title}
              subtitle={t.contacts.subtitle}
              tone="leaf"
            />

            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsappLink(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <WhatsAppIcon className="size-5" />
                {t.contacts.whatsappBtn}
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <InstagramIcon className="size-5" />
                {t.contacts.instagramBtn}
              </a>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MapIcon className="size-5" aria-hidden="true" />
                {t.contacts.mapBtn}
              </a>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <Mascot pose="contact" say={t.contacts.mascotSay} className="w-[160px]" sizes="170px" />
            </Reveal>
          </div>

          <Reveal delay={0.05} className="relative">
            <Cube className="absolute -right-2 -top-6 z-10 w-14 animate-float [--r:12deg]" color="#FFE326" />
            <Sparkle className="absolute -left-3 bottom-10 z-10 w-6 animate-twinkle" color="#159FE2" />
            <div className="relative overflow-hidden rounded-[36px] bg-violet p-3 shadow-lift sm:p-4 lg:rounded-[48px_48px_16px_48px]">
              <ul className="grid gap-2.5 sm:gap-3">
                {rows.map(({ icon: Icon, label, value, href, tone, external }) => {
                  const content = (
                    <>
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.82rem] font-bold uppercase tracking-wide text-ink-soft">
                          {label}
                        </span>
                        <span className="block break-words font-display text-[1.08rem] font-extrabold text-violet sm:text-[1.18rem]">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  const cls = "flex items-center gap-4 rounded-[24px] bg-white p-4 sm:p-5";
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`${cls} transition-transform duration-200 hover:-translate-y-0.5`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={cls}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <a
                href={twoGisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-[20px] font-display text-[0.95rem] font-bold text-white/85 transition-colors hover:text-white"
              >
                <MapPin className="size-4" aria-hidden="true" />
                {t.contacts.map2gis}
              </a>
            </div>
          </Reveal>

          <div className="flex justify-center pr-24 lg:hidden">
            <Mascot pose="contact" say={t.contacts.mascotSay} className="w-[120px]" sizes="130px" />
          </div>
        </div>
      </div>
    </section>
  );
}
