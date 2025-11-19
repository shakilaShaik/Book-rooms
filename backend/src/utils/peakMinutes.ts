import { parseLocalDateTime, minutesBetween, toDateFromParts } from "./timeconversion";

/**
 * Peak windows (local):
 * - 10:00 - 13:00
 * - 16:00 - 19:00
 *
 * Only Mon-Fri (1..5).
 */
const PEAK_WINDOWS = [
  { start: "10:00", end: "13:00" },
  { start: "16:00", end: "19:00" }
];

export function computePeakMinutes(start: Date, end: Date): number {
  const weekday = start.getDay(); // 0=Sun,1=Mon...6=Sat
  const isWeekday = weekday >= 1 && weekday <= 5;
  if (!isWeekday) return 0;

  // day string in "YYYY-MM-DD"
  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  const dayStr = `${year}-${month}-${day}`;

  let peakMinutes = 0;

  for (const w of PEAK_WINDOWS) {
    const winStart = toDateFromParts(dayStr, w.start);
    const winEnd = toDateFromParts(dayStr, w.end);

    const overlapStart = new Date(Math.max(start.getTime(), winStart.getTime()));
    const overlapEnd = new Date(Math.min(end.getTime(), winEnd.getTime()));

    if (overlapEnd > overlapStart) {
      peakMinutes += minutesBetween(overlapStart, overlapEnd);
    }
  }

  return peakMinutes;
}
