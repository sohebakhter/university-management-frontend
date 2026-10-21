import { getMe } from "@/api";
import { useGoogleOAuth } from "@/hooks";
import { UserRole } from "@/types";
import { GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const dashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin",
  INSTRUCTOR: "/instructor",
  STUDENT: "/student",
};

const GoogleLoginComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("Google OAuth Failed");
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: async () => {
          toast.success("Google Login Successful");
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          try {
            const userRes = await queryClient.fetchQuery({
              queryKey: ["user"],
              queryFn: getMe,
            });
            const role = userRes?.data?.role as UserRole | undefined;
            if (role && dashboardRoute[role]) {
              router.push(dashboardRoute[role]);
              return;
            }
          } catch {
            // fallback if query fails
          }
          router.push("/");
        },
        onError: (err) => {
          toast.error(err.message || "Something went wrong, please try again");
        },
      },
    );
  };
  const handleGoogleError = () => {
    toast.error("Google OAuth Failed");
  };
  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        text="continue_with"
        shape="pill"
        width="320"
        containerProps={{
          className: "w-full flex justify-center",
        }}
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default GoogleLoginComponent;
