"use client";

import { useMemo, useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);

  const submittedContact = useMemo(() => {
    if (!submitted) return null;
    return {
      email: submitted.email,
      phone: submitted.phone,
    };
  }, [submitted]);

  const onChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const copyValue = async (field: "email" | "phone", value: string) => {
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

  if (submitted && submittedContact) {
    return (
      <section className="rounded-2xl border border-white/10 bg-[#11141a] p-8">
        <h2 className="font-heading text-2xl font-semibold text-zinc-100">
          Спасибо! Мы свяжемся.
        </h2>
        <p className="mt-2 text-zinc-300">
          Контакт сохранён только в вашем текущем сеансе браузера.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            onClick={() => copyValue("email", submittedContact.email)}
          >
            {copiedField === "email" ? (
              <CopyCheck className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            Copy email
          </Button>
          <Button
            variant="secondary"
            onClick={() => copyValue("phone", submittedContact.phone)}
          >
            {copiedField === "phone" ? (
              <CopyCheck className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            Copy phone
          </Button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-[#11141a] p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="phone">
            Phone*
          </label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            placeholder="+44 (0)20 7946 0100"
            required
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-rose-300">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="email">
            Email*
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
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="companyName">
            Company Name*
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
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="comment">
            Comment
          </label>
          <Textarea
            id="comment"
            value={values.comment}
            onChange={(event) => onChange("comment", event.target.value)}
            placeholder="Tell us about your current priorities and target outcomes."
          />
        </div>
      </div>
      <Button className="mt-6" type="submit" size="lg">
        Request Contact
      </Button>
    </form>
  );
}
