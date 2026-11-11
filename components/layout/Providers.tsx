"use client";

import { MotionConfig } from "motion/react";
import { I18nProvider } from "@/lib/i18n";

/** reducedMotion="user" — уважаем системную настройку prefers-reduced-motion */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>{children}</I18nProvider>
    </MotionConfig>
  );
}
