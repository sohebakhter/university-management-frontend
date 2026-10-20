import { apiClient } from "@/lib/apiClient";
import {
  IBulkCreateResultPayload,
  ICreateResultPayload,
  IUpdateResultPayload,
} from "@/types";

export const createResult = (payload: ICreateResultPayload) => {
  return apiClient("/result", { method: "POST", body: payload });
};

export const bulkCreateResult = (payload: IBulkCreateResultPayload) => {
  return apiClient("/result/bulk", { method: "POST", body: payload });
};

export const getMyResults = () => {
  return apiClient("/result/my");
};

export const getResultsByRegistration = (registrationId: string) => {
  return apiClient(`/result/registration/${registrationId}`);
};

export const updateResult = (
  resultId: string,
  payload: IUpdateResultPayload,
) => {
  return apiClient(`/result/${resultId}`, { method: "PATCH", body: payload });
};
