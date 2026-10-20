import {
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
  updateSection,
} from "@/api";
import { ISectionFilterParams, IUpdateSectionPayload } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useSuspenseGetAllSections = (params: ISectionFilterParams = {}) => {
  return useSuspenseQuery({
    queryKey: ["section", params],
    queryFn: () => getAllSections(params),
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

export const useGetSectionById = (sectionId: string) => {
  return useQuery({
    queryKey: ["section", sectionId],
    queryFn: () => getSectionById(sectionId),
    enabled: Boolean(sectionId),
  });
};
