"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { documents, documentCategories, type DocumentCategory, type DocumentItem } from "@/data/documents";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MascotFigure } from "@/components/ui/MascotFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Wave } from "@/components/ui/Decor";
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

/** Временный блок, пока в data/documents.ts нет ни одного рабочего документа */
function ComingSoon() {
  const { t } = useI18n();
  return (
    <Reveal className="relative">
      <div className="relative isolate overflow-hidden rounded-[36px_36px_36px_12px] bg-white px-5 pb-7 pt-6 text-center shadow-soft ring-1 ring-violet-100 sm:px-8 lg:rounded-[48px_48px_48px_16px] lg:px-10 lg:py-9">
        <Organic className="absolute -right-14 -top-16 -z-10 w-56 opacity-70 lg:w-72" color="#FFF4A8" variant={1} />
        <Organic className="absolute -bottom-20 -left-16 -z-10 w-56 opacity-70 lg:w-64" color="#EAF7FE" />
        <Paperclip className="absolute left-5 top-4 w-5 rotate-[18deg] sm:left-8 sm:w-6" color="#E83A32" />
        <Star3D className="absolute right-4 top-4 w-9 animate-wiggle sm:right-6 sm:w-11" color="#80C924" shade="#4f8a0c" />

        <BigFolder className="mx-auto w-[min(250px,72%)] animate-float [--r:-2deg] lg:w-[270px]" />
        <h3 className="mt-4 text-[clamp(1.35rem,1.1rem+1.1vw,1.85rem)] font-black leading-tight">{t.documents.emptyTitle}</h3>
        <p className="mx-auto mt-2 max-w-[30ch] text-[1rem] text-ink-soft">{t.documents.emptyText}</p>
        {/* цветные «корешки папок» — чистый декор */}
        <div aria-hidden="true" className="mx-auto mt-5 flex w-fit items-end gap-1.5">
          {["bg-violet h-7", "bg-sky h-9", "bg-sun h-6", "bg-leaf h-8", "bg-berry h-5"].map((c, i) => (
            <span
              key={c}
              className={`w-6 animate-bob rounded-t-[10px] sm:w-8 ${c}`}
              style={{ animationDelay: `${i * -0.7}s` }}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/**
 * «Документы» / «Құжаттар». Список — data/documents.ts, файлы — public/documents/.
 * Пока рабочих документов нет — «Документы скоро появятся»; затем блок сам сменяется карточками.
 */
export function Documents() {
  const { t } = useI18n();
  const order = (c: DocumentCategory) => documentCategories.indexOf(c);
  const list = documents.filter(isAvailable).sort((a, b) => order(a.category) - order(b.category));
  const hasDocs = list.length > 0;

  return (
    <section
      id="documents"
      aria-labelledby="documents-title"
      className="section-clip relative bg-[linear-gradient(180deg,#FFFCF5_0%,#F3F0FD_45%,#EAF7FE_80%,#FFFCF5_100%)]"
    >
      {/* декор раздела: самолётик, зигзаг, кубик — в полях, не у текста */}
      <PaperPlane className="absolute right-3 top-4 w-20 animate-orbit sm:right-8 sm:w-24 lg:right-[4%] lg:top-8 lg:w-32" />
      <Zigzag className="absolute -left-8 top-[46%] hidden w-28 rotate-90 xl:block" color="#FFE326" />
      <Cube3D className="absolute -right-3 bottom-24 hidden w-14 animate-float [--r:12deg] xl:block" color="#E83A32" letter="Қ" />

      <div className="container-site section-y relative !pt-8 lg:!pt-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12 xl:gap-16">
          {/* заголовок + Әлем с папкой */}
          <div>
            <SectionHeading
              id="documents-title"
              eyebrow={t.documents.eyebrow}
              title={t.documents.title}
              subtitle={t.documents.subtitle}
              tone="violet"
            />
            {/* Әлем у «веера» файлов: телефон — Әлем слева, файлы справа; десктоп — наоборот */}
            <div className="relative mt-5 flex min-h-[210px] items-end justify-start sm:min-h-[240px] lg:mt-6 lg:min-h-[300px] lg:justify-end">
              <Organic className="absolute bottom-[-6%] left-[2%] w-[60%] max-w-[300px] -rotate-6 lg:left-auto lg:right-[6%] lg:w-[66%]" color="#FFE326" />
              <div aria-hidden="true" className="absolute bottom-[6%] right-[2%] h-[62%] w-[42%] max-w-[210px] sm:right-[10%] lg:left-0 lg:right-auto lg:w-[44%]">
                <FileBadge label="PDF" color="#E83A32" className="absolute bottom-0 left-0 w-[37%] animate-float [--r:-14deg]" />
                <FileBadge label="123" color="#159FE2" className="absolute bottom-[16%] left-[31%] w-[37%] animate-float [--r:2deg] [animation-delay:-1.5s]" />
                <FileBadge label="★" color="#80C924" ink="#302079" className="absolute bottom-0 left-[62%] w-[37%] animate-float [--r:14deg] [animation-delay:-3s]" />
                <Paperclip className="absolute -top-2 left-[44%] w-4 rotate-[24deg] animate-sway sm:w-5" color="#7B5CE0" />
              </div>
              <MascotFigure
                pose="documents"
                variant="calm"
                size="custom"
                delay={0.15}
                say={t.documents.mascotSay}
                bubbleSide="right"
                bubbleClassName="max-[399px]:!left-[52%]"
                className="relative ml-[4%] w-[clamp(132px,40vw,184px)] lg:ml-0 lg:mr-[22%] lg:w-[clamp(190px,15vw,232px)]"
                sizes="(max-width: 1024px) 190px, 232px"
              />
            </div>
          </div>

          {/* карточки или временный блок */}
          <div className="relative">
            {hasDocs ? (
              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                {list.map((d, i) => (
                  <DocCard key={d.id} doc={d} i={i} />
                ))}
              </ul>
            ) : (
              <ComingSoon />
            )}
          </div>
        </div>
      </div>
      <Wave fill="#FFFCF5" variant={1} />
    </section>
  );
}
