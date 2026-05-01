export const revalidate = 60; // ISR

import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <section>
      <ProjectsClient />
    </section>
  );
}