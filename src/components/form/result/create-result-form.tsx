"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { CreateResultZodSchema } from "@/validation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateResult, useGetAllExams, useGetSectionStudents } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Exam, ResultStatus, SectionStudentRegistration } from "@/types";
import { useMemo, useState } from "react";

const CreateResultForm = ({ handleClose }: { handleClose: () => void }) => {
  const { mutate: createResultMutation, isPending } = useCreateResult();
  const { data: examData } = useGetAllExams();
  const exams: Exam[] = examData?.data || [];

  const [selectedExamId, setSelectedExamId] = useState("");
  const selectedExam = useMemo(
    () => exams.find((e) => e.id === selectedExamId),
    [exams, selectedExamId],
  );
  const sectionId = selectedExam?.sectionId || "";
  const { data: studentsData } = useGetSectionStudents(sectionId);
  const students: SectionStudentRegistration[] = studentsData?.data || [];

  const form = useForm({
    defaultValues: {
      examId: "",
      registrationId: "",
      marks: 0,
      grade: "",
      gradePoint: 0,
      status: "PUBLISHED" as string,
    },
    validators: {
      onSubmit: CreateResultZodSchema,
    },
    onSubmit: ({ value }) => {
      const resultData = {
        examId: value.examId.trim(),
        registrationId: value.registrationId.trim(),
        marks: Number(value.marks),
        grade: value.grade?.trim() || undefined,
        gradePoint: value.gradePoint ? Number(value.gradePoint) : undefined,
        status: (value.status as ResultStatus) || undefined,
      };

      createResultMutation(resultData, {
        onSuccess: () => {
          toast.success("Result created successfully");
          handleClose();
        },
        onError: (error) => {
          console.error("Error creating result:", error);
          toast.error(error.message || "Failed to create result");
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
        <form.Field name="examId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Exam</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    field.handleChange(value);
                    setSelectedExamId(value);
                  }}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>

                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.title} — {exam.section?.course?.code} (
                        {exam.section?.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="registrationId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Student</FieldLabel>

                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  disabled={!selectedExamId}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue
                      placeholder={
                        selectedExamId
                          ? "Select Student"
                          : "Select an exam first"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {students.map((reg) => (
                      <SelectItem key={reg.id} value={reg.id}>
                        {reg.student?.user?.name ||
                          reg.student?.name ||
                          "Student"}{" "}
                        ({reg.student?.user?.email || reg.student?.email || ""})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="marks">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Marks{selectedExam ? ` (out of ${selectedExam.totalMarks})` : ""}
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={0}
                  max={selectedExam?.totalMarks}
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
                  onValueChange={(value) => field.handleChange(value)}
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
          {isPending ? "Creating..." : "Create Result"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CreateResultForm;
