import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const CATALOG_SEED = [
  {
    slug: "niranam-rivers-memory",
    title: "Niranam: A River's Memory",
    category: "Publications",
    price: "₹650",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1000&q=80",
    tags: ["book", "history", "niranam", "pampa"],
    featured: true,
    description:
      "A richly illustrated monograph tracing two thousand years of faith, learning and daily life in the river towns of Niranam, Nelcynda and Nakkida — the fruit of Kaazcha's first decade of fieldwork.",
  },
  {
    slug: "voices-of-the-pampa",
    title: "Voices of the Pampa",
    category: "Publications",
    price: "₹450",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
    tags: ["book", "oral history", "interviews"],
    featured: false,
    description:
      "An anthology of oral histories gathered from elders along the Pampa — fishermen, farmers, weavers and cantors remembering the river that shaped everything they are.",
  },
  {
    slug: "palm-and-ink",
    title: "Palm & Ink: Manuscript Leaves of Keralam",
    category: "Publications",
    price: "₹380",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
    tags: ["book", "manuscripts", "palaeography"],
    featured: false,
    description:
      "A folio of palm-leaf manuscript leaves drawn from private and parish collections, with translations and notes on the scribes who wrote them — and the conservators who keep them.",
  },
  {
    slug: "kathatherapy-film",
    title: "Oru Desathinte Kathatherapy — The Film",
    category: "Films & Audio",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
    tags: ["film", "documentary", "storytelling"],
    featured: false,
    description:
      "The acclaimed documentary about a village therapist who heals through story, now available as a digital download with a director's commentary and the full interview transcripts.",
  },
  {
    slug: "songs-the-river-remembers",
    title: "Songs the River Remembers",
    category: "Films & Audio",
    price: "₹199",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80",
    tags: ["audio", "music", "folk songs"],
    featured: false,
    description:
      "A curated audio archive of vanishing folk songs from the Pampa basin — lullabies, boat songs and harvest ballads, restored and remastered with liner notes in Malayalam and English.",
  },
  {
    slug: "pampa-linen-throw",
    title: "Handwoven Pampa Linen Throw",
    category: "Crafts & Objects",
    price: "₹2,400",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    tags: ["craft", "textile", "handloom"],
    featured: false,
    description:
      "A linen throw woven on handlooms by the cooperative weavers Kaazcha supports, dyed with pomegranate and myrobalan. Each piece is slightly different — that is the point.",
  },
  {
    slug: "kuthuvilakku-lamp",
    title: "Brass Oil Lamp (Kuthuvilakku)",
    category: "Crafts & Objects",
    price: "₹1,850",
    image:
      "https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=1000&q=80",
    tags: ["craft", "brass", "lamp"],
    featured: true,
    description:
      "A traditional brass lamp, cast in the manner of temple workshops — the kind that lit the evening ceremonies of the old river towns. Comes with a small booklet on its making.",
  },
  {
    slug: "heritage-notebooks",
    title: "Kaazcha Heritage Notebook Set",
    category: "Crafts & Objects",
    price: "₹320",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    tags: ["stationery", "paper", "gift"],
    featured: false,
    description:
      "Three notebooks bound in handmade paper with block-printed motifs drawn from temple murals — a small way to carry heritage into the ordinary day.",
  },
  {
    slug: "river-towns-walk",
    title: "The River Towns Walk",
    category: "Experiences",
    price: "₹750",
    image:
      "https://images.unsplash.com/photo-1506773090264-ac0b07293a24?auto=format&fit=crop&w=1000&q=80",
    tags: ["tour", "heritage walk", "niranam"],
    featured: true,
    description:
      "A guided half-day walk through Niranam, Nelcynda and Nakkida — churches, sacred groves, markets and the stories that live between them. Groups of up to eight; morning departures.",
  },
  {
    slug: "manuscript-workshop",
    title: "Palm-Leaf Manuscript Workshop",
    category: "Experiences",
    price: "₹1,200",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    tags: ["workshop", "manuscripts", "learning"],
    featured: false,
    description:
      "A hands-on afternoon learning to incise palm leaves, mix natural inks and read a few simple characters — under the guidance of Kaazcha's conservators.",
  },
  {
    slug: "day-with-folk-artists",
    title: "A Day with the Folk Artists",
    category: "Experiences",
    price: "₹1,500",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1000&q=80",
    tags: ["experience", "folk art", "music"],
    featured: false,
    description:
      "Spend a day with Kaazcha's resident folk artists — songs, instruments, masks and stories — and leave with a piece of the tradition you helped keep alive.",
  },
  {
    slug: "friend-of-kaazcha",
    title: "Friend of Kaazcha — Annual",
    category: "Membership",
    price: "₹2,000 / year",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    tags: ["membership", "support"],
    featured: false,
    description:
      "Annual membership: the Kaazcha journal, early access to films and walks, invitations to the annual gathering — and the knowledge that an archive is being kept.",
  },
  {
    slug: "patron-of-the-archive",
    title: "Patron of the Archive",
    category: "Membership",
    price: "₹10,000 / year",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
    tags: ["membership", "patron"],
    featured: false,
    description:
      "For those who wish to underwrite the conservation of a manuscript, the restoration of a song, or the training of a young conservator. Your name is recorded in the archive itself.",
  },
];

/** All catalogue pieces, for browsing and searching. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("catalogItems").order("asc").collect();
  },
});

/** Idempotent seed — inserts any pieces whose slug is not yet present. */
export const seedCatalogIfEmpty = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("catalogItems").collect();
    const slugs = new Set(existing.map((item) => item.slug));
    for (const item of CATALOG_SEED) {
      if (!slugs.has(item.slug)) {
        await ctx.db.insert("catalogItems", item);
      }
    }
  },
});
