"use client";

import { motion } from "motion/react";
import { HeartHandshake, Blocks, Languages, CalendarClock, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Wave } from "@/components/ui/Decor";
import { Bloom, Cube3D, CubeStack, Organic, WaveRibbon } from "@/components/ui/Shapes";

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
      {/* телефон: кубик рядом с бейджем; десктоп: фигуры в полях за пределами контента */}
      <Cube3D className="absolute right-4 top-5 w-11 animate-pop [--r:8deg] sm:right-8 sm:w-14 lg:hidden" color="#FFE326" letter="Ә" letterColor="#302079" />
      <Bloom className="absolute -right-8 top-14 hidden w-24 animate-spin-slower xl:block" petals={["#159FE2", "#CDECFB"]} />
      <Cube3D className="absolute -left-4 bottom-20 hidden w-16 animate-float [--r:-12deg] xl:block" color="#80C924" letter="Б" />
      <div className="container-site section-y !pt-10 lg:!pb-12 lg:!pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* Коллаж: на телефоне идёт после текста */}
          <Reveal className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:max-w-[440px]">
            <div className="relative aspect-[1/0.92]">
              {/* «О нас» — тема кубиков: органическое пятно, волна-лента, пирамидка, ромашка */}
              <Organic className="absolute -left-[8%] top-[22%] w-[52%] opacity-90" color="#FFF4A8" />
              <WaveRibbon className="absolute -right-[4%] bottom-[46%] w-[34%] animate-sway [--r:-8deg] sm:w-[30%]" />
              {/* рамка-«наклейка»: смещённая пунктирная арка за фото */}
              <div
                aria-hidden="true"
                className="shape-arch absolute left-[11%] top-[4%] h-[86%] w-[66%] border-[3px] border-dashed border-sky"
              />
              <PhotoSlot
                photo={p1}
                alt={t.about.photoAlt}
                tone="sky"
                variant={0}
                className="shape-arch absolute left-[6%] top-0 h-[86%] w-[66%] shadow-soft ring-[5px] ring-white"
              />
              {/* фигурная «фестонная» рамка круглого фото */}
              <div
                aria-hidden="true"
                className="absolute bottom-[1%] right-[-3%] aspect-square w-[50%] animate-spin-slower bg-sun"
                style={{ clipPath: "url(#clip-scallop)" }}
              />
              <PhotoSlot
                photo={p2}
                alt={t.about.photoAlt}
                tone="sun"
                variant={2}
                sizes="260px"
                className="absolute bottom-[4%] right-0 aspect-square w-[44%] rounded-full shadow-lift ring-[5px] ring-white"
              />
              <CubeStack className="absolute -top-5 right-[12%] w-[22%] animate-float [--r:-4deg] sm:w-[19%]" />
              <Bloom className="absolute right-[1%] top-[36%] hidden w-[11%] animate-spin-slower sm:block" />
              {/* Әлем «показывает» садик: ширина — доля коллажа, поэтому масштабируется вместе с ним */}
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
