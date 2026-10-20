import { bulkMarkAttendance, getMySections, getSectionAttendance, getSectionStudents } from "@/api";
import { IBulkMarkAttendancePayload } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetMySections = () => {
  return useQuery({
    queryKey: ["section", "my"],
    queryFn: getMySections,
  });
};

export const useGetSectionStudents = (sectionId: string) => {
  return useQuery({
    queryKey: ["section", sectionId, "students"],
    queryFn: () => getSectionStudents(sectionId),
    enabled: Boolean(sectionId),
  });
};

export const useBulkMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBulkMarkAttendancePayload) =>
      bulkMarkAttendance(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendance", "section", variables.sectionId],
      });
    },
  });
};

export const useGetSectionAttendance = (sectionId: string) => {
  return useQuery({
    queryKey: ["attendance", "section", sectionId],
    queryFn: () => getSectionAttendance(sectionId),
    enabled: Boolean(sectionId),
  });
};
