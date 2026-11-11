/**
 * Игровые иллюстрации ALMASADAM: радуга, шарики, карандаши, спирали, дорожки,
 * объёмные звёзды и кубики, буквы, флажки, солнце, фигурные разделители и рамки для фото.
 * Всё — лёгкий inline-SVG, aria-hidden, без перехвата кликов; анимации — только CSS (transform).
 */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/lib/assets";

type P = { className?: string; style?: CSSProperties };
const base = "pointer-events-none select-none";

export const brand = {
  sun: "#FFE326",
  sky: "#159FE2",
  leaf: "#80C924",
  berry: "#E83A32",
  violet: "#302079",
  orange: "#FF8A1F",
  pink: "#FF7BAC",
} as const;

/* ───────── Радуга ───────── */
export function Rainbow({ className = "", style, clouds = true }: P & { clouds?: boolean }) {
  const arcs = [brand.berry, brand.orange, brand.sun, brand.leaf, brand.sky, "#7B5CE0"];
  return (
    <svg viewBox="0 0 240 132" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {arcs.map((c, i) => {
        const r = 104 - i * 13;
        return <path key={c} d={`M${120 - r} 120a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={c} strokeWidth="13.5" />;
      })}
      {clouds ? (
        <>
          <path d="M2 128a14 14 0 0 1 14-16 18 18 0 0 1 32-4 13 13 0 0 1 14 20Z" fill="#fff" />
          <path d="M178 128a14 14 0 0 1 14-16 18 18 0 0 1 32-4 13 13 0 0 1 14 20Z" fill="#fff" />
        </>
      ) : null}
    </svg>
  );
}

/* ───────── Воздушный шарик ───────── */
export function Balloon({ className = "", style, color = brand.berry }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 60 120" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M30 70c4 10-6 16 0 26s-4 16 2 24" fill="none" stroke="#5b5873" strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M30 4C14 4 4 17 4 32c0 18 14 33 26 38 12-5 26-20 26-38C56 17 46 4 30 4Z" fill={color} />
      <path d="M26 70h8l-4 6Z" fill={color} />
      <ellipse cx="20" cy="22" rx="5" ry="9" fill="#fff" fillOpacity=".45" transform="rotate(-20 20 22)" />
      <path d="M30 70c11-5 22-17 25-31" fill="none" stroke="#000" strokeOpacity=".08" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Цветной карандаш ───────── */
export function Pencil({ className = "", style, color = brand.sky }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 160 32" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <rect x="18" y="4" width="112" height="24" rx="3" fill={color} />
      <rect x="18" y="4" width="112" height="8" fill="#fff" fillOpacity=".25" />
      <rect x="18" y="20" width="112" height="8" fill="#000" fillOpacity=".1" />
      <path d="M130 4h6l22 12-22 12h-6Z" fill="#F6D7A7" />
      <path d="M150 12l8 4-8 4Z" fill={color} />
      <rect x="10" y="4" width="10" height="24" fill="#C9CBD6" />
      <rect x="2" y="4" width="10" height="24" rx="4" fill="#FF9FB8" />
    </svg>
  );
}

/* ───────── Спираль ───────── */
const spiralD = (() => {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const a = (i / 120) * Math.PI * 6;
    const r = 3 + a * 4.1;
    const x = 50 + r * Math.cos(a);
    const y = 50 + r * Math.sin(a);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
})();
export function Spiral({ className = "", style, color = brand.violet }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={spiralD} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────── Волнистая дорожка (с пунктиром посередине) ───────── */
export function WavyPath({ className = "", style, color = brand.sun }: P & { color?: string }) {
  const d = "M-10 60C80 0 160 120 260 60S440 0 540 60 720 120 820 60";
  return (
    <svg viewBox="0 0 800 120" preserveAspectRatio="none" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={d} fill="none" stroke={color} strokeWidth="34" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="16 16" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Объёмная звезда ───────── */
const starD = "M50 8 62 36 92 38 69 58 76 88 50 72 24 88 31 58 8 38 38 36Z";
export function Star3D({ className = "", style, color = brand.sun, shade = "#E7B800" }: P & { color?: string; shade?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={starD} transform="translate(0 6)" fill={shade} stroke={shade} strokeWidth="10" strokeLinejoin="round" />
      <path d={starD} fill={color} stroke={color} strokeWidth="10" strokeLinejoin="round" />
      <path d="M40 30 48 18" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
      <circle cx="40" cy="52" r="3.4" fill={brand.violet} />
      <circle cx="60" cy="52" r="3.4" fill={brand.violet} />
      <path d="M43 62q7 6 14 0" fill="none" stroke={brand.violet} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Мягкий 3D-кубик с буквой (как у Адама) ───────── */
export function ToyBlock({ className = "", style, color = brand.berry, letter }: P & { color?: string; letter?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M32 4 58 17v30L32 60 6 47V17Z" fill={color} stroke={color} strokeWidth="6" strokeLinejoin="round" />
      <path d="M32 4 58 17 32 30 6 17Z" fill="#fff" fillOpacity=".42" />
      <path d="M32 30v30L6 47V17Z" fill="#000" fillOpacity=".1" />
      {letter ? (
        <text x="45" y="47" textAnchor="middle" style={{ fontFamily: "var(--font-display)" }} fontWeight="900" fontSize="19" fill="#fff">
          {letter}
        </text>
      ) : null}
    </svg>
  );
}

/* ───────── Разноцветные буквы ───────── */
export function FunLetters({ text, className = "", colors }: { text: string; className?: string; colors?: string[] }) {
  const c = colors ?? [brand.berry, brand.sky, brand.leaf, brand.sun, "#7B5CE0", brand.orange];
  return (
    <span aria-hidden="true" className={`${base} inline-flex font-display font-black leading-none ${className}`}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="inline-block animate-bob"
          style={{
            color: c[i % c.length],
            transform: `rotate(${i % 2 ? 8 : -8}deg)`,
            animationDelay: `${i * 0.25}s`,
            textShadow: "0 4px 0 rgb(48 32 121 / 0.18)",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ───────── Гирлянда флажков ───────── */
export function Bunting({ className = "", style, count = 11 }: P & { count?: number }) {
  const colors = [brand.berry, brand.sun, brand.sky, brand.leaf, "#7B5CE0", brand.orange];
  const w = 1000;
  const step = w / count;
  return (
    <svg viewBox={`0 0 ${w} 90`} preserveAspectRatio="none" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={`M0 6Q${w / 2} 60 ${w} 6`} fill="none" stroke="#5b5873" strokeOpacity=".45" strokeWidth="2.5" />
      {Array.from({ length: count }, (_, i) => {
        const x = step * i + step / 2;
        const t = x / w;
        const y = 6 + 4 * t * (1 - t) * 27; // точка на квадратичной кривой
        return <path key={i} d={`M${x - step * 0.36} ${y}L${x + step * 0.36} ${y}L${x} ${y + 42}Z`} fill={colors[i % colors.length]} />;
      })}
    </svg>
  );
}

/* ───────── Солнце с лучами ───────── */
export function SunBurst({ className = "", style, color = brand.sun, face = false }: P & { color?: string; face?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <g className="origin-center animate-spin-slower" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="56" y="2" width="8" height="20" rx="4" fill={color} transform={`rotate(${i * 30} 60 60)`} />
        ))}
      </g>
      <circle cx="60" cy="60" r="34" fill={color} />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="4" strokeDasharray="30 200" transform="rotate(-150 60 60)" />
      {face ? (
        <>
          <circle cx="49" cy="56" r="4" fill={brand.violet} />
          <circle cx="71" cy="56" r="4" fill={brand.violet} />
          <path d="M50 68q10 9 20 0" fill="none" stroke={brand.violet} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="42" cy="66" r="4" fill={brand.berry} fillOpacity=".35" />
          <circle cx="78" cy="66" r="4" fill={brand.berry} fillOpacity=".35" />
        </>
      ) : null}
    </svg>
  );
}

/* ───────── Пухлое облако ───────── */
export function PuffCloud({ className = "", style, color = "#fff" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 140 80" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M24 76a20 20 0 0 1-2-40 26 26 0 0 1 46-16 24 24 0 0 1 40 10 20 20 0 0 1 8 46Z" fill={color} />
      <path d="M30 76h86" stroke="#000" strokeOpacity=".05" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Разделители между разделами ─────────
 * fill — цвет СЛЕДУЮЩЕГО раздела. Каждый переход — свой рисунок. */
export type DividerKind = "wave" | "clouds" | "scallop" | "hills" | "zigzag";

export function Divider({ fill, kind = "wave", className = "" }: { fill: string; kind?: DividerKind; className?: string }) {
  let d = "";
  if (kind === "wave") d = "M0 50C150 10 300 10 450 45S750 90 900 50s200-40 300-10V100H0Z";
  if (kind === "hills") d = "M0 70C120 20 240 20 340 60s180 30 260-10 200-50 320 0 200 40 280 10V100H0Z";
  if (kind === "clouds") {
    d = "M0 100V70";
    const n = 14;
    const w = 1200 / n;
    for (let i = 0; i < n; i++) d += `a${w / 2} ${i % 2 ? 26 : 38} 0 0 1 ${w} 0`;
    d += "V100Z";
  }
  if (kind === "scallop") {
    d = "M0 100V64";
    const n = 24;
    const w = 1200 / n;
    for (let i = 0; i < n; i++) d += `a${w / 2} ${w / 2} 0 0 1 ${w} 0`;
    d += "V100Z";
  }
  if (kind === "zigzag") {
    d = "M0 100V60";
    const n = 30;
    const w = 1200 / n;
    for (let i = 0; i < n; i++) d += `l${w / 2} -26l${w / 2} 26`;
    d += "V100Z";
  }
  return (
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${base} relative z-[1] -mb-px block h-[34px] w-full sm:h-[52px] lg:h-[56px] ${className}`}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

/* ───────── Фигурные рамки для фото (clip-path в долях размера элемента) ───────── */
const scallopD = (() => {
  const n = 14;
  let d = "";
  for (let i = 0; i <= n * 8; i++) {
    const a = (i / (n * 8)) * Math.PI * 2;
    const r = 0.44 + 0.055 * Math.cos(a * n);
    const x = 0.5 + r * Math.cos(a);
    const y = 0.5 + r * Math.sin(a);
    d += `${i ? "L" : "M"}${x.toFixed(4)} ${y.toFixed(4)}`;
  }
  return d + "Z";
})();

const clipPaths = {
  scallop: scallopD,
  cloud:
    "M.2 .96C.08 .96 0 .86 0 .74 0 .62.08 .53.19 .52.2 .32.34 .18.52 .18c.13 0 .24.07.29.18.11.02.19.12.19.24 0 .05-.01.09-.03.13.02.03.03.07.03.11 0 .07-.06.12-.13.12Z",
  blob: "M.52 .02C.72 .03.92 .14.97 .36 1.02 .58.92 .82.72 .93.52 1.03.26 .99.12 .82-.02 .66-.02 .4.08 .22.18 .06.34.01.52 .02Z",
  heart:
    "M.5 .96C.36 .84 0 .62 0 .32 0 .14.14 0 .3 0c.1 0 .17.05.2.12C.53 .05.6 0 .7 0 .86 0 1 .14 1 .32 1 .62.64 .84.5 .96Z",
};
export type ClipShape = keyof typeof clipPaths;

/** Один раз на странице: определения clip-path для рамок */
export function ClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        {Object.entries(clipPaths).map(([id, d]) => (
          <clipPath key={id} id={`clip-${id}`} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

/**
 * Фото в фигурной рамке-«наклейке»: цветной контур той же формы + сама фотография.
 * Если фото нет — яркая иллюстрированная заглушка.
 */
export function FramedPhoto({
  photo,
  alt,
  shape,
  rim,
  fillBg,
  className = "",
  sizes = "(max-width: 1024px) 60vw, 360px",
  children,
}: {
  photo: ImageAsset | null | undefined;
  alt: string;
  shape: ClipShape;
  rim: string;
  fillBg: string;
  className?: string;
  sizes?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0" style={{ clipPath: `url(#clip-${shape})`, background: rim }} />
      <div className="absolute inset-[6%] overflow-hidden" style={{ clipPath: `url(#clip-${shape})`, background: fillBg }}>
        {photo ? (
          <Image src={photo.src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div aria-hidden="true" className="absolute inset-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
