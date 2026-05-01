"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteContactMessage,
  getContactMessages,
} from "@/lib/admin/admin-api";
import { extractArray, formatDate } from "@/lib/admin/helpers";
import type { ContactMessageItem } from "@/types/admin";

export default function ContactMessagesPage() {
  const [items, setItems] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ContactMessageItem | null>(
    null
  );

  const loadMessages = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getContactMessages();
      setItems(extractArray<ContactMessageItem>(res));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);


  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);

    try {
      await deleteContactMessage(deleteTarget.id);
      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete message");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Contact Messages</h1>
        <p className="mt-1 text-sm text-gray-400">
          View and manage user inquiries
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
          Loading contact messages...
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
                <th className="px-4 py-3">Sender</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-14 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((message) => (
                <tr key={message.id} className="border-b border-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{message.name}</p>
                    <p className="text-xs text-gray-400">{message.email}</p>
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {message.subject || "No subject"}
                  </td>

          
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(message.createdAt)}
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/contact-messages/${message.id}`}
                      className="rounded-md bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(message)}
                      disabled={deletingId === message.id}
                      className="rounded-md bg-red-500/80 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      {deletingId === message.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No contact messages found.
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
              Delete Contact Message?
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              Are you sure you want to delete message from{" "}
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