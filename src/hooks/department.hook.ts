import { getAllDepartments } from "@/api";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: getAllDepartments,
  });
};
export const useSuspenseGetAllDepartments = () => {
  return useSuspenseQuery({
    queryKey: ["department"],
    queryFn: getAllDepartments,
  });
};
