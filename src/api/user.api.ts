import { apiClient } from "@/lib/apiClient";

export const getAllInstructors = () => {
  return apiClient("/user/instructors");
};
