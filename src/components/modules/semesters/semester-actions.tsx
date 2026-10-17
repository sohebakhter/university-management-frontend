import { Button } from "@/components/ui/button";
import { Semester } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import SemesterUpdateDialog from "./semester-update-dialog";
import { useDeleteSemester } from "@/hooks";
import SemesterStatusUpdateDialog from "./semester-status-update-dialog";

const SemesterActions = ({ semester }: { semester: Semester }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);

  const { mutate: deleteSemester, isPending: isDeleting } = useDeleteSemester(
    semester.id,
  );

  const locked = semester.status === "COMPLETED";

  const handleDelete = () => {
    deleteSemester(undefined, {
      onSuccess: () => {
        console.log("semester deleted successfully");
        toast.success("semester deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting semester:", error);
        toast.error(error.message || "Error deleting semester");
      },
    });
  };

  if (confirmDelete) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setConfirmDelete(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <Button variant="default" size="sm" onClick={() => setIsUpdateOpen(true)}>
        Update
      </Button>

      <SemesterUpdateDialog
        semester={semester}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />

      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsUpdateStatusOpen(true)}
        disabled={locked}
      >
        Publish
      </Button>

      <SemesterStatusUpdateDialog
        semester={semester}
        open={isUpdateStatusOpen}
        onOpenChange={setIsUpdateStatusOpen}
      />

      <Button
        variant="destructive"
        size="sm"
        onClick={() => setConfirmDelete(true)}
      >
        Delete
      </Button>
    </div>
  );
};

export default SemesterActions;
