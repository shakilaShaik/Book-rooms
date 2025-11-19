// / Check overlapping with existing bookings

import { bookings } from "../data/Booking";
export function hasConflict(roomId: string, start: Date, end: Date) {
  return bookings.some((b) => {
    if (b.roomId !== roomId || b.status === "CANCELLED") return false;

    const bs = new Date(b.startTime);
    const be = new Date(b.endTime);

    // conflict: start < existingEnd && end > existingStart
    return start < be && end > bs;
  });
}