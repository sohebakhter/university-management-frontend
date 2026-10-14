import { Suspense } from "react";
import Logo from "@/assets/svg/Logo";
import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "@/components/form/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
            <span>SAB University</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Suspense
              fallback={
                <p className="text-center text-sm text-muted-foreground">
                  Loading...
                </p>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.jfif"
          alt="University Background"
          fill
          priority
          unoptimized
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
