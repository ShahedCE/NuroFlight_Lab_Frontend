// src/components/sections/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-10 md:pt-20 md:pb-14">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -inset-24 blur-3xl opacity-90"
          style={{
            background:
              "radial-gradient(680px 340px at 50% 18%, rgba(122,167,255,0.26), transparent 60%), radial-gradient(520px 320px at 20% 55%, rgba(96,225,255,0.12), transparent 62%), radial-gradient(520px 320px at 80% 55%, rgba(96,225,255,0.10), transparent 62%)",
          }}
        />
      </div>

      {/* container */}
      <div className="relative mx-auto max-w-6xl px-4">
        {/* HERO CENTER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white/70">
            Neuroengineering • BCI • Intelligent Systems
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.05]">
            NeuroFlight Lab
          </h1>

          <div className="mt-3 text-sm font-semibold text-white/70 md:text-base">
            Sky is the Limit
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
            To advance interdisciplinary research and innovation in AI, robotics, biotechnology, and software systems—
            empowering intelligent, sustainable, and human-centered solutions.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10
                         bg-linear-to-r from-(--accent) to-(--accent2)
                         px-5 text-sm font-semibold text-[#081022] transition hover:-translate-y-0.5"
            >
              Explore Research
            </Link>

            <Link
              href="/publications"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5
                         px-5 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              Explore Development
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5
                         px-5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              Stay Updated
            </Link>
          </div>
        </div>
        
   {/* Mission & Vision (NO GRID) */}
<div className="mt-14 flex justify-center">
  <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
    {/* Mission */}
    <div className="w-full md:w-105 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20">
      <div className="text-sm font-semibold text-white">Mission</div>
      <p className="mt-3 text-sm leading-7 text-white/65">
        To advance interdisciplinary research and innovation at the intersection of AI, robotics,
        biotechnology, and software systems—through collaboration, education, and real-world impact.
      </p>
    </div>

    {/* Vision */}
    <div className="w-full md:w-105 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20">
      <div className="text-sm font-semibold text-white">Vision</div>
      <p className="mt-3 text-sm leading-7 text-white/65">
        Become a globally recognized hub for AI-driven interdisciplinary innovation across research and
        industry—building systems that are transparent, reliable, and beneficial.
      </p>
    </div>
  </div>
</div>

        {/* optional: small chips (like your dummy screenshot "Core Values") */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {["Innovation", "Research", "Software Development", "Biotechnology", "Large Language Models", "Robotics"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}