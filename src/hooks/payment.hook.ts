import {
  bkashCheckout,
  getMyPayments,
  getPaymentById,
  initiateBkashPayment,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBkashCheckout = () => {
  return useMutation({
    mutationFn: bkashCheckout,
  });
};
export const useInitiateBkashPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: initiateBkashPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
  });
};
export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: getMyPayments,
  });
};
export const useGetPaymentById = (paymentId: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPaymentById(paymentId),
    enabled: Boolean(paymentId),
  });
};
