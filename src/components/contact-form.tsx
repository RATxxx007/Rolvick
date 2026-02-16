"use client";

import { useMemo, useState } from "react";
import { Copy, CopyCheck, Mail, Phone } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";

const formSchema = z.object({
  phone: z
    .string()
    .min(8, "Phone must contain at least 8 characters")
    .regex(/^[+\d\s()\-]+$/, "Phone can contain +, digits, spaces, (), and -"),
  email: z.string().email("Enter a valid email"),
  companyName: z.string().min(2, "Company name must contain at least 2 characters"),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  phone: "",
  email: "",
  companyName: "",
  comment: "",
};

const CONTACT_EMAIL = "contact@rolvick.example";
const CONTACT_PHONE = "+995 555 010 010";

export function ContactForm({
  locale,
  prefillPartner,
}: {
  locale: Locale;
  prefillPartner?: string;
}) {
  const dictionary = getDictionary(locale);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [copiedField, setCopiedField] = useState<"message" | "email" | null>(null);

  const onChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const message = useMemo(() => {
    if (!submitted) return "";
    const partnerLine = prefillPartner
      ? locale === "ru"
        ? `Интересуемся партнером: ${prefillPartner}.`
        : `Interested in partner: ${prefillPartner}.`
      : "";

    if (locale === "ru") {
      return [
        "Здравствуйте,",
        `Компания: ${submitted.companyName}.`,
        `Email: ${submitted.email}.`,
        `Телефон: ${submitted.phone}.`,
        partnerLine,
        submitted.comment
          ? `Контекст: ${submitted.comment}`
          : "Контекст: без дополнительных комментариев.",
      ]
        .filter(Boolean)
        .join("\n");
    }

    return [
      "Hello,",
      `Company: ${submitted.companyName}.`,
      `Email: ${submitted.email}.`,
      `Phone: ${submitted.phone}.`,
      partnerLine,
      submitted.comment
        ? `Context: ${submitted.comment}`
        : "Context: no additional notes.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [submitted, locale, prefillPartner]);

  const mailtoHref = useMemo(() => {
    if (!submitted) return `mailto:${CONTACT_EMAIL}`;
    const subject =
      locale === "ru" ? "Запрос через Partner Portal" : "Partner Portal inquiry";
    const params = new URLSearchParams({
      subject,
      body: message,
    });
    return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
  }, [submitted, message, locale]);

  const copyValue = async (field: "message" | "email", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 1000);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitted(parsed.data);
  };

  if (submitted) {
    return (
      <section className="rounded-2xl border border-white/10 bg-surface p-8">
        <h2 className="font-heading text-2xl font-semibold text-white">
          {dictionary.contact.thanks}
        </h2>
        <p className="mt-2 text-muted">{dictionary.contact.subtitle}</p>
        <div className="mt-6 space-y-4">
          <textarea
            readOnly
            className="min-h-40 w-full rounded-2xl border border-white/10 bg-surface-2 p-4 text-sm text-foreground"
            value={message}
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => copyValue("message", message)}>
              {copiedField === "message" ? (
                <CopyCheck className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {dictionary.contact.copyMessage}
            </Button>
            <a href={mailtoHref}>
              <Button>
                <Mail className="h-4 w-4" />
                {dictionary.contact.openEmail}
              </Button>
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>
              <Button variant="secondary">
                <Phone className="h-4 w-4" />
                {dictionary.contact.call}
              </Button>
            </a>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-surface-2 p-4">
          <p className="text-sm text-muted">
            {dictionary.contact.preferEmail} {CONTACT_EMAIL}
          </p>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => copyValue("email", CONTACT_EMAIL)}
          >
            {copiedField === "email" ? (
              <CopyCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {dictionary.contact.copyEmail}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-surface p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-muted" htmlFor="phone">
            {dictionary.contact.fields.phone}*
          </label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            placeholder={CONTACT_PHONE}
            required
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-rose-300">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted" htmlFor="email">
            {dictionary.contact.fields.email}*
          </label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="team@company.com"
            required
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-rose-300">{errors.email}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-muted" htmlFor="companyName">
            {dictionary.contact.fields.company}*
          </label>
          <Input
            id="companyName"
            value={values.companyName}
            onChange={(event) => onChange("companyName", event.target.value)}
            placeholder="Northbridge Analytics"
            required
          />
          {errors.companyName ? (
            <p className="mt-2 text-sm text-rose-300">{errors.companyName}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-muted" htmlFor="comment">
            {dictionary.contact.fields.comment}
          </label>
          <Textarea
            id="comment"
            value={values.comment}
            onChange={(event) => onChange("comment", event.target.value)}
            placeholder={
              locale === "ru"
                ? "Опишите приоритеты, контекст и сроки."
                : "Share priorities, context, and timeline."
            }
          />
        </div>
      </div>
      <Button className="mt-6" type="submit" size="lg">
        {dictionary.contact.submit}
      </Button>
    </form>
  );
}
