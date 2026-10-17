import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Button } from "../../ui/button";
import { useUpdateSemesterStatus } from "@/hooks";
import { toast } from "sonner";
import { Semester, SemesterStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateSemesterStatusZodSchema } from "@/validation";

interface Props {
  semester: Semester;
  handleClose: () => void;
}
const UpdateSemesterStatusForm = ({ semester, handleClose }: Props) => {
  const { mutate: updateSemester, isPending } = useUpdateSemesterStatus(
    semester.id,
  );

  const form = useForm({
    defaultValues: {
      status: semester.status,
    },
    validators: {
      onSubmit: UpdateSemesterStatusZodSchema,
    },
    onSubmit: ({ value }) => {
      const semesterData = {
        status: value.status as SemesterStatus,
      };

      updateSemester(semesterData, {
        onSuccess: () => {
          toast.success("Semester updated successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating Semester:", error);
          toast.error(error.message || "Failed to update Semester");
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="status">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>status</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    field.handleChange(
                      value as
                        | "UPCOMING"
                        | "REGISTRATION_OPEN"
                        | "ONGOING"
                        | "COMPLETED",
                    );
                  }}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                    <SelectItem value="REGISTRATION_OPEN">
                      REGISTRATION_OPEN
                    </SelectItem>
                    <SelectItem value="ONGOING">ONGOING</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default UpdateSemesterStatusForm;
