import { bookings } from "../data/bookings";
import { rooms } from "../data/roomSeed";
import { BookingModel } from "../models/BookingModel";
import { computePrice } from "../utils/calcPrice";
import { hasConflict } from "../utils/checkConflict";
import { formatLocalDateTime, minutesBetween, parseLocalDateTime } from "../utils/timeconversion";
// import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";



export function createBooking(payload: {
  roomId: string;
  userName: string;
  email?: string;
  phone?: string;
  start: string; // "YYYY-MM-DDTHH:mm"
  end: string;
}) {
  // validation
  if (!payload.roomId || !payload.userName || !payload.start || !payload.end) {
    throw { status: 400, message: "Missing required fields: roomId, userName, start, end" };
  }

  const room = rooms.find(r => r.id === payload.roomId);
  if (!room) throw { status: 404, message: "Room not found" };

  // parse as local dates
  const start = parseLocalDateTime(payload.start);
  const end = parseLocalDateTime(payload.end);

  if (start >= end) throw { status: 400, message: "start must be before end" };

  const durationMinutes = minutesBetween(start, end);
  if (durationMinutes <= 0) throw { status: 400, message: "Zero-length booking not allowed" };
  if (durationMinutes > 12 * 60) throw { status: 400, message: "Maximum booking duration is 12 hours" };

  // conflict check
  if (hasConflict(payload.roomId, start, end)) {
    throw { status: 409, message: "Room already booked during this period" };
  }

  // price
  const totalPrice = computePrice(start, end, room.baseHourlyRate);
 const bookingId = randomUUID();
  // store times as formatted local strings (YYYY-MM-DDTHH:mm)
  const booking: BookingModel = {
    id: bookingId.slice(0,5),
    roomId: payload.roomId,
    userName: payload.userName,
    startTime: formatLocalDateTime(start),
    endTime: formatLocalDateTime(end),
    totalPrice: Number(totalPrice.toFixed(2)),
    status: "CONFIRMED",
    
  };

  bookings.push(booking);
  return booking;
}