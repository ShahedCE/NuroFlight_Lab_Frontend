"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createJobPost } from "@/lib/admin/admin-api";
import {
  jobLevelOptions,
  jobStatusOptions,
  jobTeamOptions,
  jobTypeOptions,
} from "@/lib/admin/constants";
import {
  jobPostSchema,
  type JobPostFormValues,
} from "@/lib/admin/validations/job-post";

export default function CreateJobPostPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostFormValues>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      team: "development",
      level: "junior",
      type: "onsite",
      location: "",
      status: "draft",
      summary: "",
      responsibilities: "",
      requirements: "",
      tags: "",
      postedAt: today,
      deadline: "",
    },
  });

  const onSubmit = async (data: JobPostFormValues) => {
    setLoading(true);
    setError("");

    try {
      await createJobPost({
        title: data.title,
        team: data.team,
        level: data.level,
        type: data.type,
        location: data.location,
        status: data.status,
        summary: data.summary,
        responsibilities: toUniqueArray(data.responsibilities),
        requirements: toUniqueArray(data.requirements),
        tags: toUniqueArray(data.tags),
        postedAt: data.postedAt,
        deadline: data.deadline || undefined,
      });

      router.push("/admin/job-posts");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create job post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Create Job Post
      </h1>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <Input label="Title" register={register("title")} error={errors.title?.message} />

        <div className="grid gap-5 md:grid-cols-2">
          <Select label="Team" register={register("team")} error={errors.team?.message} options={jobTeamOptions} />
          <Select label="Level" register={register("level")} error={errors.level?.message} options={jobLevelOptions} />
          <Select label="Type" register={register("type")} error={errors.type?.message} options={jobTypeOptions} />
          <Select label="Status" register={register("status")} error={errors.status?.message} options={jobStatusOptions} />
        </div>

        <Input label="Location" register={register("location")} error={errors.location?.message} />

        <Textarea
          label="Summary"
          rows={5}
          register={register("summary")}
          error={errors.summary?.message}
        />

        <Textarea
          label="Responsibilities"
          rows={4}
          placeholder="Write one per line or comma separated"
          register={register("responsibilities")}
          error={errors.responsibilities?.message}
        />

        <Textarea
          label="Requirements"
          rows={4}
          placeholder="Write one per line or comma separated"
          register={register("requirements")}
          error={errors.requirements?.message}
        />

        <Input
          label="Tags"
          placeholder="Backend, NestJS, PostgreSQL"
          register={register("tags")}
          error={errors.tags?.message}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Posted At"
            type="date"
            register={register("postedAt")}
            error={errors.postedAt?.message}
          />

          <Input
            label="Deadline"
            type="date"
            register={register("deadline")}
            error={errors.deadline?.message}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Job Post"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/job-posts")}
            className="rounded-lg bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function toUniqueArray(value: string) {
  const arr = value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(new Set(arr));
}

function Input({ label, register, error, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Select({ label, register, error, options }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <select
        {...register}
        className="mt-1 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none focus:border-blue-400"
      >
        {options.map((option: { label: string; value: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Textarea({ label, register, error, placeholder, rows = 4 }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <textarea
        {...register}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}