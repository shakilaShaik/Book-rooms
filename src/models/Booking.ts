export type BookingStatus = 'CONFIRMED' | 'CANCELLED'; // type is not extendable used for union, map , dont merge

export interface Booking { // Extendable , merge two or more interfaces
  id: string;
  roomId: string;
  userName: string;
  startTime: string; // ISO string (UTC) stored
  endTime: string;   // ISO string (UTC)
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
