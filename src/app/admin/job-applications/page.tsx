"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getJobApplications,
} from "@/lib/admin/admin-api";
import { extractArray, formatDate, getFileUrl } from "@/lib/admin/helpers";
import type { JobApplicationItem } from "@/types/admin";

export default function AdminJobApplicationsPage() {
  const [items, setItems] = useState<JobApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getJobApplications();
      setItems(extractArray<JobApplicationItem>(res));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Job Applications
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          View submitted applications and CVs
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
          Loading applications...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-gray-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Applied At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((app) => (
                <tr key={app.id} className="border-b border-white/5">
                  <td className="px-4 py-3 text-white">
                    {app.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {app.email}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                  {app.job?.title || app.jobPost?.title || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(app.createdAt)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/job-applications/${app.id}`}
                      className="rounded-md bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}