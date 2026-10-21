import {
  createExam,
  deleteExam,
  getAllExams,
  getExamById,
  updateExam,
} from "@/api";
import { IUpdateExamPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllExams = () => {
  return useQuery({
    queryKey: ["exam"],
    queryFn: getAllExams,
  });
};

export const useGetExams = useGetAllExams;

export const useGetExamById = (examId: string) => {
  return useQuery({
    queryKey: ["exam", examId],
    queryFn: () => getExamById(examId),
    enabled: Boolean(examId),
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });
};

export const useUpdateExam = (examId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateExamPayload) => updateExam(examId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });
};

export const useDeleteExam = (examId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteExam(examId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam"] });
    },
  });
};
