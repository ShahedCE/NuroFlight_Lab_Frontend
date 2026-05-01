export type ProjectStatus = "ongoing" | "completed";

export type PublicProject = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  coverImage?: string;
  updatedAt?: string;
  createdAt?: string;
  slug: string;
};

export type PublicPublication = {
  id: string;
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  paperUrl?: string;
  pdfUrl?: string;
  doiUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  relatedProjectSlugs?: string[];
  createdAt?: string;
  updatedAt?: string;
};


export type PublicTeamMember = {
  id: string;
  slug: string;
  name: string;
  title: string;
  primaryAffiliation?: string;
  bioLines: string[];
  expertise: string[];
  tags: string[];
  group: string;
  priority?: number;
  email?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  image?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PublicJobPost = {
  id: string;
  title: string;
  team: "research" | "development" | "administration";
  level: "internship" | "junior" | "mid" | "senior";
  type: "remote" | "hybrid" | "onsite";
  location: string;
  status: "draft" | "published" | "closed";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  postedAt: string;
  deadline?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};