import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GoogleLoginComponent = () => {
  const router = useRouter();
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
        onSuccess: () => {
          toast.success("Google Login Successful");
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
    <GoogleLogin
      text="continue_with"
      shape="pill"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
};

export default GoogleLoginComponent;
