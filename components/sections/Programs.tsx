"use client";

import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Sparkle, Wave } from "@/components/ui/Decor";
import { ProgramsDesktop } from "@/components/desktop/ProgramsDesktop";
import { ProgramsMobile } from "@/components/mobile/ProgramsMobile";

export function Programs() {
  const { t } = useI18n();
  return (
    <section id="programs" aria-labelledby="programs-title" className="section-clip relative bg-milk">
      <Sparkle className="absolute right-[8%] top-16 w-8 animate-twinkle lg:w-6" color="#159FE2" />
      <div className="container-site section-y !pt-12 lg:!pt-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow={t.programs.eyebrow}
            title={t.programs.title}
            subtitle={t.programs.subtitle}
            tone="sky"
          />
          <div className="hidden shrink-0 pr-36 lg:block xl:pr-40">
            <MascotFigure
              pose="reading"
              variant="hover"
              size="custom"
              delay={0.1}
              say={t.programs.mascotSay}
              className="w-[clamp(150px,12vw,196px)]"
              sizes="200px"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-8">
          <ProgramsDesktop />
          <ProgramsMobile />
        </div>

        <div className="mt-8 flex flex-col items-start gap-6 lg:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-xl items-start gap-2.5 text-[0.93rem] text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
            {t.programs.note}
          </p>
          <div className="self-end pr-2 pt-6 lg:hidden">
            <MascotFigure
              pose="reading"
              variant="hover"
              size="custom"
              say={t.programs.mascotSay}
              bubbleSide="left"
              className="w-[clamp(128px,36vw,168px)]"
              sizes="170px"
            />
          </div>
        </div>
      </div>
      <Wave fill="#302079" />
    </section>
  );
}
