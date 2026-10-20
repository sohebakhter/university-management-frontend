import {
  bulkCreateResult,
  createResult,
  getMyResults,
  getResultsByRegistration,
  updateResult,
} from "@/api";
import { IUpdateResultPayload } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["result"] });
    },
  });
};

export const useBulkCreateResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCreateResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["result"] });
    },
  });
};

export const useGetMyResults = () => {
  return useQuery({
    queryKey: ["result", "my"],
    queryFn: getMyResults,
  });
};

export const useGetResultsByRegistration = (registrationId: string) => {
  return useQuery({
    queryKey: ["result", "registration", registrationId],
    queryFn: () => getResultsByRegistration(registrationId),
    enabled: Boolean(registrationId),
  });
};

export const useUpdateResult = (resultId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateResultPayload) =>
      updateResult(resultId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["result"] });
    },
  });
};
