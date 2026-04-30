"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getPublicationById,
  updatePublication,
} from "@/lib/admin/admin-api";
import {
  publicationSchema,
  type PublicationFormValues,
} from "@/lib/admin/validations/publication";
import type { PublicationItem } from "@/types/admin";

export default function EditPublicationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
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

  useEffect(() => {
    const loadPublication = async () => {
      setLoading(true);
      setError("");

      try {
        const item = (await getPublicationById(id)) as PublicationItem | undefined;

        if (!item) {
          setError("Publication not found");
          return;
        }

        reset({
          slug: item.slug || "",
          title: item.title || "",
          authors: item.authors || "",
          venue: item.venue || "",
          year: item.year || new Date().getFullYear(),
          abstract: item.abstract || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
          paperUrl: item.paperUrl || "",
          pdfUrl: item.pdfUrl || "",
          doiUrl: item.doiUrl || "",
          codeUrl: item.codeUrl || "",
          bibtex: item.bibtex || "",
          relatedProjectSlugs: Array.isArray(item.relatedProjectSlugs)
            ? item.relatedProjectSlugs.join(", ")
            : "",
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load publication");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPublication();
  }, [id, reset]);

  const onSubmit = async (data: PublicationFormValues) => {
    setSaving(true);
    setError("");

    try {
      await updatePublication(id, {
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
      setError(err?.response?.data?.message || "Failed to update publication");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-300">Loading publication...</div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Edit Publication
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
            disabled={saving}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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