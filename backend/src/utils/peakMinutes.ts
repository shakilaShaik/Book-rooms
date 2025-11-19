
import { toDate } from "./timeconversion";
import { minutesBetween } from "./timeconversion";
const PEAK_WINDOWS = [
    { start: "10:00", end: "13:00" },
    { start: "16:00", end: "19:00" }
  ];


   export function computePeakMinutes(start: Date, end: Date) {
    let peakMinutes = 0;
  
    // Monday = 1 ... Friday = 5
    const weekday = start.getDay(); // Sun=0, Mon=1, ..., Sat=6
    const isWeekday = weekday >= 1 && weekday <= 5;
  
    if (!isWeekday) return 0; // No peak pricing on Sat/Sun
  
    const day = start.toISOString().split("T")[0];
  
    PEAK_WINDOWS.forEach((w) => {
      const winStart = toDate(day, w.start);
      const winEnd = toDate(day, w.end);
  
      const overlapStart = new Date(Math.max(start.getTime(), winStart.getTime()));
      const overlapEnd = new Date(Math.min(end.getTime(), winEnd.getTime()));
  
      if (overlapEnd > overlapStart) {
        peakMinutes += minutesBetween(overlapStart, overlapEnd);
      }
    });
  
    return peakMinutes;
  }
  