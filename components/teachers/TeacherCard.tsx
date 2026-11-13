"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Teacher } from "@/data/teachers";
import { TeacherPhoto } from "./TeacherPhoto";
import { plural, teacherThemes } from "./theme";

const ease = [0.22, 1, 0.36, 1] as const;

/** Стикер «20 лет опыта» — число крупно, подпись в две строки */
export function ExperienceSticker({ years, className = "", sticker }: { years: number; className?: string; sticker: string }) {
  const { t, lang } = useI18n();
  const label = plural(years, t.teachers.yearsExp, lang);
  const [first, ...rest] = label.split(" ");
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[18px_18px_18px_6px] py-1.5 pl-2.5 pr-3 font-display leading-none ${sticker} ${className}`}
    >
      <span className="text-[1.65rem] font-black tracking-tight">{years}</span>
      <span className="text-left text-[0.72rem] font-extrabold leading-[1.05]">
        {first}
        <br />
        {rest.join(" ")}
      </span>
    </span>
  );
}

/**
 * Карточка педагога: фото в фигурной рамке на цветной подложке, имя, должность,
 * стаж (если известен), одна фраза и кнопка «Подробнее».
 * Кнопка растянута на всю карточку (after:inset-0) — карточка кликабельна целиком,
 * но в порядке Tab это одна кнопка.
 */
export const TeacherCard = forwardRef<HTMLButtonElement, { teacher: Teacher; index: number; onOpen: () => void }>(
  function TeacherCard({ teacher, index, onOpen }, ref) {
    const { t, lang } = useI18n();
    const th = teacherThemes[teacher.accent];
    const cardBadges = teacher.qualification?.filter((q) => q.showOnCard) ?? [];
    const titleId = `teacher-${teacher.id}-name`;

    return (
      <motion.div
        className="relative h-full"
        initial={{ opacity: 0, y: 34, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease }}
      >
        <article
          aria-labelledby={titleId}
          className={`group relative flex h-full flex-col px-4 pb-5 pt-9 transition-transform duration-300 ease-out hover:-translate-y-2 focus-within:-translate-y-2 sm:px-5 lg:px-5 lg:pb-5 lg:pt-8 ${th.card}`}
        >
          {/* декор у краёв карточки */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
            {th.deco}
          </span>

          {/* ── фото на цветной подложке ── */}
          <div className="relative mx-auto aspect-[4/5] w-[min(76%,272px)] sm:w-[78%] lg:w-[min(70%,250px)]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute -inset-[9%] animate-morph opacity-90" style={{ background: th.blob }} />
              {th.backdrop}
            </span>
            <div className={`absolute inset-0 overflow-hidden bg-white ring-[6px] ring-white shadow-[0_14px_26px_-14px_rgb(48_32_121/0.45)] ${th.frame}`}>
              <TeacherPhoto
                teacher={teacher}
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 40vw, 260px"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>
            {/* предмет педагога */}
            <span
              aria-hidden="true"
              className={`absolute -left-3 top-[12%] grid size-11 -rotate-12 place-items-center rounded-full ring-4 ring-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${th.sticker}`}
            >
              <th.Icon className="size-5" strokeWidth={2.4} />
            </span>
            {teacher.experience ? (
              <ExperienceSticker
                years={teacher.experience.years}
                sticker={th.sticker}
                className="absolute -bottom-3 -right-4 rotate-[-6deg] ring-4 ring-white transition-transform duration-500 group-hover:rotate-[4deg] sm:-right-5"
              />
            ) : null}
          </div>

          {/* ── текст ── */}
          <div className="mt-6 flex flex-1 flex-col text-center">
            <h3 id={titleId} className="text-[1.22rem] font-black leading-tight sm:text-[1.25rem] lg:text-[1.2rem]">
              {teacher.name}
            </h3>
            <p className={`mt-1.5 font-display text-[0.95rem] font-extrabold leading-snug lg:text-[0.92rem] ${th.role}`}>
              {teacher.role[lang]}
            </p>
            {cardBadges.length ? (
              <p className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                {cardBadges.map((b) => (
                  <span
                    key={b.value.ru}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-display text-[0.78rem] font-extrabold leading-none ${th.chip}`}
                  >
                    <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" />
                    {b.value[lang]}
                  </span>
                ))}
              </p>
            ) : null}
            <p className="mx-auto mt-2.5 max-w-[34ch] text-[0.94rem] leading-snug text-ink-soft lg:text-[0.9rem]">
              {teacher.shortDescription[lang]}
            </p>

            <div className="mt-auto pt-4">
              <button
                ref={ref}
                type="button"
                onClick={onOpen}
                aria-haspopup="dialog"
                aria-label={`${t.teachers.moreAbout}: ${teacher.name}`}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-display text-[0.95rem] font-extrabold transition-[transform,background-color] duration-200 active:translate-y-[3px] after:absolute after:inset-0 after:content-[''] lg:min-h-10 ${th.button}`}
              >
                {t.teachers.more}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </motion.div>
    );
  },
);
