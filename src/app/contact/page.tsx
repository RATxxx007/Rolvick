import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Partner Portal",
  description: "Share your goals and get matched with the right partner team.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-cyan-200">Contact</p>
        <h1 className="font-heading text-4xl font-semibold">Start a Conversation</h1>
        <p className="max-w-2xl text-zinc-300">
          Leave your details and project context. We validate your input locally and keep
          it inside this browser session.
        </p>
      </section>
      <ContactForm />
    </div>
  );
}
