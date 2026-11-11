"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Camera, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { galleryConfig, GALLERY_PAGE_SIZE } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Wave } from "@/components/ui/Decor";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { GalleryPhoto } from "@/components/gallery/types";
import type { ProgramTone } from "@/data/programs";

/** Чередование «необычных» скруглений карточек */
const shapes = [
  "rounded-[32px_32px_32px_10px]",
  "rounded-[999px_999px_28px_28px]",
  "rounded-[10px_32px_32px_32px]",
  "rounded-[32px]",
  "rounded-[32px_10px_32px_32px]",
  "rounded-[28px_28px_999px_999px]",
  "rounded-[32px_32px_10px_32px]",
  "rounded-[40px_16px]",
];

/** Заглушки: разная высота для живой мозаики */
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

  /** Порядок из data/gallery.ts, затем остальные файлы из public/gallery/ */
  const photos: GalleryPhoto[] = useMemo(() => {
    const bySrc = new Map(assets.gallery.map((a) => [a.src, a]));
    const list: GalleryPhoto[] = [];
    const used = new Set<string>();
    for (const entry of galleryConfig) {
      const a = bySrc.get(entry.src);
      if (!a) continue;
      used.add(a.src);
      list.push({ ...a, alt: entry.alt?.[lang] ?? t.gallery.photoAlt });
    }
    for (const a of assets.gallery) {
      if (!used.has(a.src)) list.push({ ...a, alt: t.gallery.photoAlt });
    }
    return list.map((p, i) => ({ ...p, alt: p.alt === t.gallery.photoAlt ? `${p.alt} — ${i + 1}` : p.alt }));
  }, [lang, t.gallery.photoAlt]);

  const hasPhotos = photos.length > 0;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-clip relative bg-white">
      <div className="container-site section-y !pt-8 lg:!pt-8">
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
            <ul className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:mt-9 lg:columns-4 lg:gap-4">
              {photos.slice(0, visible).map((p, i) => (
                <motion.li
                  key={p.src}
                  className="mb-3 break-inside-avoid sm:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`${t.gallery.openPhoto}: ${p.alt}`}
                    className={`group relative block w-full overflow-hidden bg-violet-50 ${shapes[i % shapes.length]}`}
                  >
                    <Image
                      src={p.src}
                      width={p.width}
                      height={p.height}
                      alt={p.alt}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-violet/0 transition-colors duration-300 group-hover:bg-violet/25">
                      <span className="grid size-12 scale-75 place-items-center rounded-full bg-white text-violet opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <Plus className="size-6" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            {visible < photos.length ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + GALLERY_PAGE_SIZE)}
                  className="btn btn-ghost"
                >
                  <Plus className="size-5" aria-hidden="true" />
                  {t.gallery.showMore}
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
      <Wave fill="#FFFCF5" variant={1} />
    </section>
  );
}
