import {
  createCourse,
  createSemester,
  deleteCourse,
  deleteSemester,
  getAllSemesters,
  updateSemester,
  updateSemesterStatus,
} from "@/api";
import {
  IUpdateCoursePayload,
  IUpdateSemesterPayload,
  SemesterStatus,
} from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetAllSemesters = () => {
  return useQuery({
    queryKey: ["semester"],
    queryFn: getAllSemesters,
  });
};
export const useSuspenseGetAllSemesters = () => {
  return useSuspenseQuery({
    queryKey: ["semester"],
    queryFn: getAllSemesters,
  });
};

export const useCreateSemester = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semester"] });
    },
  });
};

export const useUpdateSemester = (semesterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateSemesterPayload) =>
      updateSemester(semesterId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semester"] });
    },
  });
};
export const useUpdateSemesterStatus = (semesterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { status: SemesterStatus }) =>
      updateSemesterStatus(semesterId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semester"] });
    },
  });
};

export const useDeleteSemester = (semesterId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteSemester(semesterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semester"] });
    },
  });
};
