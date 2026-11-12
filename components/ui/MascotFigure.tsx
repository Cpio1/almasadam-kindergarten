"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type DOMKeyframesDefinition,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import {
  Hand,
  House,
  BookOpen,
  Languages,
  Apple,
  CalendarDays,
  MessageCircleHeart,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import { assets, type MascotPose } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { Sparkle } from "./Decor";

/* ───────────────────────── Настройки ───────────────────────── */

/**
 * Сценарии движения Әлема. Все — только transform (GPU), мягкие и медленные.
 *  float  — плавное покачивание вверх-вниз
 *  wave   — приветствие: покачивание + лёгкий наклон (Hero)
 *  sway   — мягкое раскачивание из стороны в сторону (Языки)
 *  bounce — очень мягкий «прыжок» с паузой (Питание)
 *  hover  — почти неподвижен, заметно оживает при наведении (Программы)
 *  calm   — спокойное «дыхание», приглашающее (Контакты, Новости)
 */
export type MascotVariant = "float" | "wave" | "sway" | "bounce" | "hover" | "calm";

/** Адаптивная ширина: на телефоне — нижняя граница, на десктопе — верхняя. */
export type MascotSize = "sm" | "md" | "lg" | "xl" | "custom";

const sizeWidth: Record<Exclude<MascotSize, "custom">, string> = {
  sm: "clamp(104px, 6vw + 70px, 160px)",
  md: "clamp(128px, 8vw + 84px, 200px)",
  lg: "clamp(150px, 10vw + 100px, 250px)",
  xl: "clamp(170px, 12vw + 110px, 300px)",
};

const sizeHint: Record<Exclude<MascotSize, "custom">, string> = {
  sm: "160px",
  md: "200px",
  lg: "250px",
  xl: "300px",
};

const poseIcon: Record<MascotPose, LucideIcon> = {
  welcome: Hand,
  about: House,
  reading: BookOpen,
  languages: Languages,
  food: Apple,
  news: CalendarDays,
  contact: MessageCircleHeart,
  documents: FolderOpen,
};

/**
 * Если для позы нет собственного файла — берём близкую по смыслу.
 * «О нас»: Әлем показывает рукой (поза contact) — «показывает детский сад».
 * Чтобы использовать отдельную картинку, положите public/mascot/adam-about.png.
 */
const poseFallback: Partial<Record<MascotPose, MascotPose>> = { about: "contact", documents: "reading" };

const easeInOut = [0.45, 0, 0.55, 1] as const;

function loopFor(variant: MascotVariant, k: number): { keyframes: DOMKeyframesDefinition; transition: Transition } {
  const loop = (duration: number, extra: Transition = {}): Transition => ({
    duration,
    repeat: Infinity,
    ease: easeInOut,
    ...extra,
  });
  switch (variant) {
    case "wave":
      return {
        keyframes: { y: [0, -10 * k, 0], rotate: [0, -2.5 * k, 0, 2 * k, 0] },
        transition: { y: loop(4.6), rotate: loop(6.2) },
      };
    case "sway":
      return {
        keyframes: { rotate: [-2.5 * k, 2.5 * k, -2.5 * k], y: [0, -5 * k, 0] },
        transition: { rotate: loop(6), y: loop(3) },
      };
    case "bounce":
      return {
        keyframes: { y: [0, -12 * k, 0, -4 * k, 0], scaleY: [1, 1.012, 0.988, 1.006, 1] },
        transition: {
          y: loop(2.4, { repeatDelay: 1.8, times: [0, 0.32, 0.6, 0.8, 1] }),
          scaleY: loop(2.4, { repeatDelay: 1.8, times: [0, 0.32, 0.6, 0.8, 1] }),
        },
      };
    case "hover":
      return { keyframes: { y: [0, -5 * k, 0] }, transition: { y: loop(6) } };
    case "calm":
      return {
        keyframes: { y: [0, -7 * k, 0], rotate: [0, 1.2 * k, 0] },
        transition: { y: loop(5.6), rotate: loop(7.4) },
      };
    case "float":
    default:
      return { keyframes: { y: [0, -10 * k, 0] }, transition: { y: loop(5) } };
  }
}

const hoverFor: Record<MascotVariant, TargetAndTransition> = {
  float: { y: -6, scale: 1.02 },
  wave: { y: -8, rotate: -3, scale: 1.03 },
  sway: { y: -6, rotate: 2, scale: 1.02 },
  bounce: { y: -10, scale: 1.03 },
  hover: { y: -14, rotate: -4, scale: 1.05 },
  calm: { y: -6, scale: 1.02 },
};

/* ───────────────────────── Компонент ───────────────────────── */

type Props = {
  /** Поза (какая картинка из public/mascot) */
  pose: MascotPose;
  /** Сценарий движения */
  variant?: MascotVariant;
  /** Пресет ширины. "custom" — ширину задаёт className */
  size?: MascotSize;
  /** Включить зацикленное движение (появление и hover работают всегда) */
  animated?: boolean;
  /** Сила движения: 0.5 — очень мягко, 1 — обычно, 1.5 — заметнее */
  floatIntensity?: number;
  /** Задержка появления, с */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Реплика в облачке */
  say?: string;
  bubbleSide?: "left" | "right";
  /** Доп. классы облачка, например "hidden sm:block" */
  bubbleClassName?: string;
  priority?: boolean;
  /** Атрибут sizes для next/image (по умолчанию — из пресета) */
  sizes?: string;
};

/**
 * Фирменный персонаж Әлем с мягкой анимацией (Motion for React).
 *
 * Изображения: public/mascot/adam-<pose>.png|webp — один и тот же персонаж во всех позах.
 * Пока файла нет — фирменная заглушка без сломанных картинок.
 *
 * Производительность: анимируются только transform/opacity, цикл ставится на паузу,
 * когда Әлем вне экрана. prefers-reduced-motion — движение отключается.
 */
export function MascotFigure({
  pose,
  variant = "float",
  size = "md",
  animated = true,
  floatIntensity = 1,
  delay = 0,
  className = "",
  style,
  say,
  bubbleSide = "right",
  bubbleClassName = "",
  priority = false,
  sizes,
}: Props) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px 0px" });

  const fallbackPose = poseFallback[pose];
  const img = assets.mascot[pose] ?? (fallbackPose ? assets.mascot[fallbackPose] : null);
  const Icon = poseIcon[pose];

  const loopRef = useRef<HTMLDivElement>(null);
  const playLoop = animated && !reduce && inView;

  // Явный старт цикла, когда Әлем виден, и явная остановка с плавным возвратом в покой, когда нет.
  useEffect(() => {
    const el = loopRef.current;
    if (!el) return;
    if (!playLoop) {
      const settle = animate(el, { y: 0, rotate: 0, scaleY: 1 }, { duration: 0.6 });
      return () => settle.stop();
    }
    const { keyframes, transition } = loopFor(variant, floatIntensity);
    const loop = animate(el, keyframes, transition);
    return () => loop.stop();
  }, [playLoop, variant, floatIntensity]);

  const width = size === "custom" ? undefined : sizeWidth[size];
  const imgSizes = sizes ?? (size === "custom" ? "(max-width: 1024px) 45vw, 280px" : sizeHint[size]);

  return (
    <motion.div
      ref={ref}
      className={`relative shrink-0 ${className}`}
      style={{ width, ...style }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Слой hover — поверх него зацикленное движение */}
      <motion.div
        className="pointer-events-auto"
        whileHover={reduce ? undefined : hoverFor[variant]}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        {/* Слой зацикленного движения: запускается и останавливается императивно (см. useEffect выше) */}
        <div
          ref={loopRef}
          style={{ transformOrigin: "50% 100%", willChange: playLoop ? "transform" : undefined }}
        >
          {img ? (
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={t.mascot.alt}
              priority={priority}
              sizes={imgSizes}
              draggable={false}
              className="h-auto w-full select-none drop-shadow-[0_18px_22px_rgba(48,32,121,0.22)]"
            />
          ) : (
            <MascotPlaceholder icon={Icon} label={t.mascot.alt} name={t.mascot.name} />
          )}
        </div>
      </motion.div>

      {say ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: delay + 0.45 }}
          style={{ transformOrigin: bubbleSide === "right" ? "0% 100%" : "100% 100%" }}
          className={`pointer-events-none absolute top-[-4%] z-10 rounded-[20px] bg-white px-3.5 py-2 font-display text-[0.9rem] font-extrabold leading-snug text-violet shadow-soft ring-1 ring-violet-100 sm:text-[0.95rem] ${
            bubbleSide === "right" ? "left-[68%] rounded-bl-[6px]" : "right-[68%] rounded-br-[6px]"
          } ${bubbleClassName}`}
        >
          <span className="block w-max max-w-[11rem] sm:max-w-[13rem]">{say}</span>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function MascotPlaceholder({ icon: Icon, label, name }: { icon: LucideIcon; label: string; name: string }) {
  return (
    <div className="relative grid aspect-[4/5] w-full place-items-center" role="img" aria-label={label}>
      <div className="absolute inset-x-[6%] bottom-[4%] top-[10%] rounded-[46%_54%_48%_52%/55%_50%_50%_45%] border-2 border-dashed border-sun bg-gradient-to-b from-sun-100 to-sun-50" />
      <div className="absolute bottom-[2%] left-1/2 h-[7%] w-[56%] -translate-x-1/2 rounded-[50%] bg-violet/10 blur-[2px]" />
      <div className="relative flex flex-col items-center gap-[0.6em] text-[clamp(12px,1.1vw,15px)]">
        <span className="grid aspect-square w-[46%] min-w-14 place-items-center rounded-full bg-white shadow-soft ring-4 ring-sun">
          <Icon className="size-[48%] text-violet" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-violet px-3 py-1 font-display text-[0.95em] font-extrabold text-white">
          {name}
        </span>
      </div>
      <Sparkle className="absolute right-[10%] top-[14%] w-[12%] animate-twinkle" color="#159FE2" />
      <Sparkle className="absolute bottom-[22%] left-[8%] w-[8%] animate-twinkle [animation-delay:1.2s]" color="#E83A32" />
    </div>
  );
}
