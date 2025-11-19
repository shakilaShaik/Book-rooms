import { bookings } from "../data/bookings";
import { parseLocalDateTime } from "../utils/timeconversion";

/** cancel: allowed only if >2 hours before start */
export function cancelBooking(id: string) {
  const b = bookings.find(x => x.id === id);
  if (!b) throw { status: 404, message: "Booking not found" };
  if (b.status === "CANCELLED") throw { status: 400, message: "Booking already cancelled" };

  const start = parseLocalDateTime(b.startTime);
  const now = new Date();
  const hoursBefore = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursBefore <= 2) {
    throw { status: 400, message: "Cannot cancel within 2 hours of start time" };
  }

  b.status = "CANCELLED";
  return b;
}