export type Localized = { az: string; ru: string };

export type Job = {
  id: string;
  slug: string;
  title: Localized;
  company: string;
  city: string;
  salaryAZN: string;
  categoryKey: "it" | "sales" | "finance" | "hr" | "marketing";
  postedAt: string;
  isVip: boolean;
  isBoosted: boolean;
  applicationsCount: number;
  description: Localized;
};

export type PortfolioProject = {
  name: Localized;
  description: Localized;
  /** Comma-separated stack / tools (not localized) */
  stack: string;
};

export type Resume = {
  id: string;
  slug: string;
  name: string;
  title: Localized;
  city: string;
  experienceYears: number;
  salaryAZN: string;
  categoryKey: Job["categoryKey"];
  postedAt: string;
  isVip: boolean;
  isBoosted: boolean;
  summary: Localized;
  /** Путь из /public, напр. /resume-photos/r1.svg или .jpg */
  photoSrc?: string;
  /** Demo portfolio projects for candidate profile */
  portfolio?: PortfolioProject[];
};

export type ArticleKind = "article" | "news";

export type Article = {
  id: string;
  slug: string;
  kind: ArticleKind;
  title: Localized;
  excerpt: Localized;
  /** Full text; paragraphs separated by blank lines */
  body: Localized;
  date: string;
};
