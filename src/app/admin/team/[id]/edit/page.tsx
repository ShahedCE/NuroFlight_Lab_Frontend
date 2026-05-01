"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getTeamMemberById,
  updateTeamMember,
} from "@/lib/admin/admin-api";
import { getFileUrl } from "@/lib/admin/helpers";
import { teamGroupOptions, teamTagOptions } from "@/lib/admin/constants";
import {
  teamSchema,
  type TeamFormValues,
} from "@/lib/admin/validations/team";
import type { TeamMemberItem } from "@/types/admin";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema) as any,
    defaultValues: {
      slug: "",
      name: "",
      title: "",
      primaryAffiliation: "",
      bioLines: "",
      expertise: "",
      tags: "research_and_innovation",
      group: "research_team",
      priority: 0,
      email: "",
      linkedin: "",
      github: "",
      scholar: "",
    },
  });

  const imageFiles = watch("image");

  useEffect(() => {
    const loadMember = async () => {
      setLoading(true);
      setError("");

      try {
        const member = (await getTeamMemberById(id)) as TeamMemberItem | undefined;

        if (!member) {
          setError("Team member not found");
          return;
        }

        reset({
          slug: member.slug || "",
          name: member.name || "",
          title: member.title || "",
          primaryAffiliation: member.primaryAffiliation || "",
          bioLines: Array.isArray(member.bioLines)
            ? member.bioLines.join(", ")
            : "",
          expertise: Array.isArray(member.expertise)
            ? member.expertise.join(", ")
            : "",
          tags: Array.isArray(member.tags)
            ? member.tags.join(", ")
            : "research_and_innovation",
          group: member.group || "research_team",
          priority: member.priority ?? 0,
          email: member.email || "",
          linkedin: member.linkedin || "",
          github: member.github || "",
          scholar: member.scholar || "",
        });

        setCurrentImage(getFileUrl(member.imageUrl || member.image));
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load team member");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadMember();
  }, [id, reset]);

  const onSubmit = async (data: TeamFormValues) => {
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("slug", data.slug);
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("primaryAffiliation", data.primaryAffiliation || "");
      formData.append("bioLines", JSON.stringify(toArray(data.bioLines)));
      formData.append("expertise", JSON.stringify(toArray(data.expertise)));
      formData.append("tags", JSON.stringify(toArray(data.tags)));
      formData.append("group", data.group);
      formData.append("priority", String(data.priority));

      appendIfExists(formData, "email", data.email);
      appendIfExists(formData, "linkedin", data.linkedin);
      appendIfExists(formData, "github", data.github);
      appendIfExists(formData, "scholar", data.scholar);

      const image = data.image?.[0];
      if (image) {
        formData.append("image", image);
      }

      await updateTeamMember(id, formData);
      router.push("/admin/team");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update team member");
    } finally {
      setSaving(false);
    }
  };

  const handleImagePreview = () => {
    const file = imageFiles?.[0];
    if (!file) {
      setPreview("");
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  if (loading) {
    return <div className="text-gray-300">Loading team member...</div>;
  }

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Edit Team Member
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
        <Input label="Name" register={register("name")} error={errors.name?.message} />
        <Input label="Slug" register={register("slug")} error={errors.slug?.message} />
        <Input label="Title" register={register("title")} error={errors.title?.message} />

        <Input
          label="Primary Affiliation"
          register={register("primaryAffiliation")}
          error={errors.primaryAffiliation?.message}
        />

        <Textarea
          label="Bio Lines"
          placeholder="Backend Developer, Node.js Enthusiast"
          register={register("bioLines")}
          error={errors.bioLines?.message}
        />

        <Input
          label="Expertise"
          placeholder="Node.js, NestJS, PostgreSQL"
          register={register("expertise")}
          error={errors.expertise?.message}
        />

        <div>
          <label className="text-sm text-gray-300">Group</label>
          <select
            {...register("group")}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none focus:border-blue-400"
          >
            {teamGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.group && (
            <p className="mt-1 text-xs text-red-400">{errors.group.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300">Tags</label>
          <select
            {...register("tags")}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none focus:border-blue-400"
          >
            {teamTagOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.tags && (
            <p className="mt-1 text-xs text-red-400">{errors.tags.message}</p>
          )}
        </div>

        <Input
          label="Priority"
          type="number"
          register={register("priority")}
          error={errors.priority?.message}
        />

        <Input label="Email" register={register("email")} error={errors.email?.message} />
        <Input label="LinkedIn" register={register("linkedin")} error={errors.linkedin?.message} />
        <Input label="GitHub" register={register("github")} error={errors.github?.message} />
        <Input label="Scholar" register={register("scholar")} error={errors.scholar?.message} />

        <div>
          <label className="text-sm text-gray-300">Profile Image</label>

          {currentImage && !preview && (
            <img
              src={currentImage}
              alt="Current"
              className="mb-3 mt-2 h-28 w-28 rounded-xl object-cover"
            />
          )}

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-3 mt-2 h-28 w-28 rounded-xl object-cover"
            />
          )}

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImagePreview}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:px-3 file:py-1 file:text-white"
          />

          <p className="mt-1 text-xs text-gray-400">
            Leave empty if you do not want to change the image.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/team")}
            className="rounded-lg bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function toArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function appendIfExists(formData: FormData, key: string, value?: string) {
  if (value && value.trim() !== "") {
    formData.append(key, value.trim());
  }
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

function Textarea({ label, register, error, placeholder }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <textarea
        {...register}
        rows={4}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}