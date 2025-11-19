import { api } from "./axios";

export const getRooms = async () => {
  const res = await api.get("/rooms");
  return res.data;
};
