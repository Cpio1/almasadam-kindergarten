"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { meals } from "@/data/meals";
import { tones } from "@/lib/tones";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { AppleArt, BerriesArt, CarrotArt, Cloud, Flower, LeafArt, PlateArt, Squiggle, Wave } from "@/components/ui/Decor";

export function Food() {
  const { t } = useI18n();

  return (
    <section id="food" aria-labelledby="food-title" className="section-clip relative bg-white">
      <Flower className="absolute -right-6 top-16 hidden w-20 animate-spin-slower opacity-90 lg:block" color="#FBD5D2" center="#FFE326" />
      <Cloud className="absolute left-[44%] top-8 hidden w-28 animate-drift lg:block" color="#EAF7FE" />
      <div className="container-site section-y relative !pt-8 lg:!pt-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-14">
          <div>
            <SectionHeading
              id="food-title"
              eyebrow={t.food.eyebrow}
              title={t.food.title}
              subtitle={t.food.text}
              tone="leaf"
            />

            {/* Крупная цифра 5 + фрукты + Адам */}
            <Reveal delay={0.1} className="relative mt-8 flex flex-wrap items-end gap-2 sm:mt-10 lg:mt-6">
              <div className="relative isolate">
                <PlateArt className="absolute left-1/2 top-1/2 -z-10 w-[120%] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-100" />
                <p
                  aria-label={t.hero.perkFood}
                  className="px-6 font-display text-[clamp(7rem,5rem+9vw,11rem)] lg:text-[clamp(6.5rem,3rem+5vw,8.75rem)] font-black leading-[0.9] text-violet"
                >
                  <span aria-hidden="true">5</span>
                </p>
                <AppleArt className="absolute -right-2 top-0 w-12 animate-float [--r:10deg] sm:w-14 lg:w-12" />
                <CarrotArt className="absolute -left-3 bottom-1 w-11 animate-float [--r:-12deg] [animation-delay:1s] sm:w-12" />
                <LeafArt className="absolute -bottom-2 right-3 w-8 animate-bob [animation-delay:.6s]" />
              </div>
              <div className="pb-4">
                <p
                  aria-hidden="true"
                  className="max-w-[9ch] font-display text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] font-black leading-[1.05] text-violet"
                >
                  {t.food.bigLabel.trim()}
                </p>
                <BerriesArt className="mt-2 w-10 animate-bob [animation-delay:1.4s]" />
              </div>
              <div className="ml-auto self-end pt-8 min-[460px]:pt-0">
                <MascotFigure
                  pose="food"
                  variant="bounce"
                  size="custom"
                  floatIntensity={0.9}
                  delay={0.2}
                  say={t.food.mascotSay}
                  bubbleSide="left"
                  className="w-[clamp(140px,40vw,172px)] lg:w-[clamp(168px,13vw,220px)]"
                  sizes="(max-width: 1024px) 180px, 220px"
                />
              </div>
            </Reveal>
          </div>

          {/* Временная линия приёмов пищи */}
          <Reveal delay={0.05} className="relative">
            {/* мягкая органическая подложка за карточкой */}
            <div aria-hidden="true" className="absolute -inset-3 -z-0 hidden animate-morph bg-leaf-50 sm:block lg:-inset-5" />
            <Squiggle className="absolute -bottom-5 left-8 z-10 w-24 animate-wiggle" color="#FFE326" />
            <div className="relative rounded-[32px] bg-white p-5 shadow-soft ring-1 ring-violet-50 sm:p-7 lg:p-6">
              <h3 className="text-[1.2rem] font-extrabold lg:text-[1.1rem]">{t.food.timelineTitle}</h3>
              <ol className="relative mt-6 lg:mt-4">
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 left-[23px] top-6 w-0 lg:left-[19px] border-l-[3px] border-dashed border-violet-100"
                />
                {meals.map(({ id, icon: Icon, tone }, i) => {
                  const c = tones[tone];
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="relative flex items-center gap-4 py-2.5 lg:gap-3.5 lg:py-1.5"
                    >
                      <span
                        className={`relative grid size-12 shrink-0 place-items-center rounded-full ring-[5px] lg:size-10 lg:ring-4 ring-white ${c.solid}`}
                      >
                        <Icon className={`size-5 lg:size-[18px] ${tone === "sun" ? "text-violet" : "text-white"}`} aria-hidden="true" />
                      </span>
                      <span className={`flex flex-1 items-center justify-between gap-3 rounded-[18px] px-4 py-3 lg:rounded-[14px] lg:py-2.5 ${c.soft}`}>
                        <span className="font-display text-[1.05rem] font-extrabold text-violet lg:text-[0.98rem]">
                          {t.food.meals[id]}
                        </span>
                        <span aria-hidden="true" className={`font-display text-sm font-black ${c.text} opacity-60`}>
                          {i + 1}/5
                        </span>
                      </span>
                    </motion.li>
                  );
                })}
              </ol>
              <p className="mt-4 flex items-start gap-2 text-[0.85rem] text-ink-soft">
                <Info className="mt-0.5 size-4 shrink-0 text-leaf-700" aria-hidden="true" />
                {t.food.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <Wave fill="#FFFCF5" />
    </section>
  );
}
