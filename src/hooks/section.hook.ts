import {
  createSection,
  deleteSection,
  getAllSections,
  updateSection,
} from "@/api";
import { IUpdateSectionPayload } from "@/types";
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

export const useUpdateSection = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateSectionPayload) =>
      updateSection(sectionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};

export const useDeleteSection = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section"] });
    },
  });
};
