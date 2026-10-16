import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useGetAllDepartments, useUpdateCourse } from "@/hooks";
import { toast } from "sonner";
import { UpdateCourseZodSchema } from "@/validation";
import { Course, Department } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  course: Course;
  handleClose: () => void;
}
const UpdateCourseForm = ({ course, handleClose }: Props) => {
  const { mutate: updateDepartment, isPending } = useUpdateCourse(course.id);
  const { data } = useGetAllDepartments();
  const departments = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      code: course.code,
      title: course.title,
      credit: course.credit,
      departmentId: course.departmentId,
    },
    validators: {
      onSubmit: UpdateCourseZodSchema,
    },
    onSubmit: ({ value }) => {
      const courseData = {
        code: value.code,
        title: value.title,
        credit: value.credit,
        departmentId: value.departmentId,
      };

      updateDepartment(courseData, {
        onSuccess: () => {
          toast.success("Department updated successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating department:", error);
          toast.error(error.message || "Failed to update department");
          handleClose();
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
        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Course Code</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Course Code"
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors}></FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Course Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Course Title"
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors}></FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="credit">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Course Credit</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="1"
                  placeholder="Course Credit"
                  value={field.state.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(value === "" ? 0 : Number(value));
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="departmentId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Choose Department</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>

                  <SelectContent>
                    {departments.map((department: Department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
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

export default UpdateCourseForm;
