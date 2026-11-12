"use client";

import type { ComponentType } from "react";
import { MapPin, Phone, Clock3, Map as MapIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Bunting, Pencil } from "@/components/ui/Fun";
import { Bloom, Organic, Swirl, Tulip } from "@/components/ui/Shapes";

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
    <section id="contacts" aria-labelledby="contacts-title" className="section-clip relative bg-milk">
      {/* «Контакты» — тема праздника-встречи: гирлянда флажков, карандаш, цветы */}
      <Bunting className="absolute right-0 top-0 h-9 w-[52%] sm:h-10 sm:w-[44%] lg:h-12 lg:w-[38%]" count={7} />
      <Tulip className="absolute -left-1 bottom-10 hidden w-11 origin-bottom animate-sway xl:block" color="#7B5CE0" />
      <div className="container-site section-y !pt-8 lg:!pt-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-14">
          <div>
            <SectionHeading
              id="contacts-title"
              eyebrow={t.contacts.eyebrow}
              title={t.contacts.title}
              subtitle={t.contacts.subtitle}
              tone="leaf"
            />

            <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-6">
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

            <div className="relative mt-6 hidden w-fit pl-2 lg:block">
              <Organic className="absolute -bottom-2 left-[2%] w-[88%] -rotate-6" color="#DFF2C4" />
              <MascotFigure
                pose="contact"
                variant="calm"
                size="custom"
                delay={0.15}
                say={t.contacts.mascotSay}
                className="w-[clamp(176px,13vw,224px)]"
                sizes="230px"
              />
            </div>
          </div>

          <Reveal delay={0.05} className="relative">
            <Pencil className="absolute -top-9 right-4 z-10 w-28 rotate-[-10deg] animate-bob sm:w-32 lg:w-28" color="#E83A32" />
            <Bloom className="absolute -bottom-5 -left-3 z-10 w-12 animate-spin-slower sm:w-14" petals={["#FFE326", "#FF8A1F"]} center="#fff" />
            <Swirl className="absolute -bottom-10 -right-10 hidden w-32 animate-spin-rev opacity-60 sm:block" color="#CDECFB" dot="#80C924" />
            <div className="relative overflow-hidden rounded-[36px] bg-violet p-3 shadow-lift sm:p-4 lg:rounded-[40px_40px_14px_40px] lg:p-3.5">
              <ul className="grid gap-2.5 sm:gap-3 lg:gap-2.5">
                {rows.map(({ icon: Icon, label, value, href, tone, external }) => {
                  const content = (
                    <>
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl lg:size-11 lg:rounded-[14px] ${tone}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.82rem] font-bold uppercase tracking-wide text-ink-soft">
                          {label}
                        </span>
                        <span className="block break-words font-display text-[1.08rem] font-extrabold text-violet sm:text-[1.18rem] lg:text-[1.06rem]">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  const cls = "flex items-center gap-4 rounded-[24px] bg-white p-4 sm:p-5 lg:gap-3.5 lg:rounded-[20px] lg:px-4 lg:py-3";
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

          <div className="relative mx-auto w-fit pr-24 lg:hidden">
            <Organic className="absolute -bottom-2 left-[0%] w-[60%] -rotate-6" color="#DFF2C4" />
            <MascotFigure
              pose="contact"
              variant="calm"
              size="custom"
              say={t.contacts.mascotSay}
              className="w-[clamp(150px,42vw,184px)]"
              sizes="190px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
