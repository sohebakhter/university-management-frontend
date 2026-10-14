import { getMe, googleOAuth, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};
