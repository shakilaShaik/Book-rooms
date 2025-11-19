import { api } from "./axios";

export const getAllBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

export const cancelBooking = async (id: string) => {
  const res = await api.get(`/api/bookings/${id}/cancel`);
  return res.data;
};

export const getAnalytics = async (from?: string, to?: string) => {
  const res = await api.get("/api/analytics", {
    params: { from, to },
  });
  return res.data.msg;
};
