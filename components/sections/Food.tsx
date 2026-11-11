"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { meals } from "@/data/meals";
import { tones } from "@/lib/tones";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mascot } from "@/components/ui/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { AppleArt, BerriesArt, CarrotArt, LeafArt, PlateArt, Wave } from "@/components/ui/Decor";

export function Food() {
  const { t } = useI18n();

  return (
    <section id="food" aria-labelledby="food-title" className="section-clip relative bg-milk">
      <div className="container-site section-y !pt-8 lg:!pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="food-title"
              eyebrow={t.food.eyebrow}
              title={t.food.title}
              subtitle={t.food.text}
              tone="leaf"
            />

            {/* Крупная цифра 5 + фрукты + Адам */}
            <Reveal delay={0.1} className="relative mt-8 flex flex-wrap items-end gap-2 sm:mt-10">
              <div className="relative isolate">
                <PlateArt className="absolute left-1/2 top-1/2 -z-10 w-[120%] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-100" />
                <p
                  aria-label={t.hero.perkFood}
                  className="px-6 font-display text-[clamp(7rem,5rem+9vw,11rem)] font-black leading-[0.9] text-violet"
                >
                  <span aria-hidden="true">5</span>
                </p>
                <AppleArt className="absolute -right-2 top-0 w-12 animate-float [--r:10deg] sm:w-14" />
                <CarrotArt className="absolute -left-3 bottom-1 w-11 animate-float [--r:-12deg] [animation-delay:1s] sm:w-12" />
                <LeafArt className="absolute -bottom-2 right-3 w-8 [--r:20deg]" />
              </div>
              <div className="pb-4">
                <p
                  aria-hidden="true"
                  className="max-w-[9ch] font-display text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] font-black leading-[1.05] text-violet"
                >
                  {t.food.bigLabel.trim()}
                </p>
                <BerriesArt className="mt-2 w-10" />
              </div>
              <div className="ml-auto self-center pt-6 min-[400px]:pt-0">
                <Mascot pose="food" say={t.food.mascotSay} bubbleSide="left" className="w-[96px] sm:w-[130px] lg:w-[150px]" sizes="160px" />
              </div>
            </Reveal>
          </div>

          {/* Временная линия приёмов пищи */}
          <Reveal delay={0.05}>
            <div className="relative rounded-[36px] bg-white p-6 shadow-soft ring-1 ring-violet-50 sm:p-8 lg:rounded-[44px_44px_44px_14px]">
              <h3 className="text-[1.2rem] font-extrabold">{t.food.timelineTitle}</h3>
              <ol className="relative mt-6">
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 left-[23px] top-6 w-0 border-l-[3px] border-dashed border-violet-100"
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
                      className="relative flex items-center gap-4 py-2.5"
                    >
                      <span
                        className={`relative grid size-12 shrink-0 place-items-center rounded-full ring-[5px] ring-white ${c.solid}`}
                      >
                        <Icon className={`size-5 ${tone === "sun" ? "text-violet" : "text-white"}`} aria-hidden="true" />
                      </span>
                      <span className={`flex flex-1 items-center justify-between gap-3 rounded-[18px] px-4 py-3 ${c.soft}`}>
                        <span className="font-display text-[1.05rem] font-extrabold text-violet">
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
              <p className="mt-5 flex items-start gap-2 text-[0.9rem] text-ink-soft">
                <Info className="mt-0.5 size-4 shrink-0 text-leaf-700" aria-hidden="true" />
                {t.food.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <Wave fill="#FFFFFF" />
    </section>
  );
}
