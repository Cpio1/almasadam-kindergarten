"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { assets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { HeroVideoPlaceholder } from "./HeroVideoPlaceholder";

/** Пропорции до загрузки метаданных видео (если нет постера). После загрузки берутся реальные. */
const DEFAULT_ASPECT = 4 / 5;

/**
 * Видео первого экрана: public/videos/main-page.mp4 (+ постер public/videos/main-page-poster.jpg —
 * первый кадр, чтобы до загрузки не было пустой/чёрной рамки).
 * H.264 + AAC, faststart: autoplay, loop, playsInline, без controls.
 * Старт всегда без звука (иначе браузеры блокируют автозапуск); звук включает сам посетитель
 * кнопкой в правом нижнем углу — через videoRef.current.muted, оригинальная дорожка ролика.
 * Если звуковой дорожки нет (проверка при сборке + в браузере), кнопка звука не показывается.
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
  /** Реальное состояние звука — синхронизируется с событием volumechange */
  const [muted, setMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(video?.hasAudio ?? false);
  /** Пользователь сам поставил паузу — не возобновляем автоматически */
  const userPaused = useRef(false);

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

  // Экономим батарею и трафик: ролик на паузе, пока главный экран вне поля зрения
  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.paused && !userPaused.current) el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (!video || failed) {
    return <HeroVideoPlaceholder className={className} />;
  }

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    if (!next) {
      el.volume = 1;
      // Звук включён по нажатию — это жест пользователя, поэтому play() со звуком разрешён
      if (el.paused) {
        userPaused.current = false;
        el.play().catch(() => {});
      }
    }
    setMuted(el.muted);
  };

  /** Проверка звуковой дорожки в браузерах, где это доступно (Safari / Firefox) */
  const detectAudio = (v: HTMLVideoElement) => {
    const anyV = v as HTMLVideoElement & { audioTracks?: { length: number }; mozHasAudio?: boolean };
    if (anyV.audioTracks && anyV.audioTracks.length === 0) setHasAudio(false);
    else if (typeof anyV.mozHasAudio === "boolean" && !anyV.mozHasAudio) setHasAudio(false);
  };

  const ctrl =
    "grid place-items-center rounded-full shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 focus-visible:outline-offset-2";

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
          detectAudio(v);
        }}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={video.src} type={video.type} />
      </video>

      {/* Управление: пауза слева, звук — в самом углу. Кнопки не перекрываются (flex + gap) */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 lg:bottom-4 lg:right-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.common.pauseVideo : t.common.playVideo}
          className={`${ctrl} size-11 bg-white/85 text-violet backdrop-blur hover:bg-white`}
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 translate-x-px" aria-hidden="true" />}
        </button>
        {hasAudio ? (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? t.common.soundOn : t.common.soundOff}
            aria-pressed={!muted}
            title={muted ? t.common.soundOn : t.common.soundOff}
            className={`${ctrl} size-12 ring-[3px] ring-white ${
              muted ? "bg-violet text-white hover:bg-violet-700" : "bg-sun text-violet hover:bg-[#ffd900]"
            }`}
          >
            {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
