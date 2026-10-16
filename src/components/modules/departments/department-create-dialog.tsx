import CreateDepartmentForm from "@/components/form/create-department-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

const DepartmentCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Department
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            This Department will be visible to students
          </DialogDescription>
        </DialogHeader>

        <CreateDepartmentForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentCreateDialog;
