import { bookings } from "../data/bookings";
import { parseLocalDateTime } from "./timeconversion";

/** returns true if conflict exists */
export function hasConflict(roomId: string, start: Date, end: Date) {
  return bookings.some((b) => {
    if (b.roomId !== roomId || b.status === "CANCELLED") return false;
    const bs = parseLocalDateTime(b.startTime);
    const be = parseLocalDateTime(b.endTime);
    // overlap: start < existingEnd && end > existingStart
    return start < be && end > bs;
  });
}
