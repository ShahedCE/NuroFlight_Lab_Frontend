// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="detail">
      <h1 className="detail__title">Not Found</h1>
      <p className="detail__desc">This page doesn’t exist.</p>
      <Link href="/" className="card__btn">← Back to Home</Link>
    </section>
  );
}