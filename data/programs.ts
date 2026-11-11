import {
  MessagesSquare,
  Palette,
  Puzzle,
  Leaf,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

/**
 * ПРЕДВАРИТЕЛЬНЫЕ направления (не подтверждённый перечень программ).
 * Чтобы удалить карточку — уберите объект из массива.
 * Чтобы добавить — добавьте объект и тексты с тем же id в locales/ru.ts и locales/kz.ts → programs.items.
 */
export type ProgramId = "speech" | "creative" | "logic" | "world" | "social" | "school";

export type ProgramTone = "sun" | "sky" | "leaf" | "berry" | "violet";

export const programs: { id: ProgramId; icon: LucideIcon; tone: ProgramTone }[] = [
  { id: "speech", icon: MessagesSquare, tone: "sky" },
  { id: "creative", icon: Palette, tone: "berry" },
  { id: "logic", icon: Puzzle, tone: "violet" },
  { id: "world", icon: Leaf, tone: "leaf" },
  { id: "social", icon: Users, tone: "sun" },
  { id: "school", icon: GraduationCap, tone: "sky" },
];
