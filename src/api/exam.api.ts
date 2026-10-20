import { apiClient } from "@/lib/apiClient";
import { ICreateExamPayload, IUpdateExamPayload } from "@/types";

export const getAllExams = () => {
  return apiClient("/exam");
};

export const getExamById = (examId: string) => {
  return apiClient(`/exam/${examId}`);
};

export const createExam = (payload: ICreateExamPayload) => {
  return apiClient("/exam", { method: "POST", body: payload });
};

export const updateExam = (examId: string, payload: IUpdateExamPayload) => {
  return apiClient(`/exam/${examId}`, { method: "PATCH", body: payload });
};

export const deleteExam = (examId: string) => {
  return apiClient(`/exam/${examId}`, { method: "DELETE" });
};
