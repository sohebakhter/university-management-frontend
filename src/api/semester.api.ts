import { apiClient } from "@/lib/apiClient";
import {
  ICreateSemesterPayload,
  IUpdateSemesterPayload,
  SemesterStatus,
} from "@/types";

export const getAllSemesters = () => {
  return apiClient("/semester");
};
export const createSemester = (payload: ICreateSemesterPayload) => {
  return apiClient(`/semester`, {
    method: "POST",
    body: payload,
  });
};
export const updateSemester = (
  semesterId: string,
  payload: IUpdateSemesterPayload,
) => {
  return apiClient(`/semester/${semesterId}`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateSemesterStatus = (
  semesterId: string,
  data: { status: SemesterStatus },
) => {
  return apiClient(`/semester/${semesterId}/status`, {
    method: "PATCH",
    body: data,
  });
};

export const deleteSemester = (semesterId: string) => {
  return apiClient(`/semester/${semesterId}`, {
    method: "DELETE",
  });
};
