import type { Locale } from "@/i18n/config";

export function withLocale(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `/${locale}`;
  return `/${locale}${p}`;
}
