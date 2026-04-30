import { apiClient } from "./api-client";
import { extractData } from "./helpers";
import type {
  LoginPayload,
  LoginResponse,
  ProjectItem,
  ProjectPayload,
  PublicationItem,
  PublicationPayload,
  TeamMemberItem,
  JobPostItem,
  JobPostPayload,
  JobApplicationItem,
  ContactMessageItem,
} from "@/types/admin";

//Auth API
export async function loginAdmin(payload: LoginPayload) {
    const res = await apiClient.post("/auth/login", payload);
  
    return res.data.data;
  }
  //Projects API
  export async function getProjects() {
    const res = await apiClient.get("/projects");
    return extractData<ProjectItem[]>(res);
  }

  export async function getProjectById(id: string) {
    const projects = await getProjects();
    return projects.find((project: any) => project.id === id);
  }
  
  export async function createProject(payload: ProjectPayload) {
    const res = await apiClient.post("/admin/projects", payload);
    return extractData<ProjectItem>(res);
  }
  
  export async function updateProject(id: string, payload: Partial<ProjectPayload>) {
    const res = await apiClient.patch(`/admin/projects/${id}`, payload);
    return extractData<ProjectItem>(res);
  }
  
  export async function deleteProject(id: string) {
    const res = await apiClient.delete(`/admin/projects/${id}`);
    return extractData(res);
  }

  //Publications API  //Slug diye get nai------------------------------------------------------------
  export async function getPublications() {
    const res = await apiClient.get("/publications");
    return extractData<PublicationItem[]>(res);
  }
  export async function getPublicationById(id: string) {
    const publications = await getPublications();
    return publications.find((item: any) => item.id === id);
  }
  
  export async function createPublication(payload: PublicationPayload) {
    const res = await apiClient.post("/admin/publications", payload);
    return extractData<PublicationItem>(res);
  }
  
  export async function updatePublication(id: string, payload: Partial<PublicationPayload>) {
    const res = await apiClient.patch(`/admin/publications/${id}`, payload);
    return extractData<PublicationItem>(res);
  }
  
  export async function deletePublication(id: string) {
    const res = await apiClient.delete(`/admin/publications/${id}`);
    return extractData(res);
  }

  //Team API
  export async function getTeamMembers() {
    const res = await apiClient.get("/team");
    return extractData<TeamMemberItem[]>(res);
  }
  
  export async function createTeamMember(formData: FormData) {
    const res = await apiClient.post("/admin/team", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return extractData<TeamMemberItem>(res);
  }
  
  export async function updateTeamMember(id: string, formData: FormData) {
    const res = await apiClient.patch(`/admin/team/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return extractData<TeamMemberItem>(res);
  }
  
  export async function deleteTeamMember(id: string) {
    const res = await apiClient.delete(`/admin/team/${id}`);
    return extractData(res);
  }

  //Job-Posts API
  export async function getJobPosts() {
    const res = await apiClient.get("/admin/job-posts");
    return extractData<JobPostItem[]>(res);
  }
  
  export async function getJobPostById(id: string) {
    const res = await apiClient.get(`/admin/job-posts/${id}`);
    return extractData<JobPostItem>(res);
  }
  
  export async function createJobPost(payload: JobPostPayload) {
    const res = await apiClient.post("/admin/job-posts", payload);
    return extractData<JobPostItem>(res);
  }
  
  export async function updateJobPost(id: string, payload: Partial<JobPostPayload>) {
    const res = await apiClient.patch(`/admin/job-posts/${id}`, payload);
    return extractData<JobPostItem>(res);
  }
  
  export async function deleteJobPost(id: string) {
    const res = await apiClient.delete(`/admin/job-posts/${id}`);
    return extractData(res);
  }

  //Job-Applications API
  export async function getJobApplications() {
    const res = await apiClient.get("/admin/job-applications");
    return extractData<JobApplicationItem[]>(res);
  }
  
  export async function getJobApplicationById(id: string) {
    const res = await apiClient.get(`/admin/job-applications/${id}`);
    return extractData<JobApplicationItem>(res);
  }
  
  export async function getApplicationsByJob(jobId: string) {
    const res = await apiClient.get(`/admin/job-posts/${jobId}/applications`);
    return extractData<JobApplicationItem[]>(res);
  }

  //Contact Message API
  export async function getContactMessages() {
    const res = await apiClient.get("/admin/contact-messages");
    return extractData<ContactMessageItem[]>(res);
  }
  
  export async function getContactMessageById(id: string) {
    const res = await apiClient.get(`/admin/contact-messages/${id}`);
    return extractData<ContactMessageItem>(res);
  }
  
  export async function deleteContactMessage(id: string) {
    const res = await apiClient.delete(`/admin/contact-messages/${id}`);
    return extractData(res);
  }
