import UpdateCourseForm from "@/components/form/course/update-course-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Course } from "@/types";

interface DepartmentUpdateDialogProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseUpdateDialog = ({
  course,
  open,
  onOpenChange,
}: DepartmentUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
          <DialogDescription>
            This Department will be visible to students
          </DialogDescription>
        </DialogHeader>

        <UpdateCourseForm
          handleClose={() => onOpenChange(false)}
          course={course}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseUpdateDialog;
