export const revalidate = 60; // ISR

import { projects } from "@/dummy_data/projects";
import ProjectCard from "@/components/cards/ProjectCard";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <section>
      <ProjectsClient projects={projects} />
  
    </section>
  );
}