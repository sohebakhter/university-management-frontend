import { apiClient } from "@/lib/apiClient";
import { ICreateSectionPayload, IUpdateSectionPayload } from "@/types";

export const getAllSections = () => {
  return apiClient("/section");
};

export const createSection = (payload: ICreateSectionPayload) => {
  return apiClient("/section", { method: "POST", body: payload });
};
export const updateSection = (
  sectionId: string,
  payload: IUpdateSectionPayload,
) => {
  return apiClient(`/section/${sectionId}`, { method: "PATCH", body: payload });
};
export const deleteSection = (sectionId: string) => {
  return apiClient(`/section/${sectionId}`, { method: "DELETE" });
};
