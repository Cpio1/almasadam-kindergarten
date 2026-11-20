"use client";

import { motion } from "motion/react";
import { ExternalLink, FolderOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { DOCUMENTS_CLOUD_URL, documents, documentCategories, type DocumentCategory, type DocumentItem } from "@/data/documents";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Ring, Sparkle, Wave } from "@/components/ui/Decor";
import { Star3D } from "@/components/ui/Fun";
import { Cube3D, Organic, Zigzag } from "@/components/ui/Shapes";
import { BigFolder, FileBadge, PaperPlane, Paperclip } from "@/components/documents/DocArt";

const ease = [0.22, 1, 0.36, 1] as const;

/** Цвет и форма карточки — по категории (строки литеральные, чтобы Tailwind их видел) */
const look: Record<
  DocumentCategory,
  { shell: string; title: string; text: string; chip: string; badge: string; badgeInk: string; btn: string }
> = {
  licenses: {
    shell: "bg-[linear-gradient(150deg,#5A3FC0,#302079)] rounded-[30px_30px_30px_10px] shadow-[0_6px_0_#1b1150]",
    title: "!text-white",
    text: "text-white/80",
    chip: "bg-white/15 text-white",
    badge: "#FFE326",
    badgeInk: "#302079",
    btn: "bg-sun text-violet hover:bg-[#ffd900]",
  },
  founding: {
    shell: "bg-[linear-gradient(150deg,#2DB2F0,#0B6FA3)] rounded-[10px_30px_30px_30px] shadow-[0_6px_0_#0a5d88]",
    title: "!text-white",
    text: "text-white/85",
    chip: "bg-white/20 text-white",
    badge: "#302079",
    badgeInk: "#fff",
    btn: "bg-white text-violet hover:bg-sun",
  },
  rules: {
    shell: "bg-[linear-gradient(150deg,#FFF06A,#FFE326_55%,#FFC93C)] rounded-[30px_10px_30px_30px] shadow-[0_6px_0_#d9a800]",
    title: "",
    text: "text-violet/80",
    chip: "bg-white/60 text-violet",
    badge: "#E83A32",
    badgeInk: "#fff",
    btn: "bg-violet text-white hover:bg-violet-700",
  },
  parents: {
    shell: "bg-[linear-gradient(150deg,#A6E04F,#80C924_55%,#6BB31A)] rounded-[30px_30px_10px_30px] shadow-[0_6px_0_#4f8a0c]",
    title: "",
    text: "text-violet/80",
    chip: "bg-white/50 text-violet",
    badge: "#302079",
    badgeInk: "#fff",
    btn: "bg-violet text-white hover:bg-violet-700",
  },
  other: {
    shell: "bg-[linear-gradient(150deg,#FF7BAC,#E83A32)] rounded-[30px_30px_30px_30px] shadow-[0_6px_0_#b9231c]",
    title: "!text-white",
    text: "text-white/85",
    chip: "bg-white/20 text-white",
    badge: "#FFE326",
    badgeInk: "#302079",
    btn: "bg-white text-violet hover:bg-sun",
  },
};

/** Показываем только рабочие документы: внешние ссылки https и реально существующие файлы */
function isAvailable(d: DocumentItem) {
  if (/^https:\/\//i.test(d.href)) return true;
  if (d.href.startsWith("/documents/")) return assets.documents.includes(d.href);
  return false;
}

function DocCard({ doc, i }: { doc: DocumentItem; i: number }) {
  const { t, lang } = useI18n();
  const L = look[doc.category];
  const title = doc.title[lang];
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease }}
      className="h-full"
    >
      <article
        className={`group relative flex h-full flex-col gap-4 p-4 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-5 ${L.shell}`}
      >
        <span aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 mix-blend-soft-light" />
        <div className="relative flex items-start gap-3.5">
          <FileBadge
            label={t.documents.types[doc.type]}
            color={L.badge}
            ink={L.badgeInk}
            className="w-12 shrink-0 -rotate-6 drop-shadow-[0_4px_4px_rgba(48,32,121,0.2)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:w-14"
          />
          <div className="min-w-0 flex-1">
            <p className={`inline-flex max-w-full rounded-full px-2.5 py-0.5 font-display text-[0.72rem] font-extrabold leading-snug ${L.chip}`}>
              {t.documents.categories[doc.category]}
            </p>
            <h3 className={`mt-1.5 text-[1.05rem] font-black leading-snug [overflow-wrap:anywhere] sm:text-[1.1rem] ${L.title}`}>
              {title}
            </h3>
            {doc.description ? (
              <p className={`mt-1 text-[0.88rem] leading-snug ${L.text}`}>{doc.description[lang]}</p>
            ) : null}
          </div>
        </div>
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn relative mt-auto w-full !min-h-12 !text-[0.97rem] shadow-[0_4px_0_rgb(0_0_0/0.15)] sm:w-auto sm:self-start ${L.btn}`}
        >
          {t.documents.open}
          <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">
            : {title} ({t.common.opensInNewTab})
          </span>
        </a>
      </article>
    </motion.li>
  );
}

/** Мерцающие звёздочки внутри карточки: [позиция, размер, цвет, задержка] */
const sparkles: [string, string, string, string][] = [
  ["left-[6%] top-[10%]", "w-4 lg:w-5", "#FFE326", "0s"],
  ["left-[44%] top-[7%]", "w-3 lg:w-4", "#9FDDF9", "-1.2s"],
  ["right-[5%] top-[16%]", "w-5 lg:w-6", "#FFE326", "-2.1s"],
  ["right-[38%] bottom-[9%]", "w-3.5", "#A6E04F", "-0.6s"],
  ["left-[3%] bottom-[24%]", "w-3 lg:w-4", "#fff", "-2.8s"],
  ["right-[12%] bottom-[30%]", "w-3", "#fff", "-1.7s"],
];

/**
 * Главная карточка: папка «Документы Almasadam» в Облаке Mail.ru.
 * Десктоп — текст и кнопка слева, папка и Әлем справа; телефон — иллюстрация сверху, затем текст и кнопка.
 */
function CloudFolderCard() {
  const { t } = useI18n();
  return (
    <Reveal>
      <div className="group relative isolate overflow-hidden rounded-[36px_36px_36px_14px] bg-[linear-gradient(140deg,#6B4FD8_0%,#4A33A8_48%,#302079_100%)] px-5 pb-6 pt-5 shadow-[0_8px_0_#1b1150,0_26px_50px_-18px_rgb(48_32_121/0.55)] transition-transform duration-500 ease-out hover:-translate-y-1 sm:px-8 sm:pb-8 lg:rounded-[52px_52px_52px_18px] lg:px-12 lg:py-10">
        {/* фон: горошек, мягкие пятна, кольцо, зигзаг */}
        <span aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-soft-light" />
        <Organic className="absolute -right-16 -top-20 -z-10 w-64 opacity-25 animate-morph lg:-right-10 lg:w-96" color="#159FE2" variant={1} />
        <Organic className="absolute -bottom-24 -left-20 -z-10 w-60 opacity-20 lg:w-80" color="#80C924" />
        <Ring className="absolute -left-8 bottom-[-6%] -z-10 hidden w-24 opacity-40 sm:block" color="#FFE326" />
        <Zigzag className="absolute bottom-5 right-[44%] -z-10 hidden w-24 opacity-60 lg:block" color="#9FDDF9" />
        {sparkles.map(([pos, size, color, delay]) => (
          <Sparkle
            key={pos}
            className={`absolute -z-10 animate-twinkle ${pos} ${size}`}
            color={color}
            style={{ animationDelay: delay }}
          />
        ))}

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* иллюстрация: папка + Әлем (на телефоне — сверху) */}
          <div className="relative mx-auto flex w-full max-w-[420px] items-end justify-center lg:order-2 lg:max-w-none">
            <Organic className="absolute bottom-[2%] left-1/2 w-[86%] -translate-x-1/2 -rotate-6 opacity-95" color="#FFE326" variant={1} />
            <Star3D className="absolute left-[2%] top-[4%] w-9 animate-wiggle sm:w-11" color="#80C924" shade="#4f8a0c" />
            <Cube3D className="absolute right-[1%] top-[2%] hidden w-12 animate-float [--r:10deg] sm:block lg:w-14" color="#E83A32" letter="Қ" />
            <Paperclip className="absolute left-[38%] top-[-2%] w-4 rotate-[22deg] animate-sway sm:w-5" color="#E83A32" />
            <BigFolder className="relative w-[64%] max-w-[300px] animate-float drop-shadow-[0_14px_14px_rgb(27_17_80/0.35)] transition-transform duration-500 ease-out [--r:-3deg] group-hover:scale-[1.04] lg:w-[62%]" />
            <MascotFigure
              pose="documents"
              variant="calm"
              size="custom"
              delay={0.15}
              className="relative -ml-[8%] w-[clamp(104px,30vw,150px)] lg:w-[clamp(150px,13vw,200px)]"
              sizes="(max-width: 1024px) 150px, 200px"
            />
          </div>

          {/* текст и кнопка (на десктопе — слева) */}
          <div className="relative text-center lg:order-1 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 font-display text-[0.8rem] font-extrabold text-white ring-1 ring-white/25">
              <FolderOpen className="size-4 text-sun" aria-hidden="true" />
              {t.documents.cloudNote}
            </span>
            <h3 className="mt-3 text-[clamp(1.55rem,1.2rem+1.6vw,2.5rem)] font-black leading-[1.08] !text-white">
              {t.documents.cloudTitle}
            </h3>
            <p className="mx-auto mt-2.5 max-w-[34ch] text-[1.02rem] leading-snug text-white/85 lg:mx-0 lg:text-[1.1rem]">
              {t.documents.cloudText}
            </p>
            {/* цветные «корешки папок» — декор */}
            <div aria-hidden="true" className="mx-auto mt-4 flex w-fit items-end gap-1.5 lg:mx-0">
              {["bg-sun h-5", "bg-sky h-7", "bg-leaf h-4", "bg-white h-6", "bg-berry h-3.5"].map((c, i) => (
                <span key={c} className={`w-5 animate-bob rounded-t-[8px] sm:w-6 ${c}`} style={{ animationDelay: `${i * -0.7}s` }} />
              ))}
            </div>
            <a
              href={DOCUMENTS_CLOUD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-5 w-full !min-h-14 bg-sun !px-7 !text-[1.08rem] text-violet shadow-[0_5px_0_#d9a800] hover:-translate-y-0.5 hover:bg-[#ffd900] hover:shadow-[0_7px_0_#d9a800] sm:w-auto lg:!min-h-14"
            >
              <FolderOpen className="size-5" aria-hidden="true" />
              {t.documents.cloudBtn}
              <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only"> ({t.common.opensInNewTab})</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * «Документы» / «Құжаттар». Главная карточка — папка в Облаке Mail.ru (DOCUMENTS_CLOUD_URL).
 * Отдельные документы из data/documents.ts (если добавлены) — карточками под ней.
 */
export function Documents() {
  const { t } = useI18n();
  const order = (c: DocumentCategory) => documentCategories.indexOf(c);
  const list = documents.filter(isAvailable).sort((a, b) => order(a.category) - order(b.category));

  return (
    <section
      id="documents"
      aria-labelledby="documents-title"
      className="section-clip relative overflow-x-clip bg-[linear-gradient(180deg,#FFFCF5_0%,#F3F0FD_45%,#EAF7FE_80%,#FFFCF5_100%)]"
    >
      {/* декор раздела — в полях, не у текста */}
      <PaperPlane className="absolute right-3 top-4 w-20 animate-orbit sm:right-8 sm:w-24 lg:right-[4%] lg:top-8 lg:w-32" />
      <Zigzag className="absolute -left-8 top-[46%] hidden w-28 rotate-90 xl:block" color="#FFE326" />
      <Cube3D className="absolute -right-3 bottom-24 hidden w-14 animate-float [--r:12deg] xl:block" color="#80C924" letter="A" />

      <div className="container-site section-y relative !pt-8 lg:!pt-8">
        <SectionHeading
          id="documents-title"
          eyebrow={t.documents.eyebrow}
          title={t.documents.title}
          subtitle={t.documents.subtitle}
          tone="violet"
        />

        <div className="mt-7 lg:mt-9">
          <CloudFolderCard />
        </div>

        {list.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {list.map((d, i) => (
              <DocCard key={d.id} doc={d} i={i} />
            ))}
          </ul>
        ) : null}
      </div>
      <Wave fill="#FFFCF5" variant={1} />
    </section>
  );
}
