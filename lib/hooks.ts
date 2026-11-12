"use client";

import { useEffect, useState } from "react";

/** true, когда страница прокручена больше чем на `offset` px */
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

/** Какой раздел сейчас в зоне просмотра (для подсветки пунктов меню) */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // Берём первый по порядку видимый раздел
        const first = ids.find((id) => visible.has(id)) ?? null;
        setActive(first);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Блокирует прокрутку body (мобильное меню, просмотр фото) */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    // iOS Safari игнорирует overflow:hidden на body — фиксируем body и запоминаем позицию прокрутки
    const y = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      Object.assign(body.style, prev);
      // мгновенно, без плавной анимации html { scroll-behavior: smooth }
      window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
    };
  }, [locked]);
}

/** Видимость элемента в окне */
export function useInView(id: string, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [id, rootMargin]);
  return inView;
}

/** Плавная прокрутка к разделу с учётом шапки (scroll-margin-top задан в CSS) */
export function scrollToSection(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}
