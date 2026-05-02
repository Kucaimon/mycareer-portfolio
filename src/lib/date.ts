/** ISO date yyyy-mm-dd within last `days` including today */
export function isWithinDays(iso: string, days: number, ref = new Date()): boolean {
  const d = new Date(iso + "T12:00:00");
  const ms = days * 24 * 60 * 60 * 1000;
  return ref.getTime() - d.getTime() <= ms && d <= ref;
}
