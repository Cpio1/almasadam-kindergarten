import {
  MessagesSquare,
  Palette,
  Puzzle,
  Leaf,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * ПРЕДВАРИТЕЛЬНЫЕ направления блока «Развитие ребёнка» (не подтверждённый перечень программ).
 * На сайте под ними выводится пометка «Направления уточняются» (locales → programs.note).
 * Чтобы удалить карточку — уберите объект из массива.
 * Чтобы добавить — расширьте ProgramId, добавьте объект и тексты с тем же id
 * в locales/ru.ts и locales/kz.ts → programs.items.
 */
export type ProgramId = "speech" | "creative" | "logic" | "world" | "social";

export type ProgramTone = "sun" | "sky" | "leaf" | "berry" | "violet";

export const programs: { id: ProgramId; icon: LucideIcon; tone: ProgramTone }[] = [
  { id: "speech", icon: MessagesSquare, tone: "sky" },
  { id: "creative", icon: Palette, tone: "berry" },
  { id: "logic", icon: Puzzle, tone: "violet" },
  { id: "world", icon: Leaf, tone: "leaf" },
  { id: "social", icon: Users, tone: "sun" },
];
