import z from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password cannot exceed 100 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Atleast one Special Charecter." });

export const loginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export const RegisterZodSchema = z
  .object({
    name: z.string({ message: "Name is required" }).min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    role: z.enum(["STUDENT", "INSTRUCTOR"], {
      message: "Role must be within STUDENT or INSTRUCTOR",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"],
  });
