import { apiClient } from "@/lib/apiClient";
import { IBulkMarkAttendancePayload } from "@/types";

export const getMySections = () => {
  return apiClient("/section/my");
};

export const getSectionStudents = (sectionId: string) => {
  return apiClient(`/section/${sectionId}/students`);
};

export const bulkMarkAttendance = (payload: IBulkMarkAttendancePayload) => {
  return apiClient("/attendance/bulk", { method: "POST", body: payload });
};

export const getSectionAttendance = (sectionId: string) => {
  return apiClient(`/attendance/section/${sectionId}`);
};

export const getMyAttendance = () => {
  return apiClient("/attendance/my");
};
