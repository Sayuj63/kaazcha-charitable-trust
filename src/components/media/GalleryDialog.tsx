import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState, type KeyboardEvent } from "react";

import { HeritagePattern } from "@/components/landing/shared";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { albumPhotos, type Album } from "@/content/media";
import { useLanguage } from "@/i18n/LanguageProvider";

const TEXT_BUTTON =
  "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full bg-paper px-4 font-sans text-[11px] font-bold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-manila";

/** Photo grid for one Media Library album, with a single-photo view.
 *  Layered above the fixed navbar (z-[90]). Mount with `key={album.slug}` so
 *  the selected photo resets between albums. */
export function GalleryDialog({
  album,
  onClose,
}: {
  album: Album | null;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const m = t.media;
  const [index, setIndex] = useState<number | null>(null);
  const photos = album ? albumPhotos(album.slug) : [];
  const title = album ? album.title[lang] : "";

  const step = (delta: number) =>
    setIndex((i) =>
      i === null ? i : (i + delta + photos.length) % photos.length,
    );

  const onKeyDown = (e: KeyboardEvent) => {
    if (index === null) return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  return (
    <DialogPrimitive.Root
      open={album !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPortal>
        <DialogOverlay className="z-[110] bg-ink/80" />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[111] flex items-center justify-center p-3 outline-none sm:p-8"
        >
          <div className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-cream">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <DialogPrimitive.Title className="font-display text-2xl leading-snug font-medium tracking-tight text-ink">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 font-sans text-[11px] font-bold tracking-[0.2em] text-maroon uppercase">
                  {album?.date[lang]}
                  {photos.length > 0 && ` · ${m.photoCount(photos.length)}`}
                </DialogPrimitive.Description>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {index !== null && (
                  <button
                    type="button"
                    onClick={() => setIndex(null)}
                    aria-label={m.allPhotos}
                    className={TEXT_BUTTON}
                  >
                    {m.grid}
                  </button>
                )}
                <DialogPrimitive.Close
                  aria-label={m.closeGallery}
                  className={TEXT_BUTTON}
                >
                  {m.close}
                </DialogPrimitive.Close>
              </div>
            </div>

            <div className="min-h-0 overflow-y-auto p-4 sm:p-7">
              {photos.length === 0 ? (
                <div className="flex flex-col items-center gap-5 py-6 text-center">
                  <HeritagePattern className="aspect-[16/9] w-full max-w-md rounded-2xl" />
                  <p className="max-w-sm font-display text-lg italic text-ink/70">
                    {m.galleryEmpty}
                  </p>
                </div>
              ) : index === null ? (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {photos.map((photo, i) => (
                    <li key={photo.src}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        className="block aspect-square w-full cursor-pointer overflow-hidden rounded-xl"
                      >
                        <img
                          src={photo.thumb}
                          alt={m.photoAlt(title, i + 1)}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <img
                    key={photos[index].src}
                    src={photos[index].src}
                    alt={m.photoAlt(title, index + 1)}
                    className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain"
                  />
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label={m.previousPhoto}
                      className={TEXT_BUTTON}
                    >
                      {m.previous}
                    </button>
                    <span className="font-display text-sm italic text-ink/60">
                      {index + 1} / {photos.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label={m.nextPhoto}
                      className={TEXT_BUTTON}
                    >
                      {m.next}
                    </button>
                  </div>
                </div>
              )}

              {album?.moreUrl && photos.length > 0 && (
                <p className="mt-6 text-center">
                  <a
                    href={album.moreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-draw font-sans text-[11px] font-bold tracking-[0.2em] text-forest uppercase"
                  >
                    {m.viewAll}
                  </a>
                </p>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
