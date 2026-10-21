"use client";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import Link from "next/link";
import UserProfileDropdown from "./user-profile-dropdown";

const Header = () => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: "About Us", path: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    INSTRUCTOR: "/instructor",
    STUDENT: "/student",
  };

  const { data, isLoading } = useGetMe();

  const role: UserRole = !!data?.data && data?.data?.role;

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
          {!isLoading && data && <UserProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
