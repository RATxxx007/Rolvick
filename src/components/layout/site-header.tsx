"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FolderKanban, Home, Mail } from "lucide-react";

import { LanguageSwitch } from "@/components/language-switch";
import { OwnerMark } from "@/components/owner-mark";
import { getDictionary } from "@/i18n";
import { getLocaleFromPath } from "@/lib/locale";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/partners", labelKey: "partners", icon: BriefcaseBusiness },
  { href: "/cases", labelKey: "cases", icon: FolderKanban },
  { href: "/contact", labelKey: "contact", icon: Mail },
] as const;

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const dictionary = getDictionary(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href={locale === "ru" ? "/ru" : "/"}
            className="font-heading text-base font-semibold tracking-wide text-white"
          >
            Partner Portal
          </Link>
          <OwnerMark name="Ушаков Никита" imagePath="/nikita-ushakov.jpg" />
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const label = dictionary.nav[item.labelKey];
            const href =
              locale === "ru" ? `/ru${item.href === "/" ? "" : item.href}` : item.href;
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm text-muted transition-colors hover:border-white/15 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
        </div>
      </div>
      <nav className="flex items-center gap-2 border-t border-white/10 px-6 py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const label = dictionary.nav[item.labelKey];
          const href =
            locale === "ru" ? `/ru${item.href === "/" ? "" : item.href}` : item.href;
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-xs text-muted transition-colors hover:border-white/15 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
