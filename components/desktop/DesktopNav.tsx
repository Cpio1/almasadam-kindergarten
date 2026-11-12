"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { sections, type SectionId } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

/**
 * Пункты в меню «Ещё»: на ноутбуках (1024–1439px) — галерея, новости, документы, контакты;
 * на широких экранах (≥1440px) — новости, документы и контакты (длинные подписи не помещаются в строку).
 */
const overflowLaptop: SectionId[] = ["gallery", "news", "documents", "contacts"];
const overflowWide: SectionId[] = ["news", "documents", "contacts"];

export function DesktopNav({
  active,
  onNavigate,
}: {
  active: string | null;
  onNavigate: (id: SectionId) => void;
}) {
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const linkCls = (id: string) =>
    `relative min-h-11 items-center whitespace-nowrap rounded-full px-2.5 font-display text-[0.93rem] font-bold transition-colors xl:px-3 ${
      active === id ? "text-violet" : "text-ink/75 hover:text-violet"
    }`;

  const moreActive = active !== null && overflowLaptop.includes(active as SectionId);

  return (
    <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(id);
          }}
          aria-current={active === id ? "true" : undefined}
          className={`${linkCls(id)} ${
            overflowWide.includes(id)
              ? "hidden"
              : overflowLaptop.includes(id)
                ? "hidden min-[1440px]:inline-flex"
                : "inline-flex"
          }`}
        >
          {t.nav[id]}
          {active === id ? (
            <motion.span
              layoutId="nav-dot"
              className="absolute inset-x-3.5 -bottom-0.5 mx-auto h-1 w-5 rounded-full bg-sun"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          ) : null}
        </a>
      ))}

      <div ref={moreRef} className="relative">
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-haspopup="true"
          onClick={() => setMoreOpen((v) => !v)}
          className={`${linkCls(moreActive ? "__more" : "")} inline-flex gap-1 ${moreActive ? "!text-violet" : ""}`}
        >
          {t.common.more}
          <ChevronDown
            className={`size-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <AnimatePresence>
          {moreOpen ? (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute left-1/2 top-[calc(100%+10px)] w-52 -translate-x-1/2 rounded-3xl bg-white p-2 shadow-lift ring-1 ring-violet-100"
            >
              {overflowLaptop.map((id) => (
                <li key={id} className={overflowWide.includes(id) ? "" : "min-[1440px]:hidden"}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMoreOpen(false);
                      onNavigate(id);
                    }}
                    className={`flex min-h-11 items-center rounded-2xl px-4 font-display font-bold transition-colors hover:bg-violet-50 ${
                      active === id ? "bg-violet-50 text-violet" : "text-ink/80"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}
