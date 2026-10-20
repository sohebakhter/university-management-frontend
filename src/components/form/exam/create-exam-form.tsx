"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { CreateExamZodSchema } from "@/validation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateExam, useGetMySections } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "@/types";

const CreateExamForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createExam, isPending } = useCreateExam();
  const { data: sectionData } = useGetMySections();

  const sections: Section[] = sectionData?.data || [];

  const form = useForm({
    defaultValues: {
      title: "",
      type: "" as string,
      totalMarks: 0,
      examDate: "",
      sectionId: "",
    },
    validators: {
      onSubmit: CreateExamZodSchema,
    },
    onSubmit: ({ value }) => {
      const examData = {
        title: value.title.trim(),
        type: value.type as "QUIZ" | "MIDTERM" | "FINAL" | "ASSIGNMENT",
        totalMarks: Number(value.totalMarks),
        examDate: new Date(value.examDate).toISOString(),
        sectionId: value.sectionId.trim(),
      };

      createExam(examData, {
        onSuccess: () => {
          toast.success("Exam created successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error creating exam:", error);
          toast.error(error.message || "Failed to create exam");
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
                  onValueChange={(value) => field.handleChange(value)}
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

        <form.Field name="sectionId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Section</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>

                  <SelectContent>
                    {sections.map((section: Section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.course.title} ({section.course.code}) -{" "}
                        {section.name}
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
          {isPending ? "Creating..." : "Create Exam"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CreateExamForm;
