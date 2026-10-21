"use client";

import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth.loading";

const dashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin",
  INSTRUCTOR: "/instructor",
  STUDENT: "/student",
};

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useGetMe();
  const user = data?.data;

  const role = user?.role as UserRole | undefined;
  const targetDashboard = role ? dashboardRoute[role] : null;

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (targetDashboard) {
      router.replace(targetDashboard);
    }
  }, [isPending, targetDashboard, router]);

  if (isPending) {
    return <AuthLoading label="Checking authentication..." />;
  }

  if (targetDashboard) {
    return <AuthLoading label="Redirecting to dashboard..." />;
  }

  return <>{children}</>;
}
