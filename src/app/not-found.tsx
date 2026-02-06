import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
      <h1 className="font-heading text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-muted">
        The requested page does not exist in this static build.
      </p>
      <Link href="/" className="mt-6 inline-block">
        <Button variant="secondary">Back to Home</Button>
      </Link>
    </section>
  );
}
