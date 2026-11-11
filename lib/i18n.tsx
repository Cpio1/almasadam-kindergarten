"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ru, type Dictionary } from "@/locales/ru";
import { kz } from "@/locales/kz";
import { STORAGE_KEY } from "./storage-key";

export type Lang = "ru" | "kz";

const dictionaries: Record<Lang, Dictionary> = { ru, kz };

type I18nContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "kz" || v === "ru" ? v : null;
  } catch {
    return null;
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Сервер всегда рендерит русскую версию (язык по умолчанию).
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== "ru") setLangState(stored);
    // Снимаем защиту от «мигания» русского текста (см. скрипт в app/layout.tsx).
    requestAnimationFrame(() => document.documentElement.classList.remove("i18n-pending"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].htmlLang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* приватный режим — язык просто не запомнится */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
