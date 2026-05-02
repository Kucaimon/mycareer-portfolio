import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Resume } from "@/types/content";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { cn } from "@/lib/cn";
import { ResumePhoto } from "@/components/ResumePhoto";

export function ResumeCard({
  resume,
  locale,
  dict,
}: {
  resume: Resume;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = resume.title[locale];
  const cat = dict.categories[resume.categoryKey];

  return (
    <article
      className={cn(
        ui.card,
        "relative max-w-full overflow-hidden",
        resume.isVip && "ring-1 ring-blue-200",
      )}
    >
      <div className="flex gap-4">
        <ResumePhoto resume={resume} size="md" className="self-start" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap gap-2">
                {resume.isVip ? (
                  <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-900">
                    {dict.jobs.vip}
                  </span>
                ) : null}
                {resume.isBoosted ? (
                  <span className="rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                    {dict.jobs.boosted}
                  </span>
                ) : null}
                <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                  {cat}
                </span>
              </div>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 sm:text-xl">
                <Link
                  href={withLocale(locale, `/resumes/${resume.slug}`)}
                  className="after:absolute after:inset-0 hover:text-blue-600"
                >
                  {resume.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-800">{title}</p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className="text-sm font-semibold text-gray-900 sm:text-base">
                {resume.salaryAZN}
              </p>
              <p className="text-xs font-normal text-gray-500">{resume.city}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-normal leading-relaxed text-gray-600">
        {resume.summary[locale]}
      </p>
      {resume.portfolio?.length ? (
        <p className="mt-2 text-xs font-normal text-gray-500">
          {dict.resumes.portfolioCardLine.replace(
            "{count}",
            String(resume.portfolio.length),
          )}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3 text-xs font-normal text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span className="break-words">
          {dict.resumes.experience}: {resume.experienceYears}{" "}
          {locale === "az" ? "il" : "лет"}
        </span>
        <span className="shrink-0">{resume.postedAt}</span>
      </div>
    </article>
  );
}
