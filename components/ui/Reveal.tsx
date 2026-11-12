"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** "up" — подъём снизу (по умолчанию), "zoom" — мягкое увеличение, "pop" — с лёгким пружинным отскоком */
  effect?: "up" | "zoom" | "pop";
};

/**
 * Плавное появление при прокрутке. Анимирует только opacity/transform — дёшево для GPU.
 * Срабатывает один раз; prefers-reduced-motion учитывается глобально (MotionConfig reducedMotion="user").
 * Без JavaScript контент виден (см. <noscript> в app/layout.tsx).
 */
export function Reveal({ delay = 0, y = 24, effect = "up", children, ...rest }: Props) {
  const initial =
    effect === "zoom" ? { opacity: 0, scale: 0.94 } : effect === "pop" ? { opacity: 0, scale: 0.88, y: 12 } : { opacity: 0, y };
  const transition =
    effect === "pop"
      ? { type: "spring" as const, stiffness: 260, damping: 18, delay }
      : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
