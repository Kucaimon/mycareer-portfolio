"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const storageKey = "mycareer-likes";

const likeListeners = new Set<() => void>();

function emitLikes() {
  likeListeners.forEach((l) => l());
}

function subscribeLikes(callback: () => void) {
  likeListeners.add(callback);
  return () => {
    likeListeners.delete(callback);
  };
}

function readLiked(kind: "job" | "resume", id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return false;
    const data = JSON.parse(raw) as Record<string, string[]>;
    const arr = data[kind] ?? [];
    return arr.includes(id);
  } catch {
    return false;
  }
}

function writeToggle(kind: "job" | "resume", id: string, on: boolean) {
  try {
    const raw = localStorage.getItem(storageKey);
    const data = raw
      ? (JSON.parse(raw) as Record<string, string[]>)
      : { job: [], resume: [] };
    const set = new Set(data[kind] ?? []);
    if (on) set.add(id);
    else set.delete(id);
    data[kind] = Array.from(set);
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function LikeButton({
  kind,
  id,
  labels,
}: {
  kind: "job" | "resume";
  id: string;
  labels: { like: string; liked: string };
}) {
  const liked = useSyncExternalStore(
    subscribeLikes,
    () => readLiked(kind, id),
    () => false,
  );

  function toggle() {
    writeToggle(kind, id, !liked);
    emitLikes();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors sm:min-h-10",
        liked
          ? "border-blue-200 bg-blue-50 text-blue-900"
          : "border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50",
      )}
      aria-pressed={liked}
    >
      <span className="text-base leading-none">{liked ? "♥" : "♡"}</span>
      {liked ? labels.liked : labels.like}
    </button>
  );
}
