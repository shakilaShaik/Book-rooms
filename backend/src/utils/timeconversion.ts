/**
 * Utilities that work with local date/time strings like "2025-11-19T16:48"
 * All parsing uses Date(year,month-1,day,h,m) to avoid timezone conversion.
 */

/** Parse "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mm:ss" into a Date treated as local time */
export function parseLocalDateTime(dt: string): Date {
  if (!dt) throw new Error("Invalid datetime");
  const [datePart, timePart = "00:00"] = dt.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const timeParts = timePart.split(":").map(Number);
  const hh = timeParts[0] ?? 0;
  const mm = timeParts[1] ?? 0;
  const ss = timeParts[2] ?? 0;
  return new Date(y, m - 1, d, hh, mm, ss, 0); // local time
}

/** Return minutes between two Date objects */
export function minutesBetween(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60);
}

/** Format Date -> "YYYY-MM-DDTHH:mm" local form (no timezone Z) */
export function formatLocalDateTime(d: Date): string {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${Y}-${M}-${D}T${h}:${m}`;
}

/** Build a Date from date string "YYYY-MM-DD" and time "HH:mm" in local */
export function toDateFromParts(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}
