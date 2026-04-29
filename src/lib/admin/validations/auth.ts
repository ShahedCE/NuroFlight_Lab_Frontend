import { z } from "zod";

export const loginSchema = z.object({
    
  email: z.string().toLowerCase().refine(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Valid email required" }
  ),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;