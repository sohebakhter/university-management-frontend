import z from "zod";

const resultStatusEnum = z.enum(["DRAFT", "PUBLISHED"], {
  message: "Status must be DRAFT or PUBLISHED",
});

export const CreateResultZodSchema = z.object({
  examId: z.string().trim().min(1, "Exam is required"),
  registrationId: z.string().trim().min(1, "Student registration is required"),
  marks: z.number().min(0, "Marks cannot be negative"),
  grade: z.string().min(1, "Grade cannot be empty"),
  gradePoint: z
    .number()
    .min(0, "Grade point cannot be negative")
    .max(4, "Grade point cannot exceed 4.0"),
  status: resultStatusEnum,
});

export const UpdateResultZodSchema = z.object({
  marks: z.number().min(0, "Marks cannot be negative"),

  grade: z.string(),

  gradePoint: z
    .number()
    .min(0, "Grade point cannot be negative")
    .max(4, "Grade point cannot exceed 4.0"),

  status: resultStatusEnum,
});
