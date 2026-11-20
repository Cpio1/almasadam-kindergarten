export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Короткая подпись (если задана в data/gallery.ts) */
  caption?: string;
};
