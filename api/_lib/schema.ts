import { z } from "zod";

import type { CollectionName } from "../../src/cms/types.js";

const text = (max: number) => z.string().trim().max(max);
const localized = (max: number) => z.object({ en: text(max), ml: text(max) });

/** Only https links or site-relative paths — never `javascript:` etc. */
const link = z
  .string()
  .trim()
  .max(2000)
  .refine((v) => v === "" || /^https:\/\//i.test(v) || /^\/(?!\/)/.test(v), {
    message: "Links must start with https:// or /",
  })
  .transform((v) => v || undefined)
  .optional();

const id = z.string().regex(/^[a-z0-9-]{1,64}$/i);
const slug = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers and dashes")
  .max(80);

const person = z.object({
  id,
  slug,
  aliases: z.array(slug).max(20).default([]),
  name: localized(200),
  years: text(60),
  role: localized(200),
  bio: localized(20000),
  image: link,
  imageCredit: text(300).optional(),
  published: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const magazine = z.object({
  id,
  title: localized(200),
  edition: localized(200),
  cover: link,
  purchaseUrl: link,
});

const article = z.object({
  id,
  title: localized(300),
  source: localized(200),
  cover: link,
  url: link,
});

const photo = z.object({
  src: z
    .string()
    .trim()
    .refine((v) => /^https:\/\//i.test(v) || /^\/(?!\/)/.test(v)),
  thumb: link,
});

const album = z.object({
  id,
  slug,
  title: localized(200),
  date: localized(100),
  moreUrl: link,
  photos: z.array(photo).max(500),
});

export const SCHEMAS = {
  people: z
    .array(person)
    .max(1000)
    .refine(
      (list) => {
        const all = list.flatMap((p) => [p.slug, ...p.aliases]);
        return new Set(all).size === all.length;
      },
      { message: "Two personalities share the same link (slug)" },
    ),
  magazines: z.array(magazine).max(500),
  articles: z.array(article).max(1000),
  albums: z.array(album).max(200),
} satisfies Record<CollectionName, z.ZodType>;
