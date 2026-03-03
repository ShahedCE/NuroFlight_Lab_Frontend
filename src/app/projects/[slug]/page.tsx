export const revalidate = 60;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/dummy_data/projects";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found | NeuroFlight Lab" };
  return {
    title: `${project.title} | NeuroFlight Lab`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <section className="detail">
      <div className="detail__head">
        <div className={`badge ${project.status === "ONGOING" ? "badge--on" : "badge--done"}`}>
          {project.status}
        </div>
        <h1 className="detail__title">{project.title}</h1>
        <p className="detail__desc">{project.description}</p>

        <div className="detail__tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="detail__meta">
          Last updated: <span className="detail__muted">{project.updatedAt}</span>
        </div>
      </div>

      <div className="detail__grid">
        <div className="card">
          <h3 className="card__title">Overview</h3>
          <p className="card__desc">
            Add a longer overview here later (from backend). For now, this is a placeholder section.
          </p>
        </div>

        <div className="card">
          <h3 className="card__title">Key Points</h3>
          <ul className="list">
            <li>Problem statement</li>
            <li>Method / pipeline</li>
            <li>Expected outcomes</li>
          </ul>
        </div>
      </div>
         <div className="pub__backRow text-center">
            <Link href="/projects" className="card__btn">
              ← Back to Projects
            </Link>
          </div>
    </section>
  );
}