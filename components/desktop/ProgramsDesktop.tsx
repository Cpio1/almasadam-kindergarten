"use client";

import { motion } from "motion/react";
import { programs } from "@/data/programs";
import { tones } from "@/lib/tones";
import { useI18n } from "@/lib/i18n";
import { Blob } from "@/components/ui/Decor";

/** Асимметричная мозаика 12 колонок: ширины карточек чередуются 5-4-3 / 3-4-5 */
const spans = ["col-span-5", "col-span-4", "col-span-3", "col-span-3", "col-span-4", "col-span-5"];
const shapes = [
  "rounded-[48px_48px_48px_16px]",
  "rounded-[16px_48px_48px_48px]",
  "rounded-[48px_16px_48px_48px]",
  "rounded-[48px_48px_16px_48px]",
  "rounded-[48px_48px_48px_48px]",
  "rounded-[16px_48px_48px_48px]",
];

export function ProgramsDesktop() {
  const { t } = useI18n();
  return (
    <ul className="hidden grid-cols-12 gap-5 lg:grid">
      {programs.map(({ id, icon: Icon, tone }, i) => {
        const c = tones[tone];
        const item = t.programs.items[id];
        return (
          <motion.li
            key={id}
            className={spans[i % spans.length]}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group relative flex h-full min-h-[236px] flex-col overflow-hidden p-7 xl:p-8 ${c.soft} ${shapes[i % shapes.length]}`}
            >
              <Blob
                variant={(i % 3) as 0 | 1 | 2}
                color="#ffffff"
                className="absolute -right-10 -top-10 w-44 opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
              />
              <span
                aria-hidden="true"
                className={`absolute bottom-3 right-6 font-display text-[5.5rem] font-black leading-none opacity-[0.08] ${c.text}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`relative grid size-14 place-items-center rounded-[18px] ${c.solid} shadow-pop transition-transform duration-300 group-hover:-rotate-6`}
              >
                <Icon
                  className={`size-7 ${tone === "sun" ? "text-violet" : "text-white"}`}
                  aria-hidden="true"
                />
              </span>
              <h3 className="relative mt-auto pt-8 text-[1.3rem] font-extrabold xl:text-[1.4rem]">
                {item.title}
              </h3>
              <p className="relative mt-2 max-w-[34ch] text-[0.98rem] leading-relaxed text-ink-soft">
                {item.text}
              </p>
            </motion.article>
          </motion.li>
        );
      })}
    </ul>
  );
}
