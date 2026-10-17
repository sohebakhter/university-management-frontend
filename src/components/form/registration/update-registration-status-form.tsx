"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Registration, RegistrationStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateRegistrationStatus } from "@/hooks";
import { UpdateRegistrationStatusZodSchema } from "@/validation";

interface Props {
  registration: Registration;
  handleClose: () => void;
}
const UpdateRegistrationStatusForm = ({ registration, handleClose }: Props) => {
  const { mutate: updateReg, isPending } = useUpdateRegistrationStatus(
    registration.id,
  );

  const form = useForm({
    defaultValues: {
      status: registration.status,
    },
    validators: {
      onSubmit: UpdateRegistrationStatusZodSchema,
    },
    onSubmit: ({ value }) => {
      const registrationData = {
        status: value.status as RegistrationStatus,
      };

      updateReg(registrationData, {
        onSuccess: () => {
          toast.success("Registration Status updated successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating Registration Status:", error);
          toast.error(error.message || "Failed to update Registration Status");
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
                      value as "PENDING" | "ENROLLED" | "DROPPED" | "COMPLETED",
                    );
                  }}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="ENROLLED">ENROLLED</SelectItem>
                    <SelectItem value="DROPPED">DROPPED</SelectItem>
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

export default UpdateRegistrationStatusForm;
