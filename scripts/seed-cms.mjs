// One-time seed of the CMS collections in Vercel Blob from the content that
// used to live in src/content/media.ts, plus the first personality.
// Usage: node --env-file=.env.local scripts/seed-cms.mjs [--force]
// Without --force, collections that already exist are left untouched.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { put } from "@vercel/blob";

const force = process.argv.includes("--force");
const now = Date.now();

async function write(name, items) {
  try {
    await put(`cms/${name}.json`, JSON.stringify(items), {
      access: "public",
      contentType: "application/json; charset=utf-8",
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
      allowOverwrite: force,
    });
    console.log(`✓ ${name} (${items.length})`);
  } catch (err) {
    console.log(`– ${name}: ${err.message}`);
  }
}

function photos(slug) {
  const dir = `public/gallery/${slug}`;
  return readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => ({
      src: `/gallery/${slug}/${f}`,
      ...(existsSync(`${dir}/thumbs/${f}`) && { thumb: `/gallery/${slug}/thumbs/${f}` }),
    }));
}

const albums = [
  {
    id: "naathonatha",
    slug: "naathonatha",
    title: { en: "Naathonatha", ml: "നതോന്നത" },
    date: { en: "24th August, 2026", ml: "2026 ഓഗസ്റ്റ് 24" },
    moreUrl: "https://drive.google.com/drive/folders/1UZqbubUj97pjYiOa8UnIiwA5wT_-o7qI",
  },
  {
    id: "niranam-nelkinda-naakada",
    slug: "niranam-nelkinda-naakada",
    title: { en: "Niranam Nelkinda Naakada", ml: "നിരണം · നെൽക്കിണ്ട · നാക്കട" },
    date: { en: "18th July, 2026", ml: "2026 ജൂലൈ 18" },
  },
  {
    id: "thiruvallavaazhu",
    slug: "thiruvallavaazhu",
    title: { en: "Thiruvallavaazhu", ml: "തിരുവല്ലവാഴ്" },
    date: { en: "27th June, 2026", ml: "2026 ജൂൺ 27" },
  },
].map((a) => ({ ...a, photos: photos(a.slug) }));

const magazines = [
  {
    id: "insight-vol01-issue01",
    title: { en: "Insight", ml: "Insight" },
    edition: {
      en: "VOLUME 1 — July to September, 2026",
      ml: "വാല്യം 1 — ജൂലൈ മുതൽ സെപ്റ്റംബർ, 2026",
    },
    cover: "/magazines/insight-vol01-issue01-cover.jpg",
    purchaseUrl: "https://forms.gle/zEyktmM5cV8dkoXN8",
  },
];

const articleTitle = { en: "Article title", ml: "ലേഖനത്തിന്റെ തലക്കെട്ട്" };
const mediaHouse = { en: "Media house name", ml: "മാധ്യമ സ്ഥാപനത്തിന്റെ പേര്" };
const articles = [1, 2, 3].map((n) => ({
  id: `article-${n}`,
  title: articleTitle,
  source: mediaHouse,
}));

const portrait = process.env.SEED_PORTRAIT;
let image;
if (portrait) {
  const blob = await put("uploads/people/kaviyoor-ponnamma.jpg", readFileSync(portrait), {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
  image = blob.url;
  console.log("✓ portrait", image);
}

const people = [
  {
    id: "kaviyoor-ponnamma",
    slug: "kaviyoor-ponnamma",
    aliases: [],
    name: { en: "Kaviyoor Ponnamma", ml: "കവിയൂർ പൊന്നമ്മ" },
    years: "1945 – 2024",
    role: { en: "Actor", ml: "നടി" },
    bio: {
      en: `Kaviyoor Ponnamma was born on 10 September 1945 in Kaviyoor, near Thiruvalla, as the daughter of T. P. Damodharan and Gauri. She was an actress who acted in numerous Malayalam films and television serials. She began her career by acting in theatre dramas before foraying into cinema. _Mooladhanam, Puthiya Akasham Puthiya Bhoomi, Janani Janmabhoomi,_ and _Doctor_ were among her early films.

In a career spanning more than six decades, Kaviyoor Ponnamma acted in around 700 films. Her first film was 'Mariyakutty' in 1958 and her last film was 'Kannadi' in 2022. She has also acted in TV serials and commercials, and has sung playback in a few films.

She received the State Film Award for Second Best Actress in the years 1971, 1972, 1973 and 1994.`,
      ml: `കവിയൂർ പൊന്നമ്മ 1945 സെപ്റ്റംബർ 10-ന് തിരുവല്ലയ്ക്കടുത്തുള്ള കവിയൂരിൽ ടി. പി. ദാമോദരന്റെയും ഗൗരിയുടെയും മകളായി ജനിച്ചു. ഒട്ടേറെ മലയാള സിനിമകളിലും ടെലിവിഷനിലും അഭിനയിച്ച നടിയായിരുന്നു കവിയൂർ പൊന്നമ്മ. സിനിമയിലേക്ക് കടക്കുന്നതിന് മുമ്പ് നാടകങ്ങളിൽ അഭിനയിച്ചുകൊണ്ടാണ് അവർ തന്റെ കരിയർ ആരംഭിച്ചത്. മൂലധനം, പുതിയ ആകാശം പുതിയ ഭൂമി, ജനനി ജന്മഭൂമി, ഡോക്ടർ എന്നിവയാണ് ആദ്യകാല ചിത്രങ്ങൾ.

ആറ് പതിറ്റാണ്ടിലേറെ നീണ്ട തന്റെ കരിയറിൽ ഏകദേശം 700 സിനിമകളിൽ കവിയൂർ പൊന്നമ്മ അഭിനയിച്ചിട്ടുണ്ട്. 1958-ലെ 'മറിയക്കുട്ടി' ആയിരുന്നു ആദ്യ ചിത്രം, അവസാന ചിത്രം 2022-ലെ 'കണ്ണാടി' ആയിരുന്നു. ടിവി സീരിയലുകളിലും പരസ്യങ്ങളിലും അവർ അഭിനയിച്ചിട്ടുണ്ട്, കൂടാതെ ചില സിനിമകളിൽ പിന്നണി ഗാനങ്ങൾ ആലപിച്ചിട്ടുമുണ്ട്.

1971, 1972, 1973, 1994 വർഷങ്ങളിൽ മികച്ച രണ്ടാമത്തെ നടിക്കുള്ള സംസ്ഥാന ചലച്ചിത്ര അവാർഡ് അവർക്ക് ലഭിച്ചു.`,
    },
    ...(image && { image }),
    imageCredit: "Photo: Augustus Binu · CC BY-SA 3.0 · Wikimedia Commons",
    published: true,
    createdAt: now,
    updatedAt: now,
  },
];

await write("albums", albums);
await write("magazines", magazines);
await write("articles", articles);
await write("people", people);
