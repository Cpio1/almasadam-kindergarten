import { Sunrise, Apple, Soup, Cookie, Salad, type LucideIcon } from "lucide-react";
import type { ProgramTone } from "./programs";

/**
 * Приёмы пищи для временной линии в разделе «Питание».
 * Названия редактируются в locales/*.ts → food.meals.
 * Конкретное время и блюда не указываются, пока нет официального меню.
 * Если появится меню — добавьте поле, например time: "08:30", и выведите его в components/sections/Food.tsx.
 */
export type MealId = "breakfast" | "brunch" | "lunch" | "snack" | "dinner";

export const meals: { id: MealId; icon: LucideIcon; tone: ProgramTone }[] = [
  { id: "breakfast", icon: Sunrise, tone: "sun" },
  { id: "brunch", icon: Apple, tone: "berry" },
  { id: "lunch", icon: Soup, tone: "leaf" },
  { id: "snack", icon: Cookie, tone: "sky" },
  { id: "dinner", icon: Salad, tone: "violet" },
];
