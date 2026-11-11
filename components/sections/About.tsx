"use client";

import { motion } from "motion/react";
import { HeartHandshake, Blocks, Languages, CalendarClock, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Cube, Sparkle, Wave } from "@/components/ui/Decor";

type CardKey = "care" | "play" | "langs" | "schedule";

const cards: { key: CardKey; icon: LucideIcon; bg: string; iconBg: string; shape: string; offset: string }[] = [
  { key: "care", icon: HeartHandshake, bg: "bg-berry-50", iconBg: "bg-berry", shape: "rounded-[32px_32px_32px_10px]", offset: "" },
  { key: "play", icon: Blocks, bg: "bg-sun-50", iconBg: "bg-sun", shape: "rounded-[10px_32px_32px_32px]", offset: "sm:translate-y-8 lg:translate-y-5" },
  { key: "langs", icon: Languages, bg: "bg-sky-50", iconBg: "bg-sky", shape: "rounded-[32px_10px_32px_32px]", offset: "" },
  { key: "schedule", icon: CalendarClock, bg: "bg-leaf-50", iconBg: "bg-leaf", shape: "rounded-[32px_32px_10px_32px]", offset: "sm:translate-y-8 lg:translate-y-5" },
];

export function About() {
  const { t } = useI18n();
  const [p1, p2] = assets.aboutPhotos;

  return (
    <section id="about" aria-labelledby="about-title" className="section-clip relative bg-white">
      <div className="container-site section-y !pt-10 lg:!pb-12 lg:!pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* Коллаж: на телефоне идёт после текста */}
          <Reveal className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:max-w-[440px]">
            <div className="relative aspect-[1/0.92]">
              <PhotoSlot
                photo={p1}
                alt={t.about.photoAlt}
                tone="sky"
                variant={0}
                className="absolute left-0 top-0 h-[84%] w-[80%] rounded-[44%_56%_50%_50%/50%_42%_58%_50%] shadow-soft"
              />
              <PhotoSlot
                photo={p2}
                alt={t.about.photoAlt}
                tone="sun"
                variant={2}
                sizes="260px"
                className="absolute bottom-0 right-0 aspect-square w-[44%] rounded-full shadow-lift ring-[6px] ring-white"
              />
              <Cube className="absolute -top-2 right-[14%] w-12 animate-float [--r:12deg] sm:w-14 lg:w-11" color="#E83A32" />
              <Sparkle className="absolute bottom-[30%] left-[-2%] w-6 animate-twinkle" color="#80C924" />
              {/* Адам «показывает» садик: ширина — доля коллажа, поэтому масштабируется вместе с ним */}
              <div className="absolute -bottom-6 left-[-3%] w-[40%] sm:w-[42%]">
                <MascotFigure
                  pose="about"
                  variant="float"
                  size="custom"
                  floatIntensity={0.8}
                  delay={0.2}
                  say={t.about.mascotSay}
                  className="w-full"
                  sizes="(max-width: 1024px) 45vw, 200px"
                />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              id="about-title"
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              subtitle={t.about.text}
              tone="berry"
            />

            <ul className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 sm:pb-8 lg:mt-7 lg:gap-3.5 lg:pb-5">
              {cards.map(({ key, icon: Icon, bg, iconBg, shape, offset }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={offset}
                >
                  <div
                    className={`group flex h-full gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 sm:flex-col sm:gap-3 sm:p-6 lg:gap-2.5 lg:p-5 ${bg} ${shape}`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl lg:size-10 lg:rounded-xl ${iconBg} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                    >
                      <Icon className={`size-6 lg:size-5 ${key === "play" ? "text-violet" : "text-white"}`} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] font-extrabold lg:text-[1.05rem]">{t.about.cards[key].title}</h3>
                      <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-soft lg:mt-1 lg:text-[0.92rem]">
                        {t.about.cards[key].text}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Wave fill="#FFFCF5" variant={1} />
    </section>
  );
}
