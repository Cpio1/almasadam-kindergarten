"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Phone,
  House,
  Smile,
  GraduationCap,
  Users,
  Apple,
  Camera,
  Megaphone,
  FileText,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { sections, site, whatsappLink, type SectionId } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { useBodyLock } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { LangSwitch } from "@/components/layout/LangSwitch";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Sparkle } from "@/components/ui/Decor";
import { Star3D } from "@/components/ui/Fun";
import { Cube3D, Organic, RainbowArc } from "@/components/ui/Shapes";

const ease = [0.22, 1, 0.36, 1] as const;

/** У каждого пункта — своя иконка, цвет и форма плашки */
const itemLook: Record<SectionId, { Icon: LucideIcon; tile: string; shape: string }> = {
  top: { Icon: House, tile: "bg-sky text-white", shape: "rounded-[22px_28px_22px_28px]" },
  about: { Icon: Smile, tile: "bg-berry text-white", shape: "rounded-[28px_22px_28px_22px]" },
  programs: { Icon: GraduationCap, tile: "bg-[#7B5CE0] text-white", shape: "rounded-[22px_28px_28px_22px]" },
  teachers: { Icon: Users, tile: "bg-sky-700 text-white", shape: "rounded-[28px_22px_28px_22px]" },
  food: { Icon: Apple, tile: "bg-leaf text-white", shape: "rounded-[28px_22px_22px_28px]" },
  gallery: { Icon: Camera, tile: "bg-[#FF7BAC] text-white", shape: "rounded-[22px_28px_22px_28px]" },
  news: { Icon: Megaphone, tile: "bg-[#FF8A1F] text-white", shape: "rounded-[28px_22px_28px_22px]" },
  documents: { Icon: FileText, tile: "bg-violet text-sun", shape: "rounded-[22px_28px_28px_22px]" },
  contacts: { Icon: MapPin, tile: "bg-sun text-violet", shape: "rounded-[28px_22px_22px_28px]" },
};

/** Бургер ↔ крестик: три полоски, которые плавно складываются в «×». morphIn — анимировать из бургера при появлении */
export function BurgerIcon({ open, morphIn = false, className = "" }: { open: boolean; morphIn?: boolean; className?: string }) {
  const tr = { type: "spring", stiffness: 420, damping: 28 } as const;
  const top = { burger: { y: 5, rotate: 0 }, x: { y: 10.7, rotate: 45 } };
  const mid = { burger: { opacity: 1, scaleX: 1 }, x: { opacity: 0, scaleX: 0.2 } };
  const bot = { burger: { y: 16.4, rotate: 0 }, x: { y: 10.7, rotate: -45 } };
  const pick = <T,>(v: { burger: T; x: T }) => (open ? v.x : v.burger);
  const init = <T,>(v: { burger: T; x: T }) => (morphIn ? v.burger : false);
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <motion.rect x="3" width="18" height="2.6" rx="1.3" fill="currentColor" initial={init(top)} animate={pick(top)}
        style={{ originX: "50%", originY: "50%" }} transition={{ ...tr, delay: morphIn ? 0.12 : 0 }} />
      <motion.rect x="3" y="10.7" width="18" height="2.6" rx="1.3" fill="currentColor" initial={init(mid)} animate={pick(mid)}
        style={{ originX: "50%" }} transition={{ ...tr, delay: morphIn ? 0.12 : 0 }} />
      <motion.rect x="3" width="18" height="2.6" rx="1.3" fill="currentColor" initial={init(bot)} animate={pick(bot)}
        style={{ originX: "50%", originY: "50%" }} transition={{ ...tr, delay: morphIn ? 0.12 : 0 }} />
    </svg>
  );
}

/**
 * Игровое мобильное меню.
 * Открытие: цветная панель «раскрывается» кругом из кнопки-бургера, бургер превращается в крестик,
 * пункты выпрыгивают по очереди, фигуры и Әлем появляются следом.
 * Доступность: role="dialog", фокус внутри (Tab по кругу), Escape закрывает, фокус возвращается на бургер.
 * Фон не прокручивается (useBodyLock), учтены safe-area iPhone.
 */
export function MobileMenu({
  open,
  onClose,
  onNavigate,
  active,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
  active: string | null;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef?.current;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // ловушка фокуса
      const f = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null,
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, onClose, returnFocusRef]);

  const pop = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
      : {
          initial: { opacity: 0, scale: 0, rotate: -40 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          transition: { type: "spring" as const, stiffness: 260, damping: 16, delay },
        };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.common.menuTitle}
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-[linear-gradient(170deg,#2DB2F0_0%,#3d2a94_52%,#2a1b70_100%)] lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "circle(160% at calc(100% - 40px) 34px)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 34px)" }}
          transition={{ duration: reduce ? 0.15 : 0.5, ease }}
        >
          {/* ── декор: органические пятна, звёзды, кубик, радуга ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <Organic className="absolute -right-24 top-16 w-72 opacity-25" color="#FFE326" variant={1} />
            <Organic className="absolute -left-28 bottom-24 w-72 opacity-20" color="#FF7BAC" />
            <motion.div className="absolute right-5 top-[86px]" {...pop(0.35)}>
              <Star3D className="w-10 animate-wiggle" />
            </motion.div>
            <motion.div className="absolute -left-3 top-[44%]" {...pop(0.45)}>
              <Cube3D className="w-12 animate-float [--r:-12deg]" color="#80C924" letter="Ә" />
            </motion.div>
            <motion.div className="absolute -right-6 top-[58%]" {...pop(0.55)}>
              <RainbowArc className="w-24 rotate-[-70deg] animate-sway" colors={["#E83A32", "#FFE326", "#80C924"]} />
            </motion.div>
            <Sparkle className="absolute left-[42%] top-[74px] w-4 animate-twinkle" color="#FFE326" />
            <Sparkle className="absolute bottom-40 right-[18%] w-5 animate-twinkle [animation-delay:1s]" color="#fff" />
          </div>

          <div className="relative flex min-h-full flex-col pb-[calc(20px+var(--safe-bottom))] pt-[env(safe-area-inset-top)]">
            {/* ── верхняя строка: логотип, RU/KZ, крестик на месте бургера ── */}
            <div className="container-site flex h-[var(--header-h)] shrink-0 items-center justify-between gap-1.5">
              <span className="inline-flex min-w-0 rounded-[14px] bg-white px-2.5 py-1.5 shadow-soft min-[375px]:rounded-[16px] min-[375px]:px-3">
                <Logo className="h-7" compact />
              </span>
              <div className="flex shrink-0 items-center gap-1.5 min-[375px]:gap-2">
                <LangSwitch id="lang-mobile-menu" className="!bg-white !ring-white/40" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t.common.closeMenu}
                  className="grid size-12 place-items-center rounded-full bg-sun text-violet shadow-[0_4px_0_#d9a800] transition-transform active:scale-90"
                >
                  <BurgerIcon open morphIn className="size-6" />
                </button>
              </div>
            </div>

            {/* ── пункты ── */}
            <nav aria-label="Mobile" className="container-site mt-2 flex-1">
              <ul className="grid gap-2 min-[400px]:gap-2.5">
                {sections.map((id, i) => {
                  const { Icon, tile, shape } = itemLook[id];
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={id}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, x: i % 2 ? 26 : -26, rotate: i % 2 ? 3 : -3 }}
                      animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.12 + i * 0.045 }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(id);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`group flex min-h-[52px] items-center gap-3 px-2 py-1.5 font-display text-[1.06rem] font-extrabold leading-tight shadow-[0_4px_0_rgb(0_0_0/0.14)] transition-transform duration-200 active:translate-y-[3px] active:shadow-none min-[400px]:min-h-[56px] min-[400px]:text-[1.15rem] ${shape} ${
                          isActive ? "bg-sun text-violet" : "bg-white text-violet"
                        }`}
                      >
                        <span className={`grid size-10 shrink-0 place-items-center rounded-[14px] transition-transform duration-300 group-active:rotate-12 ${tile}`}>
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">{t.nav[id]}</span>
                        <ArrowRight className="mr-1.5 size-5 shrink-0 text-violet/35" aria-hidden="true" />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* ── низ: Әлем, WhatsApp, телефон, Instagram ── */}
            <motion.div
              className="container-site mt-5 flex shrink-0 items-end gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45, ease }}
            >
              <div className="relative -mb-2 hidden w-[92px] shrink-0 min-[360px]:block">
                <MascotFigure pose="welcome" variant="wave" size="custom" delay={0.55} floatIntensity={0.7} className="w-full" sizes="100px" />
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={whatsappLink(t.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] w-full items-center gap-2.5 rounded-[22px_32px_26px_32px] bg-[linear-gradient(135deg,#4BEA92,#22C063_45%,#128C4A)] py-1.5 pl-1.5 pr-3 font-display text-[1rem] font-extrabold leading-tight text-white shadow-[0_5px_0_#0b5c30] transition-transform active:translate-y-[3px]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#1FB85A]">
                    <WhatsAppIcon className="size-6" />
                  </span>
                  {t.common.writeWhatsapp}
                </a>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <a href={site.phoneHref} className="inline-flex min-h-11 items-center gap-2 font-display text-[0.98rem] font-bold text-white">
                    <span className="grid size-9 place-items-center rounded-full bg-white/15">
                      <Phone className="size-4" aria-hidden="true" />
                    </span>
                    {site.phone}
                  </a>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${site.instagramHandle}`}
                    className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(45deg,#FEDA75,#FA7E1E_25%,#D62976_55%,#962FBF_80%,#4F5BD5)] text-white shadow-[0_4px_0_#7a1f6b]"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
