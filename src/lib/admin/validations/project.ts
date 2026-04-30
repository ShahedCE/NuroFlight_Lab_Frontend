import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title minimum 3 characters required"),
  slug: z
    .string()
    .min(3, "Slug required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, example: ai-drone-project"),
  description: z.string().min(20, "Description minimum 20 characters required"),
  status: z.enum(["ongoing", "completed"], {
    message: "Status is required",
  }),
  tags: z.string().min(1, "At least one tag required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;