"use client";

import UpdateResultForm from "@/components/form/result/update-result-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Result } from "@/types";

interface ResultUpdateDialogProps {
  result: Result;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResultUpdateDialog = ({
  result,
  open,
  onOpenChange,
}: ResultUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Result</DialogTitle>
          <DialogDescription>
            Update marks, grade, or status for this student's result
          </DialogDescription>
        </DialogHeader>

        <UpdateResultForm
          handleClose={() => onOpenChange(false)}
          result={result}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ResultUpdateDialog;
