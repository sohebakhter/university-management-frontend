import { apiClient } from "@/lib/apiClient";
import { ILoginPayload } from "@/types";

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};
export const userLogin = (payload: ILoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const getMe = () => {
  return apiClient("/auth/me");
};

export const googleOAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", { method: "POST", body: payload });
};
