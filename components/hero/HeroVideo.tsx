"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { HeroVideoPlaceholder } from "./HeroVideoPlaceholder";

/** Пропорции до загрузки метаданных видео (если нет постера). После загрузки берутся реальные. */
const DEFAULT_ASPECT = 4 / 5;

/**
 * Видео первого экрана: public/videos/almasadam-hero.mp4 (+ постер public/images/hero-poster.jpg).
 *
 * Наличие файла проверяется при сборке (scripts/check-assets.mjs), поэтому без видео
 * браузер не делает запрос и не получает 404 — показывается фирменная заглушка.
 *
 * Видео не обрезается: рамка принимает реальные пропорции ролика и вписывается
 * в доступную высоту (переменная --hero-media-max-h).
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = assets.heroVideo;
  const poster = assets.heroPoster;

  const [aspect, setAspect] = useState(poster ? poster.width / poster.height : DEFAULT_ASPECT);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // iOS Safari: muted должен быть выставлен как свойство и атрибут до play()
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    if (reduce) {
      el.pause();
      setPlaying(false);
      return;
    }
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [reduce]);

  if (!video || failed) {
    return <HeroVideoPlaceholder className={className} />;
  }

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto overflow-hidden rounded-[32px] bg-violet-50 shadow-lift ring-4 ring-white lg:rounded-[44px] ${className}`}
      style={{
        aspectRatio: aspect,
        width: `min(100%, calc(var(--hero-media-max-h) * ${aspect}))`,
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-contain"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster?.src}
        aria-label={t.hero.videoLabel}
        disablePictureInPicture
        controls={false}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) setAspect(v.videoWidth / v.videoHeight);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={video.src} type={video.type} />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.common.pauseVideo : t.common.playVideo}
        className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-white/85 text-violet shadow-soft backdrop-blur transition hover:bg-white"
      >
        {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 translate-x-px" aria-hidden="true" />}
      </button>
    </motion.div>
  );
}
