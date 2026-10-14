import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default AdminLayout;
