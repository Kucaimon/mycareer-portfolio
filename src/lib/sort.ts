import type { Job, Resume } from "@/types/content";

function scoreDate(iso: string): number {
  return new Date(iso).getTime();
}

/** VIP → boosted → date (newest first) */
export function sortJobs(list: Job[]): Job[] {
  return [...list].sort((a, b) => {
    if (a.isVip !== b.isVip) return a.isVip ? -1 : 1;
    if (a.isBoosted !== b.isBoosted) return a.isBoosted ? -1 : 1;
    return scoreDate(b.postedAt) - scoreDate(a.postedAt);
  });
}

export function sortResumes(list: Resume[]): Resume[] {
  return [...list].sort((a, b) => {
    if (a.isVip !== b.isVip) return a.isVip ? -1 : 1;
    if (a.isBoosted !== b.isBoosted) return a.isBoosted ? -1 : 1;
    return scoreDate(b.postedAt) - scoreDate(a.postedAt);
  });
}
