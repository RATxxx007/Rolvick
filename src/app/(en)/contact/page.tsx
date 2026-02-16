import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Contact | Partner Portal",
  description: "Share your goals and get matched with the right partner team.",
};

const locale = "en" as const;

type ContactPageProps = {
  searchParams?: { partner?: string };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const dictionary = getDictionary(locale);
  const partner = searchParams?.partner;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent-strong">
          {dictionary.nav.contact}
        </p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          {dictionary.contact.title}
        </h1>
        <p className="max-w-[65ch] text-base text-muted">{dictionary.contact.subtitle}</p>
      </section>
      <ContactForm locale={locale} prefillPartner={partner} />
    </div>
  );
}
