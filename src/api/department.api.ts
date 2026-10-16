import { apiClient } from "@/lib/apiClient";
import { ICreateDepartmentPayload, IUpdateDepartmentPayload } from "@/types";

export const getAllDepartments = () => {
  return apiClient("/department");
};
export const createDepartment = (payload: ICreateDepartmentPayload) => {
  return apiClient("/department", { method: "POST", body: payload });
};
export const updateDepartment = (
  departmentId: string,
  payload: IUpdateDepartmentPayload,
) => {
  return apiClient(`/department/${departmentId}`, {
    method: "PATCH",
    body: payload,
  });
};
export const deleteDepartment = (departmentId: string) => {
  return apiClient(`/department/${departmentId}`, {
    method: "DELETE",
  });
};
