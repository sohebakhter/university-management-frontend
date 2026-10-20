"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteExam } from "@/hooks";
import ExamUpdateDialog from "./exam-update-dialog";

const ExamActions = ({ exam }: { exam: Exam }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam(
    exam.id,
  );

  const handleDelete = () => {
    deleteExam(undefined, {
      onSuccess: () => {
        toast.success("Exam deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting exam:", error);
        toast.error(error.message || "Error deleting exam");
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

      <ExamUpdateDialog
        exam={exam}
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

export default ExamActions;
