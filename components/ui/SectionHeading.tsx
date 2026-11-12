"use client";

import { motion } from "motion/react";
import type { ProgramTone } from "@/data/programs";
import { tones } from "@/lib/tones";
import { Sparkle } from "./Decor";

/** Заголовки: плавный подъём снизу с небольшим смещением, по очереди */
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: ProgramTone;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "sky",
  align = "left",
  invert = false,
  className = "",
}: Props) {
  const center = align === "center";
  return (
    <motion.div
      className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.09 }}
    >
      <motion.span
        variants={item}
        className={`eyebrow ${invert ? "bg-white/12 text-white" : `${tones[tone].soft} text-violet`}`}
      >
        <span className={`grid size-6 place-items-center rounded-full ${tones[tone].solid}`}>
          <Sparkle className="size-3.5" color={tone === "sun" ? "#302079" : "#fff"} />
        </span>
        {eyebrow}
      </motion.span>
      <motion.h2 variants={item} id={id} className={`h-section mt-4 lg:mt-3 ${invert ? "!text-white" : ""}`}>
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={item} className={`text-lead mt-4 lg:mt-3 ${center ? "mx-auto" : ""} ${invert ? "!text-white/80" : ""}`}>
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
