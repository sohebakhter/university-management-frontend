import { createSection, getAllSections } from "@/api";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useSuspenseGetAllSections = () => {
  return useSuspenseQuery({
    queryKey: ["section"],
    queryFn: getAllSections,
  });
};
export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};
