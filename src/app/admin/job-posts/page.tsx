"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteJobPost, getJobPosts } from "@/lib/admin/admin-api";
import { extractArray, formatDate } from "@/lib/admin/helpers";
import type { JobPostItem } from "@/types/admin";

export default function AdminJobPostsPage() {
  const [items, setItems] = useState<JobPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<JobPostItem | null>(null);

  const loadJobPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getJobPosts();
      setItems(extractArray<JobPostItem>(res));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load job posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);

    try {
      await deleteJobPost(deleteTarget.id);
      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete job post");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Job Posts</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage career opportunities
          </p>
        </div>

        <Link
          href="/admin/job-posts/create"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Create Job Post
        </Link>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
          Loading job posts...
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
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((job) => (
                <tr key={job.id} className="border-b border-white/5">
                  <td className="px-4 py-3 text-white">{job.title}</td>
                  <td className="px-4 py-3 text-gray-400">{job.team}</td>
                  <td className="px-4 py-3 text-gray-400">{job.level}</td>
                  <td className="px-4 py-3 text-gray-400">{job.type}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-300">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(job.deadline)}
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/job-posts/${job.id}/edit`}
                      className="rounded-md bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(job)}
                      disabled={deletingId === job.id}
                      className="rounded-md bg-red-500/80 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      {deletingId === job.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No job posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">
              Delete Job Post?
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {deleteTarget.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={Boolean(deletingId)}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={Boolean(deletingId)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}