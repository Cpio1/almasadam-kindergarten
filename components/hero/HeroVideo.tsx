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
  /** Звуковая дорожка проверяется при сборке (scripts/check-assets.mjs) — без ненадёжных догадок в браузере */
  const hasAudio = video?.hasAudio ?? false;
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

  /**
   * Звук: всё синхронно внутри обработчика нажатия — iOS Safari и Android Chrome
   * разрешают звук только в прямом ответ на жест пользователя.
   * Видеоэлемент не пересоздаётся: меняется только videoRef.current.muted.
   */
  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.muted) {
      el.muted = false;
      el.defaultMuted = false;
      el.removeAttribute("muted"); // iOS: атрибут muted иначе может «перебить» свойство
      el.volume = 1; // на iOS громкость задаётся кнопками телефона — строка безвредна
      if (el.paused) {
        userPaused.current = false;
      }
      // play() в том же жесте: если ролик стоял на паузе — запустится уже со звуком
      el.play().catch(() => {
        // браузер отказал (редко) — возвращаемся в беззвучный режим, состояние кнопки честное
        el.muted = true;
        setMuted(true);
      });
    } else {
      el.muted = true;
    }
    setMuted(el.muted);
  };

  const ctrl =
    "inline-flex items-center justify-center rounded-full shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 active:scale-95 focus-visible:outline-offset-2";

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
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={video.src} type={video.type} />
      </video>

      {/* Управление в правом нижнем углу (там пол сцены — лица детей не закрываются).
          Единый стиль: белые «таблетки» с фиолетовой обводкой; звук включён — жёлтая. Высота ≥ 44px. */}
      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.common.pauseVideo : t.common.playVideo}
          className={`${ctrl} size-11 bg-white/90 text-violet ring-2 ring-violet/10 backdrop-blur hover:bg-white`}
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
            className={`${ctrl} h-11 min-w-11 gap-1.5 px-3 font-display text-[0.86rem] font-extrabold ring-2 ring-white sm:h-12 sm:min-w-12 ${
              muted ? "bg-violet text-white hover:bg-violet-700" : "bg-sun px-0 text-violet hover:bg-[#ffd900]"
            }`}
          >
            {muted ? (
              <>
                <VolumeX className="size-5 shrink-0" aria-hidden="true" />
                <span aria-hidden="true" className="whitespace-nowrap pr-0.5">{t.common.soundPill}</span>
              </>
            ) : (
              <Volume2 className="size-5" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
