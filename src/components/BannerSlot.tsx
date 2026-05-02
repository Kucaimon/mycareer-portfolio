import { cn } from "@/lib/cn";
import type { Dictionary } from "@/i18n/dictionaries";

export type DemoAdSlot =
  | "leaderboard"
  | "mrecA"
  | "mrecB"
  | "vertical"
  | "jobsIndex"
  | "resumesIndex"
  | "jobSidebar"
  | "resumeSidebar";

const layoutClass: Record<DemoAdSlot, string> = {
  leaderboard: "min-h-[72px] sm:min-h-[80px]",
  mrecA: "min-h-[140px] sm:min-h-[180px]",
  mrecB: "min-h-[140px] sm:min-h-[180px]",
  vertical: "min-h-[140px] sm:min-h-[180px]",
  jobsIndex: "min-h-[72px] sm:min-h-[76px]",
  resumesIndex: "min-h-[72px] sm:min-h-[76px]",
  jobSidebar: "min-h-[180px] sm:min-h-[220px]",
  resumeSidebar: "min-h-[180px] sm:min-h-[220px]",
};

/** Демо-слот рекламы: плоский product-стиль, без градиентов */
export function BannerSlot({
  slot,
  ads,
  className,
}: {
  slot: DemoAdSlot;
  ads: Dictionary["ads"];
  className?: string;
}) {
  const copy = ads[slot];

  return (
    <div
      className={cn(
        "relative flex w-full min-w-0 flex-col rounded-lg border border-gray-200 bg-gray-50",
        "border-l-[3px] border-l-blue-600",
        layoutClass[slot],
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-center gap-1 py-3 pl-4 pr-3 pt-9 sm:py-4 sm:pl-4 sm:pr-4 sm:pt-4">
        <span className="absolute right-3 top-2.5 z-10 rounded border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-[11px]">
          {ads.badge}
        </span>
        <p className="text-sm font-semibold leading-snug text-gray-900 sm:text-[15px]">
          {copy.title}
        </p>
        <p className="text-xs font-normal leading-relaxed text-gray-500 sm:text-[13px]">
          {copy.subtitle}
        </p>
        <span className="mt-2 inline-flex w-fit rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-600">
          mycareer.az
        </span>
      </div>
    </div>
  );
}
