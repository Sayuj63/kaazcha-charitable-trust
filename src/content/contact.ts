/** Official contact details, shared by the Contact section and the footer. */

export const CONTACT_EMAIL = "kaazchatvla@gmail.com";

/** Postal address, one line per entry. */
export const ADDRESS_LINES = {
  en: ["Puthenveedu, Kuttapuzha P.O.", "Tiruvalla – 689103, Keralam, India"],
  ml: ["പുത്തൻവീട്, കുറ്റപ്പുഴ പി.ഒ.", "തിരുവല്ല – 689103, കേരളം, ഇന്ത്യ"],
};

/** Add a phone number here when the trust has one to publish. */
export const CONTACT_PHONE: string = "";

/** Only channels that exist are listed; add Facebook etc. when ready. */
export const SOCIAL_LINKS = [
  { key: "instagram", url: "https://www.instagram.com/orudeshathintekadhathedi" },
  { key: "youtube", url: "https://youtube.com/@orudeshathintekadhathedi" },
] as const;
