import { bookings } from "../data/Booking";
import { rooms } from "../data/roomSeed";
import { minutesBetween } from "../utils/timeconversion";

export function getAnalytics(from: string, to: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
  
    const result: any[] = [];
  
    rooms.forEach((room) => {
      const roomBookings = bookings.filter((b) => {
        if (b.roomId !== room.id) return false;
        if (b.status !== "CONFIRMED") return false;
  
        const bs = new Date(b.startTime);
        return bs >= fromDate && bs <= toDate;
      });
  
      let totalHours = 0;
      let totalRevenue = 0;
  
      roomBookings.forEach((b) => {
        totalHours += minutesBetween(new Date(b.startTime), new Date(b.endTime)) / 60;
        totalRevenue += b.totalPrice;
      });
  
      result.push({
        roomId: room.id,
        roomName: room.name,
        totalHours: Number(totalHours.toFixed(2)),
        totalRevenue
      });
    });
  
    return result;
  }
  