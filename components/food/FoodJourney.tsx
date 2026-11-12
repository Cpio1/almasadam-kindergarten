"use client";

import type { ComponentType, CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Info, Utensils } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { meals, type MealId } from "@/data/meals";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { AppleArt, BerriesArt, CarrotArt, LeafArt } from "@/components/ui/Decor";
import { Citrus, Drop, Organic } from "@/components/ui/Shapes";

/**
 * МОБИЛЬНАЯ версия раздела «Питание» (< 1024px) — «Вкусное путешествие».
 * 1) Жёлтая сцена: крупный заголовок, наклейка «5», фрукты и Әлем с корзинкой на зелёном холме.
 * 2) Извилистая дорожка дня: пять приёмов пищи — номер, название, иллюстрация, свой цвет.
 *    Дорожка «прорисовывается» при прокрутке, остановки появляются по очереди с лёгким bounce.
 * Только подтверждённые названия приёмов пищи — без выдуманных блюд и часов.
 * Десктоп (≥ 1024px) остаётся прежним (components/sections/Food.tsx).
 */

type Art = ComponentType<{ className?: string; style?: CSSProperties }>;

const stopLook: Record<MealId, { plate: string; icon: string; Fruit: Art; fruit: string }> = {
  breakfast: { plate: "bg-[linear-gradient(150deg,#FFF06A,#FFC93C)]", icon: "text-violet", Fruit: BerriesArt, fruit: "-right-3 -bottom-1" },
  brunch: { plate: "bg-[linear-gradient(150deg,#FF7BAC,#E83A32)]", icon: "text-white", Fruit: AppleArt, fruit: "-left-3 -bottom-1" },
  lunch: { plate: "bg-[linear-gradient(150deg,#A6E04F,#6BB31A)]", icon: "text-white", Fruit: CarrotArt, fruit: "-right-3 -bottom-2" },
  snack: { plate: "bg-[linear-gradient(150deg,#5CC8F5,#0B6FA3)]", icon: "text-white", Fruit: Citrus, fruit: "-left-2 -bottom-1" },
  dinner: { plate: "bg-[linear-gradient(150deg,#8A6CF0,#302079)]", icon: "text-sun", Fruit: LeafArt, fruit: "-right-2 -bottom-1" },
};

/** Форма «тарелки» у каждой остановки — своя */
const plateShape = [
  "rounded-[42%_58%_55%_45%/50%_45%_55%_50%]",
  "rounded-[58%_42%_45%_55%/45%_55%_50%_50%]",
  "rounded-[50%_50%_42%_58%/58%_42%_50%_50%]",
  "rounded-[45%_55%_58%_42%/50%_58%_42%_50%]",
  "rounded-[55%_45%_50%_50%/42%_50%_58%_50%]",
];

/** Дорожка в координатах 340×520 (5 строк по 104px): центры остановок слева x≈44 и справа x≈296 */
const ROAD = "M44 52C44 112 296 96 296 156S44 200 44 260S296 304 296 364S44 408 44 468";

export function FoodJourney() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <div className="lg:hidden">
      {/* ── 1. Жёлтая сцена ── */}
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[40px_40px_40px_14px] bg-[linear-gradient(170deg,#FFF7B8_0%,#FFE326_60%,#FFCF3A_100%)] px-5 pt-6 shadow-[0_8px_0_#e8b800] sm:px-8 sm:pt-8">
          <span aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-50" />
          <Organic className="absolute -right-16 -top-20 -z-10 w-60 opacity-40" color="#FF8A1F" variant={1} />
          <Citrus className="absolute right-4 top-4 w-12 animate-spin-slower sm:right-8 sm:w-14" />
          <Drop className="absolute right-[4.5rem] top-14 w-5 animate-bob sm:right-[6rem]" color="#159FE2" />

          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-display text-[0.85rem] font-extrabold text-leaf-700 shadow-soft">
            <span className="grid size-6 place-items-center rounded-full bg-leaf text-white">
              <Utensils className="size-3.5" aria-hidden="true" />
            </span>
            {t.food.eyebrow}
          </span>
          <h2 className="mt-3 max-w-[11ch] pr-10 text-[clamp(1.95rem,1.2rem+4.2vw,2.8rem)] font-black leading-[1.04]">
            {t.food.title}
          </h2>
          <p className="mt-2 max-w-[22ch] text-[1.02rem] font-semibold leading-snug text-violet/80">{t.food.text}</p>

          {/* сцена: «5», фрукты и Әлем на зелёном холме */}
          <div className="relative mt-3 h-[236px] min-[390px]:h-[256px] sm:h-[300px]">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true" className="absolute -inset-x-8 bottom-0 h-[86px] w-[calc(100%+4rem)] sm:-inset-x-10 sm:w-[calc(100%+5rem)]">
              <path d="M0 40C80 0 170 10 240 34s110 16 160-8V100H0Z" fill="#A6E04F" />
              <path d="M0 62c90-30 190-26 270 4s90 10 130-6V100H0Z" fill="#80C924" />
              <path d="M0 84c120-18 260-14 400 0V100H0Z" fill="#6BB31A" />
            </svg>

            {/* наклейка «5» */}
            <div className="absolute bottom-[58px] left-0 grid size-[104px] animate-wiggle place-items-center rounded-full bg-white text-center shadow-[0_6px_0_rgb(0_0_0/0.1)] ring-[5px] ring-[#FF8A1F] [--r:-6deg] min-[390px]:size-[112px]">
              <p aria-hidden="true" className="font-display leading-none text-violet">
                <span className="block text-[3.1rem] font-black">5</span>
                <span className="mx-auto block max-w-[7.5ch] text-[0.66rem] font-extrabold leading-tight">{t.food.bigLabel.trim().replace(/^-/, "")}</span>
              </p>
            </div>

            {/* фрукты вокруг */}
            <AppleArt className="absolute bottom-[166px] left-[30%] w-11 animate-float [--r:10deg]" />
            <BerriesArt className="absolute bottom-[34px] left-[34%] w-9 animate-bob [animation-delay:-1s]" />
            <CarrotArt className="absolute bottom-[150px] left-[2%] w-10 animate-float [--r:-14deg] [animation-delay:-2s]" />
            <LeafArt className="absolute bottom-[30px] left-[8%] w-8 animate-bob [animation-delay:-.6s]" />

            <div className="absolute bottom-[14px] right-[-4px]">
              <MascotFigure
                pose="food"
                variant="bounce"
                size="custom"
                floatIntensity={0.9}
                delay={0.2}
                say={t.food.mascotSay}
                bubbleSide="left"
                bubbleClassName="!top-[-8%]"
                className="w-[clamp(150px,46vw,214px)]"
                sizes="(max-width: 1024px) 220px"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 2. Дорожка приёмов пищи ── */}
      <div className="relative mt-10 sm:mx-auto sm:max-w-[560px]">
        <Reveal y={16}>
          <h3 className="text-[1.35rem] font-black leading-tight">{t.food.journeyTitle}</h3>
        </Reveal>

        <div className="relative mt-4">
          <svg viewBox="0 0 340 520" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
            <path d={ROAD} fill="none" stroke="#FFF4A8" strokeWidth="30" strokeLinecap="round" />
            <motion.path
              d={ROAD}
              fill="none"
              stroke="#FFC93C"
              strokeWidth="8"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <path d={ROAD} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
          </svg>

          <ol className="relative">
            {meals.map(({ id, icon: Icon }, i) => {
              const L = stopLook[id];
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={id}
                  className={`flex h-[104px] items-center gap-3 ${right ? "flex-row-reverse" : ""}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ type: "spring", stiffness: 320, damping: 13, delay: 0.08 }}
                >
                  {/* «тарелка» с иллюстрацией */}
                  <span
                    aria-hidden="true"
                    className={`relative grid size-[84px] shrink-0 place-items-center shadow-[0_5px_0_rgb(0_0_0/0.14)] ring-[5px] ring-white ${L.plate} ${plateShape[i]}`}
                  >
                    <Icon className={`size-9 ${L.icon}`} strokeWidth={2.2} />
                    <span className="absolute -left-1.5 -top-1.5 grid size-8 place-items-center rounded-full bg-violet font-display text-[0.95rem] font-black text-white ring-[3px] ring-white">
                      {i + 1}
                    </span>
                    <L.Fruit className={`absolute w-8 animate-bob ${L.fruit}`} style={{ animationDelay: `${i * -0.7}s` }} />
                  </span>
                  {/* подпись */}
                  <span
                    className={`min-w-0 rounded-[18px] bg-white px-3.5 py-2 shadow-soft ring-1 ring-violet-50 ${
                      right ? "rounded-tr-[6px] text-right" : "rounded-tl-[6px]"
                    }`}
                  >
                    <span className="block font-display text-[1.06rem] font-extrabold leading-tight text-violet">{t.food.meals[id]}</span>
                    <span className="block font-display text-[0.78rem] font-bold text-ink-soft">{i + 1} / 5</span>
                  </span>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <p className="mt-4 flex items-start gap-2 text-[0.85rem] text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-leaf-700" aria-hidden="true" />
          {t.food.note}
        </p>
      </div>
    </div>
  );
}
