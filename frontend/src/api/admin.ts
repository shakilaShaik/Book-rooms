import { api } from "./axios";

export const getAllBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

export const cancelBooking = async (id: string) => {
  const res = await api.delete(`/admin/bookings/${id}`);
  return res.data;
};

export const getAnalytics = async () => {
  const res = await api.get("/admin/analytics");
  return res.data;
};
