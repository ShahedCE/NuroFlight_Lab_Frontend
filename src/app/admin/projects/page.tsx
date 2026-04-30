"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteProject, getProjects } from "@/lib/admin/admin-api";
import { extractArray, formatDate } from "@/lib/admin/helpers";
import type { ProjectItem } from "@/types/admin";

export default function AdminProjectsPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getProjects();
      setItems(extractArray<ProjectItem>(res));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
  
    setDeletingId(deleteTarget.id);
  
    try {
      await deleteProject(deleteTarget.id);
      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete project");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage NuroFlight Lab projects
          </p>
        </div>

        <Link
          href="/admin/projects/create"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Create Project
        </Link>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
          Loading projects...
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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((project) => (
                <tr key={project.id} className="border-b border-white/5">
                  <td className="px-4 py-3 text-white">{project.title}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-300">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{project.slug}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(project.updatedAt)}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="rounded-md bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                    >
                      Edit
                    </Link>

                    <button
                    onClick={() => setDeleteTarget(project)}
                    disabled={deletingId === project.id}
                    className="rounded-md bg-red-500/80 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                    >
                    {deletingId === project.id ? "Deleting..." : "Delete"}
                    </button>
                   </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No projects found.
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
         <h2 className="text-lg font-semibold text-white">Delete Project?</h2>

      <p className="mt-2 text-sm text-gray-300">
        Are you sure you want to delete{" "}
        <span className="font-medium text-white">{deleteTarget.title}</span>?
        This action cannot be undone.
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