"use client";

import { motion } from "motion/react";
import { HeartHandshake, Blocks, Languages, CalendarClock, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Cube, DotGrid, HalfCircle, SoftStar, Sparkle, Wave } from "@/components/ui/Decor";

type CardKey = "care" | "play" | "langs" | "schedule";

const cards: { key: CardKey; icon: LucideIcon; bg: string; iconBg: string; iconShape: string }[] = [
  { key: "care", icon: HeartHandshake, bg: "bg-berry-50", iconBg: "bg-berry", iconShape: "rounded-full" },
  { key: "play", icon: Blocks, bg: "bg-sun-50", iconBg: "bg-sun", iconShape: "rounded-[14px] rotate-6" },
  { key: "langs", icon: Languages, bg: "bg-sky-50", iconBg: "bg-sky", iconShape: "shape-arch" },
  { key: "schedule", icon: CalendarClock, bg: "bg-leaf-50", iconBg: "bg-leaf", iconShape: "shape-blob" },
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
              {/* фигуры частично за фотографиями */}
              <HalfCircle className="absolute -left-[6%] top-[38%] w-[46%] -rotate-90 opacity-90" color="#FFF4A8" />
              <DotGrid className="absolute right-[2%] top-[4%] hidden w-14 opacity-20 sm:block" color="#302079" />
              <PhotoSlot
                photo={p1}
                alt={t.about.photoAlt}
                tone="sky"
                variant={0}
                className="shape-arch absolute left-[6%] top-0 h-[86%] w-[66%] shadow-soft"
              />
              <PhotoSlot
                photo={p2}
                alt={t.about.photoAlt}
                tone="sun"
                variant={2}
                sizes="260px"
                className="absolute bottom-[4%] right-0 aspect-square w-[44%] rounded-full shadow-lift ring-[6px] ring-white"
              />
              <Cube className="absolute -top-2 right-[22%] w-11 animate-float [--r:12deg] lg:w-10" color="#E83A32" />
              <SoftStar className="absolute right-[6%] top-[34%] hidden w-9 animate-wiggle sm:block" color="#80C924" />
              <Sparkle className="absolute bottom-[30%] left-[-2%] hidden w-6 animate-twinkle sm:block" color="#159FE2" />
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

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-6 lg:gap-3">
              {cards.map(({ key, icon: Icon, bg, iconBg, iconShape }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div
                    className={`group flex h-full flex-col gap-2.5 rounded-[24px] p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 lg:p-4 ${bg}`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center transition-transform duration-300 group-hover:scale-105 lg:size-10 ${iconBg} ${iconShape}`}
                    >
                      <Icon
                        className={`size-5 ${iconShape.includes("rotate-6") ? "-rotate-6" : ""} ${key === "play" ? "text-violet" : "text-white"}`}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="text-[1.08rem] font-extrabold lg:text-[1.02rem]">{t.about.cards[key].title}</h3>
                      <p className="mt-0.5 text-[0.88rem] leading-snug text-ink-soft lg:text-[0.88rem]">
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
