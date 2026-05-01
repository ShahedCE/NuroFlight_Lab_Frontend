"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getContactMessageById,
} from "@/lib/admin/admin-api";
import { formatDate } from "@/lib/admin/helpers";
import type { ContactMessageItem } from "@/types/admin";

export default function ContactMessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [item, setItem] = useState<ContactMessageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");

  const loadMessage = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getContactMessageById(id);
      setItem(res);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMessage();
  }, [id]);

 
  if (loading) {
    return <div className="text-gray-300">Loading message...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (!item) {
    return <div className="text-gray-400">Message not found</div>;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Contact Message Details
      </h1>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <Field label="Name" value={item.name} />
        <Field label="Email" value={item.email} />
        <Field label="Subject" value={item.subject || "No subject"} />
        <Field label="Date" value={formatDate(item.createdAt)} />

        <div>
          <label className="text-sm text-gray-300">Message</label>
          <div className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white">
            {item.message}
          </div>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => router.back()}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <p className="mt-1 text-white">{value || "N/A"}</p>
    </div>
  );
}