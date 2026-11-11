import Image from "next/image";
import { assets } from "@/lib/assets";

/**
 * Фирменный логотип ALMASADAM из public/images/logo.png.
 * Пока файла нет — показывается аккуратная текстовая надпись (не поддельный логотип).
 * Пропорции сохраняются: задаётся только высота, ширина вычисляется автоматически.
 */
export function Logo({
  className = "h-10",
  priority = false,
  tone = "violet",
}: {
  className?: string;
  priority?: boolean;
  tone?: "violet" | "white";
}) {
  if (assets.logo) {
    return (
      <Image
        src={assets.logo.src}
        width={assets.logo.width}
        height={assets.logo.height}
        alt="ALMASADAM"
        priority={priority}
        sizes="240px"
        className={`${className} w-auto object-contain`}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center font-display text-[1.15rem] font-black tracking-[0.03em] min-[375px]:text-[1.3rem] lg:text-[1.5rem] ${
        tone === "white" ? "text-white" : "text-violet"
      }`}
      aria-label="ALMASADAM"
    >
      ALMASADAM
    </span>
  );
}
