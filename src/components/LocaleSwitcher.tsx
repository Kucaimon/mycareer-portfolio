"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const rest =
    locales.includes(first as Locale) ? segments.slice(1) : segments;
  const suffix = rest.length ? `/${rest.join("/")}` : "";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-[11px] font-medium uppercase tracking-wide text-gray-500 sm:inline">
        {label}
      </span>
      <div className="flex shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-[11px] font-semibold sm:text-xs">
        {locales.map((loc) => (
          <Link
            key={loc}
            href={`/${loc}${suffix}`}
            className={cn(
              "rounded-md px-2 py-1 transition-colors sm:px-2.5",
              loc === current
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-white hover:text-gray-900",
            )}
            hrefLang={loc}
          >
            {loc.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
