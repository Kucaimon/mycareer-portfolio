import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MobileNav } from "@/components/MobileNav";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    { href: withLocale(locale, "/jobs"), label: dict.nav.jobs },
    { href: withLocale(locale, "/resumes"), label: dict.nav.resumes },
    {
      href: withLocale(locale, "/articles"),
      label: dict.nav.blog,
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white pt-[env(safe-area-inset-top)]">
      <div
        className={`relative ${ui.container} flex h-auto min-h-[3.75rem] flex-nowrap items-center justify-between gap-2 py-2 sm:min-h-[4.25rem] sm:gap-4 sm:py-0`}
      >
        <Link
          href={withLocale(locale, "/")}
          className="group flex min-w-0 flex-1 items-center gap-2 font-semibold tracking-tight text-gray-900 sm:flex-none sm:gap-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white sm:h-9 sm:w-9">
            M
          </span>
          <span className="min-w-0 truncate text-sm leading-tight text-gray-900 sm:text-base">
            mycareer<span className="text-blue-600">.az</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LocaleSwitcher current={locale} label={dict.footer.locale} />
          <Link
            href={withLocale(locale, "/jobs")}
            className={`${ui.btnPrimary} hidden md:inline-flex`}
          >
            {dict.nav.postJob}
          </Link>
          <MobileNav
            links={links}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
            brand={{
              href: withLocale(locale, "/"),
              label: dict.nav.brandShort,
            }}
            cta={{
              href: withLocale(locale, "/jobs"),
              label: dict.nav.postJob,
            }}
          />
        </div>
      </div>
    </header>
  );
}
