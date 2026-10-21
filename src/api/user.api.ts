import { apiClient } from "@/lib/apiClient";
import {
  IUpdateInstructorPayload,
  IUpdateInstructorStatusPayload,
  IUpdateStudentPayload,
  IUpdateUserStatusPayload,
  IUserFilterParams,
} from "@/types";

// ---- Users ----
export const getAllUsers = (params: IUserFilterParams = {}) => {
  return apiClient("/user", { params });
};

export const getSingleUser = (userId: string) => {
  return apiClient(`/user/${userId}`);
};

export const updateUserStatus = (
  userId: string,
  payload: IUpdateUserStatusPayload,
) => {
  return apiClient(`/user/${userId}/status`, {
    method: "PATCH",
    body: payload,
  });
};

// ---- Instructors ----
export const getAllInstructors = () => {
  return apiClient("/user/instructors");
};

export const getSingleInstructor = (instructorId: string) => {
  return apiClient(`/user/instructors/${instructorId}`);
};

export const updateInstructor = (
  instructorId: string,
  payload: IUpdateInstructorPayload,
) => {
  return apiClient(`/user/instructors/${instructorId}`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateInstructorStatus = (
  instructorId: string,
  payload: IUpdateInstructorStatusPayload,
) => {
  return apiClient(`/user/instructors/${instructorId}/status`, {
    method: "PATCH",
    body: payload,
  });
};

// ---- Students ----
export const getAllStudents = () => {
  return apiClient("/user/students");
};

export const getSingleStudent = (studentId: string) => {
  return apiClient(`/user/students/${studentId}`);
};

export const updateStudent = (
  studentId: string,
  payload: IUpdateStudentPayload,
) => {
  return apiClient(`/user/students/${studentId}`, {
    method: "PATCH",
    body: payload,
  });
};

// ---- Update User (with profile image) ----
export const updateUser = (userId: string, formData: FormData) => {
  return apiClient(`/user/${userId}`, {
    method: "PATCH",
    body: formData,
  });
};
