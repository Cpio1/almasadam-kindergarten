import { assetManifest } from "./assets.generated";

export type ImageAsset = { src: string; width: number; height: number };

export type MascotPose =
  | "welcome"
  | "about"
  | "reading"
  | "languages"
  | "food"
  | "news"
  | "contact";

export type AssetManifest = {
  logo: ImageAsset | null;
  heroPoster: ImageAsset | null;
  heroVideo: { src: string; type: string; hasAudio: boolean } | null;
  ogImage: ImageAsset | null;
  mascot: Record<MascotPose, ImageAsset | null>;
  aboutPhotos: (ImageAsset | null)[];
  gallery: ImageAsset[];
};

export const assets = assetManifest;
