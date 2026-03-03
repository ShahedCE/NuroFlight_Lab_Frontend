export const revalidate = 60;

import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionTitle from "@/components/sections/SectionTitle";

import { projects } from "@/dummy_data/projects";
import { publications } from "@/dummy_data/publications";

import ProjectCard from "@/components/cards/ProjectCard";
import PublicationCard from "@/components/cards/PublicationCard";

export default function HomePage() {
  const ongoing = projects.filter((p) => p.status === "ONGOING").slice(0, 3);

  const recentPubs = [...publications]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);
  return (
    <>
      <Hero/>
      <section className="mt-10">
        <SectionTitle
          eyebrow="Research"
          title="Ongoing Projects"
          description="A snapshot of what we are currently building and validating."
          right={
            <Link
              href="/projects"
              className="inline-flex h-9 items-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white
                         transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              View all →
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ongoing.map((p) => (
            <ProjectCard key={p.id} item={p} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle
          eyebrow="Publications"
          title="Recent Publications"
          description="Latest papers, reports, and research outputs from the lab."
          right={
            <Link
              href="/publications"
              className="inline-flex h-9 items-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white
                         transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              View all →
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentPubs.map((p) => (
            <PublicationCard key={p.id} item={p} />
          ))}
        </div>
      </section>
    </>
  );
}