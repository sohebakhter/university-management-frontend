"use client";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

const Header = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    INSTRUCTOR: "/instructor",
    STUDENT: "/student",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole = !!data?.data && data?.data?.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout Successful");
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        toast.error(err.message || "Logout Failed");
      },
    });
  };
  return (
    <header className="bg-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo></Logo>
          <span>SAB University</span>
        </Link>
        <nav className="flex space-x-4">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              {route.name}
            </Link>
          ))}

          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
