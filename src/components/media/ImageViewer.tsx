import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";

import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export type ViewerImage = { src: string; label: string };

const TEXT_BUTTON =
  "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full px-4 font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-colors";

/** Full-screen view of a seminar's poster / programme schedule. Mount with a
 *  `key` per seminar so the selected image resets. */
export function ImageViewer({
  title,
  images,
  start = 0,
  onClose,
}: {
  title: string;
  images: ViewerImage[];
  start?: number;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(start);
  const image = images[index];
  if (!image) return null;

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="z-[110] bg-ink/80" />
        <DialogPrimitive.Content
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[111] flex items-center justify-center p-3 outline-none sm:p-8"
        >
          <div className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-cream">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <DialogPrimitive.Title className="font-display text-2xl leading-snug font-medium tracking-tight text-ink">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 font-sans text-[11px] font-bold tracking-[0.2em] text-maroon uppercase">
                  {image.label}
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close
                className={cn(TEXT_BUTTON, "bg-paper text-ink hover:bg-manila")}
              >
                {t.media.close}
              </DialogPrimitive.Close>
            </div>
            <div className="flex min-h-0 flex-col items-center gap-4 overflow-y-auto p-4 sm:p-7">
              <img
                key={image.src}
                src={image.src}
                alt={`${title} — ${image.label}`}
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />
              {images.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-pressed={i === index}
                      className={cn(
                        TEXT_BUTTON,
                        i === index ? "bg-forest text-cream" : "bg-paper text-ink hover:bg-manila",
                      )}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}
