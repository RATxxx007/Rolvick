import Link from "next/link";
import { BriefcaseBusiness, FolderKanban, Home, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/partners", label: "Partners", icon: BriefcaseBusiness },
  { href: "/cases", label: "Cases", icon: FolderKanban },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d10]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-wide text-zinc-100"
        >
          Partner Portal
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/15 hover:bg-white/5 hover:text-zinc-100",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
