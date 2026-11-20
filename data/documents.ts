/**
 * Документы для родителей — раздел «Документы» / «Құжаттар».
 *
 * КАК ДОБАВИТЬ ДОКУМЕНТ
 * 1. PDF: положите файл в public/documents/ (например, public/documents/rules.pdf)
 *    и укажите href: "/documents/rules.pdf", type: "pdf".
 *    Ссылка на Google Drive: href: "https://drive.google.com/…", type: "link".
 * 2. Добавьте объект в массив `documents` ниже — названия на русском и казахском обязательны.
 * 3. Перезапустите dev-сервер или пересоберите сайт (npm run build).
 *
 * Главная карточка раздела ведёт в общую папку в Облаке Mail.ru (DOCUMENTS_CLOUD_URL).
 * Документы из массива ниже (если добавить) показываются отдельными карточками под ней.
 * Локальный PDF, которого нет в public/documents/, на сайте не показывается — без неработающих кнопок.
 *
 * Важно: добавляйте только настоящие, действующие документы.
 *
 * Пример:
 * {
 *   id: "internal-rules",
 *   category: "rules",
 *   type: "pdf",
 *   href: "/documents/internal-rules.pdf",
 *   title: { ru: "Правила внутреннего распорядка", kz: "Ішкі тәртіп ережелері" },
 *   description: { ru: "Режим дня, приход и уход", kz: "Күн тәртібі, келу және кету" },
 * },
 */

export type DocumentCategory =
  | "licenses" // Лицензии и разрешительные документы
  | "founding" // Учредительные документы
  | "rules" // Правила внутреннего распорядка
  | "parents" // Информация для родителей
  | "other"; // Другие официальные документы

export type DocumentType = "pdf" | "link";

export type DocumentItem = {
  /** Уникальный id (латиницей) */
  id: string;
  category: DocumentCategory;
  type: DocumentType;
  /** "/documents/file.pdf" (файл в public/documents/) или полная ссылка https://… */
  href: string;
  title: { ru: string; kz: string };
  description?: { ru: string; kz: string };
};

/** Публичная папка «Документы Almasadam» в Облаке Mail.ru — открывается кнопкой «Посмотреть документы» */
export const DOCUMENTS_CLOUD_URL = "https://cloud.mail.ru/public/XBSq/Pf8TT4UfZ";

/** Порядок категорий на сайте */
export const documentCategories: DocumentCategory[] = ["licenses", "founding", "rules", "parents", "other"];

export const documents: DocumentItem[] = [
  // Добавьте документы сюда (см. пример выше)
];
