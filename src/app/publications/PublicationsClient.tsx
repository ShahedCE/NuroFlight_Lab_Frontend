// src/app/publications/PublicationsClient.tsx
"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/dummy_data/publications";
import PublicationCard from "@/components/cards/PublicationCard";

export default function PublicationsClient({ publications }: { publications: Publication[] }) {
  const [year, setYear] = useState<string>("ALL");
  const [q, setQ] = useState("");

  const years = useMemo(() => {
    const uniq = Array.from(new Set(publications.map((p) => p.year)));
    uniq.sort((a, b) => b - a);
    return uniq;
  }, [publications]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return [...publications]
      .filter((p) => (year === "ALL" ? true : p.year === Number(year)))
      .filter((p) => {
        if (!query) return true;
        const hay = `${p.title} ${p.authors} ${p.venue} ${(p.tags ?? []).join(" ")}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => (b.year - a.year) || b.updatedAt.localeCompare(a.updatedAt));
  }, [publications, year, q]);

  return (
    <section className="mt-2">
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight text-white">Publications</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
          Browse papers and research outputs by year.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Year dropdown */}
        <div className="w-full md:w-55">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/15 bg-[#0b1330] px-3 text-sm text-white
             outline-none focus:border-white/25 focus:bg-[#0d1738]"
          >
            <option className="bg-[#0b1330] text-white" value="ALL">All years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="w-full md:w-90">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (title, authors, venue...)"
            className="h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white outline-none
                       placeholder:text-white/40 focus:border-white/25 focus:bg-white/10"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PublicationCard key={p.id} item={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          No publications found for your filter/search.
        </div>
      )}
    </section>
  );
}