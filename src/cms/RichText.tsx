import { Fragment } from "react";

/** Paragraphs split on blank lines; `_text_` or `*text*` renders in italics.
 *  Plain text only — nothing from the CMS is injected as HTML. */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={className}>
          {p.split(/(_[^_\n]+_|\*[^*\n]+\*)/g).map((part, j) =>
            /^(_[^_]+_|\*[^*]+\*)$/.test(part) ? (
              <em key={j}>{part.slice(1, -1)}</em>
            ) : (
              <Fragment key={j}>
                {part.split("\n").map((line, k) => (
                  <Fragment key={k}>
                    {k > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </Fragment>
            ),
          )}
        </p>
      ))}
    </>
  );
}
