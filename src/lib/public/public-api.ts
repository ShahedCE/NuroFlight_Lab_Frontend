import { publicApiClient } from "./api-client";
import { extractArray, extractData } from "./helpers";
import type {
  ContactPayload,
  PublicJobPost,
  PublicProject,
  PublicPublication,
  PublicTeamMember,
} from "@/types/public";

// Projects
export async function getProjects() {
  const res = await publicApiClient.get("/projects");
  return extractArray<PublicProject>(res);
}

export async function getProjectBySlug(slug: string) {
  const res = await publicApiClient.get(`/projects/${slug}`);
  return extractData<PublicProject>(res);
}

// Publications
export async function getPublications() {
  const res = await publicApiClient.get("/publications");
  return extractArray<PublicPublication>(res);
}

export async function getPublicationBySlug(slug: string) {
  const res = await publicApiClient.get(`/publications/${slug}`);
  return extractData<PublicPublication>(res);
}

// Team
export async function getTeamMembers(params?: { group?: string; tag?: string }) {
  const res = await publicApiClient.get("/team", { params });
  return extractArray<PublicTeamMember>(res);
}

export async function getTeamMemberBySlug(slug: string) {
  const res = await publicApiClient.get(`/team/${slug}`);
  return extractData<PublicTeamMember>(res);
}

// Job Posts
export async function getJobPosts(params?: {
  team?: string;
  level?: string;
  type?: string;
}) {
  const res = await publicApiClient.get("/job-posts", { params });
  return extractArray<PublicJobPost>(res);
}

export async function getJobPostById(id: string) {
  const res = await publicApiClient.get(`/job-posts/${id}`);
  return extractData<PublicJobPost>(res);
}

// Job Apply
/*
export async function applyToJob(jobId: string, formData: FormData) {
  const res = await publicApiClient.post(`/job-posts/${jobId}/apply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return extractData(res);
}
*/

export async function applyJob(payload: {
  jobPostId: string;
  fullName: string;
  email: string;
  cv: File;
}) {
  const formData = new FormData();

  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("cv", payload.cv);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/job-posts/${payload.jobPostId}/apply`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message || "Failed to submit application";

    throw new Error(message);
  }

  return data
}

// Contact
export async function createContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}