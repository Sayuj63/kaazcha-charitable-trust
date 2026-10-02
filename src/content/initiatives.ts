/** Content for the Our Initiatives page — one entry per sub-tab, in the order
 *  the trust supplied it (Website folder 1, 2 and 3). `ml` mirrors `en`
 *  section for section. */

import type { Language } from "@/i18n/translations";

export type InitiativeItem = {
  /** Optional sub-number shown before the title, e.g. "1.1". */
  code?: string;
  title: string;
  text: string;
};

export type InitiativeSection = {
  code: string;
  title: string;
  summary?: string;
  items: InitiativeItem[];
};

export type Initiative = {
  slug: string;
  /** Short label for the tab button. */
  tab: string;
  title: string;
  vision?: { label: string; text: string };
  /** Labels used when a section has both a summary and a list. */
  summaryLabel?: string;
  itemsLabel?: string;
  sections: InitiativeSection[];
};

export const INITIATIVE_SLUGS = [
  "history-heritage-culture",
  "child-centric-education",
  "senior-wellness",
] as const;

const en: Initiative[] = [
  {
    slug: INITIATIVE_SLUGS[0],
    tab: "History, Heritage & Culture",
    title: "History, Heritage & Culture",
    vision: {
      label: "Vision & Objective",
      text: "To rediscover, document, and revitalize the ancient, medieval, and modern history, cultural legacy, and heritage of Thiruvalla; transforming historical knowledge into engaging, accessible, and scientifically grounded narratives for the modern generation.",
    },
    sections: [
      {
        code: "1.1",
        title: "Centre for Thiruvalla Studies & Research (Research Wing)",
        summary:
          "A dedicated scholarly platform focusing on evidence-based historiography, field exploration, and critical historical analysis.",
        items: [
          {
            title: "Historiographical Re-interpretation",
            text: "In-depth research and critical re-examination of Thiruvalla's transition across the ancient, medieval, and colonial eras, synthesizing traditional historical narratives with contemporary historical methods.",
          },
          {
            title: "Field Surveys & Archaeological Evidence Gathering",
            text: "Systematic fieldwork, surface surveys, oral history documentation, and archaeological site investigations to identify forgotten relics, structural ruins, and cultural markers.",
          },
          {
            title: "Public History & Knowledge Sharing",
            text: "Publishing scholarly monographs, organizing academic seminars, and hosting community forums to bring regional history from academic confines into the public sphere.",
          },
        ],
      },
      {
        code: "1.2",
        title:
          "Archives & Digital Epigraphy Project (Preservation & Digitization)",
        summary:
          "Safeguarding fragile historical documents and epigraphical records using modern digital archiving technologies.",
        items: [
          {
            title: "Palm-Leaf Manuscript Conservation (Thaliyola)",
            text: "Locating, cleaning, cataloging, and scientifically preserving palm-leaf manuscripts held in private collections, ancestral homes (tharavads), and institutional archives, followed by high-resolution digitization.",
          },
          {
            title: "Epigraphical & Paleographical Studies",
            text: "Documenting, transcribing, and deciphering stone inscriptions and copper-plate grants (such as the historic Thiruvalla Copper Plates). Translating Vattezhuthu, Kolezhuthu, and Grantha scripts into modern Malayalam and English with analytical commentaries.",
          },
          {
            title: "Open-Access Digital Repository",
            text: "Building a searchable digital archive providing open access to digitized manuscripts, historical records, and research papers for scholars, students, and enthusiasts worldwide.",
          },
        ],
      },
      {
        code: "1.3",
        title: "Built Heritage & Monument Conservation",
        summary:
          "Fostering community stewardship and expert intervention to protect Thiruvalla's architectural landmarks and historical monuments.",
        items: [
          {
            title: "Architectural Mapping & 3D Documentation",
            text: "Comprehensive visual recording, spatial mapping, and structural profiling of ancient and medieval temples, churches, ancestral structures, and public monuments.",
          },
          {
            title: "Conservation Advisory & Advocacy Cell",
            text: "Working alongside local self-governments, temple/church committees, and property owners to provide conservation guidance that prevents unscientific renovations and structural destruction.",
          },
          {
            title: "Curated Heritage Trails & Educational Walks",
            text: "Conducting guided heritage walks for students, researchers, and travelers to instill historical awareness and civic pride in preserving regional monuments.",
          },
        ],
      },
      {
        code: "1.4",
        title: "Academy of Traditional & Ritual Arts",
        summary:
          "An educational and practical training institution committed to sustaining regional performing and ritual art forms.",
        items: [
          {
            title: "Traditional Kalari / Practical Training Center",
            text: "Rigorous, hands-on instruction in the vibrant indigenous art forms of Central Travancore—notably Padayani, Kathakali, Sopana Sangeetham, and traditional temple percussion (Chenda Melam).",
          },
          {
            title: "Innovative & Accredited Curricula",
            text: "Offering structured certificate and diploma courses that combine performance practice with the aesthetic, mythological, and sociopolitical history of ritual arts.",
          },
          {
            title: "Masterclasses & Artist Residencies",
            text: "Hosting immersive residential workshops where veteran artists and Asaans (traditional masters) pass down nuances, specialized knowledge, and mask/costume-crafting techniques to emerging practitioners.",
          },
        ],
      },
      {
        code: "1.5",
        title: "Living Heritage, Cultural Landscape & Youth Outreach",
        summary:
          "Documenting intangible traditions, festivals, and community celebrations while leveraging digital media to connect with youth.",
        items: [
          {
            title: "Festivals & Assembly Documentation",
            text: "Studying and recording the cultural dynamics of regional temple festivals, sacred Padayani kalams, Christian conventions, and multi-faith community celebrations.",
          },
          {
            title: "Audio-Visual Heritage Archive",
            text: "Recording and archiving oral literature, ritual chanting, traditional songs, and community folk rhythms that risk disappearing.",
          },
          {
            title: "Digital Outreach & Modern Media",
            text: "Translating Thiruvalla's cultural heritage into modern digital media formats—including documentary films, interactive web modules, podcasts, and social media storytelling—to ensure active engagement with the next generation.",
          },
        ],
      },
    ],
  },
  {
    slug: INITIATIVE_SLUGS[1],
    tab: "Child-Centric Heritage & Parallel Education",
    title: "Child-Centric Cultural Heritage & Parallel Education Initiatives",
    vision: {
      label: "Core Vision",
      text: "Empowering the younger generation by transforming regional history, indigenous traditions, and ancestral virtues into engaging learning experiences through parallel cinema, living history, and alternative educational methodologies.",
    },
    summaryLabel: "Focus",
    itemsLabel: "Key components",
    sections: [
      {
        code: "2.1",
        title: "Parallel Heritage Cinema & Children's Audio-Visual Pedagogy",
        summary:
          "Utilizing cinema as a vibrant parallel educational tool tailored specifically for children.",
        items: [
          {
            title: "Docu-Fiction & Thematic Short Films",
            text: "Developing engaging visual stories, animations, and docu-dramas that translate complex historical events and cultural ethos into child-friendly formats.",
          },
          {
            title: "School Screenings & Film Appreciation",
            text: "Organizing guided cinema viewings followed by interactive discussions, helping children critically analyze culture, aesthetics, and social themes.",
          },
          {
            title: "Children's Film Clubs",
            text: "Fostering community and school-based film clubs that encourage kids to review, discuss, and appreciate non-commercial, value-oriented cinema.",
          },
        ],
      },
      {
        code: "2.2",
        title: "Regional Heritage & Cultural Literacy for School Children",
        summary:
          "Deepening children's awareness of their geographical roots, local heritage, and regional identity.",
        items: [
          {
            title: '"Know Your Roots" Learning Modules',
            text: "Creating an engaging supplementary curriculum covering regional landmarks, monuments, rivers, and ecological traditions.",
          },
          {
            title: "Illustrated Heritage Compendiums",
            text: "Publishing pictorial books, graphic stories, and activity guides illustrating the history, folklore, and cultural transitions of the land.",
          },
          {
            title: "Heritage Quizzes & Interactive Learning",
            text: "Organizing school-level competitions, puzzles, and exhibitions centered around local history and heritage.",
          },
        ],
      },
      {
        code: "2.3",
        title: "Value Education, Ancestral Virtues & Community Ethos",
        summary:
          "Inculcating the ethical values, environmental harmony, and social solidarity practiced by past generations.",
        items: [
          {
            title: "Reviving Past Virtues",
            text: "Imparting values of mutual coexistence, empathy, community cooperation, and sustainable living from past agrarian and community lifestyles.",
          },
          {
            title: "Ethical Storytelling Sessions",
            text: "Exploring moral dilemmas, historical altruism, and timeless ethics through local legends and true historical narratives.",
          },
          {
            title: "Civic Consciousness & Social Responsibility",
            text: "Instilling civic sense, respect for diversity, and communal harmony in children through value-based interactive modules.",
          },
        ],
      },
      {
        code: "2.4",
        title: "Experiential Learning, Heritage Trails & Living History",
        summary:
          "Moving beyond classroom walls through hands-on exploration of heritage.",
        items: [
          {
            title: '"Little Historians" Heritage Walks',
            text: "Guided visits for students to historical monuments, ancient shrines, cultural centers, and ecological landscapes.",
          },
          {
            title: "Artisan & Crafts Engagement",
            text: "Live interactions and workshops with traditional bronze artisans, weavers, folk artists, and craftsmen to observe indigenous technology and skill.",
          },
          {
            title: "Material Culture & Artifact Discovery",
            text: "Interactive sessions introducing children to ancient epigraphy, palm-leaf manuscripts, and historical artifacts.",
          },
        ],
      },
      {
        code: "2.5",
        title:
          'Child-Led Oral History & Intergenerational Dialogue ("Grandparent Circles")',
        summary:
          "Connecting children directly with the elder generation to ensure uninterrupted cultural transmission.",
        items: [
          {
            title: "Oral History Documentation by Kids",
            text: "Training school students to interview grandparents, village elders, and tradition-bearers using basic audio-visual tools.",
          },
          {
            title: "Living Memory Archives",
            text: "Curating scrapbooks, voice recordings, and photo narratives gathered by children on forgotten folklore, traditional recipes, and local lore.",
          },
          {
            title: "Storytelling & Exchange Circles",
            text: "Regular community storytelling gatherings where elders share lived historical memories directly with young audiences.",
          },
        ],
      },
      {
        code: "2.6",
        title:
          "Creative Cultural Expressions, Children's Theater & Folk Arts",
        summary:
          "Encouraging children to internalize and express history and culture through active artistic mediums.",
        items: [
          {
            title: "Children's Historical Theater & Street Plays",
            text: "Writing and staging plays based on regional history, cultural milestones, and environmental stewardship.",
          },
          {
            title: "Folk Art, Puppetry & Music Workshops",
            text: "Hands-on exposure to traditional performing arts, indigenous musical instruments, and traditional games of bygone days.",
          },
          {
            title: "Creative Visual Expression",
            text: 'Art, painting, and creative writing camps themed around "My Village / My Heritage as Seen by Me."',
          },
        ],
      },
      {
        code: "2.7",
        title:
          "Digital Media, Interactive Learning & Child-Centric Storytelling",
        summary:
          "Engaging the digital-native generation through modern technological platforms.",
        items: [
          {
            title: "Digital Storytelling & Podcasts",
            text: "Audio series and mini-podcasts narrated by or created for children covering regional folk tales and historical events.",
          },
          {
            title: "Child-Friendly Digital Repositories",
            text: "An accessible online archive of historical photos, animated maps, and videos designed for school projects and self-paced learning.",
          },
          {
            title: "Gamified Cultural Learning",
            text: "Interactive digital games, interactive maps, and virtual tours that make discovering local heritage engaging and fun.",
          },
        ],
      },
    ],
  },
  {
    slug: INITIATIVE_SLUGS[2],
    tab: "Senior Wellness & Era Recreation",
    title: "Comprehensive Senior Wellness & Era Recreation Program",
    sections: [
      {
        code: "1",
        title: "Health, Fitness & Lifestyle Care",
        items: [
          {
            code: "1.1",
            title: "Target Fitness Routines",
            text: "Guided yoga for flexibility and stress relief, low-impact Zumba, and structured walking clubs.",
          },
          {
            code: "1.2",
            title: "Disease Prevention & Screening",
            text: "Health awareness workshops and periodic check-ups (blood pressure, blood sugar, and BMI tracking).",
          },
          {
            code: "1.3",
            title: "Nutrition & Hydration",
            text: "Tailored dietary guidelines focusing on whole foods, local nutritious grains, and proper hydration.",
          },
        ],
      },
      {
        code: "2",
        title: "Implementation Platforms & Digital Tools",
        items: [
          {
            code: "2.1",
            title: "Physical & Community Spaces",
            text: "Local college halls, community centers, and cultural heritage trusts for hosting live events.",
          },
          {
            code: "2.2",
            title: "Tracking & Virtual Tools",
            text: "Health apps (Google Fit, Apple Health) for physical routines, and Zoom or Google Meet for hybrid connections.",
          },
        ],
      },
      {
        code: "3",
        title:
          "Era Recreation, Nostalgic Entertainment & Intergenerational Integration",
        items: [
          {
            code: "3.1",
            title: "Intergenerational Knowledge Transfer",
            text: "Dedicated storytelling circles and interactive forums where elders pass down their life experiences, historical insights, and traditional values directly to the younger generation.",
          },
          {
            code: "3.2",
            title: "Golden Era Arts (Songs, Drama & Cinema)",
            text: "Dedicated spaces and cultural programs celebrating the classic music, theatrical dramas, and vintage cinema that defined their youth, allowing them to relive those artistic expressions.",
          },
          {
            code: "3.3",
            title: "College Days Recreation",
            text: "Immersive nostalgic events designed specifically to recreate the vibrant atmosphere, campus culture, friendships, and youthful energy of their college years.",
          },
          {
            code: "3.4",
            title: "Traditional Exhibitions & Leisure Activities",
            text: "Vintage photo galleries, historical displays of their era, and classic indoor or outdoor games to foster cognitive stimulation, joy, and social bonding.",
          },
        ],
      },
    ],
  },
];

const ml: Initiative[] = [
  {
    slug: INITIATIVE_SLUGS[0],
    tab: "ചരിത്രം, പൈതൃകം, സംസ്കാരം",
    title: "ചരിത്രം, പൈതൃകം, സംസ്കാരം",
    vision: {
      label: "ദർശനവും ലക്ഷ്യവും",
      text: "തിരുവല്ലയുടെ പ്രാചീന, മധ്യകാല, ആധുനിക ചരിത്രവും സാംസ്കാരിക പാരമ്പര്യവും പൈതൃകവും വീണ്ടെടുക്കുകയും രേഖപ്പെടുത്തുകയും പുനരുജ്ജീവിപ്പിക്കുകയും ചെയ്യുക; ചരിത്രജ്ഞാനത്തെ പുതുതലമുറയ്ക്കായി ആകർഷകവും പ്രാപ്യവും ശാസ്ത്രീയ അടിത്തറയുള്ളതുമായ ആഖ്യാനങ്ങളാക്കി മാറ്റുക.",
    },
    sections: [
      {
        code: "1.1",
        title: "തിരുവല്ല പഠന-ഗവേഷണ കേന്ദ്രം (ഗവേഷണ വിഭാഗം)",
        summary:
          "തെളിവുകളെ ആധാരമാക്കിയ ചരിത്രരചന, ഫീൽഡ് പര്യവേക്ഷണം, വിമർശനാത്മക ചരിത്രവിശകലനം എന്നിവയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന ഒരു സമർപ്പിത പണ്ഡിതവേദി.",
        items: [
          {
            title: "ചരിത്രരചനയുടെ പുനർവ്യാഖ്യാനം",
            text: "പ്രാചീന, മധ്യകാല, കൊളോണിയൽ കാലഘട്ടങ്ങളിലൂടെയുള്ള തിരുവല്ലയുടെ പരിണാമത്തെക്കുറിച്ചുള്ള ആഴത്തിലുള്ള ഗവേഷണവും വിമർശനാത്മക പുനഃപരിശോധനയും; പരമ്പരാഗത ചരിത്രാഖ്യാനങ്ങളെ സമകാലിക ചരിത്രപഠന രീതികളുമായി സമന്വയിപ്പിക്കുന്നു.",
          },
          {
            title: "ഫീൽഡ് സർവേകളും പുരാവസ്തു തെളിവുശേഖരണവും",
            text: "വിസ്മൃതമായ ശേഷിപ്പുകൾ, നിർമ്മിതികളുടെ അവശിഷ്ടങ്ങൾ, സാംസ്കാരിക അടയാളങ്ങൾ എന്നിവ കണ്ടെത്താൻ ആസൂത്രിതമായ ഫീൽഡ് പ്രവർത്തനങ്ങൾ, ഉപരിതല സർവേകൾ, വാമൊഴി ചരിത്ര രേഖപ്പെടുത്തൽ, പുരാവസ്തു കേന്ദ്രങ്ങളിലെ അന്വേഷണങ്ങൾ.",
          },
          {
            title: "പൊതുചരിത്രവും അറിവുപങ്കിടലും",
            text: "പ്രാദേശിക ചരിത്രത്തെ അക്കാദമിക അതിരുകളിൽ നിന്ന് പൊതുമണ്ഡലത്തിലേക്ക് എത്തിക്കാൻ പണ്ഡിത മോണോഗ്രാഫുകൾ പ്രസിദ്ധീകരിക്കുക, അക്കാദമിക് സെമിനാറുകൾ സംഘടിപ്പിക്കുക, സാമൂഹിക കൂട്ടായ്മകൾ നടത്തുക.",
          },
        ],
      },
      {
        code: "1.2",
        title:
          "ആർക്കൈവ്സ് & ഡിജിറ്റൽ ലിഖിതപഠന പദ്ധതി (സംരക്ഷണവും ഡിജിറ്റൈസേഷനും)",
        summary:
          "ആധുനിക ഡിജിറ്റൽ ആർക്കൈവിംഗ് സാങ്കേതികവിദ്യകൾ ഉപയോഗിച്ച് ദുർബലമായ ചരിത്രരേഖകളെയും ലിഖിതരേഖകളെയും സംരക്ഷിക്കുന്നു.",
        items: [
          {
            title: "താളിയോല ഗ്രന്ഥ സംരക്ഷണം",
            text: "സ്വകാര്യ ശേഖരങ്ങളിലും തറവാടുകളിലും സ്ഥാപന ആർക്കൈവുകളിലും സൂക്ഷിച്ചിരിക്കുന്ന താളിയോല ഗ്രന്ഥങ്ങൾ കണ്ടെത്തി, വൃത്തിയാക്കി, പട്ടികപ്പെടുത്തി, ശാസ്ത്രീയമായി സംരക്ഷിക്കുകയും തുടർന്ന് ഉയർന്ന റെസല്യൂഷനിൽ ഡിജിറ്റൈസ് ചെയ്യുകയും ചെയ്യുന്നു.",
          },
          {
            title: "ലിഖിത-ലിപി പഠനങ്ങൾ",
            text: "ശിലാലിഖിതങ്ങളും ചെപ്പേടുകളും (ചരിത്രപ്രസിദ്ധമായ തിരുവല്ല ചെപ്പേടുകൾ പോലുള്ളവ) രേഖപ്പെടുത്തുകയും പകർത്തിയെഴുതുകയും വായിച്ചെടുക്കുകയും ചെയ്യുന്നു. വട്ടെഴുത്ത്, കോലെഴുത്ത്, ഗ്രന്ഥലിപി എന്നിവയെ വിശകലനാത്മക വ്യാഖ്യാനങ്ങളോടെ ആധുനിക മലയാളത്തിലേക്കും ഇംഗ്ലീഷിലേക്കും വിവർത്തനം ചെയ്യുന്നു.",
          },
          {
            title: "ഓപ്പൺ-ആക്സസ് ഡിജിറ്റൽ ശേഖരം",
            text: "ലോകമെമ്പാടുമുള്ള പണ്ഡിതർക്കും വിദ്യാർത്ഥികൾക്കും താൽപ്പര്യമുള്ളവർക്കും ഡിജിറ്റൈസ് ചെയ്ത ഗ്രന്ഥങ്ങളും ചരിത്രരേഖകളും ഗവേഷണ പ്രബന്ധങ്ങളും സൗജന്യമായി ലഭ്യമാക്കുന്ന, തിരയാവുന്ന ഒരു ഡിജിറ്റൽ ആർക്കൈവ് നിർമ്മിക്കുന്നു.",
          },
        ],
      },
      {
        code: "1.3",
        title: "നിർമ്മിത പൈതൃകവും സ്മാരക സംരക്ഷണവും",
        summary:
          "തിരുവല്ലയുടെ വാസ്തുവിദ്യാ അടയാളങ്ങളെയും ചരിത്രസ്മാരകങ്ങളെയും സംരക്ഷിക്കാൻ സാമൂഹിക കാര്യസ്ഥതയും വിദഗ്ധ ഇടപെടലും വളർത്തുന്നു.",
        items: [
          {
            title: "വാസ്തുവിദ്യാ മാപ്പിംഗും 3D ഡോക്യുമെന്റേഷനും",
            text: "പ്രാചീന-മധ്യകാല ക്ഷേത്രങ്ങൾ, പള്ളികൾ, തറവാട് നിർമ്മിതികൾ, പൊതുസ്മാരകങ്ങൾ എന്നിവയുടെ സമഗ്രമായ ദൃശ്യരേഖപ്പെടുത്തൽ, സ്ഥലപരമായ മാപ്പിംഗ്, ഘടനാപരമായ രൂപരേഖ തയ്യാറാക്കൽ.",
          },
          {
            title: "സംരക്ഷണ ഉപദേശക-പ്രചാരണ സെൽ",
            text: "അശാസ്ത്രീയമായ നവീകരണങ്ങളും ഘടനാപരമായ നാശവും തടയുന്ന സംരക്ഷണ മാർഗ്ഗനിർദ്ദേശങ്ങൾ നൽകാൻ തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ, ക്ഷേത്ര/പള്ളി കമ്മിറ്റികൾ, ഉടമസ്ഥർ എന്നിവരോടൊപ്പം പ്രവർത്തിക്കുന്നു.",
          },
          {
            title: "പൈതൃക പാതകളും പഠനയാത്രകളും",
            text: "പ്രാദേശിക സ്മാരകങ്ങൾ സംരക്ഷിക്കുന്നതിൽ ചരിത്രബോധവും പൗരാഭിമാനവും വളർത്താൻ വിദ്യാർത്ഥികൾക്കും ഗവേഷകർക്കും സഞ്ചാരികൾക്കുമായി മാർഗ്ഗനിർദ്ദേശത്തോടെയുള്ള പൈതൃക നടത്തങ്ങൾ സംഘടിപ്പിക്കുന്നു.",
          },
        ],
      },
      {
        code: "1.4",
        title: "പാരമ്പര്യ-അനുഷ്ഠാന കലകളുടെ അക്കാദമി",
        summary:
          "പ്രാദേശിക അവതരണ-അനുഷ്ഠാന കലാരൂപങ്ങളെ നിലനിർത്താൻ പ്രതിജ്ഞാബദ്ധമായ ഒരു വിദ്യാഭ്യാസ-പ്രായോഗിക പരിശീലന സ്ഥാപനം.",
        items: [
          {
            title: "പരമ്പരാഗത കളരി / പ്രായോഗിക പരിശീലന കേന്ദ്രം",
            text: "മധ്യതിരുവിതാംകൂറിന്റെ സജീവമായ തനത് കലാരൂപങ്ങളിൽ — പ്രത്യേകിച്ച് പടയണി, കഥകളി, സോപാന സംഗീതം, പരമ്പരാഗത ക്ഷേത്രവാദ്യം (ചെണ്ടമേളം) എന്നിവയിൽ — കഠിനവും പ്രായോഗികവുമായ പരിശീലനം.",
          },
          {
            title: "നൂതനവും അംഗീകൃതവുമായ പാഠ്യപദ്ധതികൾ",
            text: "അവതരണ പരിശീലനത്തെ അനുഷ്ഠാന കലകളുടെ സൗന്ദര്യശാസ്ത്രപരവും പുരാണപരവും സാമൂഹിക-രാഷ്ട്രീയവുമായ ചരിത്രവുമായി സംയോജിപ്പിക്കുന്ന ചിട്ടയായ സർട്ടിഫിക്കറ്റ്, ഡിപ്ലോമ കോഴ്സുകൾ.",
          },
          {
            title: "മാസ്റ്റർക്ലാസുകളും കലാകാര റെസിഡൻസികളും",
            text: "മുതിർന്ന കലാകാരന്മാരും ആശാന്മാരും തങ്ങളുടെ സൂക്ഷ്മതകളും സവിശേഷ അറിവുകളും മുഖംമൂടി/വേഷ നിർമ്മാണ വിദ്യകളും വളർന്നുവരുന്ന കലാകാരന്മാർക്ക് പകർന്നുനൽകുന്ന താമസിച്ചുള്ള ശില്പശാലകൾ.",
          },
        ],
      },
      {
        code: "1.5",
        title: "ജീവിക്കുന്ന പൈതൃകം, സാംസ്കാരിക ഭൂദൃശ്യം, യുവജന സമ്പർക്കം",
        summary:
          "ഡിജിറ്റൽ മാധ്യമങ്ങളിലൂടെ യുവതലമുറയുമായി ബന്ധം സ്ഥാപിക്കുന്നതോടൊപ്പം അദൃശ്യ പാരമ്പര്യങ്ങളും ഉത്സവങ്ങളും സാമൂഹിക ആഘോഷങ്ങളും രേഖപ്പെടുത്തുന്നു.",
        items: [
          {
            title: "ഉത്സവങ്ങളുടെയും കൂട്ടായ്മകളുടെയും രേഖപ്പെടുത്തൽ",
            text: "പ്രാദേശിക ക്ഷേത്രോത്സവങ്ങൾ, പവിത്രമായ പടയണിക്കളങ്ങൾ, ക്രൈസ്തവ കൺവെൻഷനുകൾ, മതസൗഹാർദ്ദ സാമൂഹിക ആഘോഷങ്ങൾ എന്നിവയുടെ സാംസ്കാരിക ചലനാത്മകത പഠിക്കുകയും രേഖപ്പെടുത്തുകയും ചെയ്യുന്നു.",
          },
          {
            title: "ദൃശ്യ-ശ്രാവ്യ പൈതൃക ആർക്കൈവ്",
            text: "അന്യംനിന്നുപോകാൻ സാധ്യതയുള്ള വാമൊഴി സാഹിത്യം, അനുഷ്ഠാന മന്ത്രോച്ചാരണങ്ങൾ, പരമ്പരാഗത ഗാനങ്ങൾ, നാടൻ താളങ്ങൾ എന്നിവ റെക്കോർഡ് ചെയ്ത് ആർക്കൈവ് ചെയ്യുന്നു.",
          },
          {
            title: "ഡിജിറ്റൽ സമ്പർക്കവും ആധുനിക മാധ്യമങ്ങളും",
            text: "അടുത്ത തലമുറയുടെ സജീവ പങ്കാളിത്തം ഉറപ്പാക്കാൻ തിരുവല്ലയുടെ സാംസ്കാരിക പൈതൃകത്തെ ഡോക്യുമെന്ററി സിനിമകൾ, ഇന്ററാക്ടീവ് വെബ് മൊഡ്യൂളുകൾ, പോഡ്കാസ്റ്റുകൾ, സോഷ്യൽ മീഡിയ കഥപറച്ചിൽ തുടങ്ങിയ ആധുനിക ഡിജിറ്റൽ രൂപങ്ങളിലേക്ക് മാറ്റുന്നു.",
          },
        ],
      },
    ],
  },
  {
    slug: INITIATIVE_SLUGS[1],
    tab: "കുട്ടികൾക്കായുള്ള പൈതൃക-സമാന്തര വിദ്യാഭ്യാസം",
    title:
      "കുട്ടികളെ കേന്ദ്രീകരിച്ചുള്ള സാംസ്കാരിക പൈതൃക-സമാന്തര വിദ്യാഭ്യാസ സംരംഭങ്ങൾ",
    vision: {
      label: "അടിസ്ഥാന ദർശനം",
      text: "പ്രാദേശിക ചരിത്രത്തെയും തനത് പാരമ്പര്യങ്ങളെയും പൂർവ്വിക മൂല്യങ്ങളെയും സമാന്തര സിനിമ, ജീവിക്കുന്ന ചരിത്രം, ബദൽ വിദ്യാഭ്യാസ രീതികൾ എന്നിവയിലൂടെ ആകർഷകമായ പഠനാനുഭവങ്ങളാക്കി മാറ്റി യുവതലമുറയെ ശാക്തീകരിക്കുന്നു.",
    },
    summaryLabel: "ലക്ഷ്യം",
    itemsLabel: "പ്രധാന ഘടകങ്ങൾ",
    sections: [
      {
        code: "2.1",
        title:
          "സമാന്തര പൈതൃക സിനിമയും കുട്ടികൾക്കായുള്ള ദൃശ്യ-ശ്രാവ്യ ബോധനരീതിയും",
        summary:
          "കുട്ടികൾക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത സജീവമായ ഒരു സമാന്തര വിദ്യാഭ്യാസ ഉപാധിയായി സിനിമയെ ഉപയോഗിക്കുന്നു.",
        items: [
          {
            title: "ഡോക്യു-ഫിക്ഷനും പ്രമേയാധിഷ്ഠിത ഹ്രസ്വചിത്രങ്ങളും",
            text: "സങ്കീർണ്ണമായ ചരിത്രസംഭവങ്ങളെയും സാംസ്കാരിക മൂല്യങ്ങളെയും കുട്ടികൾക്ക് ഇണങ്ങുന്ന രൂപങ്ങളിലേക്ക് മാറ്റുന്ന ആകർഷകമായ ദൃശ്യകഥകൾ, ആനിമേഷനുകൾ, ഡോക്യു-ഡ്രാമകൾ എന്നിവ തയ്യാറാക്കുന്നു.",
          },
          {
            title: "സ്കൂൾ പ്രദർശനങ്ങളും ചലച്ചിത്രാസ്വാദനവും",
            text: "സംസ്കാരം, സൗന്ദര്യശാസ്ത്രം, സാമൂഹിക പ്രമേയങ്ങൾ എന്നിവ വിമർശനാത്മകമായി വിശകലനം ചെയ്യാൻ കുട്ടികളെ സഹായിക്കുന്ന, സംവാദങ്ങളോടു കൂടിയ മാർഗ്ഗനിർദ്ദേശിത ചലച്ചിത്ര പ്രദർശനങ്ങൾ സംഘടിപ്പിക്കുന്നു.",
          },
          {
            title: "കുട്ടികളുടെ ഫിലിം ക്ലബ്ബുകൾ",
            text: "വാണിജ്യേതരവും മൂല്യാധിഷ്ഠിതവുമായ സിനിമകൾ വിലയിരുത്താനും ചർച്ച ചെയ്യാനും ആസ്വദിക്കാനും കുട്ടികളെ പ്രോത്സാഹിപ്പിക്കുന്ന സമൂഹ-സ്കൂൾ തല ഫിലിം ക്ലബ്ബുകൾ വളർത്തുന്നു.",
          },
        ],
      },
      {
        code: "2.2",
        title: "സ്കൂൾ കുട്ടികൾക്കായുള്ള പ്രാദേശിക പൈതൃക-സാംസ്കാരിക സാക്ഷരത",
        summary:
          "കുട്ടികളിൽ തങ്ങളുടെ ഭൂമിശാസ്ത്രപരമായ വേരുകളെയും പ്രാദേശിക പൈതൃകത്തെയും പ്രാദേശിക സ്വത്വത്തെയും കുറിച്ചുള്ള അവബോധം ആഴപ്പെടുത്തുന്നു.",
        items: [
          {
            title: "'നിന്റെ വേരുകൾ അറിയുക' പഠന മൊഡ്യൂളുകൾ",
            text: "പ്രാദേശിക അടയാളങ്ങൾ, സ്മാരകങ്ങൾ, നദികൾ, പാരിസ്ഥിതിക പാരമ്പര്യങ്ങൾ എന്നിവ ഉൾക്കൊള്ളുന്ന ആകർഷകമായ ഒരു അനുബന്ധ പാഠ്യപദ്ധതി തയ്യാറാക്കുന്നു.",
          },
          {
            title: "ചിത്രീകരിച്ച പൈതൃക സമാഹാരങ്ങൾ",
            text: "നാടിന്റെ ചരിത്രവും നാട്ടറിവുകളും സാംസ്കാരിക പരിവർത്തനങ്ങളും ചിത്രീകരിക്കുന്ന ചിത്രപുസ്തകങ്ങൾ, ഗ്രാഫിക് കഥകൾ, പ്രവർത്തന സഹായികൾ എന്നിവ പ്രസിദ്ധീകരിക്കുന്നു.",
          },
          {
            title: "പൈതൃക ക്വിസുകളും സംവേദനാത്മക പഠനവും",
            text: "പ്രാദേശിക ചരിത്രത്തെയും പൈതൃകത്തെയും കേന്ദ്രീകരിച്ച് സ്കൂൾതല മത്സരങ്ങൾ, പദപ്രശ്നങ്ങൾ, പ്രദർശനങ്ങൾ എന്നിവ സംഘടിപ്പിക്കുന്നു.",
          },
        ],
      },
      {
        code: "2.3",
        title: "മൂല്യവിദ്യാഭ്യാസം, പൂർവ്വിക സദ്ഗുണങ്ങൾ, സാമൂഹിക മൂല്യബോധം",
        summary:
          "മുൻതലമുറകൾ പിന്തുടർന്ന ധാർമ്മിക മൂല്യങ്ങളും പാരിസ്ഥിതിക ഐക്യവും സാമൂഹിക ഐക്യദാർഢ്യവും കുട്ടികളിൽ വളർത്തുന്നു.",
        items: [
          {
            title: "പഴയ സദ്ഗുണങ്ങളുടെ പുനരുജ്ജീവനം",
            text: "പഴയ കാർഷിക-സാമൂഹിക ജീവിതരീതികളിൽ നിന്നുള്ള പരസ്പര സഹവർത്തിത്വം, സഹാനുഭൂതി, സാമൂഹിക സഹകരണം, സുസ്ഥിര ജീവിതം എന്നീ മൂല്യങ്ങൾ പകർന്നുനൽകുന്നു.",
          },
          {
            title: "ധാർമ്മിക കഥപറച്ചിൽ സെഷനുകൾ",
            text: "പ്രാദേശിക ഐതിഹ്യങ്ങളിലൂടെയും യഥാർത്ഥ ചരിത്രാഖ്യാനങ്ങളിലൂടെയും ധാർമ്മിക സന്ദിഗ്ധതകൾ, ചരിത്രത്തിലെ പരോപകാരം, കാലാതീതമായ ധാർമ്മികത എന്നിവ അന്വേഷിക്കുന്നു.",
          },
          {
            title: "പൗരബോധവും സാമൂഹിക ഉത്തരവാദിത്തവും",
            text: "മൂല്യാധിഷ്ഠിത സംവേദനാത്മക മൊഡ്യൂളുകളിലൂടെ കുട്ടികളിൽ പൗരബോധം, വൈവിധ്യത്തോടുള്ള ആദരവ്, സാമുദായിക സൗഹാർദ്ദം എന്നിവ വളർത്തുന്നു.",
          },
        ],
      },
      {
        code: "2.4",
        title: "അനുഭവപഠനം, പൈതൃക പാതകൾ, ജീവിക്കുന്ന ചരിത്രം",
        summary:
          "പൈതൃകത്തിന്റെ പ്രായോഗിക പര്യവേക്ഷണത്തിലൂടെ ക്ലാസ്മുറിയുടെ ചുവരുകൾക്കപ്പുറത്തേക്ക്.",
        items: [
          {
            title: "'കുഞ്ഞു ചരിത്രകാരന്മാർ' പൈതൃക നടത്തങ്ങൾ",
            text: "ചരിത്രസ്മാരകങ്ങൾ, പുരാതന ആരാധനാലയങ്ങൾ, സാംസ്കാരിക കേന്ദ്രങ്ങൾ, പാരിസ്ഥിതിക ഭൂപ്രദേശങ്ങൾ എന്നിവിടങ്ങളിലേക്ക് വിദ്യാർത്ഥികൾക്കായി മാർഗ്ഗനിർദ്ദേശത്തോടെയുള്ള സന്ദർശനങ്ങൾ.",
          },
          {
            title: "കരകൗശല വിദഗ്ധരുമായുള്ള ഇടപഴകൽ",
            text: "തനത് സാങ്കേതികവിദ്യയും വൈദഗ്ധ്യവും നേരിട്ട് കണ്ടറിയാൻ പരമ്പരാഗത ഓട്ടുപാത്ര ശില്പികൾ, നെയ്ത്തുകാർ, നാടൻ കലാകാരന്മാർ, കരകൗശല വിദഗ്ധർ എന്നിവരുമായി നേരിട്ടുള്ള സംവാദങ്ങളും ശില്പശാലകളും.",
          },
          {
            title: "ഭൗതിക സംസ്കാരവും പുരാവസ്തു കണ്ടെത്തലും",
            text: "പുരാതന ലിഖിതങ്ങൾ, താളിയോല ഗ്രന്ഥങ്ങൾ, ചരിത്രപ്രധാനമായ പുരാവസ്തുക്കൾ എന്നിവ കുട്ടികൾക്ക് പരിചയപ്പെടുത്തുന്ന സംവേദനാത്മക സെഷനുകൾ.",
          },
        ],
      },
      {
        code: "2.5",
        title:
          "കുട്ടികൾ നയിക്കുന്ന വാമൊഴി ചരിത്രവും തലമുറകൾ തമ്മിലുള്ള സംവാദവും ('മുത്തശ്ശി-മുത്തച്ഛൻ വട്ടങ്ങൾ')",
        summary:
          "മുടക്കമില്ലാത്ത സാംസ്കാരിക കൈമാറ്റം ഉറപ്പാക്കാൻ കുട്ടികളെ മുതിർന്ന തലമുറയുമായി നേരിട്ട് ബന്ധിപ്പിക്കുന്നു.",
        items: [
          {
            title: "കുട്ടികളുടെ വാമൊഴി ചരിത്ര രേഖപ്പെടുത്തൽ",
            text: "ലളിതമായ ദൃശ്യ-ശ്രാവ്യ ഉപകരണങ്ങൾ ഉപയോഗിച്ച് മുത്തശ്ശിമാരെയും മുത്തച്ഛന്മാരെയും ഗ്രാമത്തിലെ മുതിർന്നവരെയും പാരമ്പര്യവാഹകരെയും അഭിമുഖം ചെയ്യാൻ സ്കൂൾ വിദ്യാർത്ഥികളെ പരിശീലിപ്പിക്കുന്നു.",
          },
          {
            title: "ജീവിക്കുന്ന ഓർമ്മകളുടെ ആർക്കൈവുകൾ",
            text: "വിസ്മൃതമായ നാട്ടറിവുകൾ, പരമ്പരാഗത പാചകക്കുറിപ്പുകൾ, പ്രാദേശിക കഥകൾ എന്നിവയെക്കുറിച്ച് കുട്ടികൾ ശേഖരിക്കുന്ന സ്ക്രാപ്പ്ബുക്കുകൾ, ശബ്ദരേഖകൾ, ഫോട്ടോ ആഖ്യാനങ്ങൾ എന്നിവ ക്രമീകരിക്കുന്നു.",
          },
          {
            title: "കഥപറച്ചിൽ-കൈമാറ്റ വട്ടങ്ങൾ",
            text: "മുതിർന്നവർ തങ്ങൾ ജീവിച്ചറിഞ്ഞ ചരിത്രസ്മരണകൾ കുട്ടികളുമായി നേരിട്ട് പങ്കുവെക്കുന്ന പതിവ് സാമൂഹിക കഥപറച്ചിൽ കൂട്ടായ്മകൾ.",
          },
        ],
      },
      {
        code: "2.6",
        title:
          "സർഗ്ഗാത്മക സാംസ്കാരിക ആവിഷ്കാരങ്ങൾ, കുട്ടികളുടെ നാടകം, നാടൻ കലകൾ",
        summary:
          "സജീവമായ കലാമാധ്യമങ്ങളിലൂടെ ചരിത്രവും സംസ്കാരവും ഉൾക്കൊള്ളാനും ആവിഷ്കരിക്കാനും കുട്ടികളെ പ്രോത്സാഹിപ്പിക്കുന്നു.",
        items: [
          {
            title: "കുട്ടികളുടെ ചരിത്രനാടകങ്ങളും തെരുവുനാടകങ്ങളും",
            text: "പ്രാദേശിക ചരിത്രം, സാംസ്കാരിക നാഴികക്കല്ലുകൾ, പരിസ്ഥിതി സംരക്ഷണം എന്നിവയെ ആസ്പദമാക്കി നാടകങ്ങൾ രചിക്കുകയും അവതരിപ്പിക്കുകയും ചെയ്യുന്നു.",
          },
          {
            title: "നാടൻ കല, പാവകളി, സംഗീത ശില്പശാലകൾ",
            text: "പരമ്പരാഗത അവതരണ കലകൾ, തനത് സംഗീതോപകരണങ്ങൾ, പഴയകാലത്തെ നാടൻ കളികൾ എന്നിവയിൽ പ്രായോഗിക പരിചയം.",
          },
          {
            title: "സർഗ്ഗാത്മക ദൃശ്യാവിഷ്കാരം",
            text: "'ഞാൻ കാണുന്ന എന്റെ ഗ്രാമം / എന്റെ പൈതൃകം' എന്ന പ്രമേയത്തിൽ ചിത്രരചന, പെയിന്റിംഗ്, സർഗ്ഗാത്മക രചനാ ക്യാമ്പുകൾ.",
          },
        ],
      },
      {
        code: "2.7",
        title:
          "ഡിജിറ്റൽ മാധ്യമങ്ങൾ, സംവേദനാത്മക പഠനം, കുട്ടികളെ കേന്ദ്രീകരിച്ച കഥപറച്ചിൽ",
        summary:
          "ആധുനിക സാങ്കേതിക വേദികളിലൂടെ ഡിജിറ്റൽ തലമുറയുമായി ഇടപഴകുന്നു.",
        items: [
          {
            title: "ഡിജിറ്റൽ കഥപറച്ചിലും പോഡ്കാസ്റ്റുകളും",
            text: "പ്രാദേശിക നാടോടിക്കഥകളും ചരിത്രസംഭവങ്ങളും ഉൾക്കൊള്ളുന്ന, കുട്ടികൾ അവതരിപ്പിക്കുന്നതോ കുട്ടികൾക്കായി തയ്യാറാക്കിയതോ ആയ ഓഡിയോ പരമ്പരകളും ചെറു പോഡ്കാസ്റ്റുകളും.",
          },
          {
            title: "കുട്ടികൾക്ക് ഇണങ്ങുന്ന ഡിജിറ്റൽ ശേഖരങ്ങൾ",
            text: "സ്കൂൾ പ്രോജക്ടുകൾക്കും സ്വയംപഠനത്തിനുമായി രൂപകൽപ്പന ചെയ്ത ചരിത്ര ഫോട്ടോകൾ, ആനിമേറ്റഡ് ഭൂപടങ്ങൾ, വീഡിയോകൾ എന്നിവയുടെ എളുപ്പം ലഭ്യമാകുന്ന ഓൺലൈൻ ആർക്കൈവ്.",
          },
          {
            title: "കളികളിലൂടെയുള്ള സാംസ്കാരിക പഠനം",
            text: "പ്രാദേശിക പൈതൃകം കണ്ടെത്തുന്നത് ആകർഷകവും രസകരവുമാക്കുന്ന സംവേദനാത്മക ഡിജിറ്റൽ ഗെയിമുകൾ, ഇന്ററാക്ടീവ് ഭൂപടങ്ങൾ, വെർച്വൽ ടൂറുകൾ.",
          },
        ],
      },
    ],
  },
  {
    slug: INITIATIVE_SLUGS[2],
    tab: "വയോജന ക്ഷേമവും കാലപുനരാവിഷ്കാരവും",
    title: "സമഗ്ര വയോജന ക്ഷേമ-കാലപുനരാവിഷ്കാര പദ്ധതി",
    sections: [
      {
        code: "1",
        title: "ആരോഗ്യം, ശാരീരികക്ഷമത, ജീവിതശൈലി പരിചരണം",
        items: [
          {
            code: "1.1",
            title: "ലക്ഷ്യാധിഷ്ഠിത വ്യായാമ ക്രമങ്ങൾ",
            text: "വഴക്കത്തിനും മാനസിക സമ്മർദ്ദ ലഘൂകരണത്തിനുമായി മാർഗ്ഗനിർദ്ദേശത്തോടെയുള്ള യോഗ, ആയാസം കുറഞ്ഞ സുംബ, ചിട്ടയായ നടത്ത കൂട്ടായ്മകൾ.",
          },
          {
            code: "1.2",
            title: "രോഗപ്രതിരോധവും പരിശോധനകളും",
            text: "ആരോഗ്യ ബോധവൽക്കരണ ശില്പശാലകളും ഇടവേളകളിലുള്ള പരിശോധനകളും (രക്തസമ്മർദ്ദം, രക്തത്തിലെ പഞ്ചസാര, BMI നിരീക്ഷണം).",
          },
          {
            code: "1.3",
            title: "പോഷകാഹാരവും ജലാംശവും",
            text: "സമ്പൂർണ്ണ ഭക്ഷണങ്ങൾ, പോഷകസമൃദ്ധമായ നാടൻ ധാന്യങ്ങൾ, ആവശ്യത്തിന് വെള്ളം എന്നിവയിൽ ഊന്നിയ, ഓരോരുത്തർക്കും ഇണങ്ങുന്ന ഭക്ഷണക്രമ മാർഗ്ഗനിർദ്ദേശങ്ങൾ.",
          },
        ],
      },
      {
        code: "2",
        title: "നടത്തിപ്പ് വേദികളും ഡിജിറ്റൽ ഉപകരണങ്ങളും",
        items: [
          {
            code: "2.1",
            title: "ഭൗതിക-സാമൂഹിക ഇടങ്ങൾ",
            text: "തത്സമയ പരിപാടികൾ സംഘടിപ്പിക്കാൻ പ്രാദേശിക കോളേജ് ഹാളുകൾ, സാമൂഹിക കേന്ദ്രങ്ങൾ, സാംസ്കാരിക പൈതൃക ട്രസ്റ്റുകൾ.",
          },
          {
            code: "2.2",
            title: "നിരീക്ഷണ-വെർച്വൽ ഉപകരണങ്ങൾ",
            text: "വ്യായാമ ക്രമങ്ങൾക്കായി ആരോഗ്യ ആപ്പുകൾ (Google Fit, Apple Health), ഹൈബ്രിഡ് കൂടിച്ചേരലുകൾക്കായി Zoom അല്ലെങ്കിൽ Google Meet.",
          },
        ],
      },
      {
        code: "3",
        title: "കാലപുനരാവിഷ്കാരം, ഗൃഹാതുര വിനോദം, തലമുറകളുടെ സംഗമം",
        items: [
          {
            code: "3.1",
            title: "തലമുറകൾ തമ്മിലുള്ള അറിവുകൈമാറ്റം",
            text: "മുതിർന്നവർ തങ്ങളുടെ ജീവിതാനുഭവങ്ങളും ചരിത്രപരമായ ഉൾക്കാഴ്ചകളും പരമ്പരാഗത മൂല്യങ്ങളും യുവതലമുറയ്ക്ക് നേരിട്ട് പകർന്നുനൽകുന്ന കഥപറച്ചിൽ വട്ടങ്ങളും സംവാദ വേദികളും.",
          },
          {
            code: "3.2",
            title: "സുവർണ്ണകാല കലകൾ (പാട്ട്, നാടകം, സിനിമ)",
            text: "അവരുടെ യൗവനത്തെ നിർവചിച്ച ക്ലാസിക് സംഗീതവും നാടകങ്ങളും പഴയകാല സിനിമകളും ആഘോഷിക്കുന്ന, ആ കലാനുഭവങ്ങൾ വീണ്ടും അനുഭവിക്കാൻ അവസരമൊരുക്കുന്ന ഇടങ്ങളും സാംസ്കാരിക പരിപാടികളും.",
          },
          {
            code: "3.3",
            title: "കലാലയ ദിനങ്ങളുടെ പുനരാവിഷ്കാരം",
            text: "അവരുടെ കോളേജ് കാലത്തെ ഊർജ്ജസ്വലമായ അന്തരീക്ഷവും ക്യാമ്പസ് സംസ്കാരവും സൗഹൃദങ്ങളും യൗവനോർജ്ജവും പുനഃസൃഷ്ടിക്കാൻ പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത ഗൃഹാതുര പരിപാടികൾ.",
          },
          {
            code: "3.4",
            title: "പരമ്പരാഗത പ്രദർശനങ്ങളും വിനോദ പ്രവർത്തനങ്ങളും",
            text: "ബൗദ്ധിക ഉണർവും സന്തോഷവും സാമൂഹിക അടുപ്പവും വളർത്താൻ പഴയകാല ഫോട്ടോ ഗാലറികൾ, അവരുടെ കാലഘട്ടത്തിന്റെ ചരിത്ര പ്രദർശനങ്ങൾ, ക്ലാസിക് ഇൻഡോർ-ഔട്ട്ഡോർ കളികൾ.",
          },
        ],
      },
    ],
  },
];

export const initiatives: Record<Language, Initiative[]> = { en, ml };
