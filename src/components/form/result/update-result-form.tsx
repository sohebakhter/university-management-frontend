"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Result, ResultStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateResult } from "@/hooks";
import { UpdateResultZodSchema } from "@/validation";

interface Props {
  result: Result;
  handleClose: () => void;
}

const UpdateResultForm = ({ result, handleClose }: Props) => {
  const { mutate: updateResult, isPending } = useUpdateResult(result.id);

  const form = useForm({
    defaultValues: {
      marks: result.marks,
      grade: result.grade || "",
      gradePoint: result.gradePoint || 0,
      status: result.status as ResultStatus,
    },
    validators: {
      onSubmit: UpdateResultZodSchema,
    },
    onSubmit: ({ value }) => {
      const resultData = {
        marks: Number(value.marks),
        grade: value.grade || null,
        gradePoint: value.gradePoint ? Number(value.gradePoint) : null,
        status: value.status as ResultStatus,
      };

      updateResult(resultData, {
        onSuccess: () => {
          toast.success("Result updated successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating result:", error);
          toast.error(error.message || "Failed to update result");
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
        <form.Field name="marks">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Marks{result.exam ? ` (out of ${result.exam.totalMarks})` : ""}
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={0}
                  max={result.exam?.totalMarks}
                  placeholder="e.g. 25"
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

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="grade">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Grade</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="e.g. A"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="gradePoint">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Grade Point</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={0}
                    max={4}
                    step={0.25}
                    placeholder="e.g. 3.75"
                    value={field.state.value ?? 0}
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
        </div>

        <form.Field name="status">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as ResultStatus)
                  }
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Result"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default UpdateResultForm;
