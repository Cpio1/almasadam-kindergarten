import type { ReactNode } from "react";
import { BookA, Languages, MessageCircleHeart, Music, PencilLine, Volleyball, type LucideIcon } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { TeacherAccent } from "@/data/teachers";
import { Sparkle } from "@/components/ui/Decor";
import { Star3D } from "@/components/ui/Fun";
import { Bloom, Cube3D, Drop, Heart, RainbowArc, WaveRibbon } from "@/components/ui/Shapes";

/**
 * Оформление карточек педагогов: у каждой — свой цвет, форма рамки фото, подложка и декор.
 * Все строки классов литеральные — Tailwind их видит.
 */
export type TeacherTheme = {
  /** основной цвет акцента */
  hex: string;
  /** мягкий фон карточки и блоков модального окна */
  soft: string;
  /** фон карточки: цвет, форма, «объёмная» тень снизу */
  card: string;
  /** цвет органической подложки под фото */
  blob: string;
  /** форма рамки фото */
  frame: string;
  /** второй слой подложки (полукруг / волна) */
  backdrop: ReactNode;
  /** кнопка «Подробнее» */
  button: string;
  /** стикер со стажем и иконкой */
  sticker: string;
  /** цвет текста должности */
  role: string;
  /** бейдж квалификации */
  chip: string;
  /** маркер в списках */
  bullet: string;
  /** иконка-предмет в кружке у фото */
  Icon: LucideIcon;
  /** декор у краёв карточки (не над лицом и текстом) */
  deco: ReactNode;
};

export const teacherThemes: Record<TeacherAccent, TeacherTheme> = {
  purple: {
    hex: "#7B5CE0",
    soft: "bg-violet-50",
    card: "bg-[linear-gradient(170deg,#F3F0FD_0%,#FFFFFF_70%)] rounded-[38px_38px_38px_14px] shadow-[0_7px_0_#d9d1f7,0_24px_40px_-24px_rgb(48_32_121/0.35)]",
    blob: "#C9B9F8",
    frame: "rounded-[999px_999px_30px_30px]",
    backdrop: <span className="absolute inset-x-[-14%] bottom-[-6%] h-[52%] rounded-[999px_999px_0_0] bg-[#7B5CE0]/15" />,
    button: "bg-[#7B5CE0] text-white shadow-[0_4px_0_#5A3FC0] hover:bg-[#6c4cd6]",
    sticker: "bg-[#7B5CE0] text-white shadow-[0_4px_0_#5A3FC0]",
    role: "text-[#5A3FC0]",
    chip: "bg-violet-100 text-violet",
    bullet: "bg-[#7B5CE0] text-white",
    Icon: PencilLine,
    deco: (
      <>
        <Star3D className="absolute -right-3 -top-4 w-12 animate-wiggle sm:w-14" />
        <Sparkle className="absolute left-5 top-6 w-4 animate-twinkle" color="#7B5CE0" />
      </>
    ),
  },
  sky: {
    hex: "#159FE2",
    soft: "bg-sky-50",
    card: "bg-[linear-gradient(170deg,#EAF7FE_0%,#FFFFFF_70%)] rounded-[14px_40px_38px_38px] shadow-[0_7px_0_#bfe4f8,0_24px_40px_-24px_rgb(21_159_226/0.4)]",
    blob: "#9ED8F6",
    frame: "rounded-[40%_60%_30px_30px/34%_34%_30px_30px]",
    backdrop: (
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-x-[-16%] bottom-[2%] h-[30%] w-[132%]">
        <path d="M0 30C30 6 60 6 100 28s70 22 100 0V60H0Z" fill="#159FE2" fillOpacity=".18" />
        <path d="M0 42c34-16 66-14 100 2s66 16 100-2V60H0Z" fill="#159FE2" fillOpacity=".2" />
      </svg>
    ),
    button: "bg-sky-700 text-white shadow-[0_4px_0_#08557d] hover:bg-[#0a6596]",
    sticker: "bg-sky text-white shadow-[0_4px_0_#0b6fa3]",
    role: "text-sky-700",
    chip: "bg-sky-100 text-sky-700",
    bullet: "bg-sky text-white",
    Icon: Volleyball,
    deco: (
      <>
        <Cube3D className="absolute -left-4 -top-5 w-12 animate-float [--r:-10deg] sm:w-14" color="#FFE326" />
        <Drop className="absolute right-6 top-5 w-5 animate-bob" color="#159FE2" />
      </>
    ),
  },
  pink: {
    hex: "#FF7BAC",
    soft: "bg-[#FFF0F6]",
    card: "bg-[linear-gradient(170deg,#FFF0F6_0%,#FFFFFF_70%)] rounded-[40px_14px_38px_38px] shadow-[0_7px_0_#ffd0e2,0_24px_40px_-24px_rgb(217_79_134/0.4)]",
    blob: "#FFB6D1",
    frame: "rounded-[999px_999px_999px_36px]",
    backdrop: <span className="absolute -right-[12%] top-[10%] aspect-square w-[52%] rounded-full bg-sun/70" />,
    button: "bg-[#C2366F] text-white shadow-[0_4px_0_#8f2251] hover:bg-[#ad2d62]",
    sticker: "bg-[#FF7BAC] text-white shadow-[0_4px_0_#d94f86]",
    role: "text-[#C2366F]",
    chip: "bg-[#FFDDEA] text-[#9b2457]",
    bullet: "bg-[#FF7BAC] text-white",
    Icon: Music,
    deco: (
      <>
        <WaveRibbon className="absolute -right-4 top-8 w-20 animate-sway [--r:-8deg]" colors={["#FF7BAC", "#FFE326", "#159FE2"]} />
        <Heart className="absolute left-6 top-5 w-6 animate-pop" color="#E83A32" />
      </>
    ),
  },
  sun: {
    hex: "#FFE326",
    soft: "bg-sun-50",
    card: "bg-[linear-gradient(170deg,#FFF8C4_0%,#FFFDF2_70%)] rounded-[38px_38px_14px_38px] shadow-[0_7px_0_#f5e17a,0_24px_40px_-24px_rgb(217_168_0/0.45)]",
    blob: "#FFE326",
    frame: "rounded-[999px_999px_30px_30px]",
    backdrop: (
      <span className="absolute -left-[14%] bottom-[8%] aspect-square w-[46%] rounded-full border-[10px] border-dashed border-berry/35" />
    ),
    button: "bg-violet text-white shadow-[0_4px_0_#1b1150] hover:bg-violet-700",
    sticker: "bg-berry text-white shadow-[0_4px_0_#b9231c]",
    role: "text-[#8a5a00]",
    chip: "bg-sun-100 text-violet",
    bullet: "bg-sun text-violet",
    Icon: BookA,
    deco: (
      <>
        <Cube3D className="absolute -right-3 -top-5 w-12 animate-float [--r:10deg] sm:w-14" color="#159FE2" letter="Ә" />
        <Sparkle className="absolute left-6 top-6 w-4 animate-twinkle" color="#E83A32" />
      </>
    ),
  },
  leaf: {
    hex: "#80C924",
    soft: "bg-leaf-50",
    card: "bg-[linear-gradient(170deg,#EAF7D6_0%,#FFFFFF_70%)] rounded-[38px_14px_38px_38px] shadow-[0_7px_0_#cdeaa5,0_24px_40px_-24px_rgb(79_138_12/0.4)]",
    blob: "#B9E38A",
    frame: "rounded-[46%_46%_30px_30px/38%_38%_30px_30px]",
    backdrop: <RainbowArc className="absolute -left-[8%] -top-[6%] w-[54%] -rotate-12" colors={["#E83A32", "#FFE326", "#159FE2"]} />,
    button: "bg-leaf-700 text-white shadow-[0_4px_0_#365f07] hover:bg-[#447a09]",
    sticker: "bg-leaf text-violet shadow-[0_4px_0_#4f8a0c]",
    role: "text-leaf-700",
    chip: "bg-leaf-100 text-leaf-700",
    bullet: "bg-leaf text-violet",
    Icon: Languages,
    deco: (
      <>
        <Cube3D className="absolute -left-3 -top-5 w-12 animate-float [--r:-8deg] sm:w-14" color="#E83A32" letter="A" />
        <Bloom className="absolute right-5 top-5 w-8 animate-spin-slower" petals={["#FFE326", "#FF8A1F"]} />
      </>
    ),
  },
  orange: {
    hex: "#FF8A1F",
    soft: "bg-[#FFF3E6]",
    card: "bg-[linear-gradient(170deg,#FFEEDC_0%,#FFFFFF_70%)] rounded-[38px_38px_38px_14px] shadow-[0_7px_0_#ffd6ad,0_24px_40px_-24px_rgb(217_106_5/0.4)]",
    blob: "#FFC58C",
    frame: "rounded-[999px_999px_36px_999px]",
    backdrop: <span className="absolute -right-[10%] bottom-[4%] h-[40%] w-[60%] rounded-[999px_999px_0_0] bg-sky/20" />,
    button: "bg-[#FF8A1F] text-violet shadow-[0_4px_0_#d96a05] hover:bg-[#ff7d05]",
    sticker: "bg-[#FF8A1F] text-violet shadow-[0_4px_0_#d96a05]",
    role: "text-[#B85400]",
    chip: "bg-[#FFE2C4] text-[#8a3f00]",
    bullet: "bg-[#FF8A1F] text-violet",
    Icon: MessageCircleHeart,
    deco: (
      <>
        <Star3D className="absolute -left-3 -top-4 w-12 animate-wiggle sm:w-14" color="#80C924" shade="#4f8a0c" />
        <Sparkle className="absolute right-6 top-6 w-4 animate-twinkle" color="#FF8A1F" />
      </>
    ),
  },
};

/** «20 лет», «4 года», «21 год» (ru) / «20 жыл» (kz). forms — «один|два|пять» через «|» */
export function plural(n: number, forms: string, lang: Lang) {
  const [one, few, many] = forms.split("|");
  if (lang !== "ru") return one;
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
