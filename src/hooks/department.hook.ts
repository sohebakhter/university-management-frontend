import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
} from "@/api";
import { IUpdateDepartmentPayload } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: getAllDepartments,
  });
};
export const useSuspenseGetAllDepartments = () => {
  return useSuspenseQuery({
    queryKey: ["department"],
    queryFn: getAllDepartments,
  });
};
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};
export const useUpdateDepartment = (departmentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateDepartmentPayload) =>
      updateDepartment(departmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};
export const useDeleteDepartment = (doctorId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteDepartment(doctorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};
