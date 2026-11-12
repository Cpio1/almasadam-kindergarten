"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { programs } from "@/data/programs";
import { tones } from "@/lib/tones";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Wave } from "@/components/ui/Decor";
import { FunLetters } from "@/components/ui/Fun";
import { CloudFace, Heart, Organic, RainbowArc, Swirl, Zigzag } from "@/components/ui/Shapes";

const ease = [0.22, 1, 0.36, 1] as const;

/** Форма «подложки» иконки — у каждой карточки своя, сами карточки остаются простыми */
const iconShapes = ["rounded-full", "shape-blob", "shape-arch", "shape-leaf", "rounded-[16px] rotate-6"];

/**
 * Изучение языков. Русский — основной язык обучения, казахский и английский — дополнительно.
 * Тексты — locales/*.ts → programs.langs.
 */
type LangKey = "ru" | "kz" | "en";
const langs: { key: LangKey; code: string; lang: string; solid: string; soft: string; text: string; shape: string }[] = [
  { key: "ru", code: "RU", lang: "ru", solid: "bg-berry", soft: "bg-berry-50", text: "text-berry-700", shape: "rounded-full" },
  { key: "kz", code: "KZ", lang: "kk", solid: "bg-sky", soft: "bg-sky-50", text: "text-sky-700", shape: "shape-arch" },
  { key: "en", code: "EN", lang: "en", solid: "bg-leaf", soft: "bg-leaf-50", text: "text-leaf-700", shape: "shape-blob-2" },
];

/** Таблички RU / KZ / EN вокруг Әлема — только если нет картинки, где он уже держит буквы */
function LetterTiles() {
  const tiles = [
    { t: "RU", c: "bg-berry text-white rounded-full", pos: "left-0 top-[18%] -rotate-12" },
    { t: "KZ", c: "bg-sky text-white shape-arch", pos: "right-0 top-[6%] rotate-6" },
    { t: "EN", c: "bg-leaf text-white rounded-2xl", pos: "right-[4%] bottom-[18%] -rotate-6" },
  ];
  return (
    <>
      {tiles.map(({ t, c, pos }, i) => (
        <span
          key={t}
          aria-hidden="true"
          className={`absolute z-10 grid size-12 place-items-center font-display text-lg font-black shadow-[0_8px_0_rgba(0,0,0,0.15)] animate-float ${c} ${pos}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          {t}
        </span>
      ))}
    </>
  );
}

/** Номерок подблока: 01 / 02 */
function BlockTitle({ n, children, invert = false }: { n: string; children: React.ReactNode; invert?: boolean }) {
  return (
    <h3 className={`flex items-center gap-3 text-[1.35rem] font-black lg:text-[1.3rem] ${invert ? "!text-white" : ""}`}>
      <span
        aria-hidden="true"
        className={`grid size-9 place-items-center shape-blob font-display text-[0.85rem] font-black ${
          invert ? "bg-sun text-violet" : "bg-violet text-white"
        }`}
      >
        {n}
      </span>
      {children}
    </h3>
  );
}

/**
 * «Образовательные программы» — один раздел из двух смысловых блоков:
 *  А. Развитие ребёнка (data/programs.ts — предварительные направления)
 *  Б. Изучение языков (RU / KZ / EN) с Әлемом
 */
export function Programs() {
  const { t } = useI18n();
  const L = t.programs.langs;

  return (
    <section id="programs" aria-labelledby="programs-title" className="section-clip relative bg-milk">
      {/* «Программы» — тема радуги, облаков и букв */}
      {/* телефон / планшет: облачко рядом с бейджем */}
      <CloudFace className="absolute right-3 top-5 w-20 animate-orbit sm:right-8 sm:w-24 lg:hidden" />
      {/* десктоп: в полях и в свободном месте над карточками */}
      <CloudFace className="absolute left-[44%] top-6 hidden w-24 animate-orbit lg:block xl:left-[46%]" />
      <Zigzag className="absolute -left-10 top-[34%] hidden w-28 rotate-90 xl:block" color="#FF8A1F" />
      <Swirl className="absolute -right-8 top-[46%] hidden w-20 animate-spin-rev xl:block" color="#159FE2" dot="#E83A32" />

      <div className="container-site section-y relative !pt-10 lg:!pt-10">
        {/* Заголовок + Әлем */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow={t.programs.eyebrow}
            title={t.programs.title}
            subtitle={t.programs.subtitle}
            tone="sky"
          />
          <div className="relative hidden shrink-0 pr-36 lg:block xl:pr-40">
            <RainbowArc className="absolute bottom-0 left-[-8%] w-[116%] max-w-[240px]" />
            <FunLetters text="ABC" className="absolute -left-14 top-2 text-[1.9rem]" />
            <MascotFigure
              pose="reading"
              variant="hover"
              size="custom"
              delay={0.1}
              say={t.programs.mascotSay}
              className="w-[clamp(150px,12vw,190px)]"
              sizes="200px"
            />
          </div>
        </div>

        {/* А. Развитие ребёнка */}
        <div className="mt-10 lg:mt-8">
          <BlockTitle n="01">{t.programs.devTitle}</BlockTitle>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {programs.map(({ id, icon: Icon, tone }, i) => {
              const c = tones[tone];
              const item = t.programs.items[id];
              const last = i === programs.length - 1 && programs.length % 2 === 1;
              return (
                <motion.li
                  key={id}
                  className={`${last ? "col-span-2 lg:col-span-1" : ""} ${i % 2 ? "lg:translate-y-4" : ""}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                >
                  <article
                    className={`group flex h-full flex-col gap-3 rounded-[26px] bg-white p-4 shadow-soft ring-1 ring-violet-50 transition-transform duration-300 hover:-translate-y-1.5 sm:p-5 ${
                      last ? "flex-row items-center lg:flex-col lg:items-start" : ""
                    }`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${c.solid} ${iconShapes[i % iconShapes.length]}`}
                    >
                      <Icon
                        className={`size-6 ${iconShapes[i % iconShapes.length].includes("rotate-6") ? "-rotate-6" : ""} ${tone === "sun" ? "text-violet" : "text-white"}`}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h4 className="text-[1.02rem] font-extrabold leading-tight sm:text-[1.08rem]">{item.title}</h4>
                      <p className="mt-1 text-[0.88rem] leading-snug text-ink-soft sm:text-[0.92rem]">{item.text}</p>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ul>
          <p className="mt-5 flex items-start gap-2 text-[0.88rem] text-ink-soft lg:mt-8">
            <Info className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
            {t.programs.note}
          </p>
        </div>

        {/* Б. Изучение языков — выделенный блок внутри раздела */}
        <Reveal className="relative mt-12 lg:mt-12">
          <div className="relative isolate overflow-hidden rounded-[40px_40px_40px_14px] bg-violet px-5 pb-8 pt-7 text-white sm:px-8 lg:rounded-[56px_56px_56px_18px] lg:px-12 lg:py-9">
            {/* декор внутри блока */}
            <Swirl className="absolute -right-8 -top-8 -z-10 w-32 animate-spin-slower opacity-30 lg:-right-6 lg:w-44" color="#159FE2" dot="#FFE326" />
            <Organic className="absolute -bottom-16 left-[28%] -z-10 hidden w-60 rotate-12 opacity-25 lg:block" color="#159FE2" variant={1} />
            <Zigzag className="absolute right-[36%] top-5 -z-10 hidden w-24 opacity-30 lg:block" color="#80C924" />
            <Heart className="absolute bottom-2 right-3 w-5 animate-pop opacity-90 sm:bottom-4 sm:right-5 sm:w-7" color="#FF7BAC" />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:items-center lg:gap-10">
              {/* Әлем с буквами RU / KZ / EN на солнечной арке */}
              <div className="relative mx-auto mb-2 w-[clamp(210px,62vw,260px)] lg:order-1 lg:mb-0 lg:w-full lg:max-w-[300px]">
                {/* «печенька» с фестонами вместо обычной арки */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[6%] bottom-[-4%] -z-10 aspect-square animate-spin-slower bg-sun"
                  style={{ clipPath: "url(#clip-scallop)" }}
                />
                <RainbowArc className="absolute -left-3 top-[4%] w-14 -rotate-[24deg] animate-sway" colors={["#E83A32", "#FFE326", "#80C924"]} />
                {assets.mascot.languages ? null : <LetterTiles />}
                <MascotFigure
                  pose="languages"
                  variant="sway"
                  size="custom"
                  delay={0.1}
                  className="mx-auto w-[78%]"
                  sizes="(max-width: 1024px) 220px, 260px"
                />
              </div>

              <div className="lg:order-2">
                <BlockTitle n="02" invert>
                  {L.title}
                </BlockTitle>
                <p className="mt-2 text-white/75">{L.subtitle}</p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
                  {langs.map(({ key, code, lang, solid, soft, text, shape }, i) => {
                    const item = L.items[key];
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease }}
                        className={i === 1 ? "sm:translate-y-4" : ""}
                      >
                        <article className="group flex h-full items-center gap-4 rounded-[26px] bg-white p-4 text-ink sm:flex-col sm:items-start sm:gap-3 sm:p-5">
                          <span
                            aria-hidden="true"
                            style={{ animationDelay: `${i * 0.8}s` }}
                            className={`grid size-14 shrink-0 animate-bob place-items-center font-display text-lg font-black text-white transition-transform duration-300 group-hover:-rotate-6 ${solid} ${shape}`}
                          >
                            {code}
                          </span>
                          <div className="min-w-0">
                            <h4 lang={lang} className="text-[1.2rem] font-black leading-tight">
                              {item.label}
                            </h4>
                            <p className={`mt-0.5 text-[0.88rem] font-bold ${text}`}>{item.tag}</p>
                            <ul className="mt-2 hidden flex-wrap gap-1.5 sm:flex" aria-hidden="true">
                              {item.words.map((w) => (
                                <li
                                  key={w}
                                  lang={lang}
                                  className={`rounded-[12px_12px_12px_4px] px-2 py-0.5 font-display text-[0.78rem] font-extrabold ${soft} ${text}`}
                                >
                                  {w}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <Wave fill="#FFFFFF" />
    </section>
  );
}
