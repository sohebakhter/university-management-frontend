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

export const UpdateSectionZodSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  capacity: z
    .number()
    .int("Capacity must be an integer")
    .positive("Capacity must be greater than 0"),
  courseId: z.string().uuid("Invalid course ID"),
  semesterId: z.string().uuid("Invalid semester ID"),
  instructorId: z.string().uuid("Invalid instructor ID"),
});
