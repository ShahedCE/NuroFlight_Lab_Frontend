// src/app/projects/ProjectsClient.tsx
"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/dummy_data/projects";
import ProjectCard from "@/components/cards/ProjectCard";

type Filter = "ALL" | ProjectStatus;

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return projects
      .filter((p) => (filter === "ALL" ? true : p.status === filter))
      .filter((p) => {
        if (!query) return true;
        const hay = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [projects, filter, q]);

  const counts = useMemo(() => {
    const ongoing = projects.filter((p) => p.status === "ONGOING").length;
    const completed = projects.filter((p) => p.status === "COMPLETED").length;
    return { all: projects.length, ongoing, completed };
  }, [projects]);

  return (
    <section className="mt-2">
      <div className="mb-5">
        <h1 className="text-3xl font-bold pageTitle">Projects</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
          Explore our ongoing and completed research projects.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="inline-flex flex-wrap gap-2">
          <Tab active={filter === "ALL"} onClick={() => setFilter("ALL")}>
            All <span className="ml-1 text-white/60">({counts.all})</span>
          </Tab>
          <Tab active={filter === "ONGOING"} onClick={() => setFilter("ONGOING")}>
            Ongoing <span className="ml-1 text-white/60">({counts.ongoing})</span>
          </Tab>
          <Tab active={filter === "COMPLETED"} onClick={() => setFilter("COMPLETED")}>
            Completed <span className="ml-1 text-white/60">({counts.completed})</span>
          </Tab>
        </div>

        {/* Search */}
        <div className="w-full md:w-90">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects (title, tags...)"
            className="h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white outline-none
                       placeholder:text-white/40 focus:border-white/25 focus:bg-white/10"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} item={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          No projects found for your search/filter.
        </div>
      )}
    </section>
  );
}

function Tab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-10 items-center rounded-xl border px-3 text-sm font-semibold transition",
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}