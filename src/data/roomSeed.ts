import { RoomModel } from "../models/RoomModel";
export const rooms: RoomModel[] = [];

export function seedRooms() {
  console.log("seeding rooms");
    rooms.splice(0, rooms.length, 
      { id: "101", name: "Cabin 1", baseHourlyRate: 300, capacity: 4 },
      { id: "102", name: "Conference A", baseHourlyRate: 600, capacity: 12 },
      { id: "103", name: "Huddle Room", baseHourlyRate: 200, capacity: 2 }
    );
  }