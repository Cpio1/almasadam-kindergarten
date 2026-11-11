"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";

/** Мягкая анимация при переключении RU/KZ — без перезагрузки и без перемонтирования секций. */
export function LangFade({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce || !scope.current) return;
    animate(scope.current, { opacity: [0.35, 1] }, { duration: 0.35, ease: "easeOut" });
  }, [lang, reduce, animate, scope]);

  return <div ref={scope}>{children}</div>;
}
