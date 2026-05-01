// src/app/publications/page.tsx
export const revalidate = 60;

import PublicationsClient from "./PublicationsClient";
import { getPublications } from "@/lib/public/public-api";

export default async function PublicationsPage() {
  const publications= await getPublications();
  return <PublicationsClient publications={publications} />;
}