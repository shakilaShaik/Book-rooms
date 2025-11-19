import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/rooms"

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
};
