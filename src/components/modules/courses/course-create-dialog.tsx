import CreateCourseForm from "@/components/form/course/create-course-form";
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

const CourseCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            This Course will be visible to students
          </DialogDescription>
        </DialogHeader>

        <CreateCourseForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseCreateDialog;
