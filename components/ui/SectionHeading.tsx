import type { ProgramTone } from "@/data/programs";
import { tones } from "@/lib/tones";
import { Sparkle } from "./Decor";
import { Reveal } from "./Reveal";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: ProgramTone;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "sky",
  align = "left",
  invert = false,
  className = "",
}: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <span
        className={`eyebrow ${invert ? "bg-white/12 text-white" : `${tones[tone].soft} text-violet`}`}
      >
        <span className={`grid size-6 place-items-center rounded-full ${tones[tone].solid}`}>
          <Sparkle className="size-3.5" color={tone === "sun" ? "#302079" : "#fff"} />
        </span>
        {eyebrow}
      </span>
      <h2 id={id} className={`h-section mt-4 lg:mt-3 ${invert ? "!text-white" : ""}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`text-lead mt-4 lg:mt-3 ${center ? "mx-auto" : ""} ${invert ? "!text-white/80" : ""}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
