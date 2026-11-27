import { motion } from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, Navigate, useParams } from "react-router";
import { toast } from "sonner";

import { BackHomeLink, PageShell } from "@/components/landing/PageShell";
import {
  EASE,
  Eyebrow,
  HeritagePattern,
  SmartImage,
} from "@/components/landing/shared";
import { GalleryDialog } from "@/components/media/GalleryDialog";
import { useMedia } from "@/cms/client";
import type { Album } from "@/cms/types";
import { FOLDER_KEYS, isFolderKey } from "@/content/media";
import { ImageViewer, type ViewerImage } from "@/components/media/ImageViewer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const ACTION =
  "inline-block cursor-pointer font-sans text-[11px] font-bold tracking-[0.22em] text-forest uppercase";

/** One Newsletter & Media folder, opened straight from the landing page. */
export default function MediaPage() {
  const { folder } = useParams();
  const { t, lang } = useLanguage();
  const m = t.media;
  const [album, setAlbum] = useState<Album | null>(null);
  const [viewer, setViewer] = useState<{
    id: string;
    title: string;
    images: ViewerImage[];
    start: number;
  } | null>(null);
  const { status, retry } = useMedia();

  if (!isFolderKey(folder)) return <Navigate to="/#news" replace />;
  const active = folder;
  const cms = status.state === "ready" ? status.data : null;
  const MAGAZINES = cms?.magazines ?? [];
  const ARTICLES = cms?.articles ?? [];
  const ALBUMS = cms?.albums ?? [];
  const SEMINARS = cms?.seminars ?? [];

  return (
    <PageShell>
      <motion.section
        key={`${lang}-${active}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 sm:pb-32"
      >
        <BackHomeLink label={m.backHome} to="/#news" />
        <Eyebrow className="mt-8">{m.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-6xl">
          {m.folders[active].label}
        </h1>

        {status.state === "loading" && <RowsSkeleton />}
        {status.state === "error" && (
          <div className="mt-10 rounded-2xl bg-paper px-6 py-8 text-center">
            <p className="font-display text-lg italic text-ink/70">
              {m.loadFailed}
            </p>
            <button
              type="button"
              onClick={retry}
              className={cn(ACTION, "mt-4")}
            >
              <span className="underline-draw">{m.retry}</span>
            </button>
          </div>
        )}

        <ul className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {active === "seminars" &&
            SEMINARS.map((s) => {
              const title = s.title[lang] || s.title.en;
              const images = [
                s.poster && { src: s.poster, label: m.poster },
                s.schedule && { src: s.schedule, label: m.schedule },
              ].filter((x): x is ViewerImage => Boolean(x));
              const open = (start: number) => setViewer({ title, images, start, id: s.id });
              return (
                <MediaRow
                  key={s.id}
                  cover={images[0]?.src}
                  coverFit="contain"
                  title={title}
                  subtitle={s.date[lang] || s.date.en}
                  onCoverClick={images.length > 0 ? () => open(0) : undefined}
                >
                  <ClampText
                    text={s.summary[lang] || s.summary.en}
                    more={m.more}
                    less={m.less}
                  />
                  {images.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {images.map((img, i) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => open(i)}
                          className={ACTION}
                        >
                          <span className="underline-draw">
                            {i === 0 && s.poster ? m.viewPoster : m.viewSchedule}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </MediaRow>
              );
            })}

          {active === "magazines" &&
            MAGAZINES.map((mag) => (
              <MediaRow
                key={mag.id}
                cover={mag.cover}
                coverFit="contain"
                title={mag.title[lang]}
                subtitle={mag.edition[lang]}
              >
                {mag.purchaseUrl ? (
                  <a
                    href={mag.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ACTION}
                  >
                    <span className="underline-draw">{m.download}</span>
                  </a>
                ) : (
                  <Link to="/#contact" className={ACTION}>
                    <span className="underline-draw">{m.download}</span>
                  </Link>
                )}
              </MediaRow>
            ))}

          {active === "newsletters" &&
            ARTICLES.map((article) => (
              <MediaRow
                key={article.id}
                cover={article.cover}
                title={article.title[lang]}
                subtitle={article.source[lang]}
              >
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ACTION}
                  >
                    <span className="underline-draw">{m.read}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => toast(m.readSoon)}
                    className={ACTION}
                  >
                    <span className="underline-draw">{m.read}</span>
                  </button>
                )}
              </MediaRow>
            ))}

          {active === "library" &&
            ALBUMS.map((a) => {
              const photos = a.photos;
              return (
                <MediaRow
                  key={a.id}
                  cover={photos[0]?.thumb ?? photos[0]?.src}
                  title={a.title[lang]}
                  subtitle={
                    photos.length > 0
                      ? `${a.date[lang]} · ${m.photoCount(photos.length)}`
                      : a.date[lang]
                  }
                  onCoverClick={() => setAlbum(a)}
                >
                  <button
                    type="button"
                    onClick={() => setAlbum(a)}
                    className={ACTION}
                  >
                    <span className="underline-draw">{m.viewGallery}</span>
                  </button>
                </MediaRow>
              );
            })}
        </ul>

        <nav
          aria-label={m.moreFolders}
          className="mt-20 border-t border-ink/10 pt-8"
        >
          <p className="font-sans text-[11px] font-bold tracking-[0.24em] text-maroon uppercase">
            {m.moreFolders}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {FOLDER_KEYS.filter((key) => key !== active).map((key) => (
              <li key={key}>
                <Link
                  to={`/media/${key}`}
                  className="underline-draw font-display text-xl text-ink transition-colors hover:text-maroon"
                >
                  {m.folders[key].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.section>

      {viewer && (
        <ImageViewer
          key={`${viewer.id}-${viewer.start}`}
          title={viewer.title}
          images={viewer.images}
          start={viewer.start}
          onClose={() => setViewer(null)}
        />
      )}

      <GalleryDialog
        key={album?.id ?? "closed"}
        album={album}
        onClose={() => setAlbum(null)}
      />
    </PageShell>
  );
}

/** Thumbnail on the left, title, date or edition and an action on the right. */
function MediaRow({
  cover,
  coverFit = "cover",
  title,
  subtitle,
  onCoverClick,
  children,
}: {
  cover?: string;
  /** "contain" shows the whole image, e.g. a magazine cover. */
  coverFit?: "cover" | "contain";
  title: string;
  subtitle: string;
  onCoverClick?: () => void;
  children: ReactNode;
}) {
  const thumb = cover ? (
    <SmartImage
      src={cover}
      alt={title}
      className={cn(
        "h-full w-full",
        coverFit === "contain" ? "object-contain p-3" : "object-cover",
      )}
    />
  ) : (
    <HeritagePattern className="h-full w-full" />
  );
  const frame = cn(
    "aspect-[7/5] overflow-hidden rounded-2xl",
    coverFit === "contain" && "bg-paper",
  );

  return (
    <li className="grid items-center gap-5 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:gap-9">
      {onCoverClick ? (
        <button
          type="button"
          onClick={onCoverClick}
          aria-label={title}
          className={cn(frame, "group cursor-pointer")}
        >
          <span className="block h-full w-full transition-transform duration-500 group-hover:scale-105">
            {thumb}
          </span>
        </button>
      ) : (
        <div className={frame}>{thumb}</div>
      )}
      <div>
        <h2 className="font-display text-2xl leading-snug font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 font-sans text-xs font-bold tracking-[0.2em] text-maroon uppercase">
          {subtitle}
        </p>
        <div className="mt-4">{children}</div>
      </div>
    </li>
  );
}

function RowsSkeleton() {
  return (
    <ul className="mt-10 animate-pulse space-y-10 sm:mt-12 sm:space-y-12" aria-hidden>
      {[0, 1].map((i) => (
        <li
          key={i}
          className="grid items-center gap-5 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] sm:gap-9"
        >
          <div className="aspect-[7/5] rounded-2xl bg-paper" />
          <div className="space-y-3">
            <div className="h-8 w-2/3 rounded bg-paper" />
            <div className="h-3 w-1/2 rounded bg-paper" />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Two lines of text with a "… more" toggle when it runs longer. */
function ClampText({
  text,
  more,
  less,
}: {
  text: string;
  more: string;
  less: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    const measure = () =>
      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, expanded]);

  return (
    <div className="max-w-2xl">
      <p
        ref={ref}
        className={cn(
          "text-[15px] leading-relaxed text-ink/75",
          !expanded && "line-clamp-2",
        )}
      >
        {text}
      </p>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1.5 cursor-pointer font-display text-sm italic text-maroon"
        >
          {expanded ? less : `… ${more}`}
        </button>
      )}
    </div>
  );
}
