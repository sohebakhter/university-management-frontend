import GuestGuard from "@/components/auth/guest-guard";
import { ReactNode } from "react";

export const metadata = {
  title: "Authentication | SAB University",
  description: "Secure login and registration portal for SAB University.",
};

const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthenticationLayout;
