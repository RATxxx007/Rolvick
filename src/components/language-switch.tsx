"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDictionary } from "@/i18n";
import { addLocale, getLocaleFromPath, stripLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function LanguageSwitch() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const basePath = stripLocale(pathname);
  const enPath = addLocale(basePath, "en");
  const ruPath = addLocale(basePath, "ru");
  const dictionary = getDictionary(locale);

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-surface/70 p-1 text-xs">
      <Link
        href={enPath}
        className={cn(
          "rounded-full px-2 py-1 transition",
          locale === "en" ? "bg-white/10 text-white" : "text-muted hover:text-white",
        )}
      >
        {dictionary.languageSwitch.en}
      </Link>
      <Link
        href={ruPath}
        className={cn(
          "rounded-full px-2 py-1 transition",
          locale === "ru" ? "bg-white/10 text-white" : "text-muted hover:text-white",
        )}
      >
        {dictionary.languageSwitch.ru}
      </Link>
    </div>
  );
}
