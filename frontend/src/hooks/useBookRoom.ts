import { useMutation } from "@tanstack/react-query";
import { bookRoom } from "../api/bookings";

export const useBookRoom = () => {
  return useMutation({
    mutationFn: bookRoom,
  });
};
