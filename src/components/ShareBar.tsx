"use client";

import { useState } from "react";

export function ShareBar({
  url,
  title,
  labels,
}: {
  url: string;
  title: string;
  labels: { share: string; copyLink: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  const btn =
    "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:min-h-10 sm:flex-initial sm:px-3 sm:py-2";

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500 sm:mr-1">
        {labels.share}
      </span>
      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        <button type="button" onClick={copy} className={btn}>
          {copied ? labels.copied : labels.copyLink}
        </button>
        <a href={tg} target="_blank" rel="noopener noreferrer" className={btn}>
          Telegram
        </a>
      </div>
    </div>
  );
}
