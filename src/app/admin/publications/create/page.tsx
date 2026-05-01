"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPublication } from "@/lib/admin/admin-api";
import {
  publicationSchema,
  type PublicationFormValues,
} from "@/lib/admin/validations/publication";

export default function CreatePublicationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema) as any,
    defaultValues: {
      slug: "",
      title: "",
      authors: "",
      venue: "",
      year: new Date().getFullYear(),
      abstract: "",
      tags: "",
      paperUrl: "",
      pdfUrl: "",
      doiUrl: "",
      codeUrl: "",
      bibtex: "",
      relatedProjectSlugs: "",
    },
  });

  const onSubmit = async (data: PublicationFormValues) => {
    setLoading(true);
    setError("");

    try {
      await createPublication({
        slug: data.slug,
        title: data.title,
        authors: data.authors,
        venue: data.venue,
        year: data.year,
        abstract: data.abstract,
        tags: toArray(data.tags),
        paperUrl: emptyToUndefined(data.paperUrl),
        pdfUrl: emptyToUndefined(data.pdfUrl),
        doiUrl: emptyToUndefined(data.doiUrl),
        codeUrl: emptyToUndefined(data.codeUrl),
        bibtex: emptyToUndefined(data.bibtex),
        relatedProjectSlugs: toArray(data.relatedProjectSlugs || ""),
      });

      router.push("/admin/publications");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create publication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Create Publication
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
        <Input label="Slug" register={register("slug")} error={errors.slug?.message} />
        <Input label="Authors" register={register("authors")} error={errors.authors?.message} />
        <Input label="Venue" register={register("venue")} error={errors.venue?.message} />

        <Input
          label="Year"
          type="number"
          register={register("year")}
          error={errors.year?.message}
        />

        <Textarea
          label="Abstract"
          rows={5}
          register={register("abstract")}
          error={errors.abstract?.message}
        />

        <Input
          label="Tags"
          placeholder="AI, Drone, Computer Vision"
          register={register("tags")}
          error={errors.tags?.message}
        />

        <Input label="Paper URL" register={register("paperUrl")} error={errors.paperUrl?.message} />
        <Input label="PDF URL" register={register("pdfUrl")} error={errors.pdfUrl?.message} />
        <Input label="DOI URL" register={register("doiUrl")} error={errors.doiUrl?.message} />
        <Input label="Code URL" register={register("codeUrl")} error={errors.codeUrl?.message} />

        <Textarea
          label="Bibtex"
          rows={4}
          register={register("bibtex")}
          error={errors.bibtex?.message}
        />

        <Input
          label="Related Project Slugs"
          placeholder="ai-drone-navigation-system, another-project"
          register={register("relatedProjectSlugs")}
          error={errors.relatedProjectSlugs?.message}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Publication"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/publications")}
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

function emptyToUndefined(value?: string) {
  return value && value.trim() !== "" ? value.trim() : undefined;
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

function Textarea({ label, register, error, rows = 4 }: any) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <textarea
        {...register}
        rows={rows}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}