import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex gap-3 justify-center items-center w-full h-screen">
      <div className="bg-red-200 rounded-full p-4">
        <ShieldAlertIcon className="size-8 text-red-500"></ShieldAlertIcon>
      </div>
      <div>
        {" "}
        <h1 className="text-lg font-semibold">
          You do not have access to this page
        </h1>{" "}
        <p>
          Go back to{" "}
          <Link href={"/"} className="underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
