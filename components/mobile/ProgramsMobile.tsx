"use client";

import { motion } from "motion/react";
import { programs } from "@/data/programs";
import { tones } from "@/lib/tones";
import { useI18n } from "@/lib/i18n";

/**
 * Телефон / планшет: горизонтальные карточки (иконка слева, текст справа),
 * одна колонка на телефоне и две — на планшете. Цветная полоска слева чередует оттенки.
 */
export function ProgramsMobile() {
  const { t } = useI18n();
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:hidden">
      {programs.map(({ id, icon: Icon, tone }, i) => {
        const c = tones[tone];
        const item = t.programs.items[id];
        return (
          <motion.li
            key={id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
          >
            <article
              className={`relative flex h-full gap-4 overflow-hidden p-5 ${c.soft} ${
                i % 2 ? "rounded-[12px_30px_30px_30px]" : "rounded-[30px_30px_30px_12px]"
              }`}
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-[16px] ${c.solid} shadow-pop`}
              >
                <Icon className={`size-6 ${tone === "sun" ? "text-violet" : "text-white"}`} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.08rem] font-extrabold">{item.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
              </div>
              <span
                aria-hidden="true"
                className={`absolute -right-1 -top-3 font-display text-[3.6rem] font-black leading-none opacity-[0.07] ${c.text}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
}
