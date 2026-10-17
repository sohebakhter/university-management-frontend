import { useForm } from "@tanstack/react-form";
import { useCreateSemester } from "@/hooks";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CreateSemesterZodSchema } from "@/validation";

const CreateSemesterForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createSemester, isPending } = useCreateSemester();

  const form = useForm({
    defaultValues: {
      name: "",
      year: 0,
      registrationStart: "",
      registrationEnd: "",
      feeAmount: 0,
    },
    validators: {
      onSubmit: CreateSemesterZodSchema,
    },
    onSubmit: ({ value }) => {
      const semesterData = {
        name: value.name,
        year: Number(value.year),
        registrationStart: new Date(value.registrationStart).toISOString(),
        registrationEnd: new Date(value.registrationEnd).toISOString(),
        feeAmount: Number(value.feeAmount),
      };

      createSemester(semesterData, {
        onSuccess: () => {
          toast.success("Semester created successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error creating semester:", error);
          toast.error(error.message || "Failed to create Semester");
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
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Semester Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Semester Name"
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
        <form.Field name="year">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Set Semester Year</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Set Semester Year"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(
                      value === "" ? 0 : Number(e.target.value),
                    );
                  }}
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
        <form.Field name="registrationStart">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Registration Start Date
                </FieldLabel>
                <Popover>
                  <PopoverTrigger>
                    {selected ? format(selected, "PPP") : "Select Date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                        }
                      }}
                    ></Calendar>
                  </PopoverContent>
                </Popover>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors}></FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="registrationEnd">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Registration End Date
                </FieldLabel>
                <Popover>
                  <PopoverTrigger>
                    {selected ? format(selected, "PPP") : "Select Date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                        }
                      }}
                    ></Calendar>
                  </PopoverContent>
                </Popover>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors}></FieldError>
                )}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="feeAmount">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Semester fee</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  placeholder="Semester fee"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(
                      value === "" ? 0 : Number(e.target.value),
                    );
                  }}
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

export default CreateSemesterForm;
