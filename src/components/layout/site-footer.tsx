"use client";

import { usePathname } from "next/navigation";

import { getDictionary } from "@/i18n";
import { getLocaleFromPath } from "@/lib/locale";

export function SiteFooter() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted lg:px-8">
        <p>{dictionary.footer.line1}</p>
        <p>{dictionary.footer.line2}</p>
      </div>
    </footer>
  );
}
