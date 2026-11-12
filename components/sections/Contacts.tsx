"use client";

import type { ComponentType } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Clock3, MapPinned, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site, twoGisWidgetUrl, whatsappLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Bunting, Pencil } from "@/components/ui/Fun";
import { Bloom, Organic, Swirl, Tulip } from "@/components/ui/Shapes";
import { Sparkle } from "@/components/ui/Decor";

/**
 * Три фирменные кнопки связи.
 * Телефон: крупные «капсулы» друг под другом. Десктоп: три плитки одинаковой высоты в одном блоке.
 * Объём — цветная тень снизу; при нажатии кнопка «вдавливается».
 */
function ContactButtons() {
  const { t } = useI18n();
  const items: {
    href: string;
    label: string;
    Icon: ComponentType<{ className?: string }>;
    shell: string;
    bubble: string;
    arrow: string;
    shape: string;
  }[] = [
    {
      href: whatsappLink(t.waMessage),
      label: t.contacts.whatsappBtn,
      Icon: WhatsAppIcon,
      shell:
        "bg-[linear-gradient(140deg,#43E58A_0%,#1FB85A_48%,#128C4A_100%)] text-white shadow-[0_6px_0_#0b5c30,0_18px_28px_-14px_rgba(18,140,74,0.8)] active:shadow-[0_2px_0_#0b5c30]",
      bubble: "bg-white text-[#1FB85A]",
      arrow: "bg-white/20 text-white",
      shape: "rounded-[26px_44px_32px_44px] lg:rounded-[28px_40px_28px_40px]",
    },
    {
      href: site.instagramUrl,
      label: t.contacts.instagramBtn,
      Icon: InstagramIcon,
      shell:
        "bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_22%,#D62976_52%,#962FBF_78%,#4F5BD5_100%)] text-white shadow-[0_6px_0_#7a1f6b,0_18px_28px_-14px_rgba(150,47,191,0.75)] active:shadow-[0_2px_0_#7a1f6b]",
      bubble: "bg-white text-[#D62976]",
      arrow: "bg-white/20 text-white",
      shape: "rounded-[44px_26px_44px_32px] lg:rounded-[40px_28px_40px_28px]",
    },
    {
      href: site.twoGis.url,
      label: t.contacts.map2gis,
      Icon: MapPinned,
      shell:
        "bg-[linear-gradient(140deg,#FFF06A_0%,#FFE326_50%,#FFC93C_100%)] text-violet shadow-[0_6px_0_#d9a800,0_18px_28px_-14px_rgba(217,168,0,0.8)] active:shadow-[0_2px_0_#d9a800]",
      bubble: "bg-violet text-sun",
      arrow: "bg-violet/10 text-violet",
      shape: "rounded-[32px_44px_26px_44px] lg:rounded-[28px_40px_28px_40px]",
    },
  ];

  return (
    <div className="relative mt-8 lg:mt-6">
      {/* телефон: маленькие украшения у блока кнопок */}
      <Sparkle className="absolute -right-1 -top-4 w-5 animate-twinkle lg:hidden" color="#FFE326" />
      <Sparkle className="absolute -left-2 bottom-[30%] w-4 animate-twinkle [animation-delay:1.2s] lg:hidden" color="#159FE2" />
      <ul className="grid gap-4 lg:grid-cols-3 lg:gap-3.5">
        {items.map(({ href, label, Icon, shell, bubble, arrow, shape }, i) => (
          <motion.li
            key={href}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.08 }}
            className="h-full"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex h-full min-h-[68px] items-center gap-3.5 overflow-hidden px-3.5 py-3 font-display text-[1.08rem] font-extrabold leading-tight transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:-rotate-[0.6deg] active:translate-y-[4px] active:rotate-0 lg:min-h-[132px] lg:flex-col lg:items-start lg:justify-between lg:gap-3 lg:p-4 lg:text-[1rem] ${shell} ${shape}`}
            >
              {/* блик */}
              <span aria-hidden="true" className="pointer-events-none absolute -left-6 -top-8 h-16 w-28 rotate-[-20deg] rounded-full bg-white/25 blur-md transition-transform duration-500 group-hover:translate-x-24" />
              <span className={`relative grid size-12 shrink-0 place-items-center rounded-full shadow-[0_3px_0_rgb(0_0_0/0.12)] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${bubble}`}>
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <span className="relative flex flex-1 items-center gap-2 lg:w-full lg:flex-none lg:items-end lg:justify-between">
                <span className="flex-1 [overflow-wrap:anywhere]">{label}</span>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${arrow}`}>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className="sr-only"> ({t.common.opensInNewTab})</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Contacts() {
  const { t } = useI18n();

  const rows: { icon: ComponentType<{ className?: string }>; label: string; value: string; href?: string; tone: string; external?: boolean }[] = [
    { icon: MapPin, label: t.contacts.addressLabel, value: t.contacts.address, href: site.twoGis.url, tone: "bg-berry text-white", external: true },
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

            <ContactButtons />

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
              {/* Карта 2ГИС (официальный виджет) с точкой ALMASADAM.
                  Телефон: карта не перехватывает прокрутку — нажатие открывает 2ГИС (приложение или сайт).
                  Десктоп: карту можно двигать и масштабировать. */}
              <div className="relative mt-2.5 overflow-hidden rounded-[24px] bg-sky-50 sm:mt-3 lg:mt-2.5 lg:rounded-[20px]">
                <iframe
                  src={twoGisWidgetUrl}
                  title={t.contacts.mapTitle}
                  loading="lazy"
                  className="pointer-events-none block h-[250px] w-full border-0 sm:h-[280px] lg:pointer-events-auto lg:h-[270px]"
                />
                <a
                  href={site.twoGis.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-end justify-center p-3 lg:hidden"
                >
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-display text-[0.95rem] font-extrabold text-violet shadow-lift">
                    <MapPin className="size-4 text-berry" aria-hidden="true" />
                    {t.contacts.mapTap}
                  </span>
                  <span className="sr-only"> ({t.common.opensInNewTab})</span>
                </a>
              </div>
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
