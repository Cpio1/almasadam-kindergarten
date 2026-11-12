/**
 * Иллюстрации раздела «Образовательные программы» — «Мир открытий ALMASADAM».
 * Крупные плоско-объёмные SVG: у каждого направления свой сюжет.
 * Всё aria-hidden, без перехвата кликов; движение задаётся снаружи (CSS-классы).
 */
import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };
const base = "pointer-events-none select-none";
const display = { fontFamily: "var(--font-display)" } as const;

const C = {
  sun: "#FFE326",
  sky: "#159FE2",
  leaf: "#80C924",
  berry: "#E83A32",
  violet: "#302079",
  orange: "#FF8A1F",
  pink: "#FF7BAC",
  purple: "#7B5CE0",
  cream: "#FFF4D6",
};

/* ───────── Развитие речи: облачка-реплики с буквами ───────── */
export function SpeechArt({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* большое облачко */}
      <path d="M22 6h50a18 18 0 0 1 18 18v14a18 18 0 0 1-18 18H40l-14 12 2-12h-6A18 18 0 0 1 4 38V24A18 18 0 0 1 22 6Z" fill="#fff" />
      <path d="M22 50h50a18 18 0 0 0 18-14" fill="none" stroke="#000" strokeOpacity=".07" strokeWidth="6" strokeLinecap="round" />
      <text x="47" y="41" textAnchor="middle" style={display} fontWeight="900" fontSize="27" fill={C.violet}>
        Аа
      </text>
      {/* малое облачко */}
      <path d="M76 46h28a12 12 0 0 1 12 12v10a12 12 0 0 1-12 12h-2l3 10-12-10H76a12 12 0 0 1-12-12V58a12 12 0 0 1 12-12Z" fill={C.sun} />
      <text x="90" y="72" textAnchor="middle" style={display} fontWeight="900" fontSize="20" fill={C.berry}>
        Ә!
      </text>
      {/* звуковые волны */}
      <path d="M98 12c5 4 5 12 0 16M106 7c9 7 9 19 0 26" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Творчество: палитра, кисточка, капли краски ───────── */
export function CreativeArt({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* палитра */}
      <path
        d="M58 8C30 8 8 26 8 50s18 42 42 42c8 0 12-4 12-10 0-8-8-10-8-18 0-6 5-10 12-10h12c14 0 26-8 26-22C104 18 84 8 58 8Z"
        fill={C.cream}
      />
      <path d="M50 92c8 0 12-4 12-10" fill="none" stroke="#000" strokeOpacity=".08" strokeWidth="5" strokeLinecap="round" />
      <circle cx="34" cy="30" r="8" fill={C.berry} />
      <circle cx="58" cy="24" r="8" fill={C.sun} />
      <circle cx="80" cy="32" r="8" fill={C.sky} />
      <circle cx="26" cy="54" r="8" fill={C.leaf} />
      <circle cx="36" cy="76" r="7" fill={C.purple} />
      {/* кисточка */}
      <g transform="rotate(38 96 62)">
        <rect x="90" y="40" width="10" height="52" rx="5" fill={C.violet} />
        <rect x="89" y="34" width="12" height="10" rx="2" fill="#C9CBD6" />
        <path d="M89 34c0-10 4-18 6-22 2 4 6 12 6 22Z" fill={C.berry} />
      </g>
      {/* капля краски */}
      <path d="M108 6c3 5 7 9 7 13a7 7 0 0 1-14 0c0-4 4-8 7-13Z" fill={C.pink} />
    </svg>
  );
}

/* ───────── Логика и мышление: пазл, кубик, треугольник, круг ───────── */
export function LogicArt({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* пазл */}
      <path
        d="M14 40h12a8 8 0 1 1 16 0h12v12a8 8 0 1 1 0 16v12H14Z"
        fill={C.sun}
        stroke={C.sun}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M18 76h34" stroke="#000" strokeOpacity=".08" strokeWidth="5" strokeLinecap="round" />
      {/* кубик */}
      <g strokeLinejoin="round" strokeWidth="3">
        <path d="M86 30 110 42v26L86 80 62 68V42Z" fill={C.leaf} stroke={C.leaf} />
        <path d="M86 30 110 42 86 54 62 42Z" fill="#fff" fillOpacity=".5" />
        <path d="M86 54 110 42v26L86 80Z" fill="#000" fillOpacity=".16" />
      </g>
      <g transform="matrix(1 0.5 0 1 62 42)">
        <text x="12" y="20" textAnchor="middle" style={display} fontWeight="900" fontSize="15" fill="#fff">
          3
        </text>
      </g>
      {/* треугольник и круг */}
      <path d="M70 4 84 26H56Z" fill={C.sky} stroke={C.sky} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="104" cy="16" r="10" fill={C.pink} />
      <circle cx="101" cy="13" r="3" fill="#fff" fillOpacity=".6" />
    </svg>
  );
}

/* ───────── Познание мира: планета, солнышко, росток ───────── */
export function WorldArt({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* солнышко */}
      <g>
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="95" y="0" width="5" height="9" rx="2.5" fill={C.orange} transform={`rotate(${i * 45} 97.5 18)`} />
        ))}
        <circle cx="97.5" cy="18" r="10" fill={C.sun} />
      </g>
      {/* планета */}
      <circle cx="56" cy="54" r="34" fill={C.sky} />
      <path d="M32 40c8-6 16-2 18 4s10 6 10 12-8 8-12 4-12-2-16-8 0-12 0-12Z" fill={C.leaf} />
      <path d="M66 26c8 0 14 4 16 10-6 2-10 0-14-2s-8-4-2-8Z" fill={C.leaf} />
      <path d="M66 70c6-4 14-4 18 0-2 6-10 10-16 8-4-2-6-4-2-8Z" fill={C.leaf} />
      <path d="M34 34a30 30 0 0 1 16-10" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
      {/* кольцо-орбита */}
      <ellipse cx="56" cy="56" rx="50" ry="12" fill="none" stroke={C.sun} strokeWidth="4" transform="rotate(-14 56 56)" strokeDasharray="70 18" />
      {/* росток */}
      <path d="M12 96V78" stroke="#4f8a0c" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 82c-10 0-12-8-12-12 8 0 12 4 12 12Z" fill={C.leaf} />
      <path d="M12 80c0-10 8-14 14-14 0 8-6 14-14 14Z" fill="#6BB31A" />
    </svg>
  );
}

/* ───────── Игры и общение: шарики, мячик, кубик ───────── */
export function SocialArt({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className={`${base} ${className}`} style={style}>
      {/* нитки */}
      <path d="M30 46c3 10-4 16 0 26s-2 14 2 22M58 38c-3 10 4 16 0 26" fill="none" stroke={C.violet} strokeOpacity=".45" strokeWidth="1.8" strokeLinecap="round" />
      {/* шарики */}
      <path d="M30 4c-12 0-20 10-20 21 0 13 10 22 20 25 10-3 20-12 20-25C50 14 42 4 30 4Z" fill={C.berry} />
      <ellipse cx="22" cy="17" rx="4" ry="7" fill="#fff" fillOpacity=".5" transform="rotate(-20 22 17)" />
      <path d="M58 0c-10 0-17 8-17 17 0 11 8 18 17 21 9-3 17-10 17-21 0-9-7-17-17-17Z" fill={C.sky} />
      <ellipse cx="51" cy="11" rx="3.4" ry="6" fill="#fff" fillOpacity=".5" transform="rotate(-20 51 11)" />
      {/* мячик */}
      <circle cx="88" cy="70" r="26" fill="#fff" />
      <path d="M62 70a26 26 0 0 1 52 0Z" fill={C.berry} />
      <path d="M70 52a26 26 0 0 0 0 36" fill="none" stroke={C.violet} strokeWidth="5" strokeLinecap="round" />
      <path d="M106 52a26 26 0 0 1 0 36" fill="none" stroke={C.violet} strokeWidth="5" strokeLinecap="round" />
      <circle cx="88" cy="70" r="26" fill="none" stroke="#000" strokeOpacity=".08" strokeWidth="3" />
      <ellipse cx="78" cy="56" rx="6" ry="3.5" fill="#fff" fillOpacity=".6" transform="rotate(-30 78 56)" />
      {/* конфетти */}
      <circle cx="54" cy="58" r="4" fill={C.leaf} />
      <rect x="40" y="76" width="9" height="9" rx="2" fill={C.purple} transform="rotate(20 44 80)" />
    </svg>
  );
}

/* ───────── Большой объёмный языковой кубик (по мотивам кубиков логотипа) ───────── */
export function LangCube({
  code,
  color,
  className = "",
  style,
}: P & { code: string; color: string }) {
  return (
    <svg viewBox="0 0 120 130" aria-hidden="true" className={`${base} ${className}`} style={style}>
      <ellipse cx="60" cy="124" rx="40" ry="5" fill="#000" fillOpacity=".25" />
      <g strokeLinejoin="round" strokeWidth="8">
        <path d="M60 6 112 32v58L60 116 8 90V32Z" fill={color} stroke={color} />
        <path d="M60 6 112 32 60 58 8 32Z" fill="#fff" fillOpacity=".45" />
        <path d="M60 58 112 32v58L60 116Z" fill="#000" fillOpacity=".16" />
      </g>
      <path d="M22 31 54 15" stroke="#fff" strokeOpacity=".85" strokeWidth="4" strokeLinecap="round" />
      {/* код языка на передней грани */}
      <g transform="matrix(1 0.5 0 1 8 32)">
        <text x="26" y="38" textAnchor="middle" style={display} fontWeight="900" fontSize="23" fill="#fff">
          {code}
        </text>
      </g>
      {/* звёздочка на боковой грани */}
      <g transform="matrix(1 -0.5 0 1 60 58)">
        <path d="M26 17c1.2 6.4 4.6 9.8 11 11-6.4 1.2-9.8 4.6-11 11-1.2-6.4-4.6-9.8-11-11 6.4-1.2 9.8-4.6 11-11Z" fill="#fff" fillOpacity=".85" />
      </g>
    </svg>
  );
}
