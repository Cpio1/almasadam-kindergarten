"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useBodyLock } from "@/lib/hooks";
import type { GalleryPhoto } from "./types";

export function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const { t } = useI18n();
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  useBodyLock(open);

  const go = (dir: 1 | -1) => {
    if (index === null || photos.length < 2) return;
    setDirection(dir);
    onChange((index + dir + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.viewer}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#140f2e]/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="absolute right-3 top-[max(12px,env(safe-area-inset-top))] z-10 grid size-12 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25"
          >
            <X className="size-6" aria-hidden="true" />
          </button>

          <p className="pointer-events-none absolute left-1/2 top-[max(22px,env(safe-area-inset-top))] -translate-x-1/2 font-display text-sm font-bold text-white/80">
            {(index ?? 0) + 1} {t.gallery.counter} {photos.length}
          </p>

          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={photo.src}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.25 }}
              drag={photos.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
              }}
              className="w-full touch-pan-y px-3 sm:px-20"
            >
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="92vw"
                draggable={false}
                style={{
                  width: `min(100%, calc(80svh * ${photo.width / photo.height}))`,
                  height: "auto",
                }}
                className="mx-auto select-none rounded-[20px] object-contain sm:rounded-[28px]"
              />
            </motion.div>
          </AnimatePresence>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.common.prev}
                className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-[calc(50%-64px)] grid size-12 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.common.next}
                className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] right-[calc(50%-64px)] grid size-12 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
