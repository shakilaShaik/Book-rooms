
 export function toDate(dateStr: string, timeStr: string): Date {
  const d = new Date(dateStr);
  const [h, m] = timeStr.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

 export function minutesBetween(a: Date, b: Date) {
  return (b.getTime() - a.getTime()) / (1000 * 60);
}
