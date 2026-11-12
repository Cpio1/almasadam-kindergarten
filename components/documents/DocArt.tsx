/**
 * Иллюстрации раздела «Документы»: большая папка, значки файлов, бумажный самолётик, скрепка.
 * Всё aria-hidden, без перехвата кликов. Анимации — CSS-классы снаружи и внутри.
 */
import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };
const base = "pointer-events-none select-none";
const display = { fontFamily: "var(--font-display)" } as const;
/** Анимация отдельных частей SVG вокруг собственного центра */
const box: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

/* ───────── Большая папка с торчащими листами ───────── */
export function BigFolder({ className = "", style, color = "#302079" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <ellipse cx="110" cy="164" rx="86" ry="6" fill="#302079" fillOpacity=".12" />
      {/* задняя стенка */}
      <path d="M14 30a14 14 0 0 1 14-14h50l14 14h100a14 14 0 0 1 14 14v100a14 14 0 0 1-14 14H28a14 14 0 0 1-14-14Z" fill={color} />
      {/* листы */}
      <g className="animate-bob" style={{ ...box, animationDelay: "-1s" }}>
        <rect x="38" y="20" width="96" height="110" rx="10" fill="#fff" transform="rotate(-8 86 75)" />
        <rect x="52" y="40" width="54" height="7" rx="3.5" fill="#CDECFB" transform="rotate(-8 86 75)" />
        <rect x="52" y="56" width="66" height="7" rx="3.5" fill="#E5E0FA" transform="rotate(-8 86 75)" />
      </g>
      <g className="animate-bob" style={{ ...box, animationDelay: "-2.6s" }}>
        <rect x="92" y="14" width="92" height="110" rx="10" fill="#FFE326" transform="rotate(7 138 70)" />
        <rect x="106" y="34" width="50" height="7" rx="3.5" fill="#fff" fillOpacity=".8" transform="rotate(7 138 70)" />
        <rect x="106" y="50" width="62" height="7" rx="3.5" fill="#fff" fillOpacity=".8" transform="rotate(7 138 70)" />
        <circle cx="160" cy="96" r="12" fill="#E83A32" transform="rotate(7 138 70)" />
        <path d="m154 96 4.5 4.5L167 91" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(7 138 70)" />
      </g>
      {/* передняя стенка */}
      <path d="M8 72a14 14 0 0 1 14-14h176a14 14 0 0 1 14 14l-8 72a14 14 0 0 1-14 14H30a14 14 0 0 1-14-14Z" fill="#159FE2" />
      <path d="M22 72h176" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />
      {/* наклейка-звёздочка */}
      <g className="animate-wiggle" style={box}>
        <path d="M110 84l6.5 13 14.5 2-10.5 10 2.5 14.5-13-7-13 7 2.5-14.5L89 99l14.5-2Z" fill="#FFE326" stroke="#FFE326" strokeWidth="5" strokeLinejoin="round" />
      </g>
      <rect x="64" y="134" width="92" height="9" rx="4.5" fill="#fff" fillOpacity=".35" />
    </svg>
  );
}

/* ───────── Значок файла: лист с загнутым углом и подписью типа ───────── */
export function FileBadge({
  label,
  color,
  ink = "#fff",
  className = "",
  style,
}: P & { label: string; color: string; ink?: string }) {
  return (
    <svg viewBox="0 0 64 76" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M10 2h32l20 20v44a8 8 0 0 1-8 8H10a8 8 0 0 1-8-8V10a8 8 0 0 1 8-8Z" fill="#fff" />
      <path d="M42 2v14a6 6 0 0 0 6 6h14Z" fill="#E5E0FA" />
      <rect x="10" y="28" width="32" height="5" rx="2.5" fill="#E5E0FA" />
      <rect x="10" y="38" width="22" height="5" rx="2.5" fill="#E5E0FA" />
      <rect x="6" y="50" width="52" height="18" rx="9" fill={color} />
      <text x="32" y="63.5" textAnchor="middle" style={display} fontWeight="900" fontSize="12" fill={ink}>
        {label}
      </text>
    </svg>
  );
}

/* ───────── Бумажный самолётик с пунктирным следом ───────── */
export function PaperPlane({ className = "", style, color = "#159FE2" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 140 80" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path d="M6 70c20-4 34-14 48-28" fill="none" stroke={color} strokeOpacity=".55" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" />
      <path d="M62 34 134 6 104 70 88 50Z" fill="#fff" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <path d="M88 50 134 6 76 44Z" fill={color} fillOpacity=".25" />
      <path d="M88 50l-2 18 18-12" fill={color} />
    </svg>
  );
}

/* ───────── Скрепка ───────── */
export function Paperclip({ className = "", style, color = "#E83A32" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <path
        d="M28 30v44a10 10 0 0 1-20 0V20a14 14 0 0 1 28 0v52"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
