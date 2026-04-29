"use client";

import { useMemo, useState } from "react";
import type { JobPost } from "@/dummy_data/career";
import { Briefcase, Calendar, MapPin, X, UploadCloud, Loader2, Send } from "lucide-react";

type ApplyState = {
  jobId: string;
  jobTitle: string;
};

export default function CareerClient({ jobs }: { jobs: JobPost[] }) {
  const [selected, setSelected] = useState<ApplyState | null>(null);

  return (
    <main className="mt-2">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
          <div
            className="pointer-events-none absolute -inset-24 opacity-80 blur-2xl"
            style={{
              background:
                "radial-gradient(520px 260px at 18% 25%, rgba(122,167,255,0.20), transparent 60%), radial-gradient(520px 260px at 60% 55%, rgba(96,225,255,0.12), transparent 62%)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70">
                <Briefcase className="h-4 w-4" />
                We are hiring across research & engineering
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                Build the future of neurotechnology with us
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
                NeuroFlight Lab blends deep research with pragmatic deployment. Join a team that values safety,
                interpretability, and real-world impact.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#open-roles"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10
                             bg-linear-to-r from-(--accent) to-(--accent2)
                             px-4 text-sm font-semibold text-[#081022] transition hover:-translate-y-0.5"
                >
                  View Open Roles
                </a>

                <a
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5
                             px-4 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Talk with the team
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/55">
                <span>Remote friendly</span>
                <span>Flexible start dates</span>
                <span>Internships available</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-6">
                <div className="text-sm font-semibold text-white">
                  What we are looking for
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>• Strong experimentation mindset</li>
                  <li>• Clear documentation & communication</li>
                  <li>• Curious problem solvers</li>
                  <li>• Respect for research rigor</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section id="open-roles" className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Open Roles
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
              Apply directly from the role card. (Full details included here)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobs
              .filter((j) => j.status === "PUBLISHED")
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => setSelected({ jobId: job.id, jobTitle: job.title })}
                />
              ))}
          </div>
        </section>

        {/* Modal */}
        {selected ? (
          <ApplyModal
            jobTitle={selected.jobTitle}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </div>
    </main>
  );
}

/* ---------------- Job Card ---------------- */

function JobCard({ job, onApply }: { job: JobPost; onApply: () => void }) {
  const pill = (text: string) => (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
      {text}
    </span>
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition
                        hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]">
      {/* header */}
      <div className="flex flex-wrap items-center gap-2">
        {pill(job.team)}
        {pill(job.level)}
        {pill(job.type)}
      </div>

      <h3 className="mt-3 text-lg font-extrabold tracking-tight text-white">
        {job.title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-white/70">
        {job.summary}
      </p>

      {/* meta */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/55">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Posted: {job.postedAt}
        </span>
        {job.deadline ? (
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Deadline: {job.deadline}
          </span>
        ) : null}
      </div>

      {/* details */}
      <div className="mt-4 gap-10">
        <div className="rounded-xl border border-white/10 bg-black/10 p-4 mb-1">
          <div className="text-sm font-semibold text-white">You will</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
            {job.responsibilities.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/10 p-4">
          <div className="text-sm font-semibold text-white">Requirements</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
            {job.requirements.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* tags + actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/65"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onApply}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10
                     bg-linear-to-r from-(--accent) to-(--accent2)
                     px-4 text-sm font-semibold text-[#081022] transition hover:-translate-y-0.5"
        >
          Apply Now →
        </button>
      </div>
    </article>
  );
}

/* ---------------- Apply Modal ---------------- */

function ApplyModal({
  jobTitle,
  onClose,
}: {
  jobTitle: string;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function validateEmail(email: string) {
    // Simple email regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (fullName.trim().length < 3) {
      setErr("Please enter your full name.");
      return;
    }
    if (email.trim().length === 0 || !validateEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!cv) {
      setErr("Please attach your CV (PDF/DOC/DOCX).");
      return;
    }
    const okType = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!okType.includes(cv.type)) {
      setErr("CV must be PDF/DOC/DOCX.");
      return;
    }
    if (cv.size > 5 * 1024 * 1024) {
      setErr("CV must be under 5MB.");
      return;
    }

    setSending(true);
    try {
      // later: send multipart/form-data to backend
      await new Promise((r) => setTimeout(r, 900));
      onClose();
      alert("Application submitted! (Backend email integration pending)");
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1230] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white/60">Apply Now</div>
            <h3 className="mt-1 text-lg font-extrabold text-white">
              {jobTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-white/80">
              Full Name <span className="text-white/40">*</span>
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="mt-2 h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white outline-none
                         placeholder:text-white/35 focus:border-white/25 focus:bg-white/10"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">
              Email <span className="text-white/40">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-2 h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white outline-none
                         placeholder:text-white/35 focus:border-white/25 focus:bg-white/10"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/80">
              CV Attachment <span className="text-white/40">*</span>
            </label>

            <label className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white/70 hover:bg-white/10">
              <span className="inline-flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                {cv ? cv.name : "Upload PDF/DOC/DOCX (max 5MB)"}
              </span>
              <span className="rounded-lg border border-white/10 bg-black/10 px-2 py-1 text-xs text-white/70">
                Browse
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setCv(e.target.files?.[0] ?? null)}
              />
            </label>

            <div className="mt-2 text-xs text-white/45">
              We only accept PDF/DOC/DOCX. Max size 5MB.
            </div>
          </div>

          {err ? (
            <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-100">
              {err}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10
                       bg-linear-to-r from-(--accent) to-(--accent2)
                       text-sm font-semibold text-[#081022] transition hover:-translate-y-0.5
                       disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}