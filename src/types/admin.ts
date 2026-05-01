export type AdminUser = {
    id: string;
    name?: string;
    email: string;
    role?: string;
  };
  
  export type LoginPayload = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
      admin: AdminUser;
    };
  };
  
  export type ProjectItem = {
    id: string;
    title: string;
    description: string;
    status: "ongoing" | "completed" | string;
    tags: string[];
    slug: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  export type ProjectPayload = {
    title: string;
    description: string;
    status: string;
    tags: string[];
    slug: string;
  };
  
  export type PublicationItem = {
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
  
  export type PublicationPayload = {
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
  };
  
  export type TeamMemberItem = {
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
  
  export type JobTeam = "research" | "development" | "administration";
export type JobLevel = "internship" | "junior" | "mid" | "senior";
export type JobType = "remote" | "hybrid" | "onsite";
export type JobStatus = "draft" | "published" | "closed";

export type JobPostItem = {
  id: string;
  title: string;
  team: JobTeam;
  level: JobLevel;
  type: JobType;
  location: string;
  status: JobStatus;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  postedAt?: string;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
};
  
  export type JobPostPayload = {
    title: string;
    team: string;
    level: string;
    type: string;
    location: string;
    status: string;
    summary: string;
    responsibilities: string[];
    requirements: string[];
    tags: string[];
    postedAt?: string;
    deadline?: string;
  };
  
  export type JobApplicationItem = {
    id: string;
    fullName: string;
    email: string;
    cvFileUrl?: string;
    cvUrl?: string;
    cv?: string;
    jobPost?: JobPostItem;
    job?: JobPostItem;
    createdAt?: string;
  };
  
  export type ContactMessageItem = {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    createdAt?: string;
  };

