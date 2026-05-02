import type { Dictionary } from "@/i18n/dictionaries";
import { ui } from "@/lib/product-ui";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div
        className={`${ui.container} flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-10`}
      >
        <p className="text-sm font-normal text-gray-600">{dict.footer.tagline}</p>
        <p className="max-w-lg text-xs font-normal leading-relaxed text-gray-500">
          {dict.footer.portfolio}
        </p>
      </div>
    </footer>
  );
}
