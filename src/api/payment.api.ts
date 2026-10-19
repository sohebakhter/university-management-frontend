import { apiClient } from "@/lib/apiClient";

export const bkashCheckout = (data: { semesterId: string }) => {
  return apiClient("/payment/checkout", { method: "POST", body: data });
};
export const initiateBkashPayment = (data: { paymentId: string }) => {
  return apiClient("/payment/bkash/initiate", { method: "POST", body: data });
};
export const getMyPayments = () => {
  return apiClient("/payment/my");
};
export const getPaymentById = (paymentId: string) => {
  return apiClient(`/payment/${paymentId}`);
};
