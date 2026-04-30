import Link from "next/link";
import type { Project } from "@/dummy_data/projects";

export default function ProjectCard({ item }: { item: Project }) {
    
const statusStyles: Record<string, string> = {
  ONGOING: "border-cyan-300/30 bg-cyan-300/15 text-cyan-300",
  COMPLETED: "border-emerald-300/30 bg-emerald-300/15 text-emerald-300",
};

const badge = statusStyles[item.status] ?? "border-white/15 bg-white/5 text-white/80";

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${badge}`}>
          {item.status}
        </span>
      </div>

      <h3 className="mt-3 text-base font-extrabold tracking-tight text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-white/70">
        {item.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
      {item.tags.map((t, index) => (
        <span
           key={`${item.id}-tag-${index}`} // ✅ FIXED
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/65"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <Link
          href={`/projects/${item.slug}`}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}