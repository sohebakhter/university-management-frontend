"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserProfileDropdown from "./user-profile-dropdown";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Logo />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              SAB University
            </span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Management Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                pathname.startsWith(dashboardRoute[role])
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <LayoutDashboard className="size-3.5" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right Action: Auth & Mobile Menu */}
        <div className="flex items-center gap-3">
          {!isLoading && !data && (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/login" className="flex items-center gap-1.5">
                <LogIn className="size-3.5" />
                <span>Portal Login</span>
              </Link>
            </Button>
          )}

          {!isLoading && data && <UserProfileDropdown />}

          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md px-4 py-4 space-y-2">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

          {role && (
            <Link
              href={dashboardRoute[role]}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground"
            >
              <LayoutDashboard className="size-4" />
              <span>Go to Dashboard</span>
            </Link>
          )}

          {!isLoading && !data && (
            <div className="pt-2">
              <Button asChild size="sm" className="w-full">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="size-4" />
                  <span>Portal Login</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
