"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sections, whatsappLink, type SectionId } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { scrollToSection, useActiveSection, useScrolled } from "@/lib/hooks";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { DesktopNav } from "@/components/desktop/DesktopNav";
import { BurgerIcon, MobileMenu } from "@/components/mobile/MobileMenu";
import { LangSwitch } from "./LangSwitch";

export function Header() {
  const { t } = useI18n();
  const scrolled = useScrolled(12);
  const active = useActiveSection(sections);
  const [menuOpen, setMenuOpen] = useState(false);
  const pending = useRef<SectionId | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Прокрутка после закрытия меню — когда блокировка body уже снята
  useEffect(() => {
    if (!menuOpen && pending.current) {
      const id = pending.current;
      pending.current = null;
      requestAnimationFrame(() => scrollToSection(id));
    }
  }, [menuOpen]);

  const navigateFromMenu = (id: SectionId) => {
    pending.current = id;
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[var(--header-h)] transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-white/88 shadow-[0_8px_30px_-14px_rgba(48,32,121,0.28)] backdrop-blur-xl"
            : "bg-sky-100"
        }`}
      >
        <div className="container-site flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
            aria-label={`ALMASADAM — ${t.common.toTop}`}
            className="flex shrink-0 items-center"
          >
            <Logo className="h-9 lg:h-10" priority />
          </a>

          <DesktopNav active={active} onNavigate={scrollToSection} />

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch id="lang-header" />
            <a
              href={whatsappLink(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa hidden !min-h-11 !px-5 !text-[0.95rem] xl:inline-flex"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </a>
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.common.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-12 place-items-center rounded-full bg-violet text-white shadow-soft transition-transform active:scale-90 lg:hidden"
            >
              <BurgerIcon open={menuOpen} className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onNavigate={navigateFromMenu}
        active={active}
        returnFocusRef={burgerRef}
      />
    </>
  );
}
