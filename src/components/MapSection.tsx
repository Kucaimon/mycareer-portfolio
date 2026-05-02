"use client";

import { useSyncExternalStore } from "react";

const LS_KEY = "mycareer-hide-map";

const mapListeners = new Set<() => void>();

function notifyMap() {
  mapListeners.forEach((l) => l());
}

function subscribeMap(callback: () => void) {
  mapListeners.add(callback);
  return () => {
    mapListeners.delete(callback);
  };
}

function getMapHidden(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(LS_KEY) !== "0";
  } catch {
    return true;
  }
}

function toggleMapHidden() {
  const hidden = getMapHidden();
  try {
    localStorage.setItem(LS_KEY, hidden ? "0" : "1");
  } catch {
    /* ignore */
  }
  notifyMap();
}

export function MapSection({
  labels,
}: {
  labels: {
    map: string;
    mapOff: string;
    mapOn: string;
    mapHidden: string;
    mapPlaceholder: string;
  };
}) {
  const hidden = useSyncExternalStore(
    subscribeMap,
    getMapHidden,
    () => true,
  );

  return (
    <section className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{labels.map}</h3>
        <button
          type="button"
          onClick={toggleMapHidden}
          className="min-h-11 shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:min-h-10"
        >
          {hidden ? labels.mapOn : labels.mapOff}
        </button>
      </div>
      {hidden ? (
        <p className="mt-3 text-xs font-normal text-gray-500">{labels.mapHidden}</p>
      ) : (
        <div className="relative mt-4 min-h-[12rem] h-[min(40vw,14rem)] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:h-48 sm:min-h-0">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(80,80,80,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(80,80,80,.1)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <span className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600">
              {labels.mapPlaceholder}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
