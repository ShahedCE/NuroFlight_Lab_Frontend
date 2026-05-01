"use client";

import Image from "next/image";
import { Mail, Linkedin, Github, GraduationCap } from "lucide-react";
import { useMemo } from "react";
import type { PublicTeamMember } from "@/types/public";
import { getFileUrl } from "@/lib/public/helpers";

type TeamGroupValue =
  | "principal_research_scientist"
  | "research_team"
  | "research_intern"
  | "software_development_team"
  | "software_intern"
  | "administration";

const GROUP_ORDER: { label: string; value: TeamGroupValue }[] = [
  {
    label: "Principal Research Scientist",
    value: "principal_research_scientist",
  },
  { label: "Research Team", value: "research_team" },
  { label: "Research Intern", value: "research_intern" },
  {
    label: "Software Development Team",
    value: "software_development_team",
  },
  { label: "Software Intern", value: "software_intern" },
  { label: "Administration", value: "administration" },
];

function groupAndSortMembers(members: PublicTeamMember[]) {
  const grouped = GROUP_ORDER.map((group) => ({
    label: group.label,
    value: group.value,
    members: [] as PublicTeamMember[],
  }));

  members.forEach((member) => {
    const index = grouped.findIndex((group) => group.value === member.group);

    if (index !== -1) {
      grouped[index].members.push(member);
    }
  });

  grouped.forEach((group) => {
    group.members.sort(
      (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
    );
  });

  return grouped;
}

export default function TeamClient({
  members,
}: {
  members: PublicTeamMember[];
}) {
  const groupedArray = useMemo(() => {
    return groupAndSortMembers(members);
  }, [members]);

  return (
    <main className="mt-2">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Meet the team behind NeuroFlight Lab
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
            Researchers, engineers, and collaborators who push our ideas from
            exploration to impact.
          </p>
        </header>

        <div className="mt-10 space-y-14">
          {groupedArray.map(({ label, value, members: list }) => {
            if (!list.length) return null;

            return (
              <section key={value}>
                <h2 className="text-lg font-semibold text-white md:text-xl">
                  {label}
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((member) => (
                    <TeamCard key={member.id} member={member} />
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

function TeamCard({ member }: { member: PublicTeamMember }) {
  const imageSrc = getFileUrl(member.imageUrl || member.image) || "/logo.jpg";

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image
          src={imageSrc}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <h3 className="mt-4 text-base font-extrabold tracking-tight text-white">
        {member.name}
      </h3>

      <p className="mt-1 text-sm text-white/70">{member.title}</p>

      {member.primaryAffiliation && (
        <p className="mt-1 text-sm text-white/55">
          {member.primaryAffiliation}
        </p>
      )}

      {member.bioLines?.length ? (
        <ul className="mt-4 space-y-1.5 text-sm leading-6 text-white/65">
          {member.bioLines.map((line, index) => (
            <li key={`${member.id}-bio-${index}`} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {member.expertise?.length ? (
        <div className="mt-4 text-sm text-white/70">
          <span className="font-semibold text-white">Expertise:</span>{" "}
          {member.expertise.join(", ")}
        </div>
      ) : null}

      {member.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            <span className="truncate">{member.email}</span>
          </a>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3 text-white/70">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {member.scholar && (
            <a
              href={member.scholar}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              aria-label="Google Scholar"
            >
              <GraduationCap className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}