"use client";

import { motion } from "motion/react";
import { ArrowDown, Clock3, UtensilsCrossed, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { scrollToSection } from "@/lib/hooks";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Cube, Glow, Sparkle, Wave } from "@/components/ui/Decor";
import { Mascot } from "@/components/ui/Mascot";
import { HeroVideo } from "@/components/hero/HeroVideo";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

/**
 * Первый экран.
 * Мобильная композиция: бейдж → заголовок → текст → WhatsApp → видео → преимущества.
 * Десктоп (≥1024px): две колонки — текст слева, видео справа, центрирование по высоте.
 * Сетка описана в app/globals.css (.hero-grid).
 */
export function Hero() {
  const { t } = useI18n();

  const perks = [
    { icon: Clock3, label: t.hero.perkHours, note: t.hero.perkHoursNote, cls: "bg-sky-50 text-sky-700" },
    { icon: UtensilsCrossed, label: t.hero.perkFood, cls: "bg-berry-50 text-berry-700" },
    { icon: Languages, label: t.hero.perkLangs, cls: "bg-leaf-50 text-leaf-700" },
  ];

  return (
    <section id="top" aria-labelledby="hero-title" className="section-clip relative bg-milk">
      {/* фоновая подсветка */}
      <Glow className="-left-32 top-10 size-[340px] opacity-35 lg:size-[520px]" color="#FFE326" />
      <Glow className="-right-24 top-1/3 size-[300px] opacity-25 lg:size-[460px]" color="#159FE2" />
      <Sparkle className="absolute left-[46%] top-8 hidden w-7 animate-twinkle lg:block" color="#FFE326" />
      <Sparkle className="absolute left-[4%] top-[58%] hidden w-5 animate-twinkle [animation-delay:1.4s] lg:block" color="#E83A32" />
      <Cube className="absolute -right-3 top-6 w-12 animate-float [--r:14deg] lg:hidden" color="#80C924" />

      <div className="container-site relative">
        <div className="hero-grid pb-10 pt-6 sm:pt-10 lg:min-h-[calc(100svh-var(--header-h)-40px)] lg:pb-14 lg:pt-6">
          <motion.div data-area="badge" {...fadeUp(0)}>
            <span className="eyebrow bg-white text-violet shadow-soft ring-1 ring-violet-100">
              <span className="grid size-6 place-items-center rounded-full bg-sun">
                <Sparkle className="size-3.5" color="#302079" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          <h1
            id="hero-title"
            data-area="title"
            className="h-display mt-5 max-w-[15ch] lg:mt-6 lg:max-w-none"
          >
            <span className="relative inline-block whitespace-nowrap">
              {t.hero.titleBrand}
              <svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[0.28em] w-full"
              >
                <path d="M3 14C80 4 200 2 297 10" stroke="#FFE326" strokeWidth="9" strokeLinecap="round" fill="none" />
              </svg>
            </span>{" "}
            <span className="text-ink">{t.hero.titleRest}</span>
          </h1>

          <motion.p data-area="sub" className="text-lead mt-5 max-w-[34rem]" {...fadeUp(0.12)}>
            {t.hero.subtitle}
          </motion.p>

          <motion.div data-area="cta" className="mt-7 flex flex-wrap items-center gap-3" {...fadeUp(0.2)}>
            <a
              href={whatsappLink(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa w-full sm:w-auto"
            >
              <WhatsAppIcon className="size-5" />
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="btn btn-ghost hidden sm:inline-flex"
            >
              {t.hero.ctaSecondary}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </motion.div>

          <div data-area="media" className="relative mt-10 lg:mt-0 lg:self-center">
            <HeroVideo />
            {/* Адам приветствует: на телефоне — в углу рамки, на десктопе — выходит за её край */}
            <div className="pointer-events-none absolute -bottom-6 left-1 lg:-bottom-8 lg:-left-14 xl:-left-20">
              <Mascot
                pose="welcome"
                say={t.hero.mascotSay}
                bubbleClassName="hidden sm:block"
                className="w-[92px] min-[400px]:w-[108px] lg:w-[150px] xl:w-[176px]"
                sizes="(max-width: 1024px) 120px, 180px"
                priority
              />
            </div>
          </div>

          <motion.ul
            data-area="perks"
            className="mt-12 grid gap-2.5 sm:grid-cols-3 lg:mt-9 lg:grid-cols-[auto_auto] lg:justify-start lg:gap-3"
            {...fadeUp(0.28)}
          >
            {perks.map(({ icon: Icon, label, note, cls }, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 rounded-[20px] bg-white px-3.5 py-3 shadow-soft ring-1 ring-violet-50 ${
                  i === 2 ? "lg:col-span-2 lg:w-max" : ""
                }`}
              >
                <span className={`grid size-10 shrink-0 place-items-center rounded-[14px] ${cls}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-[0.97rem] font-extrabold leading-tight text-violet">
                  {label}
                  {note ? <span className="ml-1.5 font-bold text-ink-soft">{note}</span> : null}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <Wave fill="#FFFFFF" />
    </section>
  );
}
