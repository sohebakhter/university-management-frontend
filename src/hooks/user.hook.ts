import {
  getAllInstructors,
  getAllStudents,
  getAllUsers,
  getSingleInstructor,
  getSingleStudent,
  getSingleUser,
  updateInstructor,
  updateInstructorStatus,
  updateStudent,
  updateUser,
  updateUserStatus,
} from "@/api";
import {
  IUpdateInstructorPayload,
  IUpdateInstructorStatusPayload,
  IUpdateStudentPayload,
  IUpdateUserStatusPayload,
  IUserFilterParams,
} from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

// ---- Users ----
export const useGetAllUsers = (params: IUserFilterParams = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
};

export const useSuspenseGetAllUsers = (params: IUserFilterParams = {}) => {
  return useSuspenseQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
};

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getSingleUser(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserStatus = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateUserStatusPayload) =>
      updateUserStatus(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ---- Instructors ----
export const useGetAllInstructors = () => {
  return useQuery({
    queryKey: ["instructor"],
    queryFn: getAllInstructors,
  });
};

export const useSuspenseGetAllInstructors = () => {
  return useSuspenseQuery({
    queryKey: ["instructor"],
    queryFn: getAllInstructors,
  });
};

export const useGetSingleInstructor = (instructorId: string) => {
  return useQuery({
    queryKey: ["instructor", instructorId],
    queryFn: () => getSingleInstructor(instructorId),
    enabled: !!instructorId,
  });
};

export const useUpdateInstructor = (instructorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateInstructorPayload) =>
      updateInstructor(instructorId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor"] });
    },
  });
};

export const useUpdateInstructorStatus = (instructorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateInstructorStatusPayload) =>
      updateInstructorStatus(instructorId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor"] });
    },
  });
};

// ---- Students ----
export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ["student"],
    queryFn: getAllStudents,
  });
};

export const useSuspenseGetAllStudents = () => {
  return useSuspenseQuery({
    queryKey: ["student"],
    queryFn: getAllStudents,
  });
};

export const useGetSingleStudent = (studentId: string) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getSingleStudent(studentId),
    enabled: !!studentId,
  });
};

export const useUpdateStudent = (studentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateStudentPayload) =>
      updateStudent(studentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
  });
};

// ---- Update User (profile) ----
export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateUser(userId, formData),
    onSuccess: (res: any) => {
      if (res?.data) {
        queryClient.setQueryData(["user"], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              ...res.data,
            },
          };
        });
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
