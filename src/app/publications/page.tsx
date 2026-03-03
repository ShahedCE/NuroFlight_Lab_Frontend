// src/app/publications/page.tsx
export const revalidate = 60;

import { publications } from "@/dummy_data/publications";
import PublicationsClient from "./PublicationsClient";

export default function PublicationsPage() {
  return <PublicationsClient publications={publications} />;
}