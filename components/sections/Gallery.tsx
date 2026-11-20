"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Camera, Plus, ZoomIn } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { galleryConfig, GALLERY_PAGE_SIZE } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Flower, Sparkle, Wave } from "@/components/ui/Decor";
import { Burst, Confetti, Heart, Polaroid } from "@/components/ui/Shapes";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { GalleryPhoto } from "@/components/gallery/types";
import type { ProgramTone } from "@/data/programs";

/* ------------------------------------------------------------------ */
/*  Раскладка мозаики                                                  */
/* ------------------------------------------------------------------ */

type Tile = "big" | "tall" | "wide" | "sm" | "pano";

/**
 * Узор повторяется блоками по 8 фото. Каждый блок плотно заполняет сетку
 * (телефон — 2 колонки, десктоп — 4 колонки), поэтому «дыр» не бывает.
 * Для неполного последнего блока — отдельные узоры по количеству фото.
 */
const MOBILE_FULL: Tile[] = ["big", "sm", "tall", "sm", "wide", "sm", "tall", "sm"];
const MOBILE_REST: Record<number, Tile[]> = {
  1: ["big"],
  2: ["big", "wide"],
  3: ["big", "sm", "sm"],
  4: ["big", "sm", "tall", "sm"],
  5: ["big", "sm", "tall", "sm", "wide"],
  6: ["big", "sm", "tall", "sm", "wide", "wide"],
  7: ["big", "sm", "tall", "sm", "wide", "sm", "sm"],
};

const DESKTOP_FULL: Tile[] = ["big", "sm", "tall", "sm", "sm", "big", "tall", "sm"];
const DESKTOP_REST: Record<number, Tile[]> = {
  1: ["pano"],
  2: ["big", "big"],
  3: ["big", "wide", "wide"],
  4: ["big", "sm", "tall", "sm"],
  5: ["big", "sm", "sm", "sm", "sm"],
  6: ["big", "sm", "tall", "sm", "wide", "wide"],
  7: ["big", "sm", "tall", "sm", "sm", "wide", "sm"],
};

function tileFor(i: number, total: number, full: Tile[], rest: Record<number, Tile[]>): Tile {
  const block = Math.floor(i / 8);
  const lastBlockSize = total - block * 8;
  if (lastBlockSize >= 8) return full[i % 8];
  return rest[lastBlockSize][i % 8];
}

const mobileSpan: Record<Tile, string> = {
  big: "col-span-2 row-span-2",
  pano: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  sm: "col-span-1 row-span-1",
};
const desktopSpan: Record<Tile, string> = {
  big: "lg:col-span-2 lg:row-span-2",
  pano: "lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-1 lg:row-span-2",
  wide: "lg:col-span-2 lg:row-span-1",
  sm: "lg:col-span-1 lg:row-span-1",
};

/** Фигурные рамки — чередуются по кругу */
const shapes = [
  "rounded-[44px_44px_44px_14px]",
  "shape-blob",
  "shape-arch",
  "shape-pebble",
  "shape-leaf",
  "rounded-[14px_56px_14px_56px]",
  "rounded-[999px]",
  "rounded-[32px_32px_10px_32px]",
];

/** Яркие подложки за фотографиями (фирменная палитра) */
const plates = [
  { bg: "bg-sun", tilt: "rotate-[3deg] translate-x-2 translate-y-2" },
  { bg: "bg-sky", tilt: "-rotate-[4deg] -translate-x-1.5 translate-y-2" },
  { bg: "bg-berry-100", tilt: "rotate-[4deg] translate-x-2 -translate-y-1" },
  { bg: "bg-leaf", tilt: "-rotate-[3deg] -translate-x-2 translate-y-1.5" },
  { bg: "bg-[#FF7BAC]", tilt: "rotate-[3deg] translate-x-1.5 translate-y-2" },
  { bg: "bg-violet-100", tilt: "-rotate-[3deg] translate-x-2 translate-y-2" },
  { bg: "bg-[#FF8A1F]", tilt: "rotate-[4deg] -translate-x-1.5 translate-y-1.5" },
  { bg: "bg-sky-100", tilt: "-rotate-[4deg] translate-x-1.5 -translate-y-1.5" },
];

/** Маленькие «наклейки» на углах некоторых фото */
function TileSticker({ i }: { i: number }) {
  switch (i % 8) {
    case 0:
      return <Sparkle className="absolute -right-2 -top-3 z-10 w-9 animate-twinkle lg:w-12" color="#FFE326" />;
    case 2:
      return <Heart className="absolute -left-2 -top-2 z-10 w-7 animate-pop [--r:-10deg] lg:w-9" color="#E83A32" />;
    case 5:
      return <Flower className="absolute -bottom-3 -right-2 z-10 w-9 animate-spin-slower lg:w-11" color="#FF7BAC" />;
    case 6:
      return <Sparkle className="absolute -right-2 bottom-6 z-10 w-7 animate-twinkle [animation-delay:-1.2s]" color="#159FE2" />;
    default:
      return null;
  }
}

/** Заглушки (пока фото нет) */
const placeholderTiles: { aspect: string; tone: ProgramTone; extra?: string }[] = [
  { aspect: "aspect-[4/5]", tone: "sky" },
  { aspect: "aspect-square", tone: "sun" },
  { aspect: "aspect-[3/4]", tone: "leaf" },
  { aspect: "aspect-[4/3]", tone: "berry" },
  { aspect: "aspect-[4/5]", tone: "violet" },
  { aspect: "aspect-[1/1.1]", tone: "sky" },
  { aspect: "aspect-[4/3]", tone: "sun", extra: "hidden sm:block" },
  { aspect: "aspect-[3/4]", tone: "leaf", extra: "hidden sm:block" },
];

export function Gallery() {
  const { t, lang } = useI18n();
  const [visible, setVisible] = useState(GALLERY_PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Порядок из data/gallery.ts, затем остальные файлы из public/gallery/ (без повторов) */
  const photos: GalleryPhoto[] = useMemo(() => {
    const bySrc = new Map(assets.gallery.map((a) => [a.src, a]));
    const list: GalleryPhoto[] = [];
    const used = new Set<string>();
    for (const entry of galleryConfig) {
      const a = bySrc.get(entry.src);
      if (!a || used.has(a.src)) continue;
      used.add(a.src);
      const caption = entry.alt?.[lang];
      list.push({ ...a, alt: caption ?? t.gallery.photoAlt, caption });
    }
    for (const a of assets.gallery) {
      if (!used.has(a.src)) list.push({ ...a, alt: t.gallery.photoAlt });
    }
    return list.map((p, i) => (p.caption ? p : { ...p, alt: `${p.alt} — ${i + 1}` }));
  }, [lang, t.gallery.photoAlt]);

  const hasPhotos = photos.length > 0;
  const shown = Math.min(visible, photos.length);
  const rest = photos.length - shown;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-clip relative bg-milk">
      {/* «Галерея» — тема праздника: звёзды-взрывы, конфетти, полароиды, сердечко */}
      <Burst className="absolute left-2 top-8 w-11 animate-spin-slower sm:left-8 sm:w-14 lg:hidden" />
      <Heart className="absolute right-4 top-10 w-8 animate-pop [--r:12deg] sm:right-10 sm:w-10 lg:hidden" color="#FF7BAC" />
      <Burst className="absolute left-[5%] top-12 hidden w-20 animate-spin-slower lg:block" color="#159FE2" inner="#FFE326" />
      <Confetti className="absolute right-[3%] top-10 hidden w-24 animate-orbit lg:block xl:right-[8%] xl:w-32" />
      <Polaroid className="absolute -left-6 top-[46%] hidden w-20 animate-sway [--r:-14deg] xl:block" color="#FBD5D2" />
      <Polaroid className="absolute -right-4 top-[62%] hidden w-16 animate-sway [--r:12deg] [animation-delay:-2s] xl:block" color="#CDECFB" />

      <div className="container-site section-y relative !pt-8 lg:!pt-8">
        <SectionHeading
          id="gallery-title"
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          tone="berry"
          align="center"
        />

        {hasPhotos ? (
          <>
            <div className="relative mt-10 lg:mx-auto lg:mt-10 lg:max-w-[1120px]">
              {/* мягкие цветные пятна за мозаикой */}
              <span aria-hidden="true" className="shape-blob absolute -left-10 top-[8%] size-48 bg-sun-100/70 blur-2xl lg:size-72" />
              <span aria-hidden="true" className="shape-blob-2 absolute -right-10 bottom-[10%] size-48 bg-sky-100/80 blur-2xl lg:size-80" />
              <Sparkle className="absolute -left-1 top-[42%] hidden w-6 animate-twinkle lg:-left-10 lg:block" color="#80C924" />
              <Sparkle className="absolute -right-1 top-[18%] hidden w-5 animate-twinkle [animation-delay:-2s] lg:-right-9 lg:block" color="#E83A32" />

              <ul
                className="relative grid grid-flow-row-dense grid-cols-2 auto-rows-[clamp(112px,33vw,200px)] gap-x-3.5 gap-y-4 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-4 lg:auto-rows-[clamp(150px,13.5vw,186px)] lg:gap-x-6 lg:gap-y-7"
              >
                {photos.slice(0, shown).map((p, i) => {
                  const mTile = tileFor(i, shown, MOBILE_FULL, MOBILE_REST);
                  const dTile = tileFor(i, shown, DESKTOP_FULL, DESKTOP_REST);
                  const shape = shapes[i % shapes.length];
                  const plate = plates[i % plates.length];
                  const isBig = dTile === "big" || dTile === "pano";
                  const mobileBig = mTile === "big" || mTile === "pano";
                  const enterRotate = i % 2 ? 3 : -3;
                  return (
                    <motion.li
                      key={p.src}
                      className={`relative ${mobileSpan[mTile]} ${desktopSpan[dTile]}`}
                      initial={{ opacity: 0, y: 36, scale: 0.92, rotate: enterRotate }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                      transition={{ type: "spring", stiffness: 140, damping: 18, delay: (i % 4) * 0.07 }}
                    >
                      {/* цветная подложка */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 ${shape} ${plate.bg} ${plate.tilt} transition-transform duration-500 ease-out`}
                      />
                      <TileSticker i={i} />

                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        aria-label={`${t.gallery.openPhoto}: ${p.alt}`}
                        className={`group relative block size-full overflow-hidden bg-violet-50 ring-[3px] ring-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:-rotate-[1.2deg] focus-visible:-translate-y-1 sm:ring-4 ${shape}`}
                      >
                        <Image
                          src={p.src}
                          fill
                          alt={p.alt}
                          sizes={
                            isBig
                              ? "(max-width: 1023px) 100vw, 560px"
                              : mobileBig
                                ? "(max-width: 1023px) 100vw, 280px"
                                : "(max-width: 1023px) 50vw, 280px"
                          }
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />
                        {/* мягкое затемнение при наведении */}
                        <span className="absolute inset-0 bg-gradient-to-t from-violet/45 via-violet/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute right-3 top-3 grid size-10 scale-75 place-items-center rounded-full bg-white/95 text-violet opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:size-11">
                          <ZoomIn className="size-5" aria-hidden="true" />
                        </span>
                        {p.caption ? (
                          <span
                            className={`absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-full bg-white/95 px-3 py-1 font-display text-[0.78rem] font-bold text-violet shadow-soft transition duration-300 lg:bottom-4 lg:left-4 lg:px-4 lg:py-1.5 lg:text-sm ${
                              isBig
                                ? "lg:translate-y-0 lg:opacity-100"
                                : "lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                            } ${mobileBig ? "" : "max-lg:hidden"}`}
                          >
                            {p.caption}
                          </span>
                        ) : null}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {rest > 0 ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + GALLERY_PAGE_SIZE)}
                  className="btn btn-ghost group"
                >
                  <Plus className="size-5 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
                  {t.gallery.showMore}
                  <span className="grid min-w-7 place-items-center rounded-full bg-sun px-2 py-0.5 text-sm font-bold text-violet">
                    +{rest}
                  </span>
                </button>
              </div>
            ) : null}

            <Lightbox
              photos={photos}
              index={openIndex}
              onClose={() => setOpenIndex(null)}
              onChange={setOpenIndex}
            />
          </>
        ) : (
          <div className="relative mt-10 lg:mx-auto lg:mt-9 lg:max-w-[1000px]">
            <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-4" aria-hidden="true">
              {placeholderTiles.map((tile, i) => (
                <li key={i} className={`mb-3 break-inside-avoid sm:mb-4 ${tile.extra ?? ""}`}>
                  <PhotoSlot
                    photo={null}
                    alt=""
                    tone={tile.tone}
                    variant={(i % 3) as 0 | 1 | 2}
                    className={`w-full ${tile.aspect} ${shapes[i % shapes.length]}`}
                  />
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-4 flex w-fit max-w-full items-center gap-2.5 rounded-full bg-violet-50 px-5 py-3 text-center font-display text-[0.95rem] font-bold text-violet">
              <Camera className="size-5 shrink-0 text-berry" aria-hidden="true" />
              {t.gallery.placeholderNote}
            </p>
          </div>
        )}
      </div>
      <Wave fill="#FFFFFF" variant={1} />
    </section>
  );
}
