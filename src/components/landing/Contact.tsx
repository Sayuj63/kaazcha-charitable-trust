import { motion } from "framer-motion";
import {
  Facebook,
  Globe,
  Instagram,
  Loader2,
  Send,
  Youtube,
} from "lucide-react";
import { useMutation } from "convex/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

import { EASE, Eyebrow, Reveal } from "./shared";

const INTERESTS = [
  "General Enquiry",
  "Supporting Kaazcha",
  "Volunteering",
  "Partnership / Collaboration",
  "Cultural / Research Initiative",
  "Event / Programme",
  "Media / Press",
  "Other",
];

const SOCIALS = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "YouTube", icon: Youtube },
  { label: "Other Social Channels", icon: Globe },
];

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        placeholder=" "
        autoComplete={autoComplete}
        onChange={onChange}
        className="peer w-full border-2 border-ink bg-cream px-4 pt-6 pb-2.5 text-sm text-ink transition-colors duration-300 outline-none focus:border-maroon"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-[10px] font-bold tracking-[0.18em] text-gold uppercase transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/45 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.18em] peer-focus:text-gold"
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const submitContact = useMutation(api.contact.submitContact);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    interest: "",
    subject: "",
    message: "",
  });

  const set =
    (key: keyof typeof form) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        organisation: form.organisation || undefined,
        interest: form.interest || undefined,
        subject: form.subject || undefined,
        message: form.message,
      });
      toast("Message received", {
        description:
          "Thank you for writing to us — the Kaazcha team will reply soon.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        organisation: "",
        interest: "",
        subject: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="paper relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Let's connect + details */}
          <div>
            <Eyebrow>Contact us</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-4 font-display text-3xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl"
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              Whether you would like to learn more about Kaazcha, collaborate
              with us, support an initiative, participate in a programme or
              simply share an idea—we would love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
              className="mt-10 border-2 border-ink bg-sand p-6 shadow-brutal-sm sm:p-7"
            >
              <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                Connect with us
              </p>
              <p className="mt-4 font-display text-xl font-medium text-ink">
                Kaazcha Charitable Trust
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
                <li>[Official Address]</li>
                <li>Email: [Official Email]</li>
                <li>Phone: [Official Phone Number]</li>
              </ul>
              <p className="mt-6 font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                Follow Kaazcha
              </p>
              <div className="mt-3 flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href="#contact"
                    aria-label={social.label}
                    title={social.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex size-12 items-center justify-center border-2 border-ink bg-cream text-ink shadow-brutal-sm transition-colors duration-300 hover:bg-gold"
                  >
                    <social.icon className="size-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="border-2 border-ink bg-card p-6 shadow-brutal-lg sm:p-9"
            >
              <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                Send us a message
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Full Name"
                  value={form.name}
                  onChange={set("name")}
                  required
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
                <Field
                  id="organisation"
                  label="Organisation / Institution"
                  value={form.organisation}
                  onChange={set("organisation")}
                  autoComplete="organization"
                />
                <div className="sm:col-span-2">
                  <label
                    htmlFor="interest"
                    className="mb-1.5 block font-sans text-[10px] font-bold tracking-[0.18em] text-gold uppercase"
                  >
                    I am interested in
                  </label>
                  <select
                    id="interest"
                    required
                    value={form.interest}
                    onChange={set("interest")}
                    className="w-full cursor-pointer border-2 border-ink bg-cream px-4 py-3.5 text-sm text-ink transition-colors duration-300 outline-none focus:border-maroon"
                  >
                    <option value="">Choose a path</option>
                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Field
                    id="subject"
                    label="Subject"
                    value={form.subject}
                    onChange={set("subject")}
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder=" "
                    value={form.message}
                    onChange={set("message")}
                    className="peer w-full resize-none border-2 border-ink bg-cream px-4 pt-6 pb-2.5 text-sm text-ink transition-colors duration-300 outline-none focus:border-maroon"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-[10px] font-bold tracking-[0.18em] text-gold uppercase transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/45 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.18em] peer-focus:text-gold"
                  >
                    Your Message
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "mt-7 flex w-full cursor-pointer items-center justify-center gap-3 border-2 border-ink bg-maroon px-6 py-4 font-sans text-[13px] font-bold tracking-[0.18em] text-cream uppercase shadow-brutal transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-deep hover:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-70 disabled:shadow-brutal",
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit Message
                    <Send className="size-4" />
                  </>
                )}
              </button>
              <p className="mt-4 text-center font-display text-xs italic text-ink/45">
                We read every message and reply within a week.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
