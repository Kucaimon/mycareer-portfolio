import Link from "next/link";
import { articlesSorted } from "@/data/articles";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { notFound } from "next/navigation";

export default async function ArticlesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;
  const dict = await getDictionary(locale);
  const list = articlesSorted();

  return (
    <div className={`${ui.container} min-w-0 py-8 sm:py-12`}>
      <h1 className={ui.h1}>{dict.articlesPage.title}</h1>
      <p className={`mt-3 max-w-2xl ${ui.body}`}>{dict.articlesPage.subtitle}</p>

      <ul className="mt-10 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {list.map((a) => (
          <li key={a.id}>
            <Link
              href={withLocale(locale, `/articles/${a.slug}`)}
              className="flex flex-col gap-2 px-4 py-5 transition-colors hover:bg-gray-50 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={
                      a.kind === "news"
                        ? "rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700"
                        : "rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-900"
                    }
                  >
                    {a.kind === "news"
                      ? dict.articlesPage.kindNews
                      : dict.articlesPage.kindArticle}
                  </span>
                  <span className={ui.small}>
                    {dict.articlesPage.published}: {a.date}
                  </span>
                </div>
                <h2 className={`mt-2 ${ui.h3}`}>{a.title[locale]}</h2>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  {a.excerpt[locale]}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-blue-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        <Link href={withLocale(locale, "/")} className={ui.link}>
          ← {dict.articlesPage.backHome}
        </Link>
      </p>
    </div>
  );
}
