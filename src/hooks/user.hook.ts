import { getAllInstructors } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllInstructors = () => {
  return useQuery({
    queryKey: ["instructor"],
    queryFn: getAllInstructors,
  });
};
