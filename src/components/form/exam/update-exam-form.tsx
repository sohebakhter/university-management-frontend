"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { Exam } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateExam } from "@/hooks";
import { UpdateExamZodSchema } from "@/validation";

interface Props {
  exam: Exam;
  handleClose: () => void;
}

const UpdateExamForm = ({ exam, handleClose }: Props) => {
  const { mutate: updateExam, isPending } = useUpdateExam(exam.id);

  const form = useForm({
    defaultValues: {
      title: exam.title,
      type: exam.type,
      totalMarks: exam.totalMarks,
      examDate: exam.examDate
        ? new Date(exam.examDate).toISOString().slice(0, 16)
        : "",
    },
    validators: {
      onSubmit: UpdateExamZodSchema,
    },
    onSubmit: ({ value }) => {
      const examData = {
        title: value.title.trim(),
        type: value.type as "QUIZ" | "MIDTERM" | "FINAL" | "ASSIGNMENT",
        totalMarks: Number(value.totalMarks),
        examDate: new Date(value.examDate).toISOString(),
      };

      updateExam(examData, {
        onSuccess: () => {
          toast.success("Exam updated successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating exam:", error);
          toast.error(error.message || "Failed to update exam");
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
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Exam Title</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. Midterm Examination"
                  value={field.state.value}
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

        <form.Field name="type">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Exam Type</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as "QUIZ" | "MIDTERM" | "FINAL" | "ASSIGNMENT")}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="QUIZ">Quiz</SelectItem>
                    <SelectItem value="MIDTERM">Midterm</SelectItem>
                    <SelectItem value="FINAL">Final</SelectItem>
                    <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="totalMarks">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Total Marks</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  placeholder="e.g. 30"
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

        <form.Field name="examDate">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Exam Date</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Exam"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default UpdateExamForm;
