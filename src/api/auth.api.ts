import { apiClient } from "@/lib/apiClient";

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};
export const userLogin = (payload: any) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const getMe = () => {
  return apiClient("/auth/me");
};
