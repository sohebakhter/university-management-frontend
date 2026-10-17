import UpdateSemesterForm from "@/components/form/semester/update-semester-form";
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

const SemesterUpdateDialog = ({
  semester,
  open,
  onOpenChange,
}: SemesterUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Semester</DialogTitle>
          <DialogDescription>
            This Semester will be visible to students
          </DialogDescription>
        </DialogHeader>

        <UpdateSemesterForm
          handleClose={() => onOpenChange(false)}
          semester={semester}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SemesterUpdateDialog;
