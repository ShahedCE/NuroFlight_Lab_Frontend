// src/dummy_data/careers.ts
export type JobStatus = "PUBLISHED" | "CLOSED" | "DRAFT";

export type JobPost = {
  id: string;
  title: string;
  team: "Research Team" | "Development Team" | "Administration";
  level: "Internship" | "Junior" | "Mid" | "Senior";
  type: "Remote" | "Hybrid" | "Onsite";
  location: string;
  status: JobStatus;

  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];

  postedAt: string;   // "2026-02-20"
  deadline?: string;  // optional
};

export const jobPosts: JobPost[] = [
  {
    id: "job-1",
    title: "Junior Robotics Engineer",
    team: "Research Team",
    level: "Internship",
    type: "Hybrid",
    location: "Dhaka (Mirpur-10)",
    status: "PUBLISHED",
    summary:
      "Work on neuro-drone research & robotics pipelines. Ideal for students who love drones, embedded systems, and rapid prototyping.",
    responsibilities: [
      "Assist in drone + embedded prototyping for research experiments",
      "Implement data collection and evaluation scripts",
      "Document experiments and results clearly",
    ],
    requirements: [
      "Basic understanding of robotics / embedded systems",
      "Comfortable with Python or C/C++",
      "Ability to work in a research team with clear communication",
    ],
    tags: ["Robotics", "Drone", "Embedded", "Research"],
    postedAt: "2026-02-20",
    deadline: "2026-03-15",
  },
  {
    id: "job-2",
    title: "Software Developer Intern",
    team: "Development Team",
    level: "Internship",
    type: "Remote",
    location: "Remote",
    status: "PUBLISHED",
    summary:
      "Help build and polish the NeuroFlight Lab web platform and internal tooling. Great for hands-on full-stack learning.",
    responsibilities: [
      "Ship UI features with Next.js + Tailwind",
      "Maintain reusable components & design consistency",
      "Write clean, readable code and PR descriptions",
    ],
    requirements: [
      "Comfortable with React basics",
      "Understanding of API concepts",
      "Can learn quickly and communicate progress",
    ],
    tags: ["Next.js", "Tailwind", "Frontend", "Full-stack"],
    postedAt: "2026-02-18",
  },
];