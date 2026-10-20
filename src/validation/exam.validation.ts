import z from "zod";

export const CreateExamZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),
  type: z.enum(["QUIZ", "MIDTERM", "FINAL", "ASSIGNMENT"], {
    message: "Type must be one of: Quiz, Midterm, Final, Assignment",
  }),
  totalMarks: z
    .number()
    .positive("Total marks must be greater than 0"),
  examDate: z
    .string()
    .min(1, "Exam date is required"),
  sectionId: z
    .string()
    .trim()
    .min(1, "Section is required"),
});

export const UpdateExamZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty"),
  type: z.enum(["QUIZ", "MIDTERM", "FINAL", "ASSIGNMENT"], {
    message: "Type must be one of: Quiz, Midterm, Final, Assignment",
  }),
  totalMarks: z
    .number()
    .positive("Total marks must be greater than 0"),
  examDate: z
    .string()
    .min(1, "Exam date cannot be empty"),
});
