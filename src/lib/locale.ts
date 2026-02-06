import type { Locale } from "@/i18n/types";

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    return "ru";
  }
  return "en";
}

export function stripLocale(pathname: string): string {
  if (pathname === "/ru") return "/";
  if (pathname.startsWith("/ru/")) {
    return pathname.replace("/ru", "") || "/";
  }
  return pathname;
}

export function addLocale(pathname: string, locale: Locale): string {
  if (locale === "ru") {
    return pathname === "/" ? "/ru" : `/ru${pathname}`;
  }
  return pathname;
}
