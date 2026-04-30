import { z } from "zod";

export const teamSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slug like md-masud"),

  name: z.string().min(3, "Name required"),
  title: z.string().min(2, "Title required"),
  primaryAffiliation: z.string().optional(),

  bioLines: z.string().min(1, "At least one bio line required"),
  expertise: z.string().min(1, "At least one expertise required"),
  tags: z.string().min(1, "At least one tag required"),

  group: z.string().min(1, "Group required"),
  priority: z.coerce.number().min(0, "Priority must be 0 or more"),

  email: z.string().email("Invalid email"),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  scholar: z.string().optional(),

  image: z.any(),
});

export type TeamFormValues = z.infer<typeof teamSchema>;