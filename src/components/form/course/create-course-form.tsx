import { useForm } from "@tanstack/react-form";
import { useCreateCourse, useGetAllDepartments } from "@/hooks";
import { toast } from "sonner";
import { CreateCourseZodSchema } from "@/validation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department } from "@/types";

const CreateCourseForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createCourse, isPending } = useCreateCourse();
  const { data } = useGetAllDepartments();

  const departments = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      code: "",
      title: "",
      credit: "",
      departmentId: "",
    },
    validators: {
      onSubmit: CreateCourseZodSchema,
    },
    onSubmit: ({ value }) => {
      const courseData = {
        code: value.code,
        title: value.title,
        credit: Number(value.credit),
        departmentId: value.departmentId,
      };

      createCourse(courseData, {
        onSuccess: () => {
          toast.success("Department created successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error creating schedule:", error);
          toast.error(error.message || "Failed to create department");
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
                <FieldLabel htmlFor={field.name}>Course Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Course Name"
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
                  placeholder="Course Credit"
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
        <form.Field name="departmentId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Department</FieldLabel>

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
          {isPending ? "Creating..." : "Submit"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CreateCourseForm;
