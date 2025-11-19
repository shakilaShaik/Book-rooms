import { api } from "./axios";



 interface bookdata{
     
  roomId: string;
  name: string;
  email: string;
  phone: string;
  start: string;
  end: string;

}
export const bookRoom = async (data:bookdata) => {
  const res = await api.post("/bookings", data);
  return res.data;
};
