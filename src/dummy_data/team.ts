// src/dummy_data/team.ts
export type TeamTag = "Administration" | "Research and Innovation";
export type TeamGroup =
  | "Principal Research Scientist"
  | "Research Team"
  | "Research Intern"
  | "Software Development Team"
  | "Software Intern"
  |"Administration";

export type TeamMember = {
  id: string;
  slug: string;

  name: string;
  title: string; // e.g., CEO & Lead Researcher
  primaryAffiliation?: string; // e.g., INTI International University, Malaysia
  imageUrl: string;

  bioLines: string[]; // long info lines
  expertise?: string[]; // ["Bio-inspired robotics", "Computer Vision"]
  tags?: TeamTag[]; // chips

  group: TeamGroup;
  priority?: number;

  email?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "tawhid",
    slug: "sm-tawhid",
    name: "S.M. Tawhid",
    title: "CEO & Lead Researcher",
    primaryAffiliation: "INTI International University, Malaysia",
    imageUrl: "/tawhid.jpg",
    group: "Research Team",
    priority: 1,
    bioLines: [
      "B.Sc. in CSE, AIUB",
      "Working at Dr. Anwarul Abedin Institute of Innovation (D2A2I), AIUB.",
      "Research Assistant, INTI International University, Malaysia.",
      "Former Research Associate, VU Amsterdam, Netherlands.",
    ],
    expertise: ["Bio-inspired Robotics", "Computer Vision"],
    tags: ["Administration", "Research and Innovation"],
    email: "tawhid@example.com",
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },
 // =========================
  // Principal Research Scientist
  // =========================
  {
    id: "dip-nandi",
    slug: "prof-dr-dip-nandi",
    name: "Prof. Dr. Dip Nandi",
    title: "Principal Investigator",
    primaryAffiliation: "Associate Dean, FST, AIUB",
    imageUrl: "/dipsir.jpg",
    group: "Principal Research Scientist",
    priority: 1,

    bioLines: [
      "Leads all research activities of the lab, providing guidance and mentorship to members.",
      "Ph.D. from RMIT University, Australia.",
      "M.Sc. from University of Melbourne.",
    ],

    expertise: ["AI", "Robotics", "Education"],

    tags: [ "Research and Innovation"],
     email: "dip@example.com",
    linkedin: "https://...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },

  // =========================
  // Research Team
  // =========================
  {
    id: "mohim",
    slug: "abdul-kader-mohim",
    name: "Abdul Kader Mohim",
    title: "HR Manager and Researcher",
    primaryAffiliation:
      "Dr. Anwarul Abedin Institute of Innovation (D2A2I), AIUB",
    imageUrl: "/abdulmohim.png",
    group: "Research Team",
    priority: 2,

    bioLines: [
      "B.Sc. in CSE, AIUB",
      "Working at Dr. Anwarul Abedin Institute of Innovation (D2A2I), AIUB.",
      "Former Research Assistant at AI and Applied Intelligence Research Lab (AAIRL), AIUB.",
    ],

    expertise: ["Embedded Systems"],

    tags: ["Research and Innovation"],
     email: "mohim@example.com",
    linkedin: "https://...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },
{
    id: "akhi",
    slug: "afiat-zahan-akhi",
    name: "Afiat Zahan Akhi",
    title: "Research Program Executive",
    primaryAffiliation:
      "MBA, Bangladesh University of Professionals (BUP)",
    imageUrl: "/akhi.jpg",
    group: "Research Team",
    priority: 4,

    bioLines: [
      "Managing and coordinating initiatives and impactful outcomes across our programs.",
    ],

    expertise: ["Project Management"],

    tags: ["Research and Innovation"],
     email: "akhi@example.com",
    linkedin: "https://...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },
  //Software Development Team
  {
  id: "yash-rohan",
  slug: "yash-rohan",
  name: "Yash Rohan",
  title: "Head of Development",
  primaryAffiliation: "NeuroFlight Lab",
  imageUrl: "/yash.jpeg",
  group: "Software Development Team",
  priority: 1, // head so first inside dev team

  bioLines: [
    "B.Sc. in CSE, AIUB",
    "Research Assistant, INTI International University, Malaysia.",
    "Former Research Engineer at Applied Intelligence and Informatics, Nottingham, UK.",
  ],

  expertise: ["Full-Stack Development", "DevOps"],

  tags: ["Research and Innovation"],
},
  // =========================
  // Administration
  // =========================
  {
    id: "jayed",
    slug: "shahriar-hossain-jayed",
    name: "Shahriar Hossain Jayed",
    title: "Admin Officer",
    primaryAffiliation: "B.Sc. in CSE (Ongoing), AIUB",
    imageUrl: "/shahriar.png",
    group: "Administration",
    priority: 3,

    bioLines: [
      "Manages operations, coordinates resources, and supports lab activities.",
    ],

    expertise: ["Project Management"],

    tags: ["Administration"],
     email: "jayed@example.com",
    linkedin: "https://...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },

  
  // Add others similarly (PI, Research team, Dev team)
];