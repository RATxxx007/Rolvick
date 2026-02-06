import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Контакт | Partner Portal",
  description: "Связаться с партнерской командой.",
};

const locale = "ru" as const;

type ContactPageProps = {
  searchParams?: { partner?: string };
};

export default function ContactPageRu({ searchParams }: ContactPageProps) {
  const dictionary = getDictionary(locale);
  const partner = searchParams?.partner;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent-strong">Contact</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          {dictionary.contact.title}
        </h1>
        <p className="max-w-[65ch] text-base text-muted">{dictionary.contact.subtitle}</p>
      </section>
      <ContactForm locale={locale} prefillPartner={partner} />
    </div>
  );
}
