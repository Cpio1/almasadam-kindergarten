"use client";

import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mascot } from "@/components/ui/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { Cube, Glow, Sparkle, Wave } from "@/components/ui/Decor";

type LangKey = "ru" | "kz" | "en";

const langs: {
  key: LangKey;
  glyph: string;
  lang: string;
  accent: string;
  soft: string;
  chip: string;
  shift: string;
}[] = [
  { key: "ru", glyph: "Аа", lang: "ru", accent: "bg-berry", soft: "bg-berry-50", chip: "text-berry-700", shift: "" },
  { key: "kz", glyph: "Әә", lang: "kk", accent: "bg-sky", soft: "bg-sky-50", chip: "text-sky-700", shift: "lg:translate-x-12" },
  { key: "en", glyph: "Aa", lang: "en", accent: "bg-leaf", soft: "bg-leaf-50", chip: "text-leaf-700", shift: "" },
];

/** Таблички RU / KZ / EN, которые «держит» Адам */
function LetterTiles() {
  const tiles = [
    { t: "RU", c: "bg-berry text-white", pos: "left-0 top-[18%] -rotate-12" },
    { t: "KZ", c: "bg-sky text-white", pos: "right-0 top-[6%] rotate-6" },
    { t: "EN", c: "bg-leaf text-white", pos: "right-[4%] bottom-[18%] -rotate-6" },
  ];
  return (
    <>
      {tiles.map(({ t, c, pos }, i) => (
        <span
          key={t}
          aria-hidden="true"
          className={`absolute z-10 grid size-12 place-items-center rounded-2xl font-display text-lg font-black shadow-[0_8px_0_rgba(0,0,0,0.15)] animate-float sm:size-14 ${c} ${pos}`}
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          {t}
        </span>
      ))}
    </>
  );
}

export function Languages() {
  const { t } = useI18n();
  return (
    <section id="languages" aria-labelledby="languages-title" className="section-clip relative bg-violet text-white">
      <Glow className="-left-40 top-20 size-[420px] opacity-25" color="#159FE2" />
      <Glow className="-right-40 bottom-10 size-[420px] opacity-20" color="#E83A32" />
      <Sparkle className="absolute left-[46%] top-12 w-6 animate-twinkle" color="#FFE326" />
      <Sparkle className="absolute bottom-24 left-[8%] w-4 animate-twinkle [animation-delay:1.2s]" color="#fff" />
      <Cube className="absolute -right-4 top-24 hidden w-16 animate-float-slow [--r:12deg] sm:block" color="#FFE326" />

      <div className="container-site section-y relative !pt-8 lg:!pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 xl:gap-20">
          <div>
            <SectionHeading
              id="languages-title"
              eyebrow={t.languages.eyebrow}
              title={t.languages.title}
              subtitle={t.languages.subtitle}
              tone="sun"
              invert
            />

            <Reveal delay={0.1} className="relative mx-auto mt-10 w-[250px] sm:w-[300px] lg:mx-0 lg:ml-10 lg:w-[340px]">
              {/* У реального Адама таблички RU / KZ / EN уже в руках — декоративные нужны только для заглушки */}
              {assets.mascot.languages ? null : <LetterTiles />}
              <Mascot
                pose="languages"
                className="mx-auto w-[170px] sm:w-[210px] lg:w-[270px]"
                sizes="(max-width: 1024px) 220px, 280px"
              />
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 lg:gap-5">
            {langs.map(({ key, glyph, lang, accent, soft, chip, shift }, i) => {
              const item = t.languages.items[key];
              return (
                <motion.article
                  key={key}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex gap-4 rounded-[28px] bg-white p-4 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 sm:gap-5 sm:p-5 lg:max-w-[560px] ${shift} ${
                    i === 1 ? "rounded-tl-[8px]" : i === 2 ? "rounded-br-[8px]" : "rounded-bl-[8px]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    lang={lang}
                    className={`grid size-[68px] shrink-0 place-items-center rounded-[22px] font-display text-[1.9rem] font-black text-white transition-transform duration-300 group-hover:-rotate-6 sm:size-20 sm:text-[2.2rem] ${accent}`}
                  >
                    {glyph}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 lang={lang} className="text-[1.25rem] font-black sm:text-[1.35rem]">
                        {item.label}
                      </h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-[0.78rem] font-bold ${soft} ${chip}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.97rem] text-ink-soft">{item.text}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
                      {item.words.map((w) => (
                        <li
                          key={w}
                          lang={lang}
                          className={`rounded-[12px_12px_12px_4px] px-2.5 py-1 font-display text-[0.85rem] font-extrabold ${soft} ${chip}`}
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}

            <Reveal delay={0.2}>
              <p className="mt-2 inline-flex items-start gap-2.5 rounded-[20px] bg-white/10 px-4 py-3 font-display text-[0.98rem] font-bold text-white ring-1 ring-white/15">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden="true" />
                {t.languages.primaryNote}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
      <Wave fill="#FFFCF5" variant={1} />
    </section>
  );
}
