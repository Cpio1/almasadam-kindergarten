"use client";

import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mascot } from "@/components/ui/Mascot";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkle, Wave } from "@/components/ui/Decor";
import { ProgramsDesktop } from "@/components/desktop/ProgramsDesktop";
import { ProgramsMobile } from "@/components/mobile/ProgramsMobile";

export function Programs() {
  const { t } = useI18n();
  return (
    <section id="programs" aria-labelledby="programs-title" className="section-clip relative bg-milk">
      <Sparkle className="absolute right-[8%] top-16 w-8 animate-twinkle" color="#159FE2" />
      <div className="container-site section-y !pt-12 lg:!pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow={t.programs.eyebrow}
            title={t.programs.title}
            subtitle={t.programs.subtitle}
            tone="sky"
          />
          <Reveal delay={0.1} className="hidden shrink-0 pr-40 lg:block xl:pr-44">
            <Mascot pose="reading" say={t.programs.mascotSay} className="w-[150px] xl:w-[170px]" sizes="180px" />
          </Reveal>
        </div>

        <div className="mt-10 lg:mt-12">
          <ProgramsDesktop />
          <ProgramsMobile />
        </div>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-xl items-start gap-2.5 text-[0.93rem] text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden="true" />
            {t.programs.note}
          </p>
          <div className="self-end pr-2 pt-6 lg:hidden">
            <Mascot pose="reading" say={t.programs.mascotSay} bubbleSide="left" className="w-[104px]" sizes="120px" />
          </div>
        </div>
      </div>
      <Wave fill="#302079" />
    </section>
  );
}
