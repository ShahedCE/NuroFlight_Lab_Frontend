// src/app/publications/[slug]/page.tsx
export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { publications } from "@/dummy_data/publications";
import { projects } from "@/dummy_data/projects";
import ProjectCard from "@/components/cards/ProjectCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);

  if (!pub) return { title: "Publication Not Found | NeuroFlight Lab" };

  return {
    title: `${pub.title} | NeuroFlight Lab`,
    description: pub.abstract,
  };
}

export default async function PublicationDetailsPage({ params }: Props) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const related =
    pub.relatedProjectSlugs?.length
      ? projects.filter((pr) => pub.relatedProjectSlugs?.includes(pr.slug)).slice(0, 3)
      : [];

  return (
    <section className="detail">
      <div className="detail__head">
        <div className="detail__kicker">Publication</div>

        <h1 className="detail__title">{pub.title}</h1>

        <div className="pub__metaRow">
          <span className="pub__meta">{pub.authors}</span>
          <span className="pub__dot">•</span>
          <span className="pub__meta">
            {pub.venue} • {pub.year}
          </span>
        </div>

        <div className="detail__tags">
          {pub.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pub__actions">
          {pub.pdfUrl ? (
            <a className="btn btn--primary pub__btn" href={pub.pdfUrl} target="_blank" rel="noreferrer">
              PDF
            </a>
          ) : null}

          {pub.paperUrl ? (
            <a className="btn pub__btn pub__btn--ghost" href={pub.paperUrl} target="_blank" rel="noreferrer">
              View Paper
            </a>
          ) : null}

          {pub.doiUrl ? (
            <a className="btn pub__btn pub__btn--ghost" href={pub.doiUrl} target="_blank" rel="noreferrer">
              DOI
            </a>
          ) : null}

          {pub.codeUrl ? (
            <a className="btn pub__btn pub__btn--ghost" href={pub.codeUrl} target="_blank" rel="noreferrer">
              Code
            </a>
          ) : null}
        </div>
      </div>

      {/* Abstract */}
      <div className="detail__grid">
        <div className="card">
          <h2 className="card__title">Abstract</h2>
          <p className="card__desc">{pub.abstract}</p>
        </div>

        <div className="card">
          <h2 className="card__title">Citation</h2>

          {pub.bibtex ? (
            <pre className="codeBlock">
              <code>{pub.bibtex}</code>
            </pre>
          ) : (
            <p className="card__desc">BibTeX will be available soon.</p>
          )}

        </div>
      </div>
      
          <div className="pub__backRow text-center">
            <Link href="/publications" className="card__btn">
              ← Back to Publications
            </Link>
          </div>

      {/* Related projects */}
      {related.length ? (
        <div className="section">
          <h2 className="sectionTitle">Related Projects</h2>
          <div className="grid">
            {related.map((p) => (
              <ProjectCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}