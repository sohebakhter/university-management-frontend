import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateDepartment } from "@/hooks";
import { toast } from "sonner";
import { CreateDepartmentZodSchema } from "@/validation";

const CreateDepartmentForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createDepartment, isPending } = useCreateDepartment();
  const form = useForm({
    defaultValues: {
      code: "",
      name: "",
    },
    validators: {
      onSubmit: CreateDepartmentZodSchema,
    },
    onSubmit: ({ value }) => {
      const departmentValue = {
        code: value.code,
        name: value.name,
      };

      createDepartment(departmentValue, {
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
                <FieldLabel htmlFor={field.name}>Department Code</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Department Code"
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
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Department Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Department Name"
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Submit"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CreateDepartmentForm;
