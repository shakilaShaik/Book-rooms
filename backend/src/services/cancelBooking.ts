import { bookings } from "../data/Booking";




export function cancelBooking(id: string) {
  const b = bookings.find((x) => x.id === id);
  if (!b) throw new Error("Booking not found");

  const now = new Date();
  const start = new Date(b.startTime);

  const diffHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours <= 2) {
    throw new Error("Cannot cancel within 2 hours of start time");
  }

  b.status = "CANCELLED";
  return b;
}