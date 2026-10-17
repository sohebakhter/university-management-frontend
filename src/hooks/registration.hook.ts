import {
  dropRegistration,
  getAllRegistrations,
  updateRegistrationStatus,
} from "@/api";
import { RegistrationStatus } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetAllRegistrations = () => {
  return useQuery({
    queryKey: ["registration"],
    queryFn: getAllRegistrations,
  });
};
export const useSuspenseGetAllRegistrations = () => {
  return useSuspenseQuery({
    queryKey: ["registration"],
    queryFn: getAllRegistrations,
  });
};

export const useDropRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dropRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
    },
  });
};

export const useUpdateRegistrationStatus = (registrationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { status: RegistrationStatus }) =>
      updateRegistrationStatus(registrationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
    },
  });
};
