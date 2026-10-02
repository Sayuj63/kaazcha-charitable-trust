/** Site copy in English and Malayalam. `ml` is typed against `en`, so adding a
 *  key to one language without the other fails the type check. */

const en = {
  meta: {
    title:
      "Kaazcha Charitable Trust — Preserving Heritage. Inspiring Generations.",
  },
  nav: {
    links: {
      about: "About",
      heritage: "Heritage",
      blessy: "Blessy Speaks",
      news: "News & Media",
      contact: "Contact",
    },
    switchLanguage: "മലയാളം",
    switchLanguageLabel: "Switch to Malayalam",
    backToTop: "Kaazcha Charitable Trust — back to top",
    logoAlt: "Kaazcha Charitable Trust logo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    close: "Close",
    marquee: "Edition 5 — 'Sreevalli' · Kaazcha Charitable Trust collaborating with Kendra Sahithya Academy",
  },
  hero: {
    lines: [
      "Honoring the Past.",
      "Empowering the Present.",
      "Shaping the Future.",
    ],
  },
  about: {
    eyebrow: "Who we are",
    headline: "Kaazcha Charitable Trust",
    paragraphs: [
      "Kaazcha Charitable Trust is a charitable and cultural initiative committed to creating meaningful spaces for community, knowledge and cultural engagement.",
      "We believe that a society's strength lies not only in what it builds for the future, but also in how carefully it remembers and understands its past.",
      "Through cultural programmes, educational initiatives, community activities, seminars, conversations and documentation, Kaazcha seeks to bring people together around ideas that matter.",
      "Our work is rooted in the belief that heritage should not remain confined to history books or archives. It should remain alive, accessible and relevant to every generation.",
    ],
  },
  highlights: {
    eyebrow: "",
    titleBefore: "Three doors into one ",
    titleEmphasis: "living",
    titleAfter: " tradition",
    description:
      "Kaazcha is not a museum with glass cases. It is a working trust — gathering, teaching, documenting and celebrating the heritage of Keralam, every single day.",
    explore: "Explore",
    cards: {
      initiatives: {
        title: "Our Initiatives",
        teaser:
          "Discover the programmes and initiatives through which Kaazcha works towards social, cultural and educational enrichment.",
      },
      news: {
        title: "News & Media",
        teaser:
          "Stay connected with our latest events, programmes, stories and activities.",
      },
      join: {
        title: "Be Part of Kaazcha",
        teaser:
          "Join us in preserving the past, engaging with the present and creating possibilities for future generations.",
      },
    },
  },
  blessy: {
    imageAlt: "Blessy Ipe Thomas — Chairman, Kaazcha Charitable Trust",
    name: "Blessy Ipe Thomas",
    position: "Chairman",
    org: "Kaazcha Charitable Trust",
    eyebrow: "Blessy speaks",
    title: "Kaazcha",
    paragraphs: [
      "When the world journeys through the experiences of a new era and anchored by a shared vision of goodwill, profound yet subtle transformations often sweep through society. It is precisely in such a milieu that the relevance of Kaazcha shines forth.",
      "In an age of fading heritage, virtuous truths, and beautiful thoughts, where art and literature breathe life into a new existence, there arises a vital need to sustain the realization that human beings must stand by one another.",
      "Kaazcha Charitable Trust was forged as a common sanctuary, a space dedicated to embracing these timeless ideals, ushering marginalized lives into the mainstream, and uniting like-minded souls.",
      "In times when cultural erosion spreads through the social fabric far more insidiously than material poverty, Kaazcha stands firm as a harmonious confluence of sight, insight, and vision.",
    ],
  },
  news: {
    eyebrow: "",
    titleBefore: "Stories, Events & ",
    titleEmphasis: "Updates",
    titleAfter: " from Kaazcha",
    description:
      "Stay connected with the work of Kaazcha through our events, programmes, cultural conversations and community initiatives.",
    foldersHeading: "",
  },
  media: {
    eyebrow: "Newsletter & Media",
    backHome: "Back to home",
    foldersLabel: "Newsletter & Media folders",
    folders: {
      seminars: {
        label: "Seminars",
        copy: "Details of the seminars Kaazcha has conducted.",
      },
      magazines: {
        label: "Magazines",
        copy: "Every monthly edition of our magazine.",
      },
      newsletters: {
        label: "Newsletters",
        copy: "Links to digital news and articles about Kaazcha.",
      },
      library: {
        label: "Media Library",
        copy: "Photo galleries from our programmes.",
      },
    },
    itemCount: (n: number) => `${n} ${n === 1 ? "entry" : "entries"}`,
    more: "more",
    less: "less",
    download: "Reach us to purchase",
    read: "Click to read",
    viewGallery: "View image gallery",
    downloadSoon: "This edition will be available to download soon.",
    readSoon: "The link to this article will be added soon.",
    galleryEmpty: "Photographs from this programme will be added soon.",
    photoCount: (n: number) =>
      `${n} ${n === 1 ? "photograph" : "photographs"}`,
    photoAlt: (title: string, n: number) => `${title} — photograph ${n}`,
    closeGallery: "Close gallery",
    previousPhoto: "Previous photograph",
    nextPhoto: "Next photograph",
    allPhotos: "All photographs",
    close: "Close",
    previous: "Previous",
    next: "Next",
    grid: "All photos",
    viewAll: "See every photograph on Google Drive",
    moreFolders: "More from Newsletter & Media",
  },
  initiatives: {
    eyebrow: "What we do",
    titleBefore: "Our ",
    titleEmphasis: "Initiatives",
    titleAfter: "",
    backHome: "Back to home",
    tabsLabel: "Kaazcha initiatives",
    readMore: "Read more",
    showLess: "Show less",
    contentsHeading: "In this initiative",
  },
  contact: {
    eyebrow: "Contact us",
    title: "Let's Connect",
    intro:
      "Whether you would like to learn more about Kaazcha, collaborate with us, support an initiative, participate in a programme or simply share an idea—we would love to hear from you.",
    connectHeading: "Connect with us",
    orgName: "Kaazcha Charitable Trust",
    address: "[Official Address]",
    email: "Email: [Official Email]",
    phone: "Phone: [Official Phone Number]",
    followHeading: "Follow Kaazcha",
    socials: {
      instagram: "Instagram",
      facebook: "Facebook",
      youtube: "YouTube",
      other: "Other Social Channels",
    },
    formHeading: "Send us a message",
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      organisation: "Organisation / Institution",
      interest: "I am interested in",
      interestPlaceholder: "Choose a path",
      subject: "Subject",
      message: "Your Message",
    },
    /** Keys are the values stored in the database; keep them in English. */
    interests: {
      "General Enquiry": "General Enquiry",
      "Supporting Kaazcha": "Supporting Kaazcha",
      Volunteering: "Volunteering",
      "Partnership / Collaboration": "Partnership / Collaboration",
      "Cultural / Research Initiative": "Cultural / Research Initiative",
      "Event / Programme": "Event / Programme",
      "Media / Press": "Media / Press",
      Other: "Other",
    },
    sending: "Sending…",
    submit: "Submit Message",
    footnote: "We read every message and reply within a week.",
    successTitle: "Message received",
    successDescription:
      "Thank you for writing to us — the Kaazcha team will reply soon.",
    errorTitle: "Something went wrong",
    errorDescription: "Please try again in a moment.",
  },
  footer: {
    logoAlt: "Kaazcha Charitable Trust logo",
    backToTop: "Kaazcha Charitable Trust — back to top",
    blurb:
      "A cultural heritage and community initiative from Keralam — preserving heritage, inspiring generations, one story at a time.",
    quote:
      "“The past is not behind us. It lives in the stories we carry forward.”",
    exploreHeading: "Explore",
    explore: {
      about: "About Us",
      initiatives: "Our Initiatives",
      news: "News & Media",
      join: "Be Part of Kaazcha",
    },
    followHeading: "Follow",
    socials: {
      instagram: "Instagram",
      facebook: "Facebook",
      youtube: "YouTube",
      email: "Email",
    },
    writeToUs: "Write to us",
    copyright:
      "© 2026 Kaazcha Charitable Trust · Registered charitable trust, Keralam",
    crafted: "Crafted with care, in the land of the Pampa river",
  },
  notFound: {
    message: "Page Not Found",
  },
};

type Dictionary<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
      ? string[]
      : T[K] extends (...args: infer A) => string
        ? (...args: A) => string
        : Dictionary<T[K]>;
};

export type Translations = Dictionary<typeof en>;

const ml: Translations = {
  meta: {
    title:
      "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് — പൈതൃകം സംരക്ഷിക്കുന്നു. തലമുറകളെ പ്രചോദിപ്പിക്കുന്നു.",
  },
  nav: {
    links: {
      about: "ഞങ്ങളെക്കുറിച്ച്",
      heritage: "പൈതൃകം",
      blessy: "ബ്ലെസ്സി സംസാരിക്കുന്നു",
      news: "വാർത്തകളും മാധ്യമങ്ങളും",
      contact: "ബന്ധപ്പെടുക",
    },
    switchLanguage: "English",
    switchLanguageLabel: "ഇംഗ്ലീഷിലേക്ക് മാറുക",
    backToTop: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് — മുകളിലേക്ക് മടങ്ങുക",
    logoAlt: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് ലോഗോ",
    openMenu: "മെനു തുറക്കുക",
    closeMenu: "മെനു അടയ്ക്കുക",
    menu: "മെനു",
    close: "അടയ്ക്കുക",
    marquee: "ഏട് 5- 'ശ്രീവല്ലി', കേന്ദ്ര സാഹിത്യ അക്കാദമിയുമായി സഹകരിക്കുന്ന കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്.",
  },
  hero: {
    lines: [
      "ഭൂതകാലത്തെ ആദരിക്കുന്നു.",
      "വർത്തമാനത്തെ ശാക്തീകരിക്കുന്നു.",
      "ഭാവിയെ രൂപപ്പെടുത്തുന്നു.",
    ],
  },
  about: {
    eyebrow: "ഞങ്ങൾ ആരാണ്",
    headline: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്",
    paragraphs: [
      "സമൂഹത്തിനും അറിവിനും സാംസ്കാരിക ഇടപെടലിനുമായി അർത്ഥവത്തായ ഇടങ്ങൾ സൃഷ്ടിക്കാൻ പ്രതിജ്ഞാബദ്ധമായ ഒരു ജീവകാരുണ്യ-സാംസ്കാരിക സംരംഭമാണ് കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്.",
      "ഒരു സമൂഹത്തിന്റെ കരുത്ത് അത് ഭാവിക്കായി എന്ത് പടുത്തുയർത്തുന്നു എന്നതിൽ മാത്രമല്ല, തന്റെ ഭൂതകാലത്തെ എത്ര ശ്രദ്ധയോടെ ഓർക്കുകയും മനസ്സിലാക്കുകയും ചെയ്യുന്നു എന്നതിലും കൂടിയാണെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു.",
      "സാംസ്കാരിക പരിപാടികൾ, വിദ്യാഭ്യാസ സംരംഭങ്ങൾ, സാമൂഹിക പ്രവർത്തനങ്ങൾ, സെമിനാറുകൾ, സംവാദങ്ങൾ, ഡോക്യുമെന്റേഷൻ എന്നിവയിലൂടെ പ്രാധാന്യമുള്ള ആശയങ്ങൾക്ക് ചുറ്റും ആളുകളെ ഒന്നിപ്പിക്കാനാണ് കാഴ്ച ശ്രമിക്കുന്നത്.",
      "പൈതൃകം ചരിത്രപുസ്തകങ്ങളിലോ ആർക്കൈവുകളിലോ ഒതുങ്ങിനിൽക്കേണ്ടതല്ല എന്ന വിശ്വാസത്തിലാണ് ഞങ്ങളുടെ പ്രവർത്തനം വേരൂന്നിയിരിക്കുന്നത്. അത് ഓരോ തലമുറയ്ക്കും സജീവവും പ്രാപ്യവും പ്രസക്തവുമായി നിലനിൽക്കണം.",
    ],
  },
  highlights: {
    eyebrow: "",
    titleBefore: "",
    titleEmphasis: "ജീവിക്കുന്ന",
    titleAfter: " പാരമ്പര്യത്തിലേക്കുള്ള മൂന്ന് വാതിലുകൾ",
    description:
      "കാഴ്ച ചില്ലുകൂടുകളുള്ള ഒരു മ്യൂസിയമല്ല. കേരളത്തിന്റെ പൈതൃകം ഓരോ ദിവസവും ഒത്തുചേർന്നും പഠിപ്പിച്ചും രേഖപ്പെടുത്തിയും ആഘോഷിച്ചും പ്രവർത്തിക്കുന്ന ഒരു ട്രസ്റ്റാണ്.",
    explore: "കൂടുതൽ അറിയുക",
    cards: {
      initiatives: {
        title: "ഞങ്ങളുടെ സംരംഭങ്ങൾ",
        teaser:
          "സാമൂഹിക, സാംസ്കാരിക, വിദ്യാഭ്യാസ സമ്പുഷ്ടീകരണത്തിനായി കാഴ്ച നടത്തുന്ന പരിപാടികളും സംരംഭങ്ങളും കണ്ടെത്തുക.",
      },
      news: {
        title: "വാർത്തകളും മാധ്യമങ്ങളും",
        teaser:
          "ഞങ്ങളുടെ ഏറ്റവും പുതിയ പരിപാടികൾ, പ്രോഗ്രാമുകൾ, കഥകൾ, പ്രവർത്തനങ്ങൾ എന്നിവയുമായി ബന്ധം നിലനിർത്തുക.",
      },
      join: {
        title: "കാഴ്ചയുടെ ഭാഗമാകൂ",
        teaser:
          "ഭൂതകാലത്തെ സംരക്ഷിക്കാനും വർത്തമാനവുമായി ഇടപഴകാനും ഭാവി തലമുറകൾക്കായി സാധ്യതകൾ സൃഷ്ടിക്കാനും ഞങ്ങളോടൊപ്പം ചേരൂ.",
      },
    },
  },
  blessy: {
    imageAlt: "ബ്ലെസ്സി ഐപ്പ് തോമസ് — ചെയർമാൻ, കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്",
    name: "ബ്ലെസ്സി ഐപ്പ് തോമസ്",
    position: "ചെയർമാൻ",
    org: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്",
    eyebrow: "ബ്ലെസ്സി സംസാരിക്കുന്നു",
    title: "കാഴ്ച",
    paragraphs: [
      "ഒരു കൂട്ടം ആൾക്കാരുടെ നന്മനിറഞ്ഞ കാഴ്ചപ്പാടുകൾ ലോകം ഒരു പുതിയ കാലത്തിന്റെ അനുഭവങ്ങളിലൂടെ കടന്നു പോകുമ്പോൾ, അറിയാതെ സംഭവിക്കുന്ന വലിയ പരിണാമങ്ങൾ സമൂഹത്തിൽ ഉണ്ടാകുന്ന സാഹചര്യത്തിലാണ് കാഴ്ചയുടെ പ്രസക്തി.",
      "നഷ്ടപ്പെട്ടു കൊണ്ടിരിക്കുന്ന പൈതൃകം നന്മനിറഞ്ഞ ശരികൾ, സൗന്ദര്യം ഉള്ള ചിന്തകൾ, കലയും സാഹിത്യവും ശീതളമാകുന്ന പുതു ജീവിതം. ഒരാൾ മറ്റൊരാൾക്ക് കൂടെ ആവണമെന്നുള്ള ബോധ്യം നിലനിർത്തുക.",
      "ഇത്തരം ആശയങ്ങളെ ചേർത്തു പിടിക്കുകയും പാർശ്വവൽക്കരിക്കപ്പെട്ട ജീവിതങ്ങളെ മുഖ്യധാരയിൽ എത്തിക്കുന്നതിനും, സമാന ചിന്തകൾ ഒന്നു ചേരുന്നതിനുള്ള പൊതു ഇടമായി നിലനിൽക്കുന്നതിനുമാണ് കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് രൂപം കൊണ്ടത്.",
      "സാമ്പത്തിക ദാരിദ്ര്യത്തേക്കാൾ സാംസ്കാരിക ച്യുതികൾ സമൂഹത്തിൽ പടരുന്ന ഈ കാലത്ത് കാഴ്ചയും ഉൾക്കാഴ്ചയും കാഴ്ചപ്പാടുകളും സമന്വയിക്കുന്ന ഒരു ഇടമായി കാഴ്ച നിലനിൽക്കുന്നു.",
    ],
  },
  news: {
    eyebrow: "",
    titleBefore: "കാഴ്ചയിൽ നിന്നുള്ള കഥകളും പരിപാടികളും ",
    titleEmphasis: "പുതുവിശേഷങ്ങളും",
    titleAfter: "",
    description:
      "ഞങ്ങളുടെ പരിപാടികൾ, പ്രോഗ്രാമുകൾ, സാംസ്കാരിക സംവാദങ്ങൾ, സാമൂഹിക സംരംഭങ്ങൾ എന്നിവയിലൂടെ കാഴ്ചയുടെ പ്രവർത്തനങ്ങളുമായി ബന്ധം നിലനിർത്തുക.",
    foldersHeading: "",
  },
  media: {
    eyebrow: "വാർത്താക്കുറിപ്പുകളും മാധ്യമങ്ങളും",
    backHome: "ഹോം പേജിലേക്ക് മടങ്ങുക",
    foldersLabel: "വാർത്താക്കുറിപ്പുകളുടെയും മാധ്യമങ്ങളുടെയും ഫോൾഡറുകൾ",
    folders: {
      seminars: {
        label: "സെമിനാറുകൾ",
        copy: "കാഴ്ച ഇതുവരെ സംഘടിപ്പിച്ച സെമിനാറുകളുടെ വിശദാംശങ്ങൾ.",
      },
      magazines: {
        label: "മാസികകൾ",
        copy: "ഞങ്ങളുടെ മാസികയുടെ എല്ലാ പ്രതിമാസ പതിപ്പുകളും.",
      },
      newsletters: {
        label: "വാർത്താക്കുറിപ്പുകൾ",
        copy: "കാഴ്ചയെക്കുറിച്ചുള്ള ഡിജിറ്റൽ വാർത്തകളിലേക്കും ലേഖനങ്ങളിലേക്കുമുള്ള ലിങ്കുകൾ.",
      },
      library: {
        label: "മീഡിയ ലൈബ്രറി",
        copy: "ഞങ്ങളുടെ പരിപാടികളിൽ നിന്നുള്ള ഫോട്ടോ ഗാലറികൾ.",
      },
    },
    itemCount: (n: number) => `${n} എണ്ണം`,
    more: "കൂടുതൽ",
    less: "ചുരുക്കുക",
    download: "വാങ്ങാൻ ഞങ്ങളെ ബന്ധപ്പെടുക",
    read: "വായിക്കുക",
    viewGallery: "ചിത്രങ്ങൾ കാണുക",
    downloadSoon: "ഈ പതിപ്പ് ഉടൻ ഡൗൺലോഡിന് ലഭ്യമാകും.",
    readSoon: "ഈ ലേഖനത്തിലേക്കുള്ള ലിങ്ക് ഉടൻ ചേർക്കും.",
    galleryEmpty: "ഈ പരിപാടിയിൽ നിന്നുള്ള ചിത്രങ്ങൾ ഉടൻ ചേർക്കും.",
    photoCount: (n: number) => `${n} ചിത്രങ്ങൾ`,
    photoAlt: (title: string, n: number) => `${title} — ചിത്രം ${n}`,
    closeGallery: "ഗാലറി അടയ്ക്കുക",
    previousPhoto: "മുൻപത്തെ ചിത്രം",
    nextPhoto: "അടുത്ത ചിത്രം",
    allPhotos: "എല്ലാ ചിത്രങ്ങളും",
    close: "അടയ്ക്കുക",
    previous: "മുൻപത്തെ",
    next: "അടുത്തത്",
    grid: "എല്ലാ ചിത്രങ്ങളും",
    viewAll: "എല്ലാ ചിത്രങ്ങളും ഗൂഗിൾ ഡ്രൈവിൽ കാണുക",
    moreFolders: "വാർത്താക്കുറിപ്പുകളിലും മാധ്യമങ്ങളിലും കൂടുതൽ",
  },
  initiatives: {
    eyebrow: "ഞങ്ങൾ ചെയ്യുന്നത്",
    titleBefore: "ഞങ്ങളുടെ ",
    titleEmphasis: "സംരംഭങ്ങൾ",
    titleAfter: "",
    backHome: "ഹോം പേജിലേക്ക് മടങ്ങുക",
    tabsLabel: "കാഴ്ചയുടെ സംരംഭങ്ങൾ",
    readMore: "കൂടുതൽ വായിക്കുക",
    showLess: "ചുരുക്കുക",
    contentsHeading: "ഈ സംരംഭത്തിൽ",
  },
  contact: {
    eyebrow: "ഞങ്ങളെ ബന്ധപ്പെടുക",
    title: "നമുക്ക് ബന്ധപ്പെടാം",
    intro:
      "കാഴ്ചയെക്കുറിച്ച് കൂടുതൽ അറിയാനോ, ഞങ്ങളുമായി സഹകരിക്കാനോ, ഒരു സംരംഭത്തെ പിന്തുണയ്ക്കാനോ, ഒരു പരിപാടിയിൽ പങ്കെടുക്കാനോ, അല്ലെങ്കിൽ ഒരു ആശയം പങ്കുവെക്കാനോ ആഗ്രഹിക്കുന്നുവെങ്കിൽ — നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾക്ക് സന്തോഷമാണ്.",
    connectHeading: "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
    orgName: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ്",
    address: "[ഔദ്യോഗിക വിലാസം]",
    email: "ഇമെയിൽ: [ഔദ്യോഗിക ഇമെയിൽ]",
    phone: "ഫോൺ: [ഔദ്യോഗിക ഫോൺ നമ്പർ]",
    followHeading: "കാഴ്ചയെ പിന്തുടരുക",
    socials: {
      instagram: "ഇൻസ്റ്റാഗ്രാം",
      facebook: "ഫേസ്ബുക്ക്",
      youtube: "യൂട്യൂബ്",
      other: "മറ്റ് സോഷ്യൽ ചാനലുകൾ",
    },
    formHeading: "ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക",
    fields: {
      name: "മുഴുവൻ പേര്",
      email: "ഇമെയിൽ വിലാസം",
      phone: "ഫോൺ നമ്പർ",
      organisation: "സ്ഥാപനം / സംഘടന",
      interest: "എനിക്ക് താൽപ്പര്യമുള്ളത്",
      interestPlaceholder: "ഒരു വഴി തിരഞ്ഞെടുക്കുക",
      subject: "വിഷയം",
      message: "നിങ്ങളുടെ സന്ദേശം",
    },
    interests: {
      "General Enquiry": "പൊതുവായ അന്വേഷണം",
      "Supporting Kaazcha": "കാഴ്ചയെ പിന്തുണയ്ക്കൽ",
      Volunteering: "സന്നദ്ധ സേവനം",
      "Partnership / Collaboration": "പങ്കാളിത്തം / സഹകരണം",
      "Cultural / Research Initiative": "സാംസ്കാരിക / ഗവേഷണ സംരംഭം",
      "Event / Programme": "പരിപാടി / പ്രോഗ്രാം",
      "Media / Press": "മാധ്യമം / പ്രസ്സ്",
      Other: "മറ്റുള്ളവ",
    },
    sending: "അയയ്ക്കുന്നു…",
    submit: "സന്ദേശം അയയ്ക്കുക",
    footnote:
      "ഓരോ സന്ദേശവും ഞങ്ങൾ വായിക്കുകയും ഒരാഴ്ചയ്ക്കുള്ളിൽ മറുപടി നൽകുകയും ചെയ്യും.",
    successTitle: "സന്ദേശം ലഭിച്ചു",
    successDescription:
      "ഞങ്ങൾക്ക് എഴുതിയതിന് നന്ദി — കാഴ്ച ടീം ഉടൻ മറുപടി നൽകും.",
    errorTitle: "എന്തോ പിശക് സംഭവിച്ചു",
    errorDescription: "അൽപ്പസമയത്തിന് ശേഷം വീണ്ടും ശ്രമിക്കുക.",
  },
  footer: {
    logoAlt: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് ലോഗോ",
    backToTop: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് — മുകളിലേക്ക് മടങ്ങുക",
    blurb:
      "കേരളത്തിൽ നിന്നുള്ള ഒരു സാംസ്കാരിക പൈതൃക-സാമൂഹിക സംരംഭം — ഓരോ കഥയിലൂടെയും പൈതൃകം സംരക്ഷിച്ച്, തലമുറകളെ പ്രചോദിപ്പിച്ച്.",
    quote:
      "“ഭൂതകാലം നമുക്ക് പിന്നിലല്ല. നാം മുന്നോട്ട് കൊണ്ടുപോകുന്ന കഥകളിൽ അത് ജീവിക്കുന്നു.”",
    exploreHeading: "കണ്ടെത്തുക",
    explore: {
      about: "ഞങ്ങളെക്കുറിച്ച്",
      initiatives: "ഞങ്ങളുടെ സംരംഭങ്ങൾ",
      news: "വാർത്തകളും മാധ്യമങ്ങളും",
      join: "കാഴ്ചയുടെ ഭാഗമാകൂ",
    },
    followHeading: "പിന്തുടരുക",
    socials: {
      instagram: "ഇൻസ്റ്റാഗ്രാം",
      facebook: "ഫേസ്ബുക്ക്",
      youtube: "യൂട്യൂബ്",
      email: "ഇമെയിൽ",
    },
    writeToUs: "ഞങ്ങൾക്ക് എഴുതുക",
    copyright:
      "© 2026 കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് · രജിസ്റ്റർ ചെയ്ത ജീവകാരുണ്യ ട്രസ്റ്റ്, കേരളം",
    crafted: "പമ്പാനദിയുടെ നാട്ടിൽ, കരുതലോടെ ഒരുക്കിയത്",
  },
  notFound: {
    message: "പേജ് കണ്ടെത്താനായില്ല",
  },
};

export const translations = { en, ml } as const;
export type Language = keyof typeof translations;
