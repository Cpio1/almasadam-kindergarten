import type { ProgramTone } from "@/data/programs";

/** Наборы классов для цветовых акцентов. Строки литеральные — Tailwind их видит. */
export const tones: Record<
  ProgramTone,
  { soft: string; tint: string; solid: string; text: string; ring: string; hex: string }
> = {
  sun: {
    soft: "bg-sun-50",
    tint: "bg-sun-100",
    solid: "bg-sun",
    text: "text-sun-700",
    ring: "ring-sun-100",
    hex: "#FFE326",
  },
  sky: {
    soft: "bg-sky-50",
    tint: "bg-sky-100",
    solid: "bg-sky",
    text: "text-sky-700",
    ring: "ring-sky-100",
    hex: "#159FE2",
  },
  leaf: {
    soft: "bg-leaf-50",
    tint: "bg-leaf-100",
    solid: "bg-leaf",
    text: "text-leaf-700",
    ring: "ring-leaf-100",
    hex: "#80C924",
  },
  berry: {
    soft: "bg-berry-50",
    tint: "bg-berry-100",
    solid: "bg-berry",
    text: "text-berry-700",
    ring: "ring-berry-100",
    hex: "#E83A32",
  },
  violet: {
    soft: "bg-violet-50",
    tint: "bg-violet-100",
    solid: "bg-violet",
    text: "text-violet",
    ring: "ring-violet-100",
    hex: "#302079",
  },
};
