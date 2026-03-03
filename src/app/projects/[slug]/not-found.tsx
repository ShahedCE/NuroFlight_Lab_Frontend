import Link from "next/link";

export default function NotFound() {
  return (
    <section className="detail">
      <h1 className="detail__title">Project Not Found</h1>
      <p className="detail__desc">
        The requested project does not exist.
      </p>
      <Link href="/projects" className="card__btn">
        ← Back to Projects
      </Link>
    </section>
  );
}