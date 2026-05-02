"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  X,
  UploadCloud,
  Loader2,
  Send,
  CheckCircle2,
} from "lucide-react";
import { applyJob } from "@/lib/public/public-api";

type JobPost = {
  id: string;
  title: string;
  summary: string;
  status: string;
  team: string;
  level: string;
  type: string;
  location: string;
  postedAt: string;
  deadline?: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
};

type ApplyState = {
  jobId: string;
  jobTitle: string;
};

export default function CareerClient({ jobs }: { jobs: JobPost[] }) {
  const [selected, setSelected] = useState<ApplyState | null>(null);
  const [mounted, setMounted] = useState(false);

  // Track which jobs were applied successfully
  const [successJobId, setSuccessJobId] = useState<string | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide success message after a short time
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showSuccessMsg) {
      timeout = setTimeout(() => {
        setShowSuccessMsg(false);
        setSuccessJobId(null);
      }, 2500); // 2.5 seconds
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showSuccessMsg]);

  if (!mounted) return null;

  const publishedJobs = jobs.filter(
    (j) => String(j.status).toLowerCase() === "published"
  );

  // If we successfully applied, filter out the applied job card.
  const displayJobs = successJobId
    ? publishedJobs.filter((job) => job.id !== successJobId)
    : publishedJobs;

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

        {/* Success message with blur background and delayed appearance */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${showSuccessMsg ? '' : 'pointer-events-none'}`}
          style={{
            pointerEvents: showSuccessMsg ? 'auto' : 'none',
          }}
          aria-live="assertive"
        >
          {/* Blurred background */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
              showSuccessMsg ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          ></div>
          {/* Message container, delayed animation */}
          <div
            className={`relative flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/10 px-6 py-4 text-green-200 text-base font-semibold shadow-lg transition-opacity duration-300 ${
              showSuccessMsg ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            style={{
              transitionDelay: showSuccessMsg ? '0.5s' : '0s',
              pointerEvents: showSuccessMsg ? 'auto' : 'none',
            }}
          >
            <CheckCircle2 className="h-5 w-5 text-green-300" />
            Application submitted successfully!
          </div>
        </div>
   

        {/* Modal */}
        {selected ? (
        <ApplyModal
          jobId={selected.jobId}
          jobTitle={selected.jobTitle}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setSuccessJobId(selected.jobId);
            setShowSuccessMsg(true);
            setSelected(null);
          }}
        />
        ) : null}

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
            {displayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() =>
                  setSelected({
                    jobId: job.id,
                    jobTitle: job.title,
                  })
                }
              />
            ))}
            {/* If there are no jobs to display after application, show a message */}
            {displayJobs.length === 0 && (
              <div className="col-span-full text-center text-white/70 py-10">
                No more open roles at the moment. Please check back later!
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function JobCard({ job, onApply }: { job: JobPost; onApply: () => void }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
          {job.team}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
          {job.level}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
          {job.type}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-extrabold text-white">{job.title}</h3>

      <p className="mt-2 text-sm leading-7 text-white/70">{job.summary}</p>

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

      <div className="mt-4">
        <button
          type="button"
          onClick={onApply}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-linear-to-r from-(--accent) to-(--accent2) px-4 text-sm font-semibold text-[#081022]"
        >
          Apply Now →
        </button>
      </div>
    </article>
  );
}

function ApplyModal({
  jobId,
  jobTitle,
  onClose,
  onSuccess,
}: {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (fullName.trim().length < 3) {
      setErr("Please enter your full name.");
      return;
    }

    if (!validateEmail(email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }

    if (!cv) {
      setErr("Please attach your CV.");
      return;
    }

    const okTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!okTypes.includes(cv.type)) {
      setErr("CV must be PDF/DOC/DOCX.");
      return;
    }

    if (cv.size > 5 * 1024 * 1024) {
      setErr("CV must be under 5MB.");
      return;
    }

    setSending(true);

    try {
      await applyJob({
        jobPostId: jobId,
        fullName: fullName.trim(),
        email: email.trim(),
        cv,
      });

      // Show success, hide modal
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      setErr(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
    finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1230] p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white/60">Apply Now</div>
            <h3 className="mt-1 text-lg font-extrabold text-white">
              {jobTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white"
          />

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              {cv ? cv.name : "Upload PDF/DOC/DOCX"}
            </span>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setCv(e.target.files?.[0] ?? null)}
            />
          </label>

          {err ? (
            <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-100">
              {err}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-(--accent) to-(--accent2) text-sm font-semibold text-[#081022]"
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