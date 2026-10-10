/** The upcoming event promoted in the announcement bar and on its own page.
 *  For the next event, replace these details and the poster in
 *  `public/events/`; the bar, the page and its route all read from here. */

import type { Localized } from "./media";

export type EventContact = { name: Localized; phone: string };

export const EVENT = {
  path: "/events/sreevalli",
  registerUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe-d7tARRuf3dT4Rq53OPIyr7oaSVeagNkLeiwz29EcovYfDg/viewform?usp=dialog",
  poster: "/events/sreevalli-poster.jpg",
  series: {
    en: "Oru Desathinte Kadha Tedi",
    ml: "ഒരു ദേശത്തിന്റെ കഥ തേടി",
  } satisfies Localized,
  /** English only: the series name is already Malayalam. */
  seriesMeaning: "In Search of the Story of a Locale",
  chapter: { en: "Eedu 5", ml: "ഏട് 5" } satisfies Localized,
  title: { en: "Sreevalli", ml: "ശ്രീവല്ലി" } satisfies Localized,
  intro: {
    en: "In celebration of the literary legacy and poetic odyssey of Padma Shri Vishnu Narayanan Namboothiri—whose verses brim with the vibrant pulse of nature and profound spirituality—Kaazcha Charitable Trust, in collaboration with the Kendra Sahitya Akademi, proudly presents 'Sreevalli', the fifth chapter of the cultural series 'Oru Desathinte Kadha Tedi' (In Search of the Story of a locale), scheduled for October 31, 2026, from 9:00 AM to 4:00 PM, at the Believers Church Medical College Hospital Amphitheatre.",
    ml: "പാരമ്പര്യത്തിന്റെ വേരുകളും ആധുനികതയുടെ ദർശനങ്ങളും തേടിയ ദേശകവി; തിരുവല്ലയുടെ മണ്ണിൽനിന്ന് കടൽ കടന്ന കാവ്യപ്പെരുമ. വിഷ്ണുനാരായണൻ നമ്പൂതിരി കവിതകളുടെ പഠനവും പുനർവായനയും: സാഹിത്യ സെമിനാർ.",
  } satisfies Localized,
  welcome: {
    en: "We warmly welcome you to join us for this special gathering.",
    ml: "ഭൂമിഗീതങ്ങളുടെ ഈണത്തിൽ അലിയാൻ, പ്രിയകവിയുടെ കാവ്യലോകത്തേക്ക് ഏവർക്കും ഹൃദ്യമായ സ്വാഗതം.",
  } satisfies Localized,
  date: { en: "October 31, 2026", ml: "ഒക്ടോബർ 31, 2026" } satisfies Localized,
  time: { en: "9:00 AM – 4:00 PM", ml: "9:00 AM – 4:00 PM" } satisfies Localized,
  venue: {
    en: "Amphitheatre, Believers Church Medical College Hospital, Thiruvalla",
    ml: "ആംഫി തിയേറ്റർ, ബിലീവേഴ്സ് ചർച്ച് മെഡിക്കൽ കോളേജ് ഹോസ്പിറ്റൽ, തിരുവല്ല",
  } satisfies Localized,
  contacts: [
    { name: { en: "Juby M Sunny", ml: "ജൂബി എം സണ്ണി" }, phone: "+91 9061810182" },
    { name: { en: "Sajan Varghese", ml: "സാജൻ വർഗീസ്" }, phone: "+91 9847535454" },
  ] satisfies EventContact[],
};
