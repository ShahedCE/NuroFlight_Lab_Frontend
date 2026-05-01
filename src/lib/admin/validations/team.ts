import { z } from "zod";

export const teamSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slug like md-masud"),

  name: z.string().min(3, "Name required"),
  title: z.string().min(3, "Title required"),
  primaryAffiliation: z.string().min(3, "Primary affiliation required"),

  bioLines: z.string().min(1, "At least one bio line required"),
  expertise: z.string().min(1, "At least one expertise required"),
  tags: z.string().min(1, "At least one tag required"),

  group: z.string().min(1, "Group required"),
  priority: z.coerce.number().min(0, "Priority must be 0 or more"),

  email: z.string().email("Invalid email"),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  scholar: z.string().optional(),

  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Image file is required",
    })
    .refine((files) => files?.[0]?.type?.startsWith("image/"), {
      message: "Only image files are allowed",
    }),

  });

export type TeamFormValues = z.infer<typeof teamSchema>;