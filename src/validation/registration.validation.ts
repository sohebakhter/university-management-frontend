import z from "zod";

export const UpdateRegistrationStatusZodSchema = z.object({
  status: z.enum(["PENDING", "ENROLLED", "DROPPED", "COMPLETED"], {
    message: "Status must be one of: PENDING, ENROLLED, DROPPED, COMPLETED",
  }),
});
