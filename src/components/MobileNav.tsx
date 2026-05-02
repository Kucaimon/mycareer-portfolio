"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/product-ui";

export function MobileNav({
  links,
  openLabel,
  closeLabel,
  brand,
  cta,
}: {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  brand: { href: string; label: string };
  cta?: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="min-h-11 min-w-11 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        {open ? closeLabel : openLabel}
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-gray-900/30"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-panel"
            className={cn(
              "fixed inset-x-0 bottom-0 top-0 z-[70] flex flex-col bg-white shadow-xl",
              "pt-[max(0.75rem,env(safe-area-inset-top))]",
              "pb-[max(1rem,env(safe-area-inset-bottom))]",
            )}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
              <Link
                href={brand.href}
                className="text-sm font-semibold tracking-tight text-gray-900"
                onClick={() => setOpen(false)}
              >
                {brand.label}
              </Link>
              <button
                type="button"
                className="min-h-11 rounded-lg px-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {closeLabel}
              </button>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-lg px-3 py-3.5 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-600 active:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {cta ? (
              <div className="shrink-0 border-t border-gray-200 p-4">
                <Link
                  href={cta.href}
                  className={`${ui.btnPrimary} flex w-full justify-center`}
                  onClick={() => setOpen(false)}
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </nav>
        </>
      ) : null}
    </div>
  );
}
