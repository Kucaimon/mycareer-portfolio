import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f9fafb",
};

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mycareer.az"),
  title: {
    default: "mycareer.az",
    template: "%s · mycareer.az",
  },
  description:
    "Portfolio demo: job board for Azerbaijan market (AZ/RU). Not affiliated with a commercial launch.",
  openGraph: {
    type: "website",
    title: "mycareer.az — portfolio",
    description: "Modern job board UI concept — AZ / RU.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.variable} min-h-dvh pb-[env(safe-area-inset-bottom)] font-sans text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
