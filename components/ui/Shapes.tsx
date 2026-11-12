/**
 * Декоративные фигуры для разделов ниже главного экрана.
 * (Главный экран использует Decor.tsx / Fun.tsx — их не меняем, чтобы Hero остался прежним.)
 *
 * Всё — лёгкий inline-SVG, aria-hidden, без перехвата кликов.
 * Анимации — только CSS (transform): см. animate-* в app/globals.css.
 */
import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };
const base = "pointer-events-none select-none";

export const palette = {
  sun: "#FFE326",
  sky: "#159FE2",
  leaf: "#80C924",
  berry: "#E83A32",
  violet: "#302079",
  orange: "#FF8A1F",
  pink: "#FF7BAC",
  purple: "#7B5CE0",
} as const;

/* ───────── Объёмный кубик с буквой на передней грани ───────── */
export function Cube3D({
  className = "",
  style,
  color = palette.berry,
  letter,
  letterColor = "#fff",
}: P & { color?: string; letter?: string; letterColor?: string }) {
  return (
    <svg viewBox="0 0 64 66" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* тень */}
      <ellipse cx="32" cy="62" rx="22" ry="3.5" fill="#302079" fillOpacity=".12" />
      <g strokeLinejoin="round" strokeWidth="4">
        <path d="M32 4 58 17v30L32 60 6 47V17Z" fill={color} stroke={color} />
        <path d="M32 4 58 17 32 30 6 17Z" fill="#fff" fillOpacity=".5" />
        <path d="M32 30 58 17v30L32 60Z" fill="#000" fillOpacity=".16" />
      </g>
      <path d="M14 18.5 30 10.5" stroke="#fff" strokeOpacity=".8" strokeWidth="2.6" strokeLinecap="round" />
      {letter ? (
        <g transform="matrix(1 0.5 0 1 6 17)">
          <text
            x="13"
            y="22"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-display)" }}
            fontWeight="900"
            fontSize="17"
            fill={letterColor}
          >
            {letter}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/** Пирамидка из трёх кубиков с буквами (className должен задавать absolute или relative) */
export function CubeStack({
  className = "",
  letters = ["А", "Ә", "Б"],
  colors = [palette.sky, palette.leaf, palette.berry],
}: {
  className?: string;
  letters?: [string, string, string];
  colors?: [string, string, string];
}) {
  return (
    <div aria-hidden="true" className={`${base} aspect-[1/0.92] ${className}`}>
      <Cube3D className="absolute bottom-0 left-0 w-[52%]" color={colors[0]} letter={letters[0]} />
      <Cube3D className="absolute bottom-0 right-0 w-[52%]" color={colors[1]} letter={letters[1]} letterColor={palette.violet} />
      <Cube3D className="absolute left-[24%] top-0 w-[52%] rotate-[8deg]" color={colors[2]} letter={letters[2]} />
    </div>
  );
}

/* ───────── Разноцветная волна-лента ───────── */
export function WaveRibbon({
  className = "",
  style,
  colors = [palette.berry, palette.sun, palette.sky],
}: P & { colors?: string[] }) {
  const d = (y: number) => `M6 ${y}c16-18 32-18 48 0s32 18 48 0 32-18 48 0 32 18 48 0`;
  return (
    <svg viewBox="0 0 210 70" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {colors.map((c, i) => (
        <path key={i} d={d(22 + i * 13)} fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ───────── Спираль-улитка с точкой на конце ───────── */
const snailD = (() => {
  let d = "";
  for (let i = 0; i <= 90; i++) {
    const a = (i / 90) * Math.PI * 4.4;
    const r = 4 + a * 5.2;
    d += `${i ? "L" : "M"}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`;
  }
  return d;
})();
export function Swirl({ className = "", style, color = palette.purple, dot = palette.sun }: P & { color?: string; dot?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={snailD} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="6" fill={dot} />
    </svg>
  );
}

/* ───────── Цветок-ромашка с двухцветными лепестками ───────── */
export function Bloom({
  className = "",
  style,
  petals = [palette.pink, palette.berry],
  center = palette.sun,
  count = 8,
}: P & { petals?: [string, string]; center?: string; count?: number }) {
  const step = 360 / count;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx="50" cy="22" r="15" fill={petals[i % 2]} transform={`rotate(${i * step} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="17" fill={center} />
      <circle cx="44" cy="46" r="2.6" fill={palette.violet} />
      <circle cx="56" cy="46" r="2.6" fill={palette.violet} />
      <path d="M44 55q6 5 12 0" fill="none" stroke={palette.violet} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Тюльпан ───────── */
export function Tulip({ className = "", style, color = palette.berry }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 60 110" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M30 50v56" stroke={palette.leaf} strokeWidth="5" strokeLinecap="round" />
      <path d="M30 90C18 88 8 78 6 64c12 0 22 10 24 26Z" fill={palette.leaf} />
      <path d="M30 80c10-2 18-10 20-22-10 1-18 9-20 22Z" fill="#6BB31A" />
      <path d="M8 12c6 4 10 10 12 14 2-8 6-16 10-22 4 6 8 14 10 22 2-4 6-10 12-14 2 18 0 40-22 42C8 52 6 30 8 12Z" fill={color} />
      <path d="M17 22c-1 8 0 16 4 20" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ───────── Полосатая радужная арка (без облаков) ───────── */
export function RainbowArc({
  className = "",
  style,
  colors = [palette.purple, palette.sky, palette.leaf, palette.sun],
}: P & { colors?: string[] }) {
  return (
    <svg viewBox="0 0 200 106" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {colors.map((c, i) => {
        const r = 88 - i * 17;
        return <path key={c + i} d={`M${100 - r} 100a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={c} strokeWidth="15" strokeLinecap="round" />;
      })}
    </svg>
  );
}

/* ───────── Зигзаг ───────── */
export function Zigzag({ className = "", style, color = palette.berry }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 140 40" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M6 30 22 10l16 20 16-20 16 20 16-20 16 20 16-20 16 20" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────── Облачко с мордочкой ───────── */
export function CloudFace({ className = "", style, color = "#fff", cheek = palette.pink }: P & { color?: string; cheek?: string }) {
  return (
    <svg viewBox="0 0 140 86" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path
        d="M26 82a22 22 0 0 1-4-43.6A28 28 0 0 1 72 22a26 26 0 0 1 44 16 22 22 0 0 1-2 44Z"
        fill={color}
        stroke="#CDECFB"
        strokeWidth="3"
      />
      <circle cx="58" cy="56" r="4" fill={palette.violet} />
      <circle cx="84" cy="56" r="4" fill={palette.violet} />
      <path d="M64 66q7 6 14 0" fill="none" stroke={palette.violet} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="48" cy="66" r="5" fill={cheek} fillOpacity=".45" />
      <circle cx="94" cy="66" r="5" fill={cheek} fillOpacity=".45" />
    </svg>
  );
}

/* ───────── Капля ───────── */
export function Drop({ className = "", style, color = palette.sky }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 60 80" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M30 3C22 20 6 36 6 52a24 24 0 0 0 48 0C54 36 38 20 30 3Z" fill={color} />
      <path d="M18 50c0-6 3-11 6-14" stroke="#fff" strokeOpacity=".65" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="60" r="2.6" fill="#fff" fillOpacity=".65" />
    </svg>
  );
}

/* ───────── Долька апельсина ───────── */
export function Citrus({ className = "", style, color = palette.orange }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <circle cx="50" cy="50" r="46" fill={color} />
      <circle cx="50" cy="50" r="38" fill="#FFF4D6" />
      <circle cx="50" cy="50" r="34" fill="#FFB347" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M50 50 50 18" stroke="#FFF4D6" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" fill="#FFF4D6" />
    </svg>
  );
}

/* ───────── Звезда-взрыв (12 лучей) ───────── */
const burstD = (() => {
  let d = "";
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? 31 : 47;
    d += `${i ? "L" : "M"}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`;
  }
  return d + "Z";
})();
export function Burst({ className = "", style, color = palette.sun, inner = palette.orange }: P & { color?: string; inner?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={burstD} fill={color} stroke={color} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="17" fill={inner} />
      <circle cx="44" cy="44" r="5" fill="#fff" fillOpacity=".55" />
    </svg>
  );
}

/* ───────── Конфетти ───────── */
export function Confetti({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <circle cx="14" cy="18" r="7" fill={palette.berry} />
      <rect x="44" y="6" width="14" height="14" rx="3" fill={palette.sky} transform="rotate(20 51 13)" />
      <path d="M86 8l12 20H74Z" fill={palette.sun} strokeLinejoin="round" stroke={palette.sun} strokeWidth="3" />
      <path d="M12 60c6-8 12-8 18 0s12 8 18 0" fill="none" stroke={palette.leaf} strokeWidth="5" strokeLinecap="round" />
      <circle cx="74" cy="56" r="5" fill={palette.purple} />
      <rect x="96" y="54" width="18" height="7" rx="3.5" fill={palette.pink} transform="rotate(-30 105 57)" />
      <circle cx="56" cy="82" r="4" fill={palette.orange} />
      <circle cx="104" cy="84" r="3.5" fill={palette.sky} />
    </svg>
  );
}

/* ───────── Сердечко ───────── */
export function Heart({ className = "", style, color = palette.berry }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M50 84C34 72 6 54 6 30 6 14 18 4 31 4c9 0 15 5 19 12 4-7 10-12 19-12 13 0 25 10 25 26 0 24-28 42-44 54Z" fill={color} />
      <path d="M22 22c-3 4-4 9-3 14" stroke="#fff" strokeOpacity=".6" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ───────── Месяц с мордочкой (для тёмного фона) ───────── */
export function Moon({ className = "", style, color = palette.sun }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M62 6a44 44 0 1 0 32 64A36 36 0 0 1 62 6Z" fill={color} />
      <circle cx="40" cy="56" r="3.6" fill={palette.violet} />
      <path d="M44 68q6 4 12-1" fill="none" stroke={palette.violet} strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="66" r="4.5" fill={palette.berry} fillOpacity=".35" />
    </svg>
  );
}

/* ───────── Полусолнце с лучами (подиум для маскота) ───────── */
export function HalfSun({ className = "", style, color = palette.sun, ray = palette.orange }: P & { color?: string; ray?: string }) {
  return (
    <svg viewBox="0 0 200 104" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x="96" y="2" width="8" height="22" rx="4" fill={ray} transform={`rotate(${-80 + i * 20} 100 100)`} />
      ))}
      <path d="M26 100a74 74 0 0 1 148 0Z" fill={color} />
      <path d="M52 100a48 48 0 0 1 96 0" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="8" strokeDasharray="4 16" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Органическая асимметричная фигура ───────── */
const organic = [
  "M60 6c22 0 46 12 50 36 4 22-10 34-6 52 4 20-18 32-40 26-18-5-28-20-46-24C2 92-4 70 6 52 14 36 10 24 22 14 32 8 46 6 60 6Z",
  "M30 10c16-8 30 6 48 4 20-2 34 10 32 30-2 16-14 22-12 40 2 22-22 32-42 24-14-6-18-18-34-24C6 78 2 60 8 44c6-14 8-28 22-34Z",
];
export function Organic({ className = "", style, color = palette.sun, variant = 0 }: P & { color?: string; variant?: 0 | 1 }) {
  return (
    <svg viewBox="0 0 120 128" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d={organic[variant]} fill={color} />
    </svg>
  );
}

/* ───────── Пустая «полароид»-рамка (декор у галереи) ───────── */
export function Polaroid({ className = "", style, color = palette.sky }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 80 96" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <rect x="4" y="4" width="72" height="88" rx="8" fill="#fff" stroke="#E5E0FA" strokeWidth="2" />
      <rect x="12" y="12" width="56" height="54" rx="5" fill={color} />
      <circle cx="54" cy="26" r="7" fill={palette.sun} />
      <path d="M12 58 30 40l14 14 8-8 16 16v4a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5Z" fill="#fff" fillOpacity=".55" />
      <rect x="20" y="74" width="40" height="6" rx="3" fill="#E5E0FA" />
    </svg>
  );
}

/* ───────── Звёздочки-точки для тёмного фона ───────── */
export function StarField({ className = "", style }: P) {
  const stars: [number, number, number, string][] = [
    [10, 14, 4, palette.sun],
    [46, 6, 2.5, "#fff"],
    [80, 22, 3.5, palette.sky],
    [28, 40, 2.5, "#fff"],
    [66, 48, 4, palette.pink],
    [96, 52, 2.5, "#fff"],
  ];
  return (
    <svg viewBox="0 0 110 60" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {stars.map(([x, y, r, c], i) => (
        <path
          key={i}
          d={`M${x} ${y - r * 2}q${r * 0.4} ${r * 1.6} ${r * 2} ${r * 2}q${-r * 1.6} ${r * 0.4} ${-r * 2} ${r * 2}q${-r * 0.4} ${-r * 1.6} ${-r * 2} ${-r * 2}q${r * 1.6} ${-r * 0.4} ${r * 2} ${-r * 2}Z`}
          fill={c}
        />
      ))}
    </svg>
  );
}
