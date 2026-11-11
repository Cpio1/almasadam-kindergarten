"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Phone, ArrowRight } from "lucide-react";
import { sections, site, whatsappLink, type SectionId } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { useBodyLock } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { LangSwitch } from "@/components/layout/LangSwitch";
import { Sparkle } from "@/components/ui/Decor";

const dotColors = ["#159FE2", "#E83A32", "#80C924", "#FFE326", "#302079", "#159FE2", "#80C924"];

export function MobileMenu({
  open,
  onClose,
  onNavigate,
  active,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
  active: string | null;
}) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onResize = () => window.innerWidth >= 1024 && onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.common.openMenu}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-milk lg:hidden"
          initial={{ opacity: 0, clipPath: "circle(0% at 92% 34px)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 92% 34px)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at 92% 34px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkle className="absolute right-10 top-28 w-6 animate-twinkle" color="#FFE326" />
          <Sparkle className="absolute bottom-48 left-6 w-4 animate-twinkle [animation-delay:1s]" color="#159FE2" />

          <div className="container-site flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo className="h-9" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.common.closeMenu}
              className="grid size-12 place-items-center rounded-full bg-violet text-white"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-site mt-2 flex-1">
            <ul className="flex flex-col gap-1.5">
              {sections.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(id);
                    }}
                    className={`group flex min-h-[58px] items-center gap-4 rounded-[22px] px-4 font-display text-[1.3rem] font-extrabold transition-colors ${
                      active === id ? "bg-white text-violet shadow-soft" : "text-violet active:bg-white"
                    }`}
                  >
                    <span
                      className="size-3 shrink-0 rounded-[4px] rotate-45"
                      style={{ background: dotColors[i] }}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{t.nav[id]}</span>
                    <ArrowRight className="size-5 text-violet/40" aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-site shrink-0 pb-[calc(24px+var(--safe-bottom))] pt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a
              href={whatsappLink(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa w-full"
            >
              <WhatsAppIcon className="size-5" />
              {t.common.writeWhatsapp}
            </a>
            <div className="mt-4 flex items-center justify-between gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 font-display font-bold text-violet"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagramHandle}`}
                className="grid size-11 place-items-center rounded-full bg-white text-violet shadow-soft"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="mt-4 flex justify-center">
              <LangSwitch id="lang-mobile-menu" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
