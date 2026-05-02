// src/components/sections/SectionTitle.tsx
export default function SectionTitle({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="text-xs uppercase tracking-wide text-white/60">
            {eyebrow}
          </div>
        ) : null}

      <h2 className="text-3xl font-extrabold text-white mb-6 animate-slideUp">
          {title}
        </h2>

        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
            {description}
          </p>
        ) : null}
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}