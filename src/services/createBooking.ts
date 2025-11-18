import { rooms } from "../data/roomSeed";
import { hasConflict } from "../utils/checkConflict";
import { minutesBetween } from "../utils/timeconversion";
import { BookingModel } from "../models/BookingModel";
import { bookings } from "../data/Booking";

import { computePrice } from "../utils/calcPrice";
function generateId() {
  return Math.random().toString(36).substring(2, 8);
}


export function createBooking(payload: {
    roomId: string;
    userName: string;
    startTime: string;
    endTime: string;
  }) {
    console.log(payload);
    console.log("the booking array was", bookings);
    const room = rooms.find((r) => r.id === payload.roomId);
    if (!room) throw new Error("Room not found");
  
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
  
    if (start >= end) throw new Error("Invalid time range");
  
    const diffHours = minutesBetween(start, end) / 60;
    if (diffHours > 12) throw new Error("Duration cannot exceed 12 hours");
  
    if (hasConflict(payload.roomId, start, end)) {
      throw new Error("Room already booked during this period");
    }
  
    const price = computePrice(start, end, room.baseHourlyRate);
  
    const booking: BookingModel = {
      id: generateId(),
      roomId: payload.roomId,
      userName: payload.userName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      totalPrice: Number(price.toFixed(2)),
      status: "CONFIRMED"
    };
   console.log("the booking made was", booking);
    bookings.push(booking);
    return booking;
  }
  