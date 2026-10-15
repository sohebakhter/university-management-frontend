import { apiClient } from "@/lib/apiClient";

export const getAllDepartments = () => {
  return apiClient("/department");
};
