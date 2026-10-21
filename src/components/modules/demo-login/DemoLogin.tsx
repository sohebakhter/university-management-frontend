"use client";

import { getMe } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { GraduationCap, School, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const dashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin",
  INSTRUCTOR: "/instructor",
  STUDENT: "/student",
};

const demoAccounts = {
  ADMIN: {
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "",
  },
  INSTRUCTOR: {
    email: process.env.NEXT_PUBLIC_DEMO_INSTRUCTOR_EMAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_INSTRUCTOR_PASSWORD || "",
  },
  STUDENT: {
    email: process.env.NEXT_PUBLIC_DEMO_STUDENT_EMAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_STUDENT_PASSWORD || "",
  },
} as const;

interface DemoLoginProps {
  onSuccess?: () => void;
  disabled?: boolean;
}

export default function DemoLogin({ onSuccess, disabled }: DemoLoginProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useLogin();
  const [activeRole, setActiveRole] = useState<
    keyof typeof demoAccounts | null
  >(null);

  const handleDemoLogin = (role: keyof typeof demoAccounts) => {
    const credentials = demoAccounts[role];

    if (!credentials.email || !credentials.password) {
      toast.error(
        `Demo credentials for ${role.toLowerCase()} are not configured in environment.`,
      );
      return;
    }

    setActiveRole(role);

    login(credentials, {
      onSuccess: async () => {
        toast.success(
          `Logged in as Demo ${role.charAt(0) + role.slice(1).toLowerCase()}`,
        );
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        try {
          const userRes = await queryClient.fetchQuery({
            queryKey: ["user"],
            queryFn: getMe,
          });
          const userRole = userRes?.data?.role as UserRole | undefined;
          if (userRole && dashboardRoute[userRole]) {
            router.push(dashboardRoute[userRole]);
            onSuccess?.();
            return;
          }
        } catch {
          // fallback
        }
        router.push("/");
        onSuccess?.();
      },
      onError: (err) => {
        setActiveRole(null);
        toast.error(err.message || `Demo ${role.toLowerCase()} login failed`);
      },
    });
  };

  const isButtonDisabled = disabled || isPending;

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="size-3 text-primary shrink-0" />
          <span>One-Click Demo Access</span>
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Admin Button */}
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => handleDemoLogin("ADMIN")}
          className="relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/60 hover:border-red-500/40 active:scale-[0.98] transition-all text-center group disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-2xs"
          title="Login with Demo Admin Account"
        >
          <div className="size-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors group-hover:bg-red-500/20">
            {isPending && activeRole === "ADMIN" ? (
              <Spinner className="size-4 text-red-600 dark:text-red-400" />
            ) : (
              <ShieldCheck className="size-4" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">
              Admin
            </span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </div>
        </button>

        {/* Instructor Button */}
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => handleDemoLogin("INSTRUCTOR")}
          className="relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/60 hover:border-blue-500/40 active:scale-[0.98] transition-all text-center group disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-2xs"
          title="Login with Demo Instructor Account"
        >
          <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors group-hover:bg-blue-500/20">
            {isPending && activeRole === "INSTRUCTOR" ? (
              <Spinner className="size-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <School className="size-4" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">
              Instructor
            </span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </div>
        </button>

        {/* Student Button */}
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={() => handleDemoLogin("STUDENT")}
          className="relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/60 hover:border-emerald-500/40 active:scale-[0.98] transition-all text-center group disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-2xs"
          title="Login with Demo Student Account"
        >
          <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors group-hover:bg-emerald-500/20">
            {isPending && activeRole === "STUDENT" ? (
              <Spinner className="size-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <GraduationCap className="size-4" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">
              Student
            </span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </div>
        </button>
      </div>
    </div>
  );
}
