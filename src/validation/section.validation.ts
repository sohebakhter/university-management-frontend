import z from "zod";

export const CreateSectionZodSchema = z.object({
  name: z.string().trim().min(1, "Section name is required"),

  capacity: z
    .number()
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1"),

  courseId: z.string().trim().min(1, "Course is required"),

  semesterId: z.string().trim().min(1, "Semester is required"),

  instructorId: z.string().trim().min(1, "Instructor is required"),
});
