import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BannerSlot } from "@/components/BannerSlot";
import { JobCard } from "@/components/JobCard";
import { LikeButton } from "@/components/LikeButton";
import { MapSection } from "@/components/MapSection";
import { ShareBar } from "@/components/ShareBar";
import { jobs } from "@/data/jobs";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/absolute-url";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { sortJobs } from "@/lib/sort";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["az", "ru"] as const;
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const job of jobs) {
      paths.push({ locale, slug: job.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) return {};
  const locale = loc as Locale;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  const title = job.title[locale];
  const path = withLocale(locale, `/jobs/${job.slug}`);
  return {
    title,
    description: job.description[locale],
    alternates: { canonical: path },
    openGraph: { title, description: job.description[locale], url: path },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;

  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const dict = await getDictionary(locale);

  const similar = sortJobs(
    jobs.filter((j) => j.id !== job.id && j.categoryKey === job.categoryKey),
  ).slice(0, 3);

  const shareUrl = absoluteUrl(withLocale(locale, `/jobs/${job.slug}`));

  return (
    <article className={`${ui.container} min-w-0 py-8 sm:py-12`}>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-10">
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            {job.isVip ? (
              <span className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
                {dict.jobs.vip}
              </span>
            ) : null}
            {job.isBoosted ? (
              <span className="rounded-lg border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                {dict.jobs.boosted}
              </span>
            ) : null}
            <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
              {dict.categories[job.categoryKey]}
            </span>
          </div>

          <h1 className={ui.h1}>{job.title[locale]}</h1>
          <p className={`mt-3 ${ui.body}`}>
            {job.company} · {job.city}
          </p>
          <p className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
            {job.salaryAZN}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <LikeButton
              kind="job"
              id={job.id}
              labels={{ like: dict.detail.like, liked: dict.detail.liked }}
            />
            <ShareBar
              url={shareUrl}
              title={job.title[locale]}
              labels={{
                share: dict.detail.share,
                copyLink: dict.detail.copyLink,
                copied: dict.detail.copied,
              }}
            />
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 sm:mt-10 sm:p-6">
            <h2 className={ui.overline}>{dict.jobs.title}</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm font-normal leading-relaxed text-gray-700 sm:text-base">
              {job.description[locale]}
            </p>
            <p className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-normal text-gray-700">
              {dict.jobs.contactsHidden}
            </p>
          </div>

          <MapSection
            labels={{
              map: dict.detail.map,
              mapOff: dict.detail.mapOff,
              mapOn: dict.detail.mapOn,
              mapHidden: dict.detail.mapHidden,
              mapPlaceholder: dict.detail.mapPlaceholder,
            }}
          />

          {similar.length ? (
            <section className="mt-12 sm:mt-14">
              <h2 className={`border-b border-gray-200 pb-3 ${ui.h2}`}>
                {dict.jobs.similar}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {similar.map((j) => (
                  <JobCard key={j.id} job={j} locale={locale} dict={dict} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4 lg:pt-4">
          <BannerSlot slot="jobSidebar" ads={dict.ads} />
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-normal text-gray-600">
            <p>
              {dict.jobs.posted}:{" "}
              <strong className="font-semibold text-gray-900">{job.postedAt}</strong>
            </p>
            <p className="mt-2">
              {job.applicationsCount}{" "}
              <span className="text-gray-500">{dict.jobs.applications}</span>
            </p>
          </div>
        </aside>
      </div>

      <p className="mt-12 text-center sm:mt-14">
        <Link href={withLocale(locale, "/jobs")} className={ui.link}>
          ← {dict.jobs.title}
        </Link>
      </p>
    </article>
  );
}
