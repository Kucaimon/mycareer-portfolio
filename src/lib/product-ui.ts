/**
 * Utility / product UI tokens — job board (LinkedIn-style).
 * Container 1200px, spacing 8px grid, single accent blue-600 (#2563EB).
 */
export const ui = {
  /** max-w-[1200px] + horizontal padding */
  container: "mx-auto w-full max-w-[1200px] px-4 sm:px-6",
  /** 12-column grid with 24px (gap-6) gutters */
  grid12: "grid grid-cols-12 gap-6",
  /** H1: 32px mobile → 36px sm / 700 */
  h1: "text-[2rem] font-bold leading-snug tracking-tight text-gray-900 sm:text-[2.25rem]",
  /** H2: 24px / 600 */
  h2: "text-2xl font-semibold leading-snug tracking-tight text-gray-900",
  /** H3: 18px → 20px / 600 */
  h3: "text-lg font-semibold leading-snug text-gray-900 sm:text-xl",
  /** Body 14–16px / 400 */
  body: "text-sm font-normal leading-relaxed text-gray-600 sm:text-base",
  /** Small / muted 12–13px */
  small: "text-xs font-normal leading-normal text-gray-500 sm:text-[13px]",
  /** Section label (filters, caps) */
  overline:
    "text-xs font-medium uppercase tracking-wide text-gray-500",
  link: "text-sm font-medium text-gray-900 underline-offset-4 hover:text-blue-600 hover:underline",
  /** Primary CTA */
  btnPrimary:
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-h-10",
  /** Secondary outline */
  btnSecondary:
    "inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-h-10",
  /** List card: 8px radius, border only */
  card:
    "rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 sm:p-5",
  /** Form controls */
  field:
    "w-full min-w-0 min-h-11 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-900 shadow-none placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:min-h-10 sm:text-sm",
} as const;
