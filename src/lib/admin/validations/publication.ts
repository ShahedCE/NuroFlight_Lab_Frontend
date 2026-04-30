import { z } from "zod";

export const publicationSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slug like ai-paper-2026"),

  title: z.string().min(5, "Title minimum 5 characters required"),
  authors: z.string().min(3, "Authors required"),
  venue: z.string().min(2, "Venue required"),

  year: z.coerce
    .number()
    .min(1900, "Invalid year")
    .max(2100, "Invalid year"),

  abstract: z.string().min(20, "Abstract minimum 20 characters required"),

  tags: z.string().min(1, "At least one tag required"),

  paperUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  doiUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  bibtex: z.string().optional(),
  relatedProjectSlugs: z.string().optional(),
});

export type PublicationFormValues = z.infer<typeof publicationSchema>;