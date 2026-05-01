import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(3, "Title minimum 3 characters").max(200),

  team: z.enum(["research", "development", "administration"], {
    message: "Team is required",
  }),

  level: z.enum(["internship", "junior", "mid", "senior"], {
    message: "Level is required",
  }),

  type: z.enum(["remote", "hybrid", "onsite"], {
    message: "Job type is required",
  }),

  location: z.string().min(2, "Location minimum 2 characters").max(150),

  status: z.enum(["draft", "published", "closed"], {
    message: "Status is required",
  }),

  summary: z.string().min(10, "Summary minimum 10 characters").max(5000),

  responsibilities: z.string().min(1, "At least one responsibility required"),
  requirements: z.string().min(1, "At least one requirement required"),
  tags: z.string().min(1, "At least one tag required"),

  postedAt: z.string().min(1, "Posted date is required"),

  deadline: z.string().optional(),
});

export type JobPostFormValues = z.infer<typeof jobPostSchema>;