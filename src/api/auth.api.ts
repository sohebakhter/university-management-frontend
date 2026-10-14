import { apiClient } from "@/lib/apiClient";
import {
  ILoginPayload,
  IRegistrationPayload,
  IVerifyAccountPayload,
} from "@/types";

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

export const userRegistration = (payload: IRegistrationPayload) => {
  return apiClient("/auth/register", { method: "POST", body: payload });
};

export const verifyAccount = (payload: IVerifyAccountPayload) => {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
};
