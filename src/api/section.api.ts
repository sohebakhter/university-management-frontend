import { apiClient } from "@/lib/apiClient";
import { ICreateSectionPayload } from "@/types";

export const getAllSections = () => {
  return apiClient("/section");
};

export const createSection = (payload: ICreateSectionPayload) => {
  return apiClient("/section", { method: "POST", body: payload });
};
