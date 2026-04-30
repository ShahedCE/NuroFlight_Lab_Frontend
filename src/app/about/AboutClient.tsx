"use client";

import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Braces,
  Eye,
  Users,
  Cpu,
  Lightbulb,
  Handshake,
  Award,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

const researchAreas = [
  {
    no: "01",
    title: "Generative AI",
    desc: "Models that generate text, visuals, and insights for real-world impact.",
    Icon: Sparkles,
    tone: "from-sky-400/25 to-cyan-400/10 text-sky-200 ring-sky-400/25",
  },
  {
    no: "02",
    title: "Explainable AI (XAI)",
    desc: "Transparent, auditable systems that you can trust and validate.",
    Icon: ShieldCheck,
    tone: "from-emerald-400/25 to-lime-400/10 text-emerald-200 ring-emerald-400/25",
  },
  {
    no: "03",
    title: "Natural Language Processing",
    desc: "Language systems for understanding, assistance, and communication.",
    Icon: Braces,
    tone: "from-violet-400/25 to-fuchsia-400/10 text-violet-200 ring-violet-400/25",
  },
  {
    no: "04",
    title: "Computer Vision",
    desc: "Perception for analysis, monitoring, and decision support pipelines.",
    Icon: Eye,
    tone: "from-amber-400/25 to-orange-400/10 text-amber-200 ring-amber-400/25",
  },
  {
    no: "05",
    title: "Human–AI Interaction (HCI)",
    desc: "Designing usable, safe interfaces for real humans in real contexts.",
    Icon: Users,
    tone: "from-pink-400/25 to-rose-400/10 text-pink-200 ring-pink-400/25",
  },
  {
    no: "06",
    title: "Agentic AI",
    desc: "Autonomous agents that plan, execute, and learn with constraints.",
    Icon: Cpu,
    tone: "from-blue-400/25 to-indigo-400/10 text-blue-200 ring-blue-400/25",
  },
];

const valueCards = [
  {
    title: "Innovation",
    desc: "We push boundaries and prototype quickly—then validate properly.",
    Icon: Lightbulb,
    tone: "from-sky-400/25 to-cyan-400/10 text-sky-200 ring-sky-400/25",
  },
  {
    title: "Collaboration",
    desc: "We build with students, labs, and partners to move faster together.",
    Icon: Handshake,
    tone: "from-emerald-400/25 to-lime-400/10 text-emerald-200 ring-emerald-400/25",
  },
  {
    title: "Excellence",
    desc: "Strong methodology, reproducibility, and clear reporting—always.",
    Icon: Award,
    tone: "from-violet-400/25 to-fuchsia-400/10 text-violet-200 ring-violet-400/25",
  },
  {
    title: "Knowledge Sharing",
    desc: "We share findings, code, and lessons with the community.",
    Icon: Share2,
    tone: "from-amber-400/25 to-orange-400/10 text-amber-200 ring-amber-400/25",
  },
];

export default function AboutClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <main className="mt-2">
      <div className="mx-auto max-w-6xl px-4 pb-14">
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
          About Us
        </h1>

        {/* Top section (same structure, dark theme) */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* Left card */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              {/* subtle glow */}
              <div className="pointer-events-none absolute -inset-24 opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(520px 260px at 30% 25%, rgba(122,167,255,0.20), transparent 60%), radial-gradient(420px 240px at 60% 60%, rgba(96,225,255,0.12), transparent 62%)",
                }}
              />
              <div className="relative flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>

              <div className="relative mt-4 text-center">
                <div className="text-sm font-semibold text-white/85">
                  Building Transparent AI
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Trustworthy systems, robust evaluation, and clear reporting for real-world use.
                </p>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[13px] text-white/70">
              Neuroengineering • BCI • Intelligent Systems
            </div>

            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-white md:text-2xl">
              Driven by artificial intelligence and human values
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/70 md:text-[15px]">
              NeuroFlight Lab explores brain–computer interfaces, neuro-adaptive interaction, and robust
              signal intelligence. Our work blends research and engineering to build reproducible,
              human-centered neurotechnology.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold
                           text-[#081022] border border-white/10
                           bg-linear-to-r  bg-blue-200
                           transition hover:-translate-y-0.5"
              >
                Explore Projects
              </Link>

              <Link
                href="/publications"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white
                           transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                View Publications
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Research Areas */}
        <section>
          <h2 className="text-center text-lg font-semibold text-white md:text-xl">
            Core Research Areas
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-6 text-white/65">
            Exploring directions to create transparent, interpretable, and impactful solutions.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((a) => (
              <div
                key={a.no}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition
                           hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-lg ring-1",
                        "bg-gradient-to-br",
                        a.tone,
                      ].join(" ")}
                    >
                      <a.Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {a.title}
                    </div>
                  </div>

                  <div className="text-2xl font-semibold text-white/10">
                    {a.no}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Philosophy + Drives */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/15">
                💡
              </span>
              Our Philosophy
            </div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              We build interpretable, accountable systems. We validate with strong baselines, rigorous
              evaluation, and communicate results for reproducibility.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/15">
                🎯
              </span>
              What drives Us
            </div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Practical impact and responsible innovation—solving real problems without sacrificing
              transparency, safety, and human-centered design.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Core values */}
        <section>
          <h2 className="text-center text-lg font-semibold text-white md:text-xl">
            Our Core Values
          </h2>
<div className="mt-7 flex flex-wrap gap-5">
  {valueCards.map((v) => (
    <div
      key={v.title}
      className="w-full sm:w-[calc(50%-10px)] rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur
                 transition hover:-translate-y-0.5 hover:border-white/20"
    >
      <div
        className={[
          "mx-auto flex h-11 w-11 items-center justify-center rounded-xl ring-1",
          "bg-gradient-to-br",
          v.tone,
        ].join(" ")}
      >
        <v.Icon className="h-5 w-5" />
      </div>

      <div className="mt-3 text-sm font-semibold text-white">
        {v.title}
      </div>

      <p className="mx-auto mt-2 max-w-[42ch] text-sm leading-6 text-white/65">
        {v.desc}
      </p>
    </div>
  ))}
</div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
          <h3 className="text-center text-base font-semibold text-white md:text-lg">
            Join Our Research Community
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-7 text-white/65">
            We welcome collaborators, researchers, and partners who share our vision. Explore opportunities
            or reach out to discuss potential collaborations.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/career"
              className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold
                         text-[#081022] border border-white/10
                         bg-gradient-to-r from-cyan-300 to-blue-400
                         transition hover:-translate-y-0.5"
            >
              Career
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white
                         transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
}