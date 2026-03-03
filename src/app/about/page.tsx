// src/app/about/page.tsx
export const revalidate = 60;

import AboutClient from "./AboutClient";

export default function AboutPage() {
  return <AboutClient />;
}