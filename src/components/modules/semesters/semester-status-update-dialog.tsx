import UpdateSemesterStatusForm from "@/components/form/semester/update-semester-status-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Semester } from "@/types";

interface SemesterUpdateDialogProps {
  semester: Semester;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SemesterStatusUpdateDialog = ({
  semester,
  open,
  onOpenChange,
}: SemesterUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Semester Status</DialogTitle>
          <DialogDescription>
            This Semester will be visible to students
          </DialogDescription>
        </DialogHeader>
        <UpdateSemesterStatusForm
          handleClose={() => onOpenChange(false)}
          semester={semester}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SemesterStatusUpdateDialog;
