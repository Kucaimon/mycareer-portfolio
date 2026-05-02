import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { jobs } from "@/data/jobs";
import { resumes } from "@/data/resumes";

const locales = ["az", "ru"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    entries.push({
      url: `${base}/${locale}/resumes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    entries.push({
      url: `${base}/${locale}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    });

    for (const a of articles) {
      entries.push({
        url: `${base}/${locale}/articles/${a.slug}`,
        lastModified: new Date(a.date),
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }

    for (const job of jobs) {
      entries.push({
        url: `${base}/${locale}/jobs/${job.slug}`,
        lastModified: new Date(job.postedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const r of resumes) {
      entries.push({
        url: `${base}/${locale}/resumes/${r.slug}`,
        lastModified: new Date(r.postedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
