/**
 * Сканирует папку public/ и генерирует lib/assets.generated.ts.
 *
 * Сайт использует этот манифест, чтобы показывать фирменные заглушки
 * вместо отсутствующих файлов (логотип, видео, маскот, фото) и
 * не делать запросов, которые закончились бы 404.
 *
 * Запускается автоматически перед `npm run dev` и `npm run build`.
 * После добавления новых файлов в public/ достаточно перезапустить dev-сервер
 * или выполнить `npm run assets`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(root, "lib", "assets.generated.ts");

const IMAGE_EXT = [".webp", ".png", ".jpg", ".jpeg", ".avif"];

function exists(rel) {
  const full = path.join(pub, rel);
  try {
    return fs.statSync(full).isFile() && fs.statSync(full).size > 0;
  } catch {
    return false;
  }
}

/** Возвращает { width, height } для PNG / JPEG / WebP, иначе null. */
function imageSize(rel) {
  let buf;
  try {
    buf = fs.readFileSync(path.join(pub, rel));
  } catch {
    return null;
  }
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      const isSOF =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSOF) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
    return null;
  }
  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

/** Ищет файл с любым из поддерживаемых расширений. */
function findImage(baseRel) {
  for (const ext of IMAGE_EXT) {
    const rel = baseRel + ext;
    if (exists(rel)) {
      const size = imageSize(rel);
      if (size) return { src: "/" + rel, ...size };
    }
  }
  return null;
}

/**
 * Есть ли в MP4/MOV звуковая дорожка: ищем box «hdlr» с типом обработчика «soun».
 * Для WebM честно не проверяем — считаем, что звук есть (кнопка всё равно перепроверит в браузере).
 */
function videoHasAudio(rel) {
  if (!rel.endsWith(".mp4") && !rel.endsWith(".mov")) return true;
  let buf;
  try {
    buf = fs.readFileSync(path.join(pub, rel));
  } catch {
    return false;
  }
  let i = buf.indexOf("hdlr");
  while (i !== -1) {
    if (buf.toString("ascii", i + 12, i + 16) === "soun") return true;
    i = buf.indexOf("hdlr", i + 4);
  }
  return false;
}

const logo = findImage("images/logo");
const heroPoster = findImage("videos/main-page-poster") ?? findImage("images/hero-poster");
const ogImage = findImage("images/og-image");

// Видео главного экрана: public/videos/main-page.mp4 (запасные имена — для совместимости)
let heroVideo = null;
for (const rel of [
  "videos/main-page.mp4",
  "videos/main-page.webm",
  "videos/almasadam-hero.mp4",
  "videos/almasadam-hero.webm",
]) {
  if (exists(rel)) {
    // ?v=<хэш содержимого>: после замены ролика браузеры и CDN не отдадут старую копию из кэша
    const hash = crypto.createHash("md5").update(fs.readFileSync(path.join(pub, rel))).digest("hex").slice(0, 10);
    heroVideo = {
      src: `/${rel}?v=${hash}`,
      type: rel.endsWith(".webm") ? "video/webm" : "video/mp4",
      hasAudio: videoHasAudio(rel),
    };
    break;
  }
}

const poses = ["welcome", "about", "reading", "languages", "food", "news", "contact", "documents"];
const mascot = Object.fromEntries(poses.map((p) => [p, findImage(`mascot/adam-${p}`)]));

const aboutPhotos = [1, 2, 3].map((n) => findImage(`images/about-${n}`));

let gallery = [];
try {
  gallery = fs
    .readdirSync(path.join(pub, "gallery"))
    .filter((f) => IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((f) => {
      const rel = `gallery/${f}`;
      const size = imageSize(rel);
      return size ? { src: "/" + rel, ...size } : null;
    })
    .filter(Boolean);
} catch {
  gallery = [];
}

// Документы для родителей: только реально существующие файлы (кнопки без файла не показываем)
let documents = [];
try {
  documents = fs
    .readdirSync(path.join(pub, "documents"))
    .filter((f) => !f.startsWith(".") && exists(`documents/${f}`))
    .sort()
    .map((f) => `/documents/${f}`);
} catch {
  documents = [];
}

const manifest = { logo, heroPoster, heroVideo, ogImage, mascot, aboutPhotos, gallery, documents };

const file = `// ⚠️ Файл сгенерирован автоматически скриптом scripts/check-assets.mjs.
// Не редактируйте вручную — добавьте файлы в public/ и перезапустите dev/build.
import type { AssetManifest } from "./assets";

export const assetManifest: AssetManifest = ${JSON.stringify(manifest, null, 2)};
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, file);

const found = [
  logo && "logo",
  heroVideo && "hero video",
  heroPoster && "poster",
  ...Object.entries(mascot).filter(([, v]) => v).map(([k]) => `mascot:${k}`),
  gallery.length && `gallery×${gallery.length}`,
  documents.length && `documents×${documents.length}`,
].filter(Boolean);
console.log(`[assets] найдено: ${found.length ? found.join(", ") : "пока ничего — используются заглушки"}`);
