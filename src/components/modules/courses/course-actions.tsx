import { Button } from "@/components/ui/button";
import { useDeleteCourse } from "@/hooks";
import { Course } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import CourseUpdateDialog from "./course-update-dialog";

const CourseActions = ({ course }: { course: Course }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse(
    course.id,
  );

  const handleDelete = () => {
    deleteCourse(undefined, {
      onSuccess: () => {
        console.log("Course deleted successfully");
        toast.success("Course deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting Course:", error);
        toast.error(error.message || "Error deleting Course");
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

      <CourseUpdateDialog
        course={course}
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

export default CourseActions;
