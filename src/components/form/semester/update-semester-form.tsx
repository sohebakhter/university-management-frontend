import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useUpdateSemester } from "@/hooks";
import { toast } from "sonner";
import { UpdateSemesterZodSchema } from "@/validation";
import { Semester } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  semester: Semester;
  handleClose: () => void;
}
const UpdateSemesterForm = ({ semester, handleClose }: Props) => {
  const { mutate: updateSemester, isPending } = useUpdateSemester(semester.id);

  const form = useForm({
    defaultValues: {
      name: semester.name,
      year: Number(semester.year),
      registrationStart: semester.registrationStart
        ? format(new Date(semester.registrationStart), "yyyy-MM-dd")
        : "",
      registrationEnd: semester.registrationEnd
        ? format(new Date(semester.registrationEnd), "yyyy-MM-dd")
        : "",
      feeAmount: Number(semester.feeAmount),
    },
    validators: {
      onSubmit: UpdateSemesterZodSchema,
    },
    onSubmit: ({ value }) => {
      const semesterData = {
        name: value.name,
        year: value.year,
        registrationStart: new Date(
          `${value.registrationStart}T00:00:00`,
        ).toISOString(),
        registrationEnd: new Date(
          `${value.registrationEnd}T00:00:00`,
        ).toISOString(),
        feeAmount: value.feeAmount,
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
                <FieldLabel htmlFor={field.name}>Semester Fee</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  placeholder="Semester Fee"
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
          {isPending ? "Updating..." : "Update"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default UpdateSemesterForm;
