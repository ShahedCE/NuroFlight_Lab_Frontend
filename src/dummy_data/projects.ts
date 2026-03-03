export type ProjectStatus = "ONGOING" | "COMPLETED";

export type Project = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  coverImage?: string; // e.g. "/images/projects/p1.jpg"
  updatedAt: string;   // ISO date string
  slug:string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "EEG-based Drone Control",
    description: "Decoding EEG signals for real-time flight commands and feedback.",
    status: "ONGOING",
    tags: ["BCI", "EEG", "Robotics"],
    coverImage: "/logo.jpg",
    updatedAt: "2026-02-10",
    slug: "eeg-drone-control",
  },
  {
    id: "p2",
    title: "Neuro-Adaptive Interfaces",
    description: "Adaptive UI that responds to cognitive workload and attention.",
    status: "ONGOING",
    tags: ["HCI", "NeuroAI"],
    updatedAt: "2026-01-25",
    slug: "nuro-ad-inter",
  },
  {
    id: "p3",
    title: "Signal Denoising for EEG",
    description: "Artifact removal and denoising using deep learning.",
    status: "COMPLETED",
    tags: ["ML", "Signal Processing"],
    updatedAt: "2025-12-12",
    slug: "sig-den-eeg",

  },
    {
    id: "p4",
    title: "EEG-based Drone Control",
    description: "Decoding EEG signals for real-time flight commands and feedback.",
    status: "ONGOING",
    tags: ["BCI", "EEG", "Robotics"],
    coverImage: "/logo.jpg",
    updatedAt: "2026-02-10",
    slug: "eeg-drone-control",
  },
  {
    id: "p5",
    title: "Neuro-Adaptive Interfaces",
    description: "Adaptive UI that responds to cognitive workload and attention.",
    status: "ONGOING",
    tags: ["HCI", "NeuroAI"],
    updatedAt: "2026-01-25",
    slug: "nuro-ad-inter",
 
  },

  {
    id: "p6",
    title: "Signal Denoising for EEG",
    description: "Artifact removal and denoising using deep learning.",
    status: "COMPLETED",
    tags: ["ML", "Signal Processing"],
    updatedAt: "2025-12-12",
    slug: "sig-den-eeg",

  },  {
    id: "p7",
    title: "EEG-based Drone Control",
    description: "Decoding EEG signals for real-time flight commands and feedback.",
    status: "ONGOING",
    tags: ["BCI", "EEG", "Robotics"],
    coverImage: "/logo.jpg",
    updatedAt: "2026-02-10",
    slug: "eeg-drone-control",
  },
  {
    id: "p8",
    title: "Neuro-Adaptive Interfaces",
    description: "Adaptive UI that responds to cognitive workload and attention.",
    status: "ONGOING",
    tags: ["HCI", "NeuroAI"],
    updatedAt: "2026-01-25",
    slug: "nuro-ad-inter",

  },
  {
    id: "p9",
    title: "Signal Denoising for EEG",
    description: "Artifact removal and denoising using deep learning.",
    status: "COMPLETED",
    tags: ["ML", "Signal Processing"],
    updatedAt: "2025-12-12",
    slug: "sig-den-eeg",

  }
];