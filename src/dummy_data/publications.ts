// src/dummy_data/publications.ts
export type Publication = {
  id: string;
  slug: string;

  title: string;
  authors: string;
  venue: string;
  year: number;

  abstract: string;
  tags: string[];

  paperUrl?: string; // external landing page
  pdfUrl?: string;   // direct pdf
  doiUrl?: string;
  codeUrl?: string;

  bibtex?: string;
  relatedProjectSlugs?: string[];
  updatedAt: string;
};

export const publications: Publication[] = [
  
  {
    id: "pub1",
    slug: "real-time-eeg-classification",
    title: "Real-time EEG Classification for Assistive Control",
    authors: "A. Rahman, M. Hasan",
    venue: "IEEE Conference",
    year: 2026,
    abstract:
      "We present a real-time EEG classification pipeline for assistive control, focusing on robustness to noise and low-latency inference.",
    tags: ["BCI", "EEG", "Classification"],
    pdfUrl: "https://example.com/paper.pdf",
    doiUrl: "https://doi.org/10.0000/example",
    codeUrl: "https://github.com/example/repo",
    bibtex: `@inproceedings{rahman2026eeg,
  title={Real-time EEG Classification for Assistive Control},
  author={Rahman, A. and Hasan, M.},
  booktitle={IEEE Conference},
  year={2026}
}`,
    relatedProjectSlugs: ["eeg-drone-control"],
    updatedAt: "2026-02-02",
  },
  {
    id: "pub2",
    slug: "neuro-adaptive-ui-survey",
    title: "Neuro-Adaptive UI: A Survey",
    authors: "S. Ahmed, T. Khan",
    venue: "ACM Journal",
    year: 2025,
    abstract:
      "A survey of neuro-adaptive interfaces, covering sensing modalities, adaptation strategies, evaluation protocols, and open challenges.",
    tags: ["HCI", "NeuroAI", "Survey"],
    paperUrl: "https://example.com",
    updatedAt: "2025-11-20",
  },  {
    id: "pub3",
    slug: "neuro-adaptive-ui-survey",
    title: "Neuro-Adaptive UI: A Survey",
    authors: "S. Ahmed, T. Khan",
    venue: "ACM Journal",
    year: 2024,
    abstract:
      "A survey of neuro-adaptive interfaces, covering sensing modalities, adaptation strategies, evaluation protocols, and open challenges.",
    tags: ["HCI", "NeuroAI", "Survey"],
    paperUrl: "https://example.com",
    updatedAt: "2025-11-20",
  },
];