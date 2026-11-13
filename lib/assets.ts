import { assetManifest } from "./assets.generated";

export type ImageAsset = { src: string; width: number; height: number };

export type MascotPose =
  | "welcome"
  | "about"
  | "reading"
  | "languages"
  | "food"
  | "news"
  | "contact"
  | "documents";

export type AssetManifest = {
  logo: ImageAsset | null;
  heroPoster: ImageAsset | null;
  heroVideo: { src: string; type: string; hasAudio: boolean } | null;
  /** Файлы из public/documents/ (пути вида "/documents/file.pdf") */
  documents: string[];
  ogImage: ImageAsset | null;
  mascot: Record<MascotPose, ImageAsset | null>;
  aboutPhotos: (ImageAsset | null)[];
  /** Портреты педагогов: public/images/teachers/<id>.jpg (ключ — id из data/teachers.ts) */
  teachers: Record<string, ImageAsset | null>;
  gallery: ImageAsset[];
};

export const assets = assetManifest;
