import Link from "next/link";
import { BannerSlot } from "@/components/BannerSlot";
import { JobCard } from "@/components/JobCard";
import { ResumeCard } from "@/components/ResumeCard";
import { articlesSorted } from "@/data/articles";
import { jobs } from "@/data/jobs";
import { resumes } from "@/data/resumes";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isWithinDays } from "@/lib/date";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { sortJobs, sortResumes } from "@/lib/sort";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;

  const dict = await getDictionary(locale);
  const sortedJobs = sortJobs(jobs);
  const sortedResumes = sortResumes(resumes);

  const vipJobs = sortedJobs.filter((j) => j.isVip).slice(0, 3);
  const latestJobs = sortedJobs.slice(0, 4);

  const vipResumes = sortedResumes.filter((r) => r.isVip).slice(0, 3);
  const latestResumes = sortedResumes.slice(0, 4);

  const weekJobs = jobs.filter((j) => isWithinDays(j.postedAt, 7)).length;
  const weekResumes = resumes.filter((r) => isWithinDays(r.postedAt, 7)).length;

  const jobsPath = withLocale(locale, "/jobs");
  const homeArticles = articlesSorted().slice(0, 6);
  const articlesPath = withLocale(locale, "/articles");

  return (
    <div>
      <section className="border-b border-gray-200 bg-white">
        <div className={`${ui.container} ${ui.grid12} py-10 sm:py-14 lg:py-16`}>
          <div className="col-span-12 min-w-0 lg:col-span-7">
            <p
              className={`inline-block rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 ${ui.small} font-medium uppercase tracking-wide`}
            >
              {dict.home.badge}
            </p>
            <h1 className={`mt-4 sm:mt-6 ${ui.h1}`}>{dict.home.heroTitle}</h1>
            <p className={`mt-4 max-w-xl sm:mt-5 ${ui.body}`}>
              {dict.home.heroSubtitle}
            </p>

            <form
              action={jobsPath}
              method="get"
              className="mt-6 flex w-full min-w-0 flex-col gap-2 sm:mt-8 sm:flex-row sm:items-stretch"
            >
              <label className="sr-only" htmlFor="home-q">
                {dict.forms.search}
              </label>
              <input
                id="home-q"
                name="q"
                type="search"
                placeholder={dict.jobs.searchPlaceholder}
                className={`${ui.field} sm:min-w-0 sm:flex-1`}
                autoComplete="off"
              />
              <button type="submit" className={`${ui.btnPrimary} shrink-0 sm:px-8`}>
                {dict.forms.search}
              </button>
            </form>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href={jobsPath} className={ui.btnPrimary}>
                {dict.home.ctaPrimary}
              </Link>
              <Link href={withLocale(locale, "/resumes")} className={ui.btnSecondary}>
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="col-span-12 min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-4 lg:col-span-5">
            <BannerSlot slot="leaderboard" ads={dict.ads} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <BannerSlot slot="mrecA" ads={dict.ads} />
              <BannerSlot slot="mrecB" ads={dict.ads} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${ui.container} py-8 sm:py-10`}>
        <div
          className={`${ui.grid12} rounded-lg border border-gray-200 bg-white p-4 sm:p-6`}
        >
          <div className="col-span-12 md:col-span-4">
            <p className={ui.overline}>{dict.home.statsWeek}</p>
            <Link
              href={`${jobsPath}?week=1`}
              className="mt-2 block text-3xl font-bold tabular-nums tracking-tight text-gray-900 hover:text-blue-600"
            >
              {weekJobs}
            </Link>
            <p className="mt-1 text-sm font-normal text-gray-600">
              {dict.home.statsJobs}
            </p>
            <p className={`mt-2 ${ui.small}`}>{dict.jobs.weekHint}</p>
          </div>
          <div className="col-span-12 border-t border-gray-100 pt-6 md:col-span-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className={ui.overline}>{dict.home.statsWeek}</p>
            <Link
              href={`${withLocale(locale, "/resumes")}?week=1`}
              className="mt-2 block text-3xl font-bold tabular-nums tracking-tight text-gray-900 hover:text-blue-600"
            >
              {weekResumes}
            </Link>
            <p className="mt-1 text-sm font-normal text-gray-600">
              {dict.home.statsResumes}
            </p>
          </div>
          <div className="col-span-12 border-t border-gray-100 pt-6 md:col-span-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <BannerSlot slot="vertical" ads={dict.ads} />
          </div>
        </div>
      </section>

      <section className={`${ui.container} space-y-12 pb-16 sm:space-y-14 sm:pb-20`}>
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className={ui.h2}>{dict.home.vipJobs}</h2>
              <p className={`mt-1 ${ui.small}`}>{dict.home.boostedJobs}</p>
            </div>
            <Link href={jobsPath} className={ui.link}>
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {vipJobs.map((job) => (
              <JobCard key={job.id} job={job} locale={locale} dict={dict} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <h2 className={ui.h2}>{dict.home.latestJobs}</h2>
            <Link href={jobsPath} className={ui.link}>
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} locale={locale} dict={dict} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className={ui.h2}>{dict.home.vipResumes}</h2>
              <p className={`mt-1 ${ui.small}`}>{dict.home.boostedResumes}</p>
            </div>
            <Link href={withLocale(locale, "/resumes")} className={ui.link}>
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {vipResumes.map((r) => (
              <ResumeCard key={r.id} resume={r} locale={locale} dict={dict} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <h2 className={ui.h2}>{dict.home.latestResumes}</h2>
            <Link href={withLocale(locale, "/resumes")} className={ui.link}>
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {latestResumes.map((r) => (
              <ResumeCard key={r.id} resume={r} locale={locale} dict={dict} />
            ))}
          </div>
        </div>

        <div id="articles" className="scroll-mt-20 md:scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <h2 className={ui.h2}>{dict.home.articles}</h2>
            <Link href={articlesPath} className={ui.link}>
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeArticles.map((a) => (
              <Link
                key={a.id}
                href={withLocale(locale, `/articles/${a.slug}`)}
                className={`${ui.card} block transition-colors hover:border-gray-300`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
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
                  <span className={ui.small}>{a.date}</span>
                </div>
                <h3 className={ui.h3}>{a.title[locale]}</h3>
                <p className="mt-2 line-clamp-3 text-sm font-normal leading-relaxed text-gray-600">
                  {a.excerpt[locale]}
                </p>
                <span className="mt-4 inline-flex text-sm font-semibold text-blue-600">
                  {dict.home.readMore} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
