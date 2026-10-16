import { apiClient } from "@/lib/apiClient";
import { ICreateCoursePayload, IUpdateCoursePayload } from "@/types";

export const getAllCourses = () => {
  return apiClient("/course");
};
export const deleteCourse = (courseId: string) => {
  return apiClient(`/course/${courseId}`, { method: "DELETE" });
};
export const createCourse = (payload: ICreateCoursePayload) => {
  return apiClient(`/course`, { method: "POST", body: payload });
};
export const updateCourse = (
  courseId: string,
  payload: IUpdateCoursePayload,
) => {
  return apiClient(`/course/${courseId}`, { method: "PATCH", body: payload });
};
