"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Loader2,
  ExternalLink,
  Facebook, Linkedin 
} from "lucide-react";

const ADMIN_EMAIL = "info@neuroflightlab.ai"; // change later

// Zod schema
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .refine((v) => !/\d/.test(v), "Name cannot contain numbers."),
  email: z.string().trim().min(5, "Email is required.").email("Invalid email."),
  subject: z.string().trim().min(1, "Subject is required."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long (max 2000)."),
});

type FormState = z.infer<typeof contactSchema>;
type Errors = Partial<Record<keyof FormState, string>>;

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const messageCount = useMemo(() => form.message.length, [form.message]);

  function validate(next: FormState) {
    const res = contactSchema.safeParse(next);

    if (res.success) {
      setErrors({});
      return { ok: true as const, data: res.data };
    }

    const fieldErrors: Errors = {};
    for (const issue of res.error.issues) {
      const key = issue.path[0] as keyof FormState;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return { ok: false as const };
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    const next = { ...form, [key]: value };
    setForm(next);

    // ✅ pro UX: clear that field’s error as user types
    if (errors[key]) {
      const res = contactSchema.safeParse(next);
      if (res.success) setErrors({});
      else {
        const issue = res.error.issues.find((i) => i.path[0] === key);
        setErrors((e) => ({ ...e, [key]: issue?.message }));
      }
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = validate(form);
    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // ✅ Later: send to backend
      // await fetch("/api/contact", { method:"POST", body: JSON.stringify(res.data) })
      await new Promise((r) => setTimeout(r, 800));

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <main className="mt-2">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
            Have questions about our research or want to collaborate? We’d love
            to hear from you.
          </p>
        </header>

        {/* Top info cards */}
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <InfoCard
            icon={<MapPin className="h-5 w-5 text-sky-200" />}
            title="Our Office"
            lines={[
              "BD Office:",
              "Mirpur-10, Dhaka-1216, Bangladesh",
              "",
          
            ]}
            tone="from-sky-400/25 to-cyan-400/10 ring-sky-400/25"
            
          /> 
          <InfoCard
            icon={<Mail className="h-5 w-5 text-emerald-200" />}
            title="Email Us"
            lines={[ADMIN_EMAIL]}
            tone="from-emerald-400/25 to-lime-400/10 ring-emerald-400/25"
          />

          <InfoCard
            icon={<Phone className="h-5 w-5 text-violet-200" />}
            title="Call Us"
            lines={["+880 1710-549763 (BD)"]}
            tone="from-violet-400/25 to-fuchsia-400/10 ring-violet-400/25"
          />
          <InfoCard
            icon={<Facebook className="h-5 w-5 text-blue-200" />}
            title="Facebook"
            lines={["Follow us for updates", "Research highlights & announcements"]}
            tone="from-blue-500/25 to-blue-400/10 ring-blue-400/25"
            footerLink={{
                label: "Visit Facebook",
                href: "https://www.facebook.com/neuroflightlab/",
            }}
                 />
            <InfoCard
            icon={<Linkedin className="h-5 w-5 text-sky-200" />}
            title="LinkedIn"
            lines={["Connect professionally", "Publications & collaborations"]}
            tone="from-sky-500/25 to-cyan-400/10 ring-sky-400/25"
            footerLink={{
                label: "Visit LinkedIn",
                href: "https://www.linkedin.com/company/neuroflightlab/",
            }}
                 />
            <InfoCard
            icon={<MapPin className="h-5 w-5 text-amber-200" />}
            title="Find Us on Map"
            lines={[
                "Mirpur-10",
                "Dhaka, Bangladesh",
                "View exact location below",
            ]}
            tone="from-amber-500/25 to-orange-400/10 ring-amber-400/25"
            footerLink={{
                label: "Open in Google Maps",
                href: "https://www.google.com/maps/place/Mirpur-10",
            }}
            />
        </section>


        {/* Main grid: form + connect */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Form */}
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Send Us a Message
                  </h2>
                  <p className="mt-1 text-sm text-white/65">
                    Fill out the form and we’ll get back to you as soon as possible.
                  </p>
                </div>
                <StatusBadge status={status} />
              </div>

              <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    required
                    value={form.name}
                    placeholder="Your name"
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                  />
                  <Field
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    placeholder="you@email.com"
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                  />
                </div>

                <Field
                  label="Subject"
                  required
                  value={form.subject}
                  placeholder="What is this regarding?"
                  onChange={(v) => update("subject", v)}
                  error={errors.subject}
                />

                <div>
                  <label className="text-sm font-medium text-white/80">
                    Message <span className="text-white/40">*</span>
                  </label>

                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className={[
                      "mt-2 w-full rounded-xl border bg-white/5 px-3 py-2 text-sm text-white outline-none",
                      "placeholder:text-white/35 focus:bg-white/10",
                      errors.message
                        ? "border-rose-400/35 focus:border-rose-400/50"
                        : "border-white/15 focus:border-white/25",
                    ].join(" ")}
                  />

                  <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                    <span>{messageCount}/2000</span>
                    {errors.message ? (
                      <span className="text-rose-200">{errors.message}</span>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10
                             bg-linear-to-r from-(--accent) to-(--accent2)
                             text-sm font-semibold text-[#081022] transition
                             hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === "error" && Object.keys(errors).length ? (
                  <div className="rounded-xl border border-rose-400/20 bg-rose-400/20 p-3 text-sm text-rose-100">
                    Please fix the highlighted fields.
                  </div>
                ) : null}

             
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- UI helpers ---------- */

function InfoCard({
  icon,
  title,
  lines,
  tone,
  footerLink,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  tone: string;
  footerLink?: { label: string; href: string };
}) {
    
  return (
    
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
      <div
        className={[
          "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ring-1",
          "bg-linear-to-br",
          tone,
        ].join(" ")}
      >
        {icon}
      </div>

      <div className="mt-3 text-sm font-semibold text-white">{title}</div>

      <div className="mt-2 space-y-1 text-sm text-white/65">
        {lines.map((l, idx) =>
          l ? <div key={idx}>{l}</div> : <div key={idx} className="h-2" />
        )}
      </div>

    {footerLink ? (
    <div className="mt-4">
        <a
        href={footerLink.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white
                    transition hover:bg-white/10"
        >
        {footerLink.label}
        </a>
    </div>
    ) : null}

    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white/80">
        {label} {required ? <span className="text-white/40">*</span> : null}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "mt-2 h-10 w-full rounded-xl border bg-white/5 px-3 text-sm text-white outline-none",
          "placeholder:text-white/35 focus:bg-white/10",
          error
            ? "border-rose-400/35 focus:border-rose-400/50"
            : "border-white/15 focus:border-white/25",
        ].join(" ")}
      />

      {error ? <div className="mt-2 text-xs text-rose-200">{error}</div> : null}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "idle" | "sending" | "sent" | "error";
}) {
  const common =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";

  if (status === "sent")
    return (
      <span className={`${common} border-emerald-400/20 bg-emerald-400/10 text-emerald-100`}>
        Sent ✓
      </span>
    );

  if (status === "sending")
    return (
      <span className={`${common} border-white/15 bg-white/5 text-white/70`}>
        Sending…
      </span>
    );

  if (status === "error")
    return (
      <span className={`${common} border-rose-400/20 bg-rose-400/10 text-rose-100`}>
        Error
      </span>
    );

  return (
    <span className={`${common} border-white/10 bg-white/5 text-white/60`}>
      Contact
    </span>
  );
}