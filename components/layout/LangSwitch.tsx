"use client";

import { motion } from "motion/react";
import { useI18n, type Lang } from "@/lib/i18n";

const options: { value: Lang; label: string; full: string }[] = [
  { value: "ru", label: "RU", full: "Русский" },
  { value: "kz", label: "KZ", full: "Қазақша" },
];

export function LangSwitch({ id = "lang", className = "" }: { id?: string; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="radiogroup"
      aria-label={t.common.langSwitch}
      className={`relative inline-flex rounded-full bg-violet-50 p-1 ring-1 ring-violet-100 ${className}`}
    >
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.full}
            lang={o.value === "kz" ? "kk" : "ru"}
            onClick={() => setLang(o.value)}
            className={`relative z-10 min-h-9 min-w-11 rounded-full px-3 font-display text-sm font-extrabold transition-colors ${
              active ? "text-white" : "text-violet hover:text-violet-700"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-violet shadow-[0_4px_12px_-4px_rgba(48,32,121,.6)]"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            ) : null}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
