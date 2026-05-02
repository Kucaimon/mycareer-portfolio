import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/absolute-url";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["az", "ru"] as const;
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const a of articles) {
      paths.push({ locale, slug: a.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) return {};
  const locale = loc as Locale;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const title = article.title[locale];
  const path = withLocale(locale, `/articles/${article.slug}`);
  return {
    title,
    description: article.excerpt[locale],
    alternates: { canonical: path },
    openGraph: { title, description: article.excerpt[locale], url: path },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const dict = await getDictionary(locale);
  const paragraphs = article.body[locale]
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.kind === "news" ? "NewsArticle" : "Article",
    headline: article.title[locale],
    datePublished: article.date,
    description: article.excerpt[locale],
    url: absoluteUrl(withLocale(locale, `/articles/${article.slug}`)),
  };

  return (
    <article className={`${ui.container} min-w-0 py-8 sm:py-12`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span
          className={
            article.kind === "news"
              ? "rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700"
              : "rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900"
          }
        >
          {article.kind === "news"
            ? dict.articlesPage.kindNews
            : dict.articlesPage.kindArticle}
        </span>
        <span className={ui.small}>
          {dict.articlesPage.published}: {article.date}
        </span>
      </div>

      <h1 className={ui.h1}>{article.title[locale]}</h1>
      <p className={`mt-4 max-w-3xl text-base font-normal text-gray-600 sm:text-lg`}>
        {article.excerpt[locale]}
      </p>

      <div className="mt-10 max-w-3xl">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-sm font-normal leading-relaxed text-gray-700 sm:text-base"
                : "mt-4 text-sm font-normal leading-relaxed text-gray-700 sm:mt-5 sm:text-base"
            }
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-8 sm:flex-row sm:gap-6">
        <Link href={withLocale(locale, "/articles")} className={ui.link}>
          ← {dict.articlesPage.backToList}
        </Link>
        <Link href={withLocale(locale, "/")} className={ui.link}>
          {dict.articlesPage.backHome}
        </Link>
      </div>
    </article>
  );
}
