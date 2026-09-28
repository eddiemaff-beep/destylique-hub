import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ContactGrid, DivisionHeader, SiteFooter } from "@/components/site/chrome";
import { InquiryForm, type InquiryField } from "@/components/site/inquiry-form";
import {
  estateContact,
  estateRoles,
  estateServices,
  estateStats,
  projectPhases,
  projects,
  residences,
} from "@/content/site";

export const Route = createFileRoute("/realestate")({
  head: () => ({
    meta: [
      { title: "Real Estate & Projects — DEstylique" },
      {
        name: "description",
        content:
          "DEstylique Real Estate and Project Management: active mandates, residences, and owner enquiries in Lagos.",
      },
    ],
  }),
  component: RealEstatePage,
});

function RealEstatePage() {
  const [phase, setPhase] = useState<(typeof projectPhases)[number]>("All");
  const [preset, setPreset] = useState<Record<string, string> | undefined>();
  const visible = projects.filter((project) => phase === "All" || project.phase === phase);
  const interestOptions = [
    "General mandate",
    ...projects.map((project) => project.name),
    ...residences.map((home) => home.name),
  ];

  const fields: InquiryField[] = [
    { name: "name", label: "Name", kind: "text", required: true, placeholder: "Your name" },
    { name: "email", label: "Email", kind: "email", required: true, placeholder: "you@email.com" },
    { name: "phone", label: "Phone", kind: "tel", required: true, placeholder: "+234…" },
    { name: "role", label: "I am", kind: "select", required: true, options: estateRoles },
    {
      name: "interest",
      label: "Interest",
      kind: "select",
      required: true,
      options: interestOptions,
    },
    {
      name: "note",
      label: "Note",
      kind: "textarea",
      placeholder: "What you want managed, bought, or understood.",
    },
  ];

  function enquire(name: string) {
    setPreset({ interest: name });
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-svh bg-estate-bg text-estate-fg">
      <DivisionHeader
        division="estate"
        links={[
          { href: "#mandates", label: "Mandates" },
          { href: "#residences", label: "Residences" },
          { href: "#enquiry", label: "Enquiry" },
        ]}
        siblingTo="/fashion"
        siblingLabel="Fashion Studio"
      />

      <section className="relative min-h-[70svh]">
        <img
          src="/images/estate-villa.jpg"
          alt="Stone and glass villa with a reflecting pool at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="scrim-estate absolute inset-0" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs tracking-widest text-estate-muted uppercase">
            Real estate & project management
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-display">From drawing to keys.</h1>
          <p className="mt-5 max-w-xl text-lead text-estate-fg/90">
            Developments and residences for owners who want one calm point of contact in Lagos.
          </p>
        </div>
      </section>

      <section className="border-b border-estate-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 px-5 md:px-6">
          {estateStats.map((stat) => (
            <div key={stat.label} className="py-8 md:py-10">
              <dt className="text-xs tracking-wide text-estate-muted md:text-sm">{stat.label}</dt>
              <dd className="mt-2 font-display text-title tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-estate-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 md:px-6">
          {estateServices.map((service) => (
            <article key={service.title}>
              <h2 className="font-display text-2xl">{service.title}</h2>
              <p className="mt-3 text-sm text-estate-muted">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="mandates" className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-widest text-estate-muted uppercase">Project management</p>
            <h2 className="mt-3 font-display text-title">Live mandates</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter mandates">
            {projectPhases.map((item) => {
              const selected = item === phase;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPhase(item)}
                  className={cn(
                    "press h-11 px-4 text-sm",
                    selected
                      ? "bg-estate-accent text-estate-accent-fg"
                      : "border border-estate-line text-estate-fg",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-10">
            <p className="text-estate-muted">No mandates in this phase.</p>
            <button type="button" className="press mt-4 h-11 text-sm text-estate-accent" onClick={() => setPhase("All")}>
              Show all
            </button>
          </div>
        ) : (
          <ul className="mt-10 flex flex-col gap-4">
            {visible.map((project) => (
              <li key={project.id}>
                <article className="grid overflow-hidden border border-estate-line bg-estate-surface md:grid-cols-[18rem_1fr]">
                  <img src={project.image} alt={project.alt} className="h-56 w-full object-cover md:h-full" />
                  <div className="flex flex-col gap-4 p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-3xl">{project.name}</h3>
                        <p className="mt-1 text-sm text-estate-muted">
                          {project.place} · {project.kind}
                        </p>
                      </div>
                      <span className="border border-estate-line px-3 py-1 text-xs tracking-wide text-estate-muted">
                        {project.phase}
                      </span>
                    </div>
                    <p className="max-w-prose text-sm text-estate-muted">{project.note}</p>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-estate-muted">
                        <span>{project.milestone}</span>
                        <span className="tabular-nums">{project.progress}%</span>
                      </div>
                      <div
                        className="h-1 bg-estate-line"
                        role="progressbar"
                        aria-valuenow={project.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${project.name} progress`}
                      >
                        <div className="h-full bg-estate-accent" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => enquire(project.name)}
                      className="press h-11 self-start px-1 text-sm text-estate-accent"
                    >
                      Enquire about {project.name}
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="residences" className="border-t border-estate-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <p className="text-xs tracking-widest text-estate-muted uppercase">Property</p>
          <h2 className="mt-3 font-display text-title">Residences</h2>
          <p className="mt-4 max-w-xl text-estate-muted">
            Shown as a practice portfolio. Availability is confirmed in conversation, not on this page.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {residences.map((home) => (
              <li key={home.id} className="border border-estate-line bg-estate-surface">
                <img src={home.image} alt={home.alt} className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-3xl">{home.name}</h3>
                    <span className="text-xs tracking-wide text-estate-muted">{home.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-estate-muted">
                    {home.type} · {home.place}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {home.facts.map((fact) => (
                      <li key={fact} className="border border-estate-line px-3 py-1 text-xs text-estate-muted">
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-estate-muted">{home.note}</p>
                  <button
                    type="button"
                    onClick={() => enquire(home.name)}
                    className="press mt-4 h-11 text-sm text-estate-accent"
                  >
                    Ask about {home.name}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquiry" className="border-t border-estate-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-4">
            <p className="text-xs tracking-widest text-estate-muted uppercase">Investors & owners</p>
            <h2 className="mt-3 font-display text-title">Start with a note.</h2>
            <p className="mt-4 text-estate-muted">
              Owners, investors, and advisors. The note is prepared for {estateContact.email}. It is not
              filed until you send it.
            </p>
          </div>
          <div className="md:col-span-8">
            <InquiryForm
              division="estate"
              fields={fields}
              submitLabel="Prepare enquiry"
              mailto={estateContact.email}
              subject="DEstylique Real Estate — enquiry"
              preset={preset}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-estate-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-title">The office</h2>
          <div className="mt-10">
            <ContactGrid division="estate" />
          </div>
        </div>
      </section>

      <SiteFooter division="estate" />
    </main>
  );
}
