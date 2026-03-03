import Link from "next/link";
import type { Publication } from "@/dummy_data/publications";

export default function PublicationCard({ item }: { item: Publication }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
      <h3 className="text-base font-extrabold tracking-tight text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-white/70">{item.authors}</p>
      <p className="mt-1 text-sm text-white/60">
        {item.venue} • {item.year}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/65"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.pdfUrl ? (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 px-3 text-sm font-semibold text-[#081022]
                       bg-linear-to-r from-(--accent) to-(--accent2) transition hover:-translate-y-0.5"
          >
            PDF
          </a>
        ) : null}

        <Link
          href={`/publications/${item.slug}`}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
        >
          View →
        </Link>
      </div>
    </article>
  );
}