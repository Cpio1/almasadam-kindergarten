"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import { news, type NewsItem } from "@/data/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Cloud, Cube, HalfCircle, Ring, SoftStar, Sparkle, Squiggle, Wave } from "@/components/ui/Decor";

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const { t, lang } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const date = new Date(item.date);
  const dateLabel = Number.isNaN(date.getTime())
    ? item.date
    : date.toLocaleDateString(lang === "kz" ? "kk-KZ" : "ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  const tones = ["sky", "sun", "leaf"] as const;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="flex flex-col overflow-hidden rounded-[32px] bg-white shadow-soft ring-1 ring-violet-50"
    >
      <div className="relative aspect-[16/10]">
        {item.image && imgOk ? (
          <Image
            src={item.image}
            alt={item.title[lang]}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <PhotoSlot photo={null} alt="" tone={tones[index % 3]} variant={(index % 3) as 0 | 1 | 2} className="absolute inset-0" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={item.date} className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700">
          <CalendarDays className="size-4" aria-hidden="true" />
          {dateLabel}
        </time>
        <h3 className="mt-2 text-[1.2rem] font-extrabold">{item.title[lang]}</h3>
        <p className="mt-2 text-[0.97rem] text-ink-soft">{item.excerpt[lang]}</p>
        {expanded && item.body ? (
          <p className="mt-3 whitespace-pre-line text-[0.97rem] text-ink-soft">{item.body[lang]}</p>
        ) : null}
        {item.body ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-4 font-display font-extrabold text-violet hover:text-sky-700"
          >
            {expanded ? t.news.less : t.news.more}
            <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}

/** Обёртка для декора: двигается при наведении на карточку, внутренняя фигура сохраняет свою анимацию */
function HoverShift({ className, shift, children }: { className: string; shift: string; children: React.ReactNode }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute transition-transform duration-700 ease-out ${shift} ${className}`}>
      {children}
    </span>
  );
}

/**
 * Приглашение следить за новостями в Instagram.
 * Вся карточка — одна ссылка (без вложенных ссылок); «кнопка» внутри — визуальный элемент.
 */
function InstagramPromo() {
  const { t } = useI18n();
  return (
    <Reveal className="mt-8 lg:mt-8">
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative isolate block overflow-hidden rounded-[36px_36px_36px_12px] bg-gradient-to-br from-sky-50 via-sky-50 to-cream px-5 pb-7 pt-7 shadow-soft ring-1 ring-sky-100 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift focus-visible:!rounded-[36px_36px_36px_12px] focus-visible:outline-offset-4 sm:px-10 lg:rounded-[56px_56px_56px_18px] lg:px-14 lg:py-10 lg:focus-visible:!rounded-[56px_56px_56px_18px]"
      >
        {/* ── Декор: разные фигуры, на телефоне — минимум ── */}
        <HoverShift className="-right-6 -top-6 -z-10 w-[46%] max-w-[420px] lg:right-[2%] lg:top-[-12%] lg:w-[40%]" shift="group-hover:-translate-x-3 group-hover:translate-y-2">
          <span className="block aspect-square w-full animate-morph bg-sun-100" />
        </HoverShift>
        <HoverShift className="right-[4%] top-[42%] w-20 sm:top-5 sm:w-32 lg:right-[44%] lg:top-6" shift="group-hover:translate-x-4">
          <Cloud className="w-full animate-drift" color="#ffffff" />
        </HoverShift>
        <HoverShift className="left-[6%] top-6 hidden w-7 sm:block lg:left-auto lg:right-[8%] lg:top-[16%]" shift="group-hover:rotate-45 group-hover:scale-125">
          <Sparkle className="w-full animate-twinkle" color="#FFE326" />
        </HoverShift>
        <HoverShift className="bottom-[14%] left-[46%] hidden w-12 lg:block" shift="group-hover:-translate-y-3 group-hover:rotate-12">
          <Cube className="w-full animate-float [--r:-10deg]" color="#E83A32" />
        </HoverShift>
        <HoverShift className="-bottom-3 right-[6%] hidden w-14 sm:block" shift="group-hover:-translate-y-2 group-hover:-rotate-12">
          <Cube className="w-full animate-float [--r:12deg] [animation-delay:-2s]" color="#159FE2" />
        </HoverShift>
        <HoverShift className="right-[30%] top-[52%] hidden w-10 lg:block" shift="group-hover:rotate-90">
          <SoftStar className="w-full animate-wiggle" color="#80C924" />
        </HoverShift>
        <HoverShift className="-bottom-10 -left-10 -z-10 hidden w-44 lg:block" shift="group-hover:translate-x-3 group-hover:-translate-y-3">
          <Ring className="w-full animate-spin-slower opacity-60" color="#CDECFB" />
        </HoverShift>
        <HoverShift className="bottom-8 left-[38%] hidden w-20 lg:block" shift="group-hover:translate-x-3">
          <Squiggle className="w-full" color="#FBD5D2" />
        </HoverShift>

        {/* ── Композиция: телефон — заголовок → Адам → текст → кнопка; десктоп — текст слева, Адам справа ── */}
        <div className="relative grid justify-items-center text-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:justify-items-start lg:gap-x-10 lg:text-left">
          <h3 className="max-w-[18ch] text-[clamp(1.55rem,1.1rem+2vw,2.4rem)] font-black leading-tight lg:col-start-1 lg:row-start-1 lg:self-end">
            {t.news.promoTitle}
          </h3>

          <div className="relative mt-4 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:justify-self-center">
            {/* Адам с календарём на солнечном полукруге */}
            <HalfCircle className="absolute bottom-[2%] left-1/2 w-[112%] -translate-x-1/2" color="#FFE326" />
            <div className="relative origin-bottom transition-transform duration-500 group-hover:[animation:wiggle_1.6s_ease-in-out_infinite]">
              <MascotFigure
                pose="news"
                variant="float"
                size="custom"
                floatIntensity={0.8}
                delay={0.1}
                className="w-[clamp(190px,56vw,240px)] lg:w-[clamp(240px,20vw,300px)]"
                sizes="(max-width: 1024px) 240px, 300px"
              />
            </div>
          </div>

          <p className="mt-4 max-w-[32ch] text-[1.02rem] text-ink-soft lg:col-start-1 lg:row-start-2 lg:mt-3 lg:text-[1.1rem]">
            {t.news.promoText}
          </p>

          <div className="mt-6 flex w-full items-center justify-center gap-3 sm:w-auto lg:col-start-1 lg:row-start-3 lg:mt-7 lg:self-start lg:justify-start">
            {/* фирменный значок Instagram */}
            <span
              aria-hidden="true"
              className="hidden size-14 shrink-0 place-items-center rounded-[18px] bg-[linear-gradient(45deg,#feda75,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5)] text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6 sm:grid"
            >
              <InstagramIcon className="size-7" />
            </span>
            <span className="btn btn-primary w-full !min-h-14 !px-7 !text-[1.05rem] shadow-[0_16px_32px_-14px_rgb(48_32_121/0.7)] transition-transform duration-300 group-hover:scale-105 group-hover:bg-violet-700 sm:w-auto">
              <InstagramIcon className="size-5 sm:hidden" />
              {t.news.promoCta}
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
        <span className="sr-only">
          {" "}
          (Instagram {site.instagramHandle}, {t.common.opensInNewTab})
        </span>
      </a>
    </Reveal>
  );
}

export function News() {
  const { t } = useI18n();
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="news" aria-labelledby="news-title" className="section-clip relative bg-white">
      <div className="container-site section-y !pt-8 lg:!pt-8">
        <SectionHeading id="news-title" eyebrow={t.news.eyebrow} title={t.news.title} tone="sun" />

        {/* Карточки появятся, только когда в data/news.ts будут реальные новости */}
        {sorted.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-5">
            {sorted.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : null}

        <InstagramPromo />
      </div>
      <Wave fill="#FFFCF5" />
    </section>
  );
}
