"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteTeamMember, getTeamMembers } from "@/lib/admin/admin-api";
import { extractArray, formatDate, getFileUrl } from "@/lib/admin/helpers";
import type { TeamMemberItem } from "@/types/admin";

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<TeamMemberItem | null>(null);

  const loadTeam = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getTeamMembers();
      setItems(extractArray<TeamMemberItem>(res));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);

    try {
      await deleteTeamMember(deleteTarget.id);
      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete team member");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Team</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage team members with profile images
          </p>
        </div>

        <Link
          href="/admin/team/create"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Add Member
        </Link>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
          Loading team members...
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
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Group</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((member) => {
                const imageSrc = getFileUrl(member.imageUrl || member.image);

                return (
                  <tr key={member.id} className="border-b border-white/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              N/A
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-400">{member.title}</td>
                    <td className="px-4 py-3 text-gray-400">{member.group}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {member.priority ?? 0}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {formatDate(member.updatedAt)}
                    </td>

                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/admin/team/${member.id}/edit`}
                        className="rounded-md bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => setDeleteTarget(member)}
                        disabled={deletingId === member.id}
                        className="rounded-md bg-red-500/80 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        {deletingId === member.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No team members found.
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
              Delete Team Member?
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {deleteTarget.name}
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