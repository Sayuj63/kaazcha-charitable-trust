import { Link } from "react-router";

import { cn } from "@/lib/utils";

/** A manila file folder: a tab on top, the label and a short note inside.
 *  `active` renders it opened (forest green) for use as a tab. */
export function FolderCard({
  to,
  label,
  copy,
  meta,
  active = false,
  replace = false,
  compact = false,
}: {
  to: string;
  label: string;
  copy: string;
  meta: string;
  active?: boolean;
  replace?: boolean;
  /** Hide the description on phones so four folders fit as tabs. */
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      replace={replace}
      preventScrollReset={replace}
      aria-current={active ? "page" : undefined}
      className="group relative block h-full cursor-pointer pt-5"
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0 left-0 h-5 w-[42%] rounded-t-lg transition-colors duration-300",
          active ? "bg-forest" : "bg-manila-dark group-hover:bg-gold-light",
        )}
      />
      <span
        className={cn(
          "relative flex h-full flex-col rounded-xl rounded-tl-none px-5 pt-6 pb-5 transition-colors duration-300",
          active ? "bg-forest text-cream" : "bg-manila text-ink",
        )}
      >
        <span className="font-sans text-[13px] font-bold tracking-[0.2em] uppercase">
          {label}
        </span>
        <span
          className={cn(
            "mt-2.5 flex-1 text-sm leading-relaxed",
            active ? "text-cream/80" : "text-ink/70",
            compact && "hidden sm:block",
          )}
        >
          {copy}
        </span>
        <span
          className={cn(
            "mt-5 font-display text-sm italic",
            active ? "text-gold-light" : "text-maroon",
          )}
        >
          {meta}
        </span>
      </span>
    </Link>
  );
}
