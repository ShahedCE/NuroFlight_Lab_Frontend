"use client";

import { useEffect, useState } from "react";
import {
  getProjects,
  getPublications,
  getTeamMembers,
  getJobPosts,
  getJobApplications,
  getContactMessages,
} from "@/lib/admin/admin-api";
import { extractArray } from "@/lib/admin/helpers";

type DashboardStats = {
  projects: number;
  publications: number;
  teamMembers: number;
  jobPosts: number;
  jobApplications: number;
  contactMessages: number;
};

const initialStats: DashboardStats = {
  projects: 0,
  publications: 0,
  teamMembers: 0,
  jobPosts: 0,
  jobApplications: 0,
  contactMessages: 0,
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        projectsRes,
        publicationsRes,
        teamRes,
        jobPostsRes,
        applicationsRes,
        contactRes,
      ] = await Promise.all([
        getProjects(),
        getPublications(),
        getTeamMembers(),
        getJobPosts(),
        getJobApplications(),
        getContactMessages(),
      ]);

      setStats({
        projects: extractArray(projectsRes).length,
        publications: extractArray(publicationsRes).length,
        teamMembers: extractArray(teamRes).length,
        jobPosts: extractArray(jobPostsRes).length,
        jobApplications: extractArray(applicationsRes).length,
        contactMessages: extractArray(contactRes).length,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects },
    { label: "Publications", value: stats.publications },
    { label: "Team Members", value: stats.teamMembers },
    { label: "Job Posts", value: stats.jobPosts },
    { label: "Job Applications", value: stats.jobApplications },
    { label: "Contact Messages", value: stats.contactMessages },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          Overview of NuroFlight Lab admin data
        </p>
      </div>

      {loading && (
        <div className="text-gray-300 bg-white/5 border border-white/10 rounded-xl p-5">
          Loading dashboard...
        </div>
      )}

      {error && (
        <div className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-5">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg"
            >
              <p className="text-sm text-gray-400">{card.label}</p>
              <h2 className="text-4xl font-bold text-white mt-3">
                {card.value}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}