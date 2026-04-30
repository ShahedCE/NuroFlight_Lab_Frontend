"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createProject } from "@/lib/admin/admin-api";
import {
  projectSchema,
  type ProjectFormValues,
} from "@/lib/admin/validations/project";

export default function CreateProjectPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      status: "ongoing",
      tags: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    setError("");

    try {
      await createProject({
        title: data.title,
        description: data.description,
        status: data.status,
        slug: data.slug,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      router.push("/admin/projects");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-white">Create Project</h1>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <Input
          label="Title"
          placeholder="AI Drone Navigation System"
          error={errors.title?.message}
          register={register("title")}
        />

        <Input
          label="Slug"
          placeholder="ai-drone-navigation-system"
          error={errors.slug?.message}
          register={register("slug")}
        />

        <div>
          <label className="text-sm text-gray-300">Status</label>
          <select
            {...register("status")}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none focus:border-blue-400"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-xs text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>

        <Textarea
          label="Description"
          placeholder="Write project description..."
          error={errors.description?.message}
          register={register("description")}
        />

        <Input
          label="Tags"
          placeholder="AI, Robotics, Drone"
          error={errors.tags?.message}
          register={register("tags")}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="rounded-lg bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  placeholder,
  error,
  register,
}: {
  label: string;
  placeholder?: string;
  error?: string;
  register: any;
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...register}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}. </p>}
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  error,
  register,
}: {
  label: string;
  placeholder?: string;
  error?: string;
  register: any;
}) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <textarea
        {...register}
        rows={5}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}