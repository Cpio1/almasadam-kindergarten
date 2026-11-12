"use client";

import type { ComponentType, CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ProgramId } from "@/data/programs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { LeafArt, Wave } from "@/components/ui/Decor";
import { FunLetters, Pencil, Star3D } from "@/components/ui/Fun";
import { Cube3D, Organic, StarField, Swirl, WaveRibbon } from "@/components/ui/Shapes";
import { CreativeArt, LangCube, LogicArt, SocialArt, SpeechArt, WorldArt } from "@/components/programs/ProgramArt";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
 * Раскладка карточек — разная для телефона / планшета / десктопа:
 *  • телефон (2 колонки): речь + творчество, логика во всю ширину, мир + игры;
 *  • планшет (6 колонок): три карточки сверху, две широкие снизу; Әлем справа от заголовка;
 *  • десктоп (4 колонки): заголовок + три карточки слева, Әлем-проводник справа на две строки,
 *    снизу две широкие карточки.
 * Все строки классов литеральные — Tailwind их видит.
 * ───────────────────────────────────────────────────────────── */

/** Где стоит иллюстрация и сколько места оставить тексту */
const layouts = {
  /** иллюстрация сверху справа, текст снизу */
  tall: {
    art: "-top-7 right-0 w-[86px] sm:w-[104px] lg:w-[112px]",
    body: "pt-[54px] sm:pt-[76px] lg:pt-[80px]",
  },
  /** телефон: во всю ширину, иллюстрация справа; планшет+: как tall */
  wideThenTall: {
    art: "right-2 top-1/2 w-[34%] max-w-[124px] -translate-y-1/2 sm:-top-7 sm:right-0 sm:w-[104px] sm:max-w-none sm:translate-y-0 lg:w-[112px]",
    body: "pr-[38%] sm:pr-0 sm:pt-[76px] lg:pt-[80px]",
  },
  /** телефон: как tall; планшет+: широкая, иллюстрация справа по центру */
  tallThenWide: {
    art: "-top-7 right-0 w-[86px] sm:right-4 sm:top-1/2 sm:w-[34%] sm:max-w-[158px] sm:-translate-y-1/2",
    body: "pt-[54px] sm:pt-0 sm:pr-[40%]",
  },
} as const;

type Card = {
  id: ProgramId;
  n: string;
  Art: ComponentType<{ className?: string; style?: CSSProperties }>;
  layout: keyof typeof layouts;
  /** фон, форма и «объём» карточки */
  shell: string;
  title: string;
  text: string;
  chip: string;
  /** место в сетке на каждом брейкпоинте */
  place: string;
  /** маленький тематический элемент у края карточки */
  deco?: ReactNode;
  /** движение иллюстрации при наведении */
  hover: string;
};

const cards: Card[] = [
  {
    id: "speech",
    n: "01",
    Art: SpeechArt,
    layout: "tall",
    shell: "bg-[linear-gradient(150deg,#2DB2F0_0%,#159FE2_45%,#0B6FA3_100%)] rounded-[34px_34px_34px_10px] shadow-[0_7px_0_#0a5d88]",
    title: "!text-white",
    text: "text-white/90",
    chip: "bg-white/20 text-white",
    place: "col-span-1 sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2",
    deco: (
      <span className="absolute -top-3 left-4 grid size-8 animate-bob place-items-center rounded-full bg-sun font-display text-sm font-black text-violet shadow-[0_3px_0_#d9bd00] sm:size-9">
        Б
      </span>
    ),
    hover: "group-hover:-rotate-6 group-hover:-translate-y-1 group-hover:scale-105",
  },
  {
    id: "creative",
    n: "02",
    Art: CreativeArt,
    layout: "tall",
    shell: "bg-[linear-gradient(140deg,#FF7BAC_0%,#E83A32_50%,#FF8A1F_100%)] rounded-[12px_42px_34px_42px] shadow-[0_7px_0_#b9231c]",
    title: "!text-white",
    text: "text-white/90",
    chip: "bg-white/20 text-white",
    place: "col-span-1 sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2",
    deco: <Pencil className="absolute -bottom-3 -right-3 w-20 -rotate-[24deg] animate-bob sm:w-24" color="#FFE326" />,
    hover: "group-hover:rotate-12 group-hover:scale-110",
  },
  {
    id: "logic",
    n: "03",
    Art: LogicArt,
    layout: "wideThenTall",
    shell: "bg-[linear-gradient(145deg,#8A6CF0_0%,#5A3FC0_45%,#302079_100%)] rounded-[42px_12px_42px_34px] shadow-[0_7px_0_#1b1150]",
    title: "!text-white",
    text: "text-white/90",
    chip: "bg-white/15 text-white",
    place: "col-span-2 sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-2",
    deco: <Cube3D className="absolute -top-6 left-4 hidden w-12 animate-float [--r:-10deg] sm:block" color="#FFE326" letter="?" letterColor="#302079" />,
    hover: "group-hover:-translate-y-1.5 group-hover:rotate-6",
  },
  {
    id: "world",
    n: "04",
    Art: WorldArt,
    layout: "tallThenWide",
    shell: "bg-[linear-gradient(150deg,#A6E04F_0%,#80C924_55%,#6BB31A_100%)] rounded-[46px_46px_12px_46px] shadow-[0_7px_0_#4f8a0c]",
    title: "",
    text: "text-violet/85",
    chip: "bg-white/45 text-violet",
    place: "col-span-1 sm:col-span-3 lg:col-span-2 lg:col-start-1 lg:row-start-3",
    deco: <LeafArt className="absolute -left-3 -top-3 w-10 -rotate-12 animate-wiggle sm:w-11" color="#4f8a0c" />,
    hover: "group-hover:rotate-[20deg] group-hover:scale-105",
  },
  {
    id: "social",
    n: "05",
    Art: SocialArt,
    layout: "tallThenWide",
    shell: "bg-[linear-gradient(150deg,#FFF06A_0%,#FFE326_50%,#FFC93C_100%)] rounded-[12px_46px_46px_46px] shadow-[0_7px_0_#d9a800]",
    title: "",
    text: "text-violet/85",
    chip: "bg-white/55 text-violet",
    place: "col-span-1 sm:col-span-3 lg:col-span-2 lg:col-start-3 lg:row-start-3",
    deco: <Star3D className="absolute -bottom-4 left-[44%] hidden w-12 animate-wiggle sm:block" color="#FF7BAC" shade="#d94f86" />,
    hover: "group-hover:-translate-y-2 group-hover:-rotate-6",
  },
];

function ProgramCard({ card, i }: { card: Card; i: number }) {
  const { t } = useI18n();
  const item = t.programs.items[card.id];
  const L = layouts[card.layout];
  return (
    <motion.div
      className={`relative ${card.place}`}
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay: i * 0.07, ease }}
    >
      <article
        className={`group relative flex h-full flex-col justify-end p-3.5 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:-rotate-[0.8deg] sm:p-5 lg:px-5 lg:py-5 ${card.shell}`}
      >
        {/* фактура «бумаги» внутри карточки */}
        <span aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 mix-blend-soft-light" />
        {/* крупная иллюстрация: позиция → движение при наведении → лёгкое покачивание */}
        <span aria-hidden="true" className={`pointer-events-none absolute z-10 ${L.art}`}>
          <span className={`block transition-transform duration-500 ease-out ${card.hover}`}>
            <card.Art className="w-full animate-float drop-shadow-[0_6px_6px_rgba(48,32,121,0.18)]" style={{ animationDelay: `${i * -1.3}s` }} />
          </span>
        </span>
        {card.deco ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">{card.deco}</span> : null}

        <div className={`relative ${L.body}`}>
          <span aria-hidden="true" className={`inline-flex rounded-full px-2 py-0.5 font-display text-[0.72rem] font-black tracking-wide ${card.chip}`}>
            {card.n}
          </span>
          <h4 className={`mt-1.5 text-[0.98rem] font-black leading-tight [overflow-wrap:anywhere] sm:text-[1.2rem] lg:text-[1.18rem] ${card.title}`}>
            {item.title}
          </h4>
          <p className={`mt-1 text-[0.84rem] font-semibold leading-snug sm:text-[0.94rem] ${card.text}`}>{item.text}</p>
        </div>
      </article>
    </motion.div>
  );
}

/** Әлем-проводник: большая фигура у «радужной двери» в мир знаний, вокруг — буквы, звёзды, кубики */
function Guide() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease }}
      className="relative flex h-full min-h-[236px] items-end justify-end pr-1 sm:min-h-[250px] sm:justify-center sm:pr-0 lg:min-h-0"
    >
      {/* радужная арка-дверь */}
      <div aria-hidden="true" className="absolute bottom-0 right-[2%] h-[86%] w-[60%] sm:right-auto sm:w-[86%] lg:h-[84%] lg:w-[80%]">
        <div className="shape-arch absolute inset-0 bg-berry" />
        <div className="shape-arch absolute inset-x-[7%] bottom-0 top-[6%] bg-[#FF8A1F]" />
        <div className="shape-arch absolute inset-x-[14%] bottom-0 top-[12%] bg-sun" />
        <div className="shape-arch absolute inset-x-[21%] bottom-0 top-[18%] bg-leaf" />
        <div className="shape-arch absolute inset-x-[28%] bottom-0 top-[24%] bg-sky-100" />
      </div>
      {/* буквы, звезда, кубики вокруг */}
      <FunLetters text="АӘБ" className="absolute left-2 top-[30%] text-[2rem] sm:hidden lg:left-auto lg:right-0 lg:top-[1%] lg:block lg:text-[2.3rem]" />
      <Star3D className="absolute bottom-[8%] left-[6%] w-14 animate-wiggle sm:left-0 lg:bottom-[34%] lg:left-[-4%] lg:w-14" />
      <Cube3D className="absolute bottom-0 left-[28%] w-12 animate-float [--r:-8deg] sm:left-[2%] sm:bottom-[2%] lg:left-[6%] lg:bottom-0 lg:w-12" color="#159FE2" letter="A" />
      <MascotFigure
        pose="reading"
        variant="hover"
        size="custom"
        floatIntensity={1.1}
        delay={0.2}
        say={t.programs.mascotSay}
        bubbleSide="left"
        bubbleClassName="!top-[2%]"
        className="relative w-[clamp(158px,44vw,188px)] sm:w-[200px] lg:w-[clamp(220px,17vw,262px)]"
        sizes="(max-width: 640px) 190px, 262px"
      />
    </motion.div>
  );
}

/** Языки — три больших объёмных кубика, как в логотипе */
type LangKey = "ru" | "kz" | "en";
const langs: { key: LangKey; code: string; lang: string; color: string; chip: string; shift: string }[] = [
  { key: "ru", code: "RU", lang: "ru", color: "#E83A32", chip: "bg-berry text-white", shift: "" },
  { key: "kz", code: "KZ", lang: "kk", color: "#159FE2", chip: "bg-sky text-white", shift: "sm:translate-y-5" },
  { key: "en", code: "EN", lang: "en", color: "#80C924", chip: "bg-leaf text-violet", shift: "" },
];

function Languages() {
  const { t } = useI18n();
  const L = t.programs.langs;
  return (
    <Reveal className="relative mt-14 sm:mt-16 lg:mt-14">
      <div className="relative isolate overflow-hidden rounded-[40px_40px_40px_14px] bg-[linear-gradient(160deg,#3d2a94_0%,#302079_60%,#24175f_100%)] px-4 pb-6 pt-7 text-white sm:px-8 sm:pb-8 lg:rounded-[56px_56px_56px_18px] lg:px-12 lg:py-10">
        {/* декор внутри блока */}
        <StarField className="absolute right-4 top-4 -z-10 w-24 animate-twinkle opacity-80 sm:w-32" />
        <Swirl className="absolute -left-10 -top-10 -z-10 w-36 animate-spin-slower opacity-25 lg:w-44" color="#7B5CE0" dot="#FFE326" />
        <Organic className="absolute -bottom-20 -right-16 -z-10 w-64 opacity-20 lg:w-80" color="#159FE2" variant={1} />
        {/* разноцветные волны по низу */}
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-8 w-full opacity-90 sm:h-10">
          <path d="M0 30C150 0 300 0 450 26s300 34 450 4 220-24 300-4V60H0Z" fill="#E83A32" fillOpacity=".55" />
          <path d="M0 42C170 20 330 22 500 40s320 26 470 2 180-12 230 0V60H0Z" fill="#FFE326" fillOpacity=".55" />
          <path d="M0 52c200-14 380-12 560 0s360 10 640-4V60H0Z" fill="#80C924" fillOpacity=".7" />
        </svg>

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,2fr)] lg:gap-10">
          {/* Әлем с буквами RU / KZ / EN */}
          <div className="relative mx-auto w-[clamp(180px,52vw,230px)] lg:order-1 lg:w-full lg:max-w-[270px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[4%] bottom-[-4%] -z-10 aspect-square animate-spin-slower bg-sun"
              style={{ clipPath: "url(#clip-scallop)" }}
            />
            <Star3D className="absolute -left-4 top-[8%] w-11 animate-wiggle lg:w-12" color="#FF7BAC" shade="#d94f86" />
            <MascotFigure
              pose="languages"
              variant="sway"
              size="custom"
              delay={0.1}
              className="mx-auto w-[82%]"
              sizes="(max-width: 1024px) 200px, 240px"
            />
          </div>

          <div className="lg:order-2">
            <h3 className="text-center font-display text-[clamp(1.6rem,1.2rem+1.8vw,2.3rem)] font-black leading-tight !text-white lg:text-left">
              {L.title}
            </h3>
            <p className="mt-1.5 text-center text-white/75 lg:text-left">{L.subtitle}</p>

            <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-6 lg:mt-7 lg:gap-8">
              {langs.map(({ key, code, lang, color, chip, shift }, i) => {
                const item = L.items[key];
                return (
                  <li key={key} className={`group flex flex-col items-center text-center ${shift}`}>
                    <span className="block w-[clamp(80px,24vw,124px)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-6 lg:w-[clamp(104px,9vw,128px)]">
                      <LangCube code={code} color={color} className="w-full animate-float" style={{ animationDelay: `${i * -2}s` }} />
                    </span>
                    <h4 lang={lang} className="mt-2 text-[1rem] font-black leading-tight !text-white sm:text-[1.22rem]">
                      {item.label}
                    </h4>
                    <p className={`mt-1.5 rounded-full px-2.5 py-0.5 font-display text-[0.72rem] font-extrabold sm:text-[0.8rem] ${chip}`}>
                      {item.tag}
                    </p>
                    <ul className="mt-2.5 hidden flex-wrap justify-center gap-1.5 sm:flex" aria-hidden="true">
                      {item.words.map((w) => (
                        <li
                          key={w}
                          lang={lang}
                          className="rounded-[12px_12px_12px_4px] bg-white/12 px-2 py-0.5 font-display text-[0.78rem] font-extrabold text-white/90"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * «Образовательные программы» — «Мир открытий ALMASADAM».
 * Один раздел: игровые карточки развития (data/programs.ts — предварительные направления,
 * под ними пометка) + яркий языковой блок с объёмными кубиками RU / KZ / EN.
 */
export function Programs() {
  const { t } = useI18n();

  return (
    <section
      id="programs"
      aria-labelledby="programs-title"
      className="section-clip relative bg-[linear-gradient(180deg,#FFFCF5_0%,#F6F2FF_38%,#EEF8FF_72%,#FFFCF5_100%)]"
    >
      {/* ── фон раздела: мягкие органические пятна + фигуры в полях (не у текста) ── */}
      <Organic className="absolute -left-24 top-[22%] w-[300px] opacity-60 lg:-left-20 lg:w-[420px]" color="#FFF4A8" />
      <Organic className="absolute -right-28 top-[48%] w-[280px] opacity-50 lg:w-[400px]" color="#CDECFB" variant={1} />
      <Star3D className="absolute right-4 top-4 w-10 animate-wiggle sm:right-8 sm:w-12 lg:hidden" color="#FF8A1F" shade="#d96a05" />
      <Swirl className="absolute -left-9 top-[40%] hidden w-24 animate-spin-rev xl:block" color="#E83A32" dot="#FFE326" />
      <Pencil className="absolute -right-6 top-[58%] hidden w-36 -rotate-[30deg] animate-bob xl:block" color="#7B5CE0" />
      <WaveRibbon className="absolute left-[3%] top-[56%] hidden w-28 animate-sway min-[1500px]:block" colors={["#FF7BAC", "#159FE2", "#80C924"]} />

      <div className="container-site section-y relative !pt-10 lg:!pt-10">
        <h3 className="sr-only">{t.programs.devTitle}</h3>
        <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-6 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)] lg:gap-x-5 lg:gap-y-10">
          {/* заголовок */}
          <div className="col-span-2 self-center sm:col-span-4 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end">
            <SectionHeading
              id="programs-title"
              eyebrow={t.programs.eyebrow}
              title={t.programs.title}
              subtitle={t.programs.subtitle}
              tone="sky"
            />
          </div>
          {/* Әлем-проводник */}
          <div className="col-span-2 -mt-4 sm:col-span-2 sm:mt-0 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1">
            <Guide />
          </div>
          {cards.map((c, i) => (
            <ProgramCard key={c.id} card={c} i={i} />
          ))}
        </div>

        <p className="mt-7 flex items-start gap-2 text-[0.88rem] text-ink-soft lg:mt-8">
          <Info className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
          {t.programs.note}
        </p>

        <Languages />
      </div>
      <Wave fill="#FFFFFF" />
    </section>
  );
}
