import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Fallback when middleware does not run; always send `/` → `/az`. */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
