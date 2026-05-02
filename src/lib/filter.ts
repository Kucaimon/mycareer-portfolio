import type { Job, Resume } from "@/types/content";
import { isWithinDays } from "@/lib/date";

export function filterJobs(
  jobs: Job[],
  opts: {
    q?: string;
    cat?: string;
    from?: string;
    to?: string;
    week?: string;
  },
): Job[] {
  let list = [...jobs];
  const q = opts.q?.trim().toLowerCase();

  if (opts.week === "1") {
    list = list.filter((j) => isWithinDays(j.postedAt, 7));
  }

  if (opts.cat && opts.cat !== "all") {
    list = list.filter((j) => j.categoryKey === opts.cat);
  }

  if (opts.from) {
    const fromT = new Date(opts.from).getTime();
    list = list.filter((j) => new Date(j.postedAt).getTime() >= fromT);
  }
  if (opts.to) {
    const toT = new Date(opts.to).getTime();
    list = list.filter((j) => new Date(j.postedAt).getTime() <= toT);
  }

  if (q) {
    list = list.filter(
      (j) =>
        j.title.az.toLowerCase().includes(q) ||
        j.title.ru.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q),
    );
  }

  return list;
}

export function filterResumes(
  resumes: Resume[],
  opts: {
    q?: string;
    cat?: string;
    from?: string;
    to?: string;
    week?: string;
  },
): Resume[] {
  let list = [...resumes];

  if (opts.week === "1") {
    list = list.filter((r) => isWithinDays(r.postedAt, 7));
  }

  if (opts.cat && opts.cat !== "all") {
    list = list.filter((r) => r.categoryKey === opts.cat);
  }

  if (opts.from) {
    const fromT = new Date(opts.from).getTime();
    list = list.filter((r) => new Date(r.postedAt).getTime() >= fromT);
  }
  if (opts.to) {
    const toT = new Date(opts.to).getTime();
    list = list.filter((r) => new Date(r.postedAt).getTime() <= toT);
  }

  if (opts.q?.trim()) {
    const q = opts.q.trim().toLowerCase();
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.title.az.toLowerCase().includes(q) ||
        r.title.ru.toLowerCase().includes(q),
    );
  }

  return list;
}
