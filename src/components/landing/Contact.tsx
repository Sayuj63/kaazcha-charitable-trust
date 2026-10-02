import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { EASE, Eyebrow, Reveal } from "./shared";

const SOCIALS = ["instagram", "facebook", "youtube", "other"] as const;

const FIELD =
  "w-full rounded-xl border border-transparent bg-cream text-sm text-ink transition-colors duration-300 outline-none focus:border-gold";

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
        className={cn("peer px-4 pt-6 pb-2.5", FIELD)}
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
  const { t } = useLanguage();
  const c = t.contact;
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
      toast(c.successTitle, { description: c.successDescription });
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
      toast.error(c.errorTitle, { description: c.errorDescription });
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
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-4 font-display text-3xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl"
            >
              {c.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              {c.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
              className="mt-10 rounded-3xl bg-paper p-6 sm:p-8"
            >
              <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                {c.connectHeading}
              </p>
              <p className="mt-4 font-display text-xl font-medium text-ink">
                {c.orgName}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
                <li>{c.address}</li>
                <li>{c.email}</li>
                <li>{c.phone}</li>
              </ul>
              <p className="mt-6 font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                {c.followHeading}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((key) => (
                  <li key={key}>
                    <a
                      href="#contact"
                      className="underline-draw text-sm font-medium text-ink/80 transition-colors hover:text-maroon"
                    >
                      {c.socials[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-paper p-6 sm:p-9"
            >
              <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
                {c.formHeading}
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label={c.fields.name}
                  value={form.name}
                  onChange={set("name")}
                  required
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label={c.fields.email}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label={c.fields.phone}
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
                <Field
                  id="organisation"
                  label={c.fields.organisation}
                  value={form.organisation}
                  onChange={set("organisation")}
                  autoComplete="organization"
                />
                <div className="sm:col-span-2">
                  <label
                    htmlFor="interest"
                    className="mb-1.5 block font-sans text-[10px] font-bold tracking-[0.18em] text-gold uppercase"
                  >
                    {c.fields.interest}
                  </label>
                  <select
                    id="interest"
                    required
                    value={form.interest}
                    onChange={set("interest")}
                    className={cn("cursor-pointer px-4 py-3.5", FIELD)}
                  >
                    <option value="">{c.fields.interestPlaceholder}</option>
                    {Object.entries(c.interests).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Field
                    id="subject"
                    label={c.fields.subject}
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
                    className={cn("peer resize-none px-4 pt-6 pb-2.5", FIELD)}
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-[10px] font-bold tracking-[0.18em] text-gold uppercase transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink/45 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.18em] peer-focus:text-gold"
                  >
                    {c.fields.message}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 w-full cursor-pointer rounded-full bg-forest px-6 py-4 font-sans text-[13px] font-bold tracking-[0.18em] text-cream uppercase transition-colors duration-300 hover:bg-forest-deep disabled:opacity-70"
              >
                {submitting ? c.sending : c.submit}
              </button>
              <p className="mt-4 text-center font-display text-xs italic text-ink/45">
                {c.footnote}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
