"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Cloud, Cube, Sparkle } from "@/components/ui/Decor";

/**
 * Фирменная заглушка вместо видео: небо, солнце, холмы и кубики.
 * Никаких технических надписей — выглядит как часть дизайна.
 */
export function HeroVideoPlaceholder({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto aspect-[4/3.6] overflow-hidden rounded-[32px] shadow-lift ring-4 ring-white lg:aspect-[1/1.04] lg:rounded-[44px] ${className}`}
      style={{ width: "min(100%, calc(var(--hero-media-max-h) * var(--hero-media-ar, 1.11)))" }}
      aria-hidden="true"
    >
      {/* небо */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#3d2a94_0%,#2a55c9_55%,#159fe2_100%)]" />
      <div className="dots-bg absolute inset-0 opacity-40 mix-blend-overlay" />

      {/* солнце */}
      <div className="absolute right-[12%] top-[10%] aspect-square w-[22%] rounded-full bg-sun shadow-[0_0_0_14px_rgba(255,227,38,0.18),0_0_0_32px_rgba(255,227,38,0.08)]" />

      {/* облака */}
      <Cloud className="absolute left-[-4%] top-[16%] w-[34%] opacity-90 animate-float-slow" />
      <Cloud className="absolute right-[26%] top-[34%] w-[20%] opacity-60 animate-float [animation-delay:1.5s]" />

      {/* звёзды */}
      <Sparkle className="absolute left-[38%] top-[9%] w-[5%] animate-twinkle" color="#FFE326" />
      <Sparkle className="absolute left-[12%] top-[46%] w-[3.5%] animate-twinkle [animation-delay:.8s]" color="#fff" />
      <Sparkle className="absolute right-[8%] top-[48%] w-[4%] animate-twinkle [animation-delay:1.6s]" color="#fff" />

      {/* холмы */}
      <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full">
        <path d="M0 70C70 30 140 40 210 70s130 40 190 0v90H0Z" fill="#80C924" />
        <path d="M0 110c80-40 170-30 240 0s110 20 160-6v56H0Z" fill="#6BB31A" />
      </svg>

      {/* кубики */}
      <Cube className="absolute bottom-[24%] left-[10%] w-[15%] animate-float [--r:-8deg]" color="#E83A32" letter="А" />
      <Cube className="absolute bottom-[30%] left-[27%] w-[11%] animate-float [--r:6deg] [animation-delay:.6s]" color="#FFE326" letter="Ә" />
      <Cube className="absolute bottom-[20%] right-[12%] w-[14%] animate-float [--r:10deg] [animation-delay:1.1s]" color="#159FE2" letter="B" />

      {/* приветствие */}
      <div className="absolute inset-x-0 top-[33%] flex -translate-y-1/2 flex-col items-center px-6 text-center">
        <p className="font-display text-[clamp(1.5rem,1rem+2.4vw,2.6rem)] font-black leading-tight text-white drop-shadow-[0_4px_14px_rgba(20,10,70,0.35)]">
          {t.hero.placeholderTitle}
        </p>
        <p className="mt-1.5 font-display text-[clamp(0.9rem,0.8rem+0.5vw,1.15rem)] font-bold text-white/85">
          {t.hero.placeholderText}
        </p>
      </div>
    </motion.div>
  );
}
