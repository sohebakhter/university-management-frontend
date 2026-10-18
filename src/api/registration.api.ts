import { apiClient } from "@/lib/apiClient";
import { RegistrationStatus } from "@/types";

export const getAllRegistrations = () => {
  return apiClient("/registration");
};
export const getMyRegistrations = () => {
  return apiClient("/registration/my");
};
export const dropRegistration = (registrationId: string) => {
  return apiClient(`/registration/${registrationId}/drop`, { method: "PATCH" });
};
export const updateRegistrationStatus = (
  registrationId: string,
  data: { status: RegistrationStatus },
) => {
  return apiClient(`/registration/${registrationId}/status`, {
    method: "PATCH",
    body: data,
  });
};

export const createRegistration = (data: { sectionId: string }) => {
  return apiClient("/registration", { method: "POST", body: data });
};
