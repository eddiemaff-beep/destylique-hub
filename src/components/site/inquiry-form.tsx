import { useEffect, useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import type { Division } from "@/content/site";

export type InquiryField = {
  name: string;
  label: string;
  kind: "text" | "email" | "tel" | "select" | "textarea";
  options?: readonly string[];
  required?: boolean;
  placeholder?: string;
};

const shell = {
  fashion: {
    line: "border-fashion-line",
    muted: "text-fashion-muted",
    surface: "bg-fashion-surface",
    solid: "bg-gold text-ink",
    ghost: "border border-fashion-line text-fashion-fg",
    focus: "focus-visible:outline-gold",
  },
  estate: {
    line: "border-estate-line focus:border-estate-accent",
    muted: "text-estate-muted",
    surface: "bg-estate-surface",
    solid: "border border-estate-accent bg-transparent text-estate-accent",
    ghost: "border border-estate-accent text-estate-fg",
    focus: "focus-visible:outline-estate-accent",
  },
} as const;

function validate(fields: InquiryField[], values: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] = `Add your ${field.label.toLowerCase()}.`;
    } else if (field.kind === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "Use a full email address.";
    } else if (field.kind === "tel" && value && value.replace(/\D/g, "").length < 7) {
      errors[field.name] = "Use a full phone number.";
    }
  }
  return errors;
}

export function InquiryForm({
  division,
  fields,
  submitLabel,
  mailto,
  subject,
  preset,
}: {
  division: Division;
  fields: InquiryField[];
  submitLabel: string;
  mailto: string;
  subject: string;
  preset?: Record<string, string>;
}) {
  const tone = shell[division];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!preset) return;
    setValues((current) => ({ ...current, ...preset }));
    setReady(false);
  }, [preset]);

  const summary = useMemo(() => {
    return fields
      .map((field) => `${field.label}: ${(values[field.name] ?? "").trim() || "—"}`)
      .join("\n");
  }, [fields, values]);

  const href = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate(fields, values);
    setErrors(next);
    setCopied(false);
    if (Object.keys(next).length === 0) setReady(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${summary}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (ready) {
    return (
      <div className={cn("panel border", tone.surface, tone.line)} role="status">
        <p className="font-display text-title">Your note is ready.</p>
        <p className={cn("mt-3 max-w-prose", tone.muted)}>
          Nothing is stored on this page. Send it from your email, or copy it and write when you are ready.
        </p>
        <pre className={cn("mt-6 overflow-x-auto text-sm whitespace-pre-wrap", tone.muted)}>{summary}</pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={href}
            className={cn(
              "press inline-flex h-11 items-center justify-center px-5 text-sm font-medium",
              tone.solid,
              tone.focus,
            )}
          >
            Send by email
          </a>
          <button
            type="button"
            onClick={copy}
            className={cn(
              "press inline-flex h-11 items-center justify-center px-5 text-sm font-medium",
              tone.ghost,
              tone.focus,
            )}
          >
            {copied ? "Copied" : "Copy note"}
          </button>
          <button
            type="button"
            onClick={() => setReady(false)}
            className={cn(
              "press inline-flex h-11 items-center justify-center px-5 text-sm",
              tone.muted,
            )}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={cn("panel border", tone.surface, tone.line)} onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const wide = field.kind === "textarea" || field.kind === "select";
          const id = `${division}-${field.name}`;
          const invalid = Boolean(errors[field.name]);
          return (
            <label key={field.name} className={cn("block", wide && "sm:col-span-2")} htmlFor={id}>
              <span className="mb-2 block text-sm">{field.label}</span>
              {field.kind === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  className={cn("field-area", tone.line, invalid && "border-danger")}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  aria-invalid={invalid}
                  aria-required={field.required}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              ) : field.kind === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  className={cn("field", tone.line, invalid && "border-danger")}
                  value={values[field.name] ?? ""}
                  aria-invalid={invalid}
                  aria-required={field.required}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                >
                  <option value="">Select</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.kind}
                  className={cn("field", tone.line, invalid && "border-danger")}
                  placeholder={field.placeholder}
                  autoComplete={
                    field.kind === "email" ? "email" : field.kind === "tel" ? "tel" : "name"
                  }
                  value={values[field.name] ?? ""}
                  aria-invalid={invalid}
                  aria-required={field.required}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              )}
              {invalid ? <span className="mt-1 block text-sm text-danger">{errors[field.name]}</span> : null}
            </label>
          );
        })}
      </div>
      <button
        type="submit"
        className={cn(
          "press mt-6 inline-flex h-11 items-center justify-center px-5 text-sm font-medium",
          tone.solid,
          tone.focus,
        )}
      >
        {submitLabel}
      </button>
    </form>
  );
}
