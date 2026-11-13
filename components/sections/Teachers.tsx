"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { teachers, type Teacher } from "@/data/teachers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Sparkle, Wave } from "@/components/ui/Decor";
import { Star3D } from "@/components/ui/Fun";
import { Cube3D, Organic, RainbowArc, StarField, Swirl } from "@/components/ui/Shapes";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { TeacherDetailModal } from "@/components/teachers/TeacherDetailModal";

/**
 * «Наши педагоги» — команда ALMASADAM.
 * Данные — data/teachers.ts, фото — public/images/teachers/, оформление карточек — components/teachers/theme.tsx.
 *
 * Раскладка:
 *  • телефон — заголовок, Әлем с репликой, затем крупные вертикальные карточки в одну колонку;
 *  • планшет — две колонки;
 *  • десктоп — Әлем слева «представляет» команду, заголовок справа; карточки 3 × 2,
 *    средняя колонка чуть смещена вниз.
 */
export function Teachers() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Teacher | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section
      id="teachers"
      aria-labelledby="teachers-title"
      className="section-clip relative bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF9EC_22%,#F6F2FF_62%,#EEF8FF_88%,#FFFFFF_100%)]"
    >
      {/* ── фон раздела: мягкие пятна и фигуры в полях (не у карточек) ── */}
      <Organic className="absolute -left-28 top-[14%] w-[300px] opacity-50 lg:-left-24 lg:w-[400px]" color="#FFF4A8" />
      <Organic className="absolute -right-32 top-[46%] w-[300px] opacity-45 lg:w-[420px]" color="#FFD6E6" variant={1} />
      <Organic className="absolute -left-24 bottom-[8%] hidden w-[320px] opacity-40 sm:block" color="#CDECFB" />
      <Swirl className="absolute -right-8 top-[9%] hidden w-24 animate-spin-rev xl:block" color="#159FE2" dot="#FFE326" />
      <StarField className="absolute left-[3%] top-[54%] hidden w-28 animate-twinkle min-[1400px]:block" />
      <RainbowArc
        className="absolute -right-10 bottom-[12%] hidden w-32 -rotate-[70deg] animate-sway min-[1400px]:block"
        colors={["#E83A32", "#FF8A1F", "#FFE326", "#80C924"]}
      />

      <div className="container-site section-y relative !pt-8 lg:!pt-6">
        {/* ── заголовок + Әлем ── */}
        <div className="grid items-end gap-x-6 gap-y-2 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-x-8">
          <div className="lg:order-2 lg:pb-6">
            <SectionHeading
              id="teachers-title"
              eyebrow={t.teachers.eyebrow}
              title={t.teachers.title}
              subtitle={t.teachers.subtitle}
              tone="berry"
            />
          </div>

          {/* Әлем «представляет» команду: рука показывает вправо — на заголовок и карточки */}
          <div className="relative h-[170px] sm:h-[190px] lg:order-1 lg:h-[250px]">
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-[78%] w-[150px] sm:w-[170px] lg:w-[210px]">
              <div className="shape-arch absolute inset-0 bg-sun-100" />
              <div className="shape-arch absolute inset-x-[12%] bottom-0 top-[12%] bg-sun/60" />
            </div>
            <Star3D className="absolute bottom-[56%] left-[118px] w-10 animate-wiggle sm:left-[136px] lg:bottom-auto lg:left-[176px] lg:top-[26%] lg:w-11" color="#FF7BAC" shade="#d94f86" />
            <Cube3D className="absolute bottom-0 left-[132px] w-11 animate-float [--r:8deg] sm:left-[150px] lg:left-[190px] lg:w-12" color="#80C924" letter="Ә" letterColor="#302079" />
            <Sparkle className="absolute left-2 top-[18%] w-5 animate-twinkle" color="#159FE2" />
            <MascotFigure
              pose="contact"
              variant="calm"
              size="custom"
              delay={0.15}
              floatIntensity={0.9}
              say={t.teachers.mascotSay}
              bubbleSide="right"
              bubbleClassName="!top-[2%] lg:!top-[-2%]"
              className="!absolute bottom-0 left-[6px] w-[136px] sm:w-[150px] lg:left-[12px] lg:w-[184px]"
              sizes="(max-width: 1024px) 150px, 190px"
            />
          </div>
        </div>

        {/* ── педагоги ── десктоп: средняя колонка чуть ниже — «живая» композиция без потери порядка чтения */}
        <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:mt-10 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16 lg:pb-10">
          {teachers.map((teacher, i) => (
            <li key={teacher.id} className="relative lg:nth-[3n+2]:top-10">
              <TeacherCard teacher={teacher} index={i} onOpen={() => setSelected(teacher)} />
            </li>
          ))}
        </ul>
      </div>

      <Wave fill="#FFFFFF" />
      <TeacherDetailModal teacher={selected} onClose={close} />
    </section>
  );
}
