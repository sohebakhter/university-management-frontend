import {
  createRegistration,
  dropRegistration,
  getAllRegistrations,
  getMyRegistrations,
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
export const useGetMyRegistrations = () => {
  return useQuery({
    queryKey: ["registration", "my"],
    queryFn: getMyRegistrations,
  });
};
export const useSuspenseGetMyRegistrations = () => {
  return useSuspenseQuery({
    queryKey: ["registration", "my"],
    queryFn: getMyRegistrations,
  });
};

export const useDropRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dropRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registration"],
      });
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

export const useCreateRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registration"],
      });
    },
  });
};
