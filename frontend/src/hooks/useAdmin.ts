import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, cancelBooking, getAnalytics } from "../api/admin";

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: getAllBookings,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["admin-bookings"],
          });
          
  }});
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAnalytics,
  });
};
