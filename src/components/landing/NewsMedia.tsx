import { toast } from "sonner";

import { FolderCard } from "@/components/media/FolderCard";
import { FOLDER_KEYS } from "@/content/media";
import { useLanguage } from "@/i18n/LanguageProvider";

import { Reveal, SectionHeader } from "./shared";

export function NewsMedia() {
  const { t } = useLanguage();
  const n = t.news;
  const m = t.media;

  return (
    <section id="news" className="relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={n.eyebrow}
          title={
            <>
              {n.titleBefore}
              <span className="italic text-maroon">{n.titleEmphasis}</span>
              {n.titleAfter}
            </>
          }
          description={n.description}
        />

        {/* Newsletter & Media folders */}
        <Reveal className="mt-12 sm:mt-14">
          <div className="rounded-3xl bg-paper p-6 sm:p-10">
            <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
              {n.foldersHeading}
            </p>
            <nav
              aria-label={m.foldersLabel}
              className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {FOLDER_KEYS.map((key) =>
                key === "newsletters" ? (
                  <div
                    key={key}
                    className="group relative block h-full cursor-pointer pt-5"
                    onClick={() => toast(m.readSoon)}
                  >
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 h-5 w-[42%] rounded-t-lg bg-manila-dark transition-colors duration-300 group-hover:bg-gold-light"
                    />
                    <span className="relative flex h-full flex-col rounded-xl rounded-tl-none bg-manila px-5 pt-6 pb-5 text-ink transition-colors duration-300">
                      <span className="font-sans text-[13px] font-bold tracking-[0.2em] uppercase">
                        {m.folders[key].label}
                      </span>
                      <span className="mt-2.5 flex-1 text-sm leading-relaxed text-ink/70">
                        {m.folders[key].copy}
                      </span>
                      <span className="mt-5 font-display text-sm italic text-maroon" />
                    </span>
                  </div>
                ) : (
                  <FolderCard
                    key={key}
                    to={`/media/${key}`}
                    label={m.folders[key].label}
                    copy={m.folders[key].copy}
                    meta=""
                  />
                ),
              )}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
