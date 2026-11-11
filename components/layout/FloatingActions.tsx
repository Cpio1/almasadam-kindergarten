"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { House, BookOpen, Languages, X, Hand, ChevronRight, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink, type SectionId } from "@/lib/site";
import { assets } from "@/lib/assets";
import { scrollToSection, useInView } from "@/lib/hooks";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Плавающие действия (правый нижний угол, с учётом safe-area на iPhone):
 *  • помощник Адам — мини-панель с быстрыми переходами (не чат-бот);
 *  • кнопка WhatsApp.
 * Появляются после первого экрана и прячутся в разделе «Контакты»,
 * где есть собственные кнопки, — чтобы ничего не перекрывать.
 */
export function FloatingActions() {
  const { t } = useI18n();
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inContacts = useInView("contacts", "0px 0px -30% 0px");

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible = pastHero && !inContacts;

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  const actions: { id: SectionId; icon: LucideIcon; label: string; cls: string }[] = [
    { id: "about", icon: House, label: t.helper.actions.about, cls: "bg-berry-50 text-berry-700" },
    { id: "programs", icon: BookOpen, label: t.helper.actions.programs, cls: "bg-sky-50 text-sky-700" },
    { id: "languages", icon: Languages, label: t.helper.actions.languages, cls: "bg-leaf-50 text-leaf-700" },
  ];

  const avatar = assets.mascot.welcome;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-[calc(16px+var(--safe-bottom))] right-[max(16px,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 lg:bottom-7 lg:right-7"
        >
          <AnimatePresence>
            {open ? (
              <motion.div
                id="adam-helper"
                role="dialog"
                aria-label={t.helper.title}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                style={{ transformOrigin: "bottom right" }}
                className="w-[min(300px,calc(100vw-32px))] rounded-[28px_28px_8px_28px] bg-white p-4 shadow-lift ring-1 ring-violet-100"
              >
                <div className="flex items-start justify-between gap-2 px-1">
                  <div>
                    <p className="font-display text-[1.1rem] font-black text-violet">{t.helper.title}</p>
                    <p className="text-sm text-ink-soft">{t.helper.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t.common.close}
                    className="-mr-1 -mt-1 grid size-10 place-items-center rounded-full text-violet/60 hover:bg-violet-50 hover:text-violet"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>
                <ul className="mt-3 grid gap-1.5">
                  {actions.map(({ id, icon: Icon, label, cls }) => (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          scrollToSection(id);
                        }}
                        className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-2 text-left font-display font-bold text-violet transition-colors hover:bg-violet-50"
                      >
                        <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${cls}`}>
                          <Icon className="size-[18px]" aria-hidden="true" />
                        </span>
                        <span className="flex-1">{label}</span>
                        <ChevronRight className="size-4 text-violet/40" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                  <li>
                    <a
                      href={whatsappLink(t.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="mt-1 flex min-h-12 w-full items-center gap-3 rounded-2xl bg-whatsapp-700 px-2 font-display font-bold text-white transition-colors hover:bg-[#0f7a40]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15">
                        <WhatsAppIcon className="size-[18px]" />
                      </span>
                      {t.helper.actions.whatsapp}
                    </a>
                  </li>
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="adam-helper"
              aria-label={t.helper.open}
              className="relative grid size-14 place-items-center overflow-hidden rounded-full bg-sun shadow-lift ring-4 ring-white transition-transform hover:scale-105 active:scale-95"
            >
              {avatar ? (
                <Image
                  src={avatar.src}
                  alt=""
                  width={avatar.width}
                  height={avatar.height}
                  sizes="56px"
                  className="size-full object-cover object-top"
                />
              ) : (
                <Hand className="size-6 text-violet" aria-hidden="true" />
              )}
            </button>
            <a
              href={whatsappLink(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.common.writeWhatsapp}
              className="relative grid size-14 place-items-center rounded-full bg-whatsapp-700 text-white shadow-[0_12px_28px_-8px_rgba(18,140,74,0.7)] ring-4 ring-white transition-transform hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.6s]" aria-hidden="true" />
              <WhatsAppIcon className="relative size-7" />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
