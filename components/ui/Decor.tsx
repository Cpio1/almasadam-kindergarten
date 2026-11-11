/**
 * Лёгкие SVG-декорации фирменного стиля. Только CSS-анимации (без JS),
 * все элементы aria-hidden и не перехватывают клики.
 */
import type { CSSProperties } from "react";

type DecorProps = { className?: string; style?: CSSProperties; color?: string };

/** Четырёхконечная звёздочка-искра */
export function Sparkle({ className = "", style, color = "#FFE326" }: DecorProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <path
        d="M12 0c.9 6.2 5 10.6 12 12-7 1.4-11.1 5.8-12 12-.9-6.2-5-10.6-12-12C7 10.6 11.1 6.2 12 0Z"
        fill={color}
      />
    </svg>
  );
}

/** Изометрический кубик (по мотивам фирменных кубиков логотипа, без букв логотипа) */
export function Cube({
  className = "",
  style,
  color = "#159FE2",
  letter,
}: DecorProps & { letter?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <path d="M32 4 58 17v30L32 60 6 47V17L32 4Z" fill={color} />
      <path d="M32 4 58 17 32 30 6 17 32 4Z" fill="#fff" fillOpacity=".38" />
      <path d="M32 30v30L6 47V17l26 13Z" fill="#000" fillOpacity=".08" />
      {letter ? (
        <text
          x="45"
          y="45"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-display)" }}
          fontWeight="900"
          fontSize="18"
          fill="#fff"
        >
          {letter}
        </text>
      ) : null}
    </svg>
  );
}

/** Мягкое цветовое пятно для фоновой подсветки */
export function Glow({ className = "", color = "#FFE326" }: DecorProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
    />
  );
}

/** Органическая клякса */
export function Blob({ className = "", style, color = "#EAF7FE", variant = 0 }: DecorProps & { variant?: 0 | 1 | 2 }) {
  const paths = [
    "M44.7,-58.3C57.2,-49.9,66.2,-35.8,70.8,-20.1C75.4,-4.4,75.6,12.9,68.6,26.5C61.6,40.1,47.4,50.1,32.4,57.8C17.4,65.5,1.6,70.9,-14.9,69.4C-31.4,67.9,-48.5,59.5,-59.6,46C-70.7,32.5,-75.8,13.9,-73.3,-3.4C-70.8,-20.7,-60.7,-36.6,-47.3,-45.2C-33.9,-53.8,-17,-55,-0.3,-54.6C16.4,-54.2,32.2,-66.7,44.7,-58.3Z",
    "M39.5,-49.1C52.4,-42.6,64.6,-31.5,69.4,-17.4C74.2,-3.3,71.6,13.8,63.4,27.2C55.2,40.6,41.4,50.4,26.6,57.1C11.8,63.8,-4,67.5,-19.6,64.4C-35.2,61.3,-50.6,51.4,-60.3,37.3C-70,23.2,-74,4.9,-69.9,-11.1C-65.8,-27.1,-53.6,-40.8,-39.6,-47.1C-25.6,-53.4,-9.8,-52.3,3.3,-56.2C16.4,-60.1,26.6,-55.6,39.5,-49.1Z",
    "M53.1,-62.7C66.9,-51.8,74.6,-33.1,75.9,-14.9C77.2,3.3,72.1,21,61.7,34.6C51.3,48.2,35.6,57.7,18.6,63.3C1.6,68.9,-16.7,70.6,-31.4,64C-46.1,57.4,-57.2,42.5,-64.5,25.9C-71.8,9.3,-75.3,-9,-69.6,-23.9C-63.9,-38.8,-49,-50.3,-33.4,-60.6C-17.8,-70.9,-1.6,-80,15.3,-79.5C32.2,-79,39.3,-73.6,53.1,-62.7Z",
  ];
  return (
    <svg
      viewBox="-80 -80 160 160"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <path d={paths[variant]} fill={color} />
    </svg>
  );
}

/** Облачко */
export function Cloud({ className = "", style, color = "#fff" }: DecorProps) {
  return (
    <svg viewBox="0 0 120 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <path
        d="M28 62a26 26 0 0 1-2.4-51.9A30 30 0 0 1 83 14a22 22 0 0 1 9 42.7V62H28Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Волнообразный разделитель между секциями.
 * fill — цвет СЛЕДУЮЩЕЙ (или предыдущей при flip) секции.
 */
export function Wave({
  fill,
  flip = false,
  className = "",
  variant = 0,
}: {
  fill: string;
  flip?: boolean;
  className?: string;
  variant?: 0 | 1;
}) {
  const d =
    variant === 0
      ? "M0,40 C180,90 360,0 600,30 C840,60 1020,95 1200,50 L1200,100 L0,100 Z"
      : "M0,60 C220,10 420,90 640,55 C860,20 1020,40 1200,70 L1200,100 L0,100 Z";
  return (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none block h-[36px] w-full sm:h-[56px] lg:h-[52px] ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

/* ───── Еда — простые плоские иллюстрации ───── */

export function AppleArt({ className = "", style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <path d="M33 14c1-5 4-8 9-9-1 5-4 8-9 9Z" fill="#80C924" />
      <path d="M32 18c-2-5-1-9 1-12" stroke="#6b4b2a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M32 19c-4-3-12-4-17 1-6 6-5 18 0 27 4 7 9 12 13 10 2-1 3-1 4-1s2 0 4 1c4 2 9-3 13-10 5-9 6-21 0-27-5-5-13-4-17-1Z"
        fill="#E83A32"
      />
      <path d="M20 26c-3 3-3 8-2 12" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function CarrotArt({ className = "", style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <path d="M44 14c3-6 8-8 12-8-1 5-4 9-10 10M44 14c-1-6 1-11 5-13 1 5 0 10-3 13M44 14c5-1 10 1 13 5-5 1-10 0-13-3" fill="#80C924" />
      <path d="M45 17c3 3 3 8 0 11L14 58c-3 2-7-2-5-5l28-34c2-3 6-4 8-2Z" fill="#FF8A1F" />
      <path d="M26 33l5 4M20 41l4 3M33 25l4 3" stroke="#d96a05" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BerriesArt({ className = "", style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <path d="M30 10c6-2 12 0 16 5" stroke="#4f8a0c" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="38" r="12" fill="#5A3FC0" />
      <circle cx="42" cy="34" r="11" fill="#302079" />
      <circle cx="33" cy="50" r="10" fill="#7059d6" />
      <circle cx="18" cy="34" r="3" fill="#fff" fillOpacity=".5" />
      <circle cx="38" cy="30" r="2.6" fill="#fff" fillOpacity=".5" />
    </svg>
  );
}

export function LeafArt({ className = "", style, color = "#80C924" }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <path d="M8 56C8 26 26 8 58 6c0 30-18 50-50 50Z" fill={color} />
      <path d="M10 54 46 18" stroke="#fff" strokeOpacity=".6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlateArt({ className = "", style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none ${className}`} style={style}>
      <circle cx="32" cy="32" r="28" fill="#fff" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E0FA" strokeWidth="3" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#F3F0FD" strokeWidth="3" />
    </svg>
  );
}
