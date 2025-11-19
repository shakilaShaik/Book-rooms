import { api } from "./axios";



 interface bookdata{
     
  roomId: string;
  userName: string;
  email: string;
  phone: string;
  start: string;
  end: string;

}
export const bookRoom = async (data:bookdata) => {
  const res = await api.post("/api/bookings", data);
  return res.data;
};
