import { Button } from "@/components/ui/button";
import { useDeleteDepartment } from "@/hooks";
import { Department } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import DepartmentUpdateDialog from "./department-update-dialog";

const DepartmentActions = ({ department }: { department: Department }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { mutate: deletedepartment, isPending: isDeleting } =
    useDeleteDepartment(department.id);

  const handleDelete = () => {
    deletedepartment(undefined, {
      onSuccess: () => {
        console.log("Dept deleted successfully");
        toast.success("Department deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting Dept:", error);
        toast.error(error.message || "Error deleting Dept");
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

      <DepartmentUpdateDialog
        department={department}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
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

export default DepartmentActions;
