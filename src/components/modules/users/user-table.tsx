"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllUsers, useUpdateUserStatus } from "@/hooks";
import { IUserFilterParams, User } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

interface UserTableProps {
  params: IUserFilterParams;
  setPage: Dispatch<SetStateAction<number>>;
}

const UserTable = ({ params, setPage }: UserTableProps) => {
  const { data } = useSuspenseGetAllUsers(params);
  const users: User[] = data?.data || [];

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-5">
        <TablePagination
          totalPages={data.meta?.totalPages ?? 0}
          setPage={setPage}
          page={params.page ?? 1}
        />
      </div>
    </>
  );
};

const UserRow = ({ user }: { user: User }) => {
  const { mutate: updateStatus, isPending } = useUpdateUserStatus(user.id);

  const handleToggleStatus = () => {
    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    updateStatus(
      { status: newStatus },
      {
        onSuccess: () => {
          toast.success(`User ${newStatus === "SUSPENDED" ? "blocked" : "activated"} successfully`);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update user status");
        },
      },
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant="outline">{user.role}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>{format(new Date(user.createdAt), "PPP")}</TableCell>
      <TableCell className="text-right">
        <Button
          variant={user.status === "ACTIVE" ? "destructive" : "default"}
          size="sm"
          onClick={handleToggleStatus}
          disabled={isPending}
        >
          {isPending
            ? "Updating..."
            : user.status === "ACTIVE"
              ? "Block"
              : "Activate"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTable;
