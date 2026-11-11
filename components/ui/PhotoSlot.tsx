import Image from "next/image";
import type { ImageAsset } from "@/lib/assets";
import type { ProgramTone } from "@/data/programs";
import { tones } from "@/lib/tones";
import { Blob, Cube, Sparkle } from "./Decor";

/**
 * Место под настоящую фотографию. Если файла нет — нейтральная декоративная заглушка
 * (без выдуманных фото детей и без технических надписей).
 */
export function PhotoSlot({
  photo,
  alt,
  tone = "sky",
  className = "",
  sizes = "(max-width: 1024px) 90vw, 560px",
  variant = 0,
}: {
  photo: ImageAsset | null | undefined;
  alt: string;
  tone?: ProgramTone;
  className?: string;
  sizes?: string;
  variant?: 0 | 1 | 2;
}) {
  const pos = /\babsolute\b/.test(className) ? "" : "relative";
  if (photo) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <Image src={photo.src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const t = tones[tone];
  const cubeColors = ["#E83A32", "#FFE326", "#80C924", "#159FE2"];
  return (
    <div className={`${pos} overflow-hidden ${t.soft} ${className}`} aria-hidden="true">
      <div className="dots-bg absolute inset-0" />
      <Blob
        variant={variant}
        color="#ffffff"
        className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-80"
      />
      <Cube
        className="absolute left-1/2 top-1/2 w-[26%] -translate-x-[70%] -translate-y-[55%]"
        color={cubeColors[variant % 4]}
      />
      <Cube
        className="absolute left-1/2 top-1/2 w-[18%] translate-x-[18%] -translate-y-[10%]"
        color={cubeColors[(variant + 1) % 4]}
      />
      <Sparkle className="absolute right-[18%] top-[18%] w-[9%] animate-twinkle" color={t.hex} />
    </div>
  );
}
