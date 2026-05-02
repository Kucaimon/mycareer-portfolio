export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
