"use client";

import Image from "next/image";
import {
  Mail,
  Linkedin,
  Github,
  GraduationCap,
} from "lucide-react";
import type { TeamGroup, TeamMember } from "@/dummy_data/team";
import { useMemo } from "react";

const GROUP_ORDER: TeamGroup[] = [
 "Principal Research Scientist",
   "Research Team",
   "Research Intern",
   "Software Development Team",
   "Software Intern",
  "Administration",
];

export default function TeamClient({ members }: { members: TeamMember[] }) {

 const grouped = useMemo(() => {
  const map = new Map<TeamGroup, TeamMember[]>();

  GROUP_ORDER.forEach((g) => map.set(g, []));

  members.forEach((m) => {
    map.get(m.group)?.push(m);
  });

  // sort inside each group by priority
  GROUP_ORDER.forEach((g) => {
    map.set(
      g,
      (map.get(g) ?? []).sort(
        (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
      )
    );
  });

  return map;
}, [members]);

  return (
    <main className="mt-2">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Meet the team behind NeuroFlight Lab
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
            Researchers, engineers, and collaborators who push our ideas from exploration to impact.
          </p>
        </header>

        <div className="mt-10 space-y-14">
          {GROUP_ORDER.map((group) => {
            const list = grouped.get(group) ?? [];
            if (!list.length) return null;

            return (
              <section key={group}>
                <h2 className="text-lg font-semibold text-white md:text-xl">
                  {group}
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((m) => (
                    <TeamCard key={m.id} m={m} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function TeamCard({ m }: { m: TeamMember }) {
  return (
    <article
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur
                 transition hover:-translate-y-0.5 hover:border-white/20
                 hover:shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
    >
      {/* image */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image
          src={m.imageUrl}
          alt={m.name}
          fill
          className="object-cover "
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* name */}
      <h3 className="mt-4 text-base font-extrabold tracking-tight text-white">
        {m.name}
      </h3>

      <p className="mt-1 text-sm text-white/70">{m.title}</p>
      {m.primaryAffiliation ? (
        <p className="mt-1 text-sm text-white/55">{m.primaryAffiliation}</p>
      ) : null}

      {/* long bio */}
      {m.bioLines?.length ? (
        <ul className="mt-4 space-y-1.5 text-sm leading-6 text-white/65">
          {m.bioLines.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* expertise */}
      {m.expertise?.length ? (
        <div className="mt-4 text-sm text-white/70">
          <span className="font-semibold text-white">Expertise:</span>{" "}
          {m.expertise.join(", ")}
        </div>
      ) : null}

      {/* tags */}
      {m.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {m.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* contact row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {m.email ? (
          <a
            href={`mailto:${m.email}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            <span className="truncate">{m.email}</span>
          </a>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3 text-white/70">
          {m.linkedin ? (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          ) : null}
          {m.github ? (
            <a
              href={m.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          ) : null}
          {m.scholar ? (
            <a
              href={m.scholar}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="Google Scholar"
            >
              <GraduationCap className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}