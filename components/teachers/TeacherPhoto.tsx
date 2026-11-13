"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import type { Teacher } from "@/data/teachers";

/**
 * Портрет педагога (next/image, заполняет родителя — у родителя должны быть position и размер).
 * Кадрирование — teacher.photoFocus, чтобы голова не обрезалась.
 * Если файла public/images/teachers/<id>.jpg нет — аккуратная заглушка с инициалами.
 */
export function TeacherPhoto({
  teacher,
  sizes,
  className = "",
}: {
  teacher: Teacher;
  sizes: string;
  className?: string;
}) {
  const { t } = useI18n();
  const img = assets.teachers[teacher.id];

  if (!img) {
    const initials = teacher.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
    return (
      <div
        role="img"
        aria-label={`${t.teachers.photoAlt}: ${teacher.name}`}
        className="dots-bg absolute inset-0 grid place-items-center bg-white/70 text-center"
      >
        <span className="flex flex-col items-center gap-2 px-3">
          <span className="grid size-16 place-items-center rounded-full bg-violet font-display text-2xl font-black text-white">
            {initials}
          </span>
          <span className="inline-flex items-center gap-1.5 font-display text-[0.8rem] font-bold text-violet/70">
            <Camera className="size-4" aria-hidden="true" />
            {t.teachers.photoSoon}
          </span>
        </span>
      </div>
    );
  }

  return (
    <Image
      src={img.src}
      alt={`${t.teachers.photoAlt}: ${teacher.name}`}
      fill
      sizes={sizes}
      draggable={false}
      className={`select-none object-cover ${className}`}
      style={{ objectPosition: teacher.photoFocus ?? "50% 25%" }}
    />
  );
}
