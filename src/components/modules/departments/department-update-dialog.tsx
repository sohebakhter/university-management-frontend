import UpdateDepartmentForm from "@/components/form/update-department-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Department } from "@/types";

interface DepartmentUpdateDialogProps {
  department: Department;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DepartmentUpdateDialog = ({ department, open, onOpenChange,}: DepartmentUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
          <DialogDescription>
            This Department will be visible to students
          </DialogDescription>
        </DialogHeader>

        <UpdateDepartmentForm
          handleClose={() => onOpenChange(false)}
          department={department}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentUpdateDialog;
