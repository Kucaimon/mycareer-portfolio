import Link from "next/link";
import { ResumeCard } from "@/components/ResumeCard";
import { BannerSlot } from "@/components/BannerSlot";
import { resumes as allResumes } from "@/data/resumes";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { filterResumes } from "@/lib/filter";
import { withLocale } from "@/lib/paths";
import { ui } from "@/lib/product-ui";
import { sortResumes } from "@/lib/sort";
import { notFound } from "next/navigation";

const cats = ["it", "sales", "finance", "hr", "marketing"] as const;

export default async function ResumesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    cat?: string;
    from?: string;
    to?: string;
    week?: string;
  }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();
  const locale = loc as Locale;

  const sp = await searchParams;
  const dict = await getDictionary(locale);

  const filtered = filterResumes(allResumes, {
    q: sp.q,
    cat: sp.cat,
    from: sp.from,
    to: sp.to,
    week: sp.week,
  });
  const list = sortResumes(filtered);

  const action = withLocale(locale, "/resumes");

  return (
    <div className={`${ui.container} min-w-0 py-8 sm:py-12`}>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className={ui.h1}>{dict.resumes.title}</h1>
          <p className={`mt-2 max-w-xl ${ui.body}`}>{dict.resumes.subtitle}</p>
        </div>
        <BannerSlot
          slot="resumesIndex"
          ads={dict.ads}
          className="w-full max-w-md lg:mt-2"
        />
      </div>

      <form
        action={action}
        method="get"
        className="mb-10 grid w-full min-w-0 grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-end"
      >
        <label
          className={`flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-3 ${ui.overline}`}
        >
          {dict.forms.search}
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder={dict.resumes.searchPlaceholder}
            className={ui.field}
            autoComplete="off"
          />
        </label>
        <label className={`flex min-w-0 flex-col gap-1 ${ui.overline}`}>
          {dict.forms.category}
          <select
            name="cat"
            defaultValue={sp.cat ?? "all"}
            className={ui.field}
          >
            <option value="all">{dict.jobs.categoryAll}</option>
            {cats.map((c) => (
              <option key={c} value={c}>
                {dict.categories[c]}
              </option>
            ))}
          </select>
        </label>
        <label className={`flex min-w-0 flex-col gap-1 ${ui.overline}`}>
          {dict.jobs.dateFrom}
          <input
            type="date"
            name="from"
            defaultValue={sp.from ?? ""}
            className={ui.field}
          />
        </label>
        <label className={`flex min-w-0 flex-col gap-1 ${ui.overline}`}>
          {dict.jobs.dateTo}
          <input
            type="date"
            name="to"
            defaultValue={sp.to ?? ""}
            className={ui.field}
          />
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-xs font-normal text-gray-600 sm:col-span-2 lg:col-span-1 lg:min-h-0">
          <input
            type="checkbox"
            name="week"
            value="1"
            defaultChecked={sp.week === "1"}
            className="size-4 shrink-0 rounded border-gray-300 text-blue-600 accent-blue-600"
          />
          <span className="leading-snug">{dict.home.statsWeek}</span>
        </label>
        <button type="submit" className={`${ui.btnPrimary} w-full sm:w-auto lg:justify-self-start`}>
          {dict.forms.submit}
        </button>
      </form>

      {list.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white px-6 py-16 text-center text-sm font-normal text-gray-600">
          {dict.resumes.empty}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((r) => (
            <ResumeCard key={r.id} resume={r} locale={locale} dict={dict} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-sm font-normal text-gray-500">
        <Link
          href={withLocale(locale, "/")}
          className="font-medium text-gray-900 hover:text-blue-600"
        >
          ← mycareer.az
        </Link>
      </p>
    </div>
  );
}
