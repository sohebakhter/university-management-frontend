import CreateCourseForm from "@/components/form/course/create-course-form";
import CreateSemesterForm from "@/components/form/semester/create-semester-form";
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

const SemesterCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Semester
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Semester</DialogTitle>
          <DialogDescription>
            This Semester will be visible to students
          </DialogDescription>
        </DialogHeader>

        <CreateSemesterForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SemesterCreateDialog;
