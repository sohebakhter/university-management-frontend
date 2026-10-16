import z from "zod";

export const CreateCourseZodSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title is required"),
  code: z
    .string({ message: "Code is required" })
    .min(1, "Code is required")
    .toUpperCase(),
  credit: z
    .string()
    .min(1, "Credit is required")
    .regex(/^\d+$/, "Credit must be a number")
    .transform(Number)
    .pipe(
      z
        .number()
        .int("Credit must be an integer")
        .positive("Credit must be a positive number"),
    ),
  departmentId: z
    .string({ message: "Department ID is required" })
    .uuid("Invalid department ID"),
});

export const UpdateCourseZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  code: z.string().min(1, "Code cannot be empty").toUpperCase(),
  credit: z
    .number()
    .int("Credit must be an integer")
    .positive("Credit must be a positive number"),
  departmentId: z.string().uuid("Invalid department ID"),
});
