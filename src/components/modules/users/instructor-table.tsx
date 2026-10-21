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
import {
  useSuspenseGetAllInstructors,
  useUpdateInstructorStatus,
} from "@/hooks";
import { Instructor, InstructorStatus } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

const InstructorTable = () => {
  const { data } = useSuspenseGetAllInstructors();
  const instructors: Instructor[] = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No instructors found.
              </TableCell>
            </TableRow>
          )}
          {instructors.map((instructor) => (
            <InstructorRow key={instructor.id} instructor={instructor} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const statusVariant = (status: InstructorStatus) => {
  switch (status) {
    case "APPROVED":
      return "default" as const;
    case "PENDING":
      return "secondary" as const;
    case "REJECTED":
      return "destructive" as const;
  }
};

const InstructorRow = ({ instructor }: { instructor: Instructor }) => {
  const [confirmAction, setConfirmAction] = useState<InstructorStatus | null>(
    null,
  );
  const { mutate: updateStatus, isPending } = useUpdateInstructorStatus(
    instructor.id,
  );

  const handleStatusUpdate = (status: InstructorStatus) => {
    updateStatus(
      { instructorStatus: status },
      {
        onSuccess: () => {
          toast.success(`Instructor ${status.toLowerCase()} successfully`);
          setConfirmAction(null);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update instructor status");
          setConfirmAction(null);
        },
      },
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{instructor.name}</TableCell>
      <TableCell>{instructor.email}</TableCell>
      <TableCell>{instructor.designation || "—"}</TableCell>
      <TableCell>
        <Badge variant={statusVariant(instructor.instructorStatus)}>
          {instructor.instructorStatus}
        </Badge>
      </TableCell>
      <TableCell>{format(new Date(instructor.createdAt), "PPP")}</TableCell>
      <TableCell className="text-right">
        {confirmAction ? (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmAction(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant={confirmAction === "REJECTED" ? "destructive" : "default"}
              size="sm"
              onClick={() => handleStatusUpdate(confirmAction)}
              disabled={isPending}
            >
              {isPending ? "Updating..." : `Confirm ${confirmAction.toLowerCase()}`}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            {instructor.instructorStatus !== "APPROVED" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setConfirmAction("APPROVED")}
              >
                Approve
              </Button>
            )}
            {instructor.instructorStatus !== "REJECTED" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmAction("REJECTED")}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default InstructorTable;
