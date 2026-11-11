"use client";

import { useI18n } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-violet px-5 py-3 font-display font-bold text-white shadow-lift transition-transform focus:translate-y-0"
    >
      {t.common.skipLink}
    </a>
  );
}
