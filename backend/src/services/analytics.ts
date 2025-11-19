import { bookings } from "../data/bookings";
import { rooms } from "../data/roomSeed";
import { minutesBetween, parseLocalDateTime } from "../utils/timeconversion";

export function getAnalytics(from?: string, to?: string) {
  let fromDate: Date | null = null;
  let toDate: Date | null = null;

  if (from) fromDate = parseLocalDateTime(`${from}T00:00`);
  if (to) toDate = parseLocalDateTime(`${to}T23:59:59`);

  const roomMap = new Map<
    string,
    { roomId: string; roomName: string; totalHours: number; totalRevenue: number }
  >();

  // iterate bookings instead of rooms
  for (const b of bookings) {
    if (b.status !== "CONFIRMED") continue;

    const bs = parseLocalDateTime(b.startTime);
    if (fromDate && bs < fromDate) continue;
    if (toDate && bs > toDate) continue;

    const durationHrs =
      minutesBetween(parseLocalDateTime(b.startTime), parseLocalDateTime(b.endTime)) / 60;

    // only add room if it has at least one confirmed booking
    if (!roomMap.has(b.roomId)) {
      const room = rooms.find((r) => r.id === b.roomId);
      if (!room) continue; // safety check
      roomMap.set(b.roomId, {
        roomId: room.id,
        roomName: room.name,
        totalHours: 0,
        totalRevenue: 0,
      });
    }

    const rec = roomMap.get(b.roomId)!;
    rec.totalHours += durationHrs;
    rec.totalRevenue += b.totalPrice;
  }

  return Array.from(roomMap.values()).map((r) => ({
    roomId: r.roomId,
    roomName: r.roomName,
    totalHours: Math.round(r.totalHours * 100) / 100,
    totalRevenue: Math.round(r.totalRevenue * 100) / 100,
  }));
}
