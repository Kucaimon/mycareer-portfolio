import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HtmlLang } from "@/components/HtmlLang";
import type { Locale } from "@/i18n/config";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!isLocale(loc)) return {};
  const dict = await getDictionary(loc);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        az: "/az",
        ru: "/ru",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HtmlLang locale={locale} />
      <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </div>
    </>
  );
}
