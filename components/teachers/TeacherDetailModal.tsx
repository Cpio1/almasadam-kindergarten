"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Award, BadgeCheck, Check, Quote, Sparkles, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useBodyLock } from "@/lib/hooks";
import type { Teacher } from "@/data/teachers";
import { Sparkle } from "@/components/ui/Decor";
import { TeacherPhoto } from "./TeacherPhoto";
import { ExperienceSticker } from "./TeacherCard";
import { plural, teacherThemes } from "./theme";

const ease = [0.22, 1, 0.36, 1] as const;
/** До этой ширины — нижняя панель (bottom sheet), дальше — окно по центру в две колонки */
const SHEET_QUERY = "(max-width: 767px)";

/**
 * Подробная информация о педагоге.
 * Телефон: панель снизу с внутренней прокруткой (учтены safe-area и «плавающая» высота iPhone — svh).
 * Планшет/десктоп: окно по центру, фото слева, прокручиваемый текст справа.
 * Доступность: role="dialog" + aria-modal, фокус на кнопке закрытия, Tab по кругу внутри,
 * Escape и клик по фону закрывают, фокус возвращается на кнопку «Подробнее».
 */
export function TeacherDetailModal({ teacher, onClose }: { teacher: Teacher | null; onClose: () => void }) {
  const open = teacher !== null;
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Окно открывается только по клику (на клиенте), поэтому читаем медиазапрос сразу —
  // иначе первая анимация стартует с «десктопного» варианта.
  const [sheet, setSheet] = useState(() => typeof window !== "undefined" && window.matchMedia(SHEET_QUERY).matches);
  useBodyLock(open);

  useEffect(() => {
    const mq = window.matchMedia(SHEET_QUERY);
    const onChange = () => setSheet(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    // после монтирования панели
    const raf = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = [
        ...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      // ждём, пока useBodyLock вернёт позицию прокрутки, затем возвращаем фокус без прыжка
      requestAnimationFrame(() => previouslyFocused?.focus?.({ preventScroll: true }));
    };
  }, [open, onClose]);

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : sheet
      ? {
          initial: { opacity: 1, scale: 1, y: "100%" },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 1, scale: 1, y: "100%" },
        }
      : {
          initial: { opacity: 0, y: 30, scale: 0.94 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.96 },
        };

  return (
    <AnimatePresence>
      {teacher ? (
        <motion.div
          key="teacher-overlay"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#1b1150]/55 backdrop-blur-[3px] md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="teacher-dialog-name"
            {...panelMotion}
            transition={reduce ? { duration: 0.15 } : sheet ? { type: "spring", stiffness: 320, damping: 34 } : { duration: 0.4, ease }}
            className="relative flex max-h-[calc(100svh-12px)] w-full flex-col overflow-hidden rounded-t-[32px] bg-white shadow-lift md:h-[min(86svh,720px)] md:max-h-none md:max-w-[1000px] md:rounded-[40px]"
          >
            <ModalBody teacher={teacher} closeRef={closeRef} onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ModalBody({
  teacher,
  closeRef,
  onClose,
}: {
  teacher: Teacher;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const th = teacherThemes[teacher.accent];
  const exp = teacher.experience;
  const T = t.teachers;

  return (
    <>
      {/* ручка нижней панели (телефон) */}
      <span aria-hidden="true" className="absolute left-1/2 top-2 z-30 h-1.5 w-12 -translate-x-1/2 rounded-full bg-violet/20 md:hidden" />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.common.close}
        className="absolute right-3 top-3 z-30 grid size-12 place-items-center rounded-full bg-white text-violet shadow-[0_4px_0_rgb(48_32_121/0.15)] ring-1 ring-violet-100 transition-transform hover:rotate-90 active:scale-90 md:right-4 md:top-4"
      >
        <X className="size-6" aria-hidden="true" />
      </button>

      {/* Телефон: прокручивается всё. Десктоп: две колонки, прокручивается правая */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden">
        {/* ── фото ── */}
        <div className={`relative isolate overflow-hidden px-6 pb-8 pt-9 md:flex md:h-full md:items-center md:justify-center md:px-8 md:py-10 ${th.soft}`}>
          <span aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <svg
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 w-full md:h-24"
          >
            <path d="M0 40C70 6 140 6 210 34s130 30 190 4V80H0Z" fill={th.hex} fillOpacity=".25" />
            <path d="M0 58c80-20 150-18 220 0s120 16 180-2V80H0Z" fill={th.hex} fillOpacity=".35" />
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">{th.deco}</span>
          <Sparkle className="absolute bottom-[22%] left-[10%] -z-10 w-5 animate-twinkle" color={th.hex} />

          <div className="relative mx-auto aspect-[4/5] w-[min(58vw,230px)] md:w-[84%] md:max-w-[330px]">
            <span aria-hidden="true" className="absolute -inset-[8%] animate-morph" style={{ background: th.blob }} />
            <div className={`absolute inset-0 overflow-hidden bg-white ring-[6px] ring-white shadow-[0_18px_30px_-16px_rgb(48_32_121/0.5)] ${th.frame}`}>
              <TeacherPhoto teacher={teacher} sizes="(max-width: 768px) 60vw, 360px" />
            </div>
            <span
              aria-hidden="true"
              className={`absolute -left-3 top-[12%] grid size-12 -rotate-12 place-items-center rounded-full ring-4 ring-white ${th.sticker}`}
            >
              <th.Icon className="size-6" strokeWidth={2.4} />
            </span>
            {exp ? (
              <ExperienceSticker years={exp.years} sticker={th.sticker} className="absolute -bottom-3 -right-4 rotate-[-6deg] ring-4 ring-white" />
            ) : null}
          </div>
        </div>

        {/* ── текст ── */}
        <div className="px-5 pb-[calc(28px+var(--safe-bottom))] pt-6 sm:px-8 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:px-9 md:pb-9 md:pt-10">
          <p className={`pr-12 font-display text-[0.95rem] font-extrabold leading-snug ${th.role}`}>{teacher.role[lang]}</p>
          <h2 id="teacher-dialog-name" className="mt-1 pr-12 text-[clamp(1.55rem,1.2rem+1.4vw,2.1rem)] font-black leading-[1.1] md:pr-14">
            {teacher.name}
          </h2>

          {/* стаж и квалификация */}
          {exp || teacher.qualification?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {exp ? (
                <li className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${th.soft}`}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full ${th.bullet}`}>
                    <Award className="size-4" aria-hidden="true" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.78rem] font-semibold text-ink-soft">{exp.label?.[lang] ?? T.experience}</span>
                    <span className="font-display text-[1rem] font-black text-violet">
                      {exp.years} {plural(exp.years, T.years, lang)}
                    </span>
                  </span>
                </li>
              ) : null}
              {teacher.qualification?.map((q) => (
                <li key={q.value.ru} className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${th.soft}`}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full ${th.bullet}`}>
                    <BadgeCheck className="size-4" aria-hidden="true" />
                  </span>
                  <span className="leading-tight">
                    {q.label && q.label[lang] !== q.value[lang] ? (
                      <span className="block text-[0.78rem] font-semibold text-ink-soft">{q.label[lang]}</span>
                    ) : null}
                    <span className="font-display text-[0.98rem] font-black text-violet">{q.value[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* биография */}
          <Block title={T.about}>
            {teacher.biography[lang].map((p) => (
              <p key={p} className="mt-2 first:mt-0">
                {p}
              </p>
            ))}
          </Block>

          {/* направления */}
          {teacher.directions?.items[lang].length ? (
            <Block title={teacher.directions.title[lang]}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {teacher.directions.items[lang].map((d) => (
                  <li key={d} className="flex items-start gap-2.5 rounded-2xl bg-milk px-3 py-2.5 ring-1 ring-violet-50">
                    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${th.bullet}`}>
                      <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="text-[0.94rem] font-semibold leading-snug text-ink">{d}</span>
                  </li>
                ))}
              </ul>
              {teacher.extra?.[lang].map((p) => (
                <p key={p} className="mt-3">
                  {p}
                </p>
              ))}
            </Block>
          ) : null}

          {/* возрастные группы */}
          {teacher.ageGroups?.length ? (
            <Block title={T.ages}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {teacher.ageGroups.map((g, i) => (
                  <li
                    key={g.age.ru}
                    className={`relative overflow-hidden rounded-[22px_22px_22px_8px] p-4 ${i % 2 ? "bg-sky-50" : th.soft}`}
                  >
                    <span className={`inline-flex rounded-full px-3 py-1 font-display text-[0.95rem] font-black ${i % 2 ? "bg-sky text-white" : th.bullet}`}>
                      {g.age[lang]}
                    </span>
                    <p className="mt-2 text-[0.94rem] leading-snug">{g.text[lang]}</p>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {/* достижения */}
          {teacher.achievements?.[lang].length ? (
            <Block title={T.achievements}>
              <ul className="grid gap-2">
                {teacher.achievements[lang].map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Sparkles className="mt-0.5 size-5 shrink-0 text-[#FF8A1F]" aria-hidden="true" />
                    <span className="font-semibold leading-snug text-ink">{a}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {/* принцип / кредо / цель */}
          {teacher.quote ? (
            <figure className={`relative mt-7 overflow-hidden rounded-[28px_28px_28px_10px] p-5 pl-14 sm:p-6 sm:pl-16 ${th.soft}`}>
              <Quote className="absolute left-4 top-5 size-7 sm:left-5 sm:size-8" style={{ color: th.hex }} aria-hidden="true" />
              <figcaption className="font-display text-[0.82rem] font-extrabold uppercase tracking-wide text-ink-soft">
                {teacher.quote.label[lang]}
              </figcaption>
              <blockquote className="mt-1.5 font-display text-[1.08rem] font-extrabold leading-snug text-violet sm:text-[1.15rem]">
                {teacher.quote.kind === "text" ? teacher.quote.text[lang] : `«${teacher.quote.text[lang]}»`}
              </blockquote>
            </figure>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="flex items-center gap-2 text-[1.12rem] font-black">
        <Sparkle className="size-4 shrink-0" color="#FFE326" />
        {title}
      </h3>
      <div className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
