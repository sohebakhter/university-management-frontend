import { LoaderIcon } from "lucide-react";

const AuthLoading = ({ label }: { label?: string }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-2">
        <LoaderIcon className="size-6 animate-spin"></LoaderIcon>
        {label}
      </div>
    </div>
  );
};

export default AuthLoading;
