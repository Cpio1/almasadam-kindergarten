"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";
import { news, type NewsItem } from "@/data/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Cube, Sparkle, Wave } from "@/components/ui/Decor";

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

export function News() {
  const { t } = useI18n();
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="news" aria-labelledby="news-title" className="section-clip relative bg-milk">
      <div className="container-site section-y !pt-8 lg:!pt-8">
        <SectionHeading id="news-title" eyebrow={t.news.eyebrow} title={t.news.title} tone="sun" />

        {sorted.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-5">
            {sorted.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <Reveal className="mt-10 lg:mt-9">
            <div className="relative overflow-hidden rounded-[36px] bg-white p-6 shadow-soft ring-1 ring-violet-50 sm:p-10 lg:rounded-[40px_40px_40px_14px] lg:px-12 lg:py-8">
              <Sparkle className="absolute right-[6%] top-8 w-7 animate-twinkle" color="#FFE326" />
              <Cube className="absolute -bottom-3 right-[30%] hidden w-14 animate-float [--r:-10deg] md:block" color="#159FE2" />
              <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                <MascotFigure
                  pose="news"
                  variant="float"
                  size="custom"
                  floatIntensity={0.8}
                  delay={0.1}
                  className="w-[clamp(150px,44vw,180px)] lg:w-[clamp(160px,12vw,200px)]"
                  sizes="200px"
                />
                <div className="max-w-xl md:pl-6">
                  <p className="font-display text-[clamp(1.25rem,1rem+1vw,1.65rem)] lg:text-[1.4rem] font-extrabold leading-snug text-violet">
                    {t.news.empty}
                  </p>
                  <p className="mt-3 text-ink-soft">{t.news.emptyHint}</p>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-6"
                  >
                    <InstagramIcon className="size-5" />
                    {t.news.instagramCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
      <Wave fill="#FFFFFF" />
    </section>
  );
}
