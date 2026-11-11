"use client";

import Image from "next/image";
import {
  Hand,
  House,
  BookOpen,
  Languages,
  Apple,
  CalendarDays,
  MessageCircleHeart,
  type LucideIcon,
} from "lucide-react";
import { assets, type MascotPose } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { Sparkle } from "./Decor";

const poseIcon: Record<MascotPose, LucideIcon> = {
  welcome: Hand,
  about: House,
  reading: BookOpen,
  languages: Languages,
  food: Apple,
  news: CalendarDays,
  contact: MessageCircleHeart,
};

/**
 * Если для позы нет собственного файла — берём близкую по смыслу.
 * «О нас»: Адам показывает рукой (поза contact) — «показывает детский сад».
 * Чтобы использовать отдельную картинку, положите public/mascot/adam-about.png.
 */
const poseFallback: Partial<Record<MascotPose, MascotPose>> = { about: "contact" };

type Props = {
  pose: MascotPose;
  /** Ширина задаётся классом, например "w-40 lg:w-56" */
  className?: string;
  /** Реплика в облачке */
  say?: string;
  bubbleSide?: "left" | "right";
  /** Доп. классы облачка, например "hidden sm:block" */
  bubbleClassName?: string;
  float?: boolean;
  priority?: boolean;
  sizes?: string;
};

/**
 * Фирменный персонаж Адам.
 * Изображения берутся из public/mascot/adam-<pose>.png|webp (один и тот же персонаж во всех позах).
 * Пока файла нет — показывается фирменная заглушка-«место для Адама», без сломанных картинок.
 */
export function Mascot({
  pose,
  className = "w-40",
  say,
  bubbleSide = "right",
  bubbleClassName = "",
  float = true,
  priority = false,
  sizes = "(max-width: 1024px) 40vw, 280px",
}: Props) {
  const { t } = useI18n();
  const fallbackPose = poseFallback[pose];
  const img = assets.mascot[pose] ?? (fallbackPose ? assets.mascot[fallbackPose] : null);
  const Icon = poseIcon[pose];

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div className={float ? "animate-float" : undefined}>
        {img ? (
          <Image
            src={img.src}
            width={img.width}
            height={img.height}
            alt={t.mascot.alt}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full select-none drop-shadow-[0_18px_24px_rgba(48,32,121,0.22)]"
            draggable={false}
          />
        ) : (
          <div
            className="relative grid aspect-[4/5] w-full place-items-center"
            role="img"
            aria-label={t.mascot.alt}
          >
            {/* мягкая подложка */}
            <div className="absolute inset-x-[6%] bottom-[4%] top-[10%] rounded-[46%_54%_48%_52%/55%_50%_50%_45%] border-2 border-dashed border-sun bg-gradient-to-b from-sun-100 to-sun-50" />
            <div className="absolute bottom-[2%] left-1/2 h-[7%] w-[56%] -translate-x-1/2 rounded-[50%] bg-violet/10 blur-[2px]" />
            <div className="relative flex flex-col items-center gap-[0.6em] text-[clamp(12px,1.1vw,15px)]">
              <span className="grid aspect-square w-[46%] min-w-14 place-items-center rounded-full bg-white shadow-soft ring-4 ring-sun">
                <Icon className="size-[48%] text-violet" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="rounded-full bg-violet px-3 py-1 font-display text-[0.95em] font-extrabold text-white">
                {t.mascot.name}
              </span>
            </div>
            <Sparkle className="absolute right-[10%] top-[14%] w-[12%] animate-twinkle" color="#159FE2" />
            <Sparkle className="absolute bottom-[22%] left-[8%] w-[8%] animate-twinkle [animation-delay:1.2s]" color="#E83A32" />
          </div>
        )}
      </div>

      {say ? (
        <div
          className={`absolute top-[-6%] z-10 max-w-[13rem] rounded-[20px] bg-white px-3.5 py-2 font-display text-[0.9rem] font-extrabold leading-snug text-violet shadow-soft ring-1 ring-violet-100 sm:text-[0.95rem] ${
            bubbleSide === "right"
              ? "left-[70%] rounded-bl-[6px]"
              : "right-[70%] rounded-br-[6px]"
          } ${bubbleClassName}`}
        >
          <span className="block w-max max-w-[11rem] sm:max-w-[13rem]">{say}</span>
        </div>
      ) : null}
    </div>
  );
}
