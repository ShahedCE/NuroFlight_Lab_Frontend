"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getJobApplicationById,
} from "@/lib/admin/admin-api";
import { formatDate, getFileUrl } from "@/lib/admin/helpers";
import type { JobApplicationItem } from "@/types/admin";

export default function JobApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [item, setItem] = useState<JobApplicationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await getJobApplicationById(id);
        setItem(res);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  if (loading) {
    return <div className="text-gray-300">Loading application...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (!item) {
    return <div className="text-gray-400">Application not found</div>;
  }

  const cvUrl = getFileUrl(item.cvFileUrl || item.cvUrl || item.cv);
  console.log(cvUrl);
  return (
    <div className="mx-auto w-full ">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Application Details
      </h1>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <Field label="Full Name" value={item.fullName} />
        <Field label="Email" value={item.email} />
        <Field label="Applied Job" value={item.job?.title || item.jobPost?.title || "N/A"} />
        <Field label="Applied At" value={formatDate(item.createdAt)} />

        <div>
          <label className="text-sm text-gray-300">CV</label>

          {cvUrl ? (
            <div className="mt-2 flex gap-3">
              <a
                href={cvUrl}
                target="_blank"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Download
              </a>
              
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-400">No CV uploaded</p>
          )}
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          Back
        </button>

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