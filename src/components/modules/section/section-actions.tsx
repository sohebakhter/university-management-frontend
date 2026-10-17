import { Button } from "@/components/ui/button";
import { Section } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
// import SemesterUpdateDialog from "./semester-update-dialog";
import { useDeleteSection } from "@/hooks";
import SectionUpdateDialog from "./section-update-dialog";

const SectionActions = ({ section }: { section: Section }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { mutate: deleteSection, isPending: isDeleting } = useDeleteSection(
    section.id,
  );

  const handleDelete = () => {
    deleteSection(undefined, {
      onSuccess: () => {
        console.log("section deleted successfully");
        toast.success("section deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting section:", error);
        toast.error(error.message || "Error deleting section");
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

      <SectionUpdateDialog
        section={section}
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

export default SectionActions;
