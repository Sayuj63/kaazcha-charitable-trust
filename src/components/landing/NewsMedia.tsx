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
              {FOLDER_KEYS.map((key) => (
                <FolderCard
                  key={key}
                  to={`/media/${key}`}
                  label={m.folders[key].label}
                  copy={m.folders[key].copy}
                  meta=""
                />
              ))}
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
