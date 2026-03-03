import Link from "next/link";

export default function NotFound() {
  return (
    <section className="detail">
      <h1 className="detail__title">Publication Not Found</h1>
      <p className="detail__desc">
        The requested publication does not exist.
      </p>
      <Link href="/publications" className="card__btn">
        ← Back to Publications
      </Link>
    </section>
  );
}