"use client";

import UpdateExamForm from "@/components/form/exam/update-exam-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Exam } from "@/types";

interface ExamUpdateDialogProps {
  exam: Exam;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExamUpdateDialog = ({
  exam,
  open,
  onOpenChange,
}: ExamUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Exam</DialogTitle>
          <DialogDescription>
            Update the details of this examination
          </DialogDescription>
        </DialogHeader>

        <UpdateExamForm
          handleClose={() => onOpenChange(false)}
          exam={exam}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExamUpdateDialog;
