"use client";

import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { LogOut, User as UserIcon } from "lucide-react";

import { useRouter } from "next/navigation";

const profileRoutes: Record<UserRole, string> = {
  ADMIN: "/admin/profile",
  INSTRUCTOR: "/instructor/profile",
  STUDENT: "/student/profile",
};

const UserProfileDropdown = () => {
  const router = useRouter();
  const { data } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const user = data?.data;

  if (!user) return null;

  const role: UserRole = user.role;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout Successful");
        queryClient.setQueryData(["user"], null);
        queryClient.clear();
        router.push("/login");
      },
      onError: (err) => {
        toast.error(err.message || "Logout Failed");
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
        >
          <Avatar size="default">
            {user.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={user.name} />
            ) : null}
            <AvatarFallback className="text-xs font-semibold bg-linear-to-br from-indigo-500 to-violet-500 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileRoutes[role]} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          variant="destructive"
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
