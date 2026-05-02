import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Job } from "@/types/content";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { cn } from "@/lib/cn";

export function JobCard({
  job,
  locale,
  dict,
}: {
  job: Job;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = job.title[locale];
  const cat = dict.categories[job.categoryKey];

  return (
    <article
      className={cn(
        ui.card,
        "relative max-w-full overflow-hidden",
        job.isVip && "ring-1 ring-blue-200",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            {job.isVip ? (
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-900">
                {dict.jobs.vip}
              </span>
            ) : null}
            {job.isBoosted ? (
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
              href={withLocale(locale, `/jobs/${job.slug}`)}
              className="after:absolute after:inset-0 hover:text-blue-600"
            >
              {t}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-normal text-gray-600">{job.company}</p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="text-sm font-semibold text-gray-900 sm:text-base">
            {job.salaryAZN}
          </p>
          <p className="text-xs font-normal text-gray-500">{job.city}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-normal leading-relaxed text-gray-600">
        {job.description[locale]}
      </p>
      <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3 text-xs font-normal text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span className="break-words">
          {dict.jobs.posted}: {job.postedAt}
        </span>
        <span className="shrink-0">
          {job.applicationsCount} {dict.jobs.applications}
        </span>
      </div>
    </article>
  );
}
