import type { Locale } from "./config";
import type azDict from "./dictionaries/az";

export type Dictionary = typeof azDict;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  az: () => import("./dictionaries/az").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
