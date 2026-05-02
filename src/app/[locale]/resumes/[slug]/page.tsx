import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BannerSlot } from "@/components/BannerSlot";
import { ResumeCard } from "@/components/ResumeCard";
import { ResumePhoto } from "@/components/ResumePhoto";
import { LikeButton } from "@/components/LikeButton";
import { ShareBar } from "@/components/ShareBar";
import { resumes } from "@/data/resumes";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/absolute-url";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { sortResumes } from "@/lib/sort";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["az", "ru"] as const;
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const r of resumes) {
      paths.push({ locale, slug: r.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) return {};
  const locale = loc as Locale;
  const resume = resumes.find((r) => r.slug === slug);
  if (!resume) return {};
  const title = `${resume.name} — ${resume.title[locale]}`;
  const path = withLocale(locale, `/resumes/${resume.slug}`);
  return {
    title,
    description: resume.summary[locale],
    alternates: { canonical: path },
  };
}

export default async function ResumeDetailPage({ params }: Props) {
  const { locale: loc, slug } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;

  const resume = resumes.find((r) => r.slug === slug);
  if (!resume) notFound();

  const dict = await getDictionary(locale);

  const similar = sortResumes(
    resumes.filter(
      (r) => r.id !== resume.id && r.categoryKey === resume.categoryKey,
    ),
  ).slice(0, 3);

  const shareUrl = absoluteUrl(withLocale(locale, `/resumes/${resume.slug}`));

  return (
    <article className={`${ui.container} min-w-0 py-8 sm:py-12`}>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-10">
        <div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <ResumePhoto resume={resume} size="lg" className="sm:mt-1" />
            <div className="min-w-0 flex-1">
              <div className="mb-6 flex flex-wrap gap-2">
                {resume.isVip ? (
                  <span className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
                    {dict.jobs.vip}
                  </span>
                ) : null}
                {resume.isBoosted ? (
                  <span className="rounded-lg border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                    {dict.jobs.boosted}
                  </span>
                ) : null}
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {dict.categories[resume.categoryKey]}
                </span>
              </div>

              <h1 className={ui.h1}>{resume.name}</h1>
              <p
                className={`mt-2 text-lg font-semibold leading-snug text-gray-800 sm:text-xl`}
              >
                {resume.title[locale]}
              </p>
              <p className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
                {resume.salaryAZN}
              </p>
              <p className={`mt-2 ${ui.body}`}>
                {resume.city} · {dict.resumes.experience}: {resume.experienceYears}{" "}
                {locale === "az" ? "il" : "лет"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <LikeButton
              kind="resume"
              id={resume.id}
              labels={{ like: dict.detail.like, liked: dict.detail.liked }}
            />
            <ShareBar
              url={shareUrl}
              title={resume.name}
              labels={{
                share: dict.detail.share,
                copyLink: dict.detail.copyLink,
                copied: dict.detail.copied,
              }}
            />
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 sm:mt-10 sm:p-6">
            <h2 className={ui.overline}>{dict.resumes.cvBlockTitle}</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm font-normal leading-relaxed text-gray-700 sm:text-base">
              {resume.summary[locale]}
            </p>
            <p className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-normal text-gray-700">
              {dict.resumes.contactsHidden}
            </p>
          </div>

          {resume.portfolio?.length ? (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
              <h2 className={ui.overline}>{dict.resumes.portfolioTitle}</h2>
              <ul className="mt-4 space-y-4">
                {resume.portfolio.map((p, i) => (
                  <li
                    key={`${resume.id}-p-${i}`}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-base font-semibold text-gray-900">
                      {p.name[locale]}
                    </p>
                    <p className="mt-1 text-sm font-normal leading-relaxed text-gray-600">
                      {p.description[locale]}
                    </p>
                    <p className="mt-2 text-xs font-normal text-gray-500">
                      <span className="font-medium text-gray-600">
                        {dict.resumes.portfolioStack}:
                      </span>{" "}
                      {p.stack}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {similar.length ? (
            <section className="mt-12 sm:mt-14">
              <h2 className={`border-b border-gray-200 pb-3 ${ui.h2}`}>
                {dict.resumes.similar}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {similar.map((r) => (
                  <ResumeCard key={r.id} resume={r} locale={locale} dict={dict} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4 lg:pt-4">
          <BannerSlot slot="resumeSidebar" ads={dict.ads} />
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-normal text-gray-600">
            <p>
              {dict.resumes.updatedAt}:{" "}
              <strong className="font-semibold text-gray-900">{resume.postedAt}</strong>
            </p>
          </div>
        </aside>
      </div>

      <p className="mt-12 text-center sm:mt-14">
        <Link href={withLocale(locale, "/resumes")} className={ui.link}>
          ← {dict.resumes.title}
        </Link>
      </p>
    </article>
  );
}
