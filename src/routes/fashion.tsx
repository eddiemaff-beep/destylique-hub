import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ContactGrid, DivisionHeader, SiteFooter } from "@/components/site/chrome";
import { InquiryForm, type InquiryField } from "@/components/site/inquiry-form";
import {
  fashionCategories,
  fashionContact,
  fashionInterests,
  fashionServices,
  looks,
  type FashionCategory,
  type Look,
} from "@/content/site";

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion Studio — DEstylique" },
      {
        name: "description",
        content:
          "DEstylique Fashion Studio: made-to-measure clothing, private styling, and the current edit.",
      },
    ],
  }),
  component: FashionPage,
});

const fields = (lookTitles: string[]): InquiryField[] => [
  { name: "name", label: "Name", kind: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email", kind: "email", required: true, placeholder: "you@email.com" },
  { name: "phone", label: "Phone", kind: "tel", required: true, placeholder: "+234…" },
  {
    name: "interest",
    label: "What you need",
    kind: "select",
    required: true,
    options: fashionInterests,
  },
  {
    name: "look",
    label: "A look, if you have one",
    kind: "select",
    options: ["Not sure yet", ...lookTitles],
  },
  {
    name: "note",
    label: "Note",
    kind: "textarea",
    placeholder: "Occasion, timing, and anything the studio should know.",
  },
];

function FashionPage() {
  const [category, setCategory] = useState<FashionCategory>("All");
  const [open, setOpen] = useState<Look | null>(null);
  const [preset, setPreset] = useState<Record<string, string> | undefined>();

  const visible = looks.filter((look) => category === "All" || look.category === category);

  function requestLook(look: Look) {
    setOpen(null);
    setPreset({
      interest: "A look from the edit",
      look: look.title,
      note: `Please tell me more about ${look.title}.`,
    });
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-svh bg-fashion-bg text-fashion-fg">
      <DivisionHeader
        division="fashion"
        links={[
          { href: "#edit", label: "The edit" },
          { href: "#consultation", label: "Consultation" },
          { href: "#contact", label: "Contact" },
        ]}
        siblingTo="/realestate"
        siblingLabel="Real Estate"
      />

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-12 md:grid-cols-12 md:px-6 md:py-20">
        <div className="md:col-span-5">
          <p className="text-xs tracking-widest text-fashion-muted uppercase">Fashion studio · Lagos</p>
          <h1 className="mt-4 font-display text-display">Cut for the room you are about to enter.</h1>
          <p className="mt-6 max-w-md text-lead text-fashion-muted">
            A private atelier for made-to-measure clothing and styling. Limited pieces. Unhurried fittings
            on Victoria Island.
          </p>
        </div>
        <div className="overflow-hidden md:col-span-7">
          <img
            src="/images/fashion-noir.jpg"
            alt="Black silk column gown in the DEstylique studio"
            className="aspect-[4/5] w-full object-cover object-top md:aspect-[5/4]"
          />
        </div>
      </section>

      <section className="border-y border-fashion-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 md:px-6">
          {fashionServices.map((service) => (
            <article key={service.title}>
              <h2 className="font-display text-2xl">{service.title}</h2>
              <p className="mt-3 text-sm text-fashion-muted">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="edit" className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-widest text-fashion-muted uppercase">Portfolio</p>
            <h2 className="mt-3 font-display text-title">The current edit</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter the edit">
            {fashionCategories.map((item) => {
              const selected = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCategory(item)}
                  className={cn(
                    "press h-11 px-4 text-sm",
                    selected ? "bg-gold text-ink" : "border border-fashion-line text-fashion-fg",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-fashion-muted">Nothing in this edit yet.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((look, index) => (
              <li
                key={look.id}
                className={cn(index === 0 && category === "All" && "sm:col-span-2 lg:row-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(look)}
                  className="group relative block h-full w-full overflow-hidden text-left"
                >
                  <img
                    src={look.image}
                    alt={look.alt}
                    className={cn(
                      "img-zoom h-full w-full object-cover object-top",
                      index === 0 && category === "All"
                        ? "aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:min-h-[36rem]"
                        : "aspect-[3/4]",
                    )}
                  />
                  <span className="scrim-fashion pointer-events-none absolute inset-0" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-xs tracking-widest text-fashion-muted uppercase">
                      {look.category}
                    </span>
                    <span className="mt-1 block font-display text-3xl">{look.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="consultation" className="border-t border-fashion-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-4">
            <p className="text-xs tracking-widest text-fashion-muted uppercase">Consultation</p>
            <h2 className="mt-3 font-display text-title">Book a fitting conversation.</h2>
            <p className="mt-4 text-fashion-muted">
              Tell the studio what the clothes are for. A stylist replies with times at the atelier.
              This form prepares an email to {fashionContact.email}. It does not send on its own.
            </p>
          </div>
          <div className="md:col-span-8">
            <InquiryForm
              division="fashion"
              fields={fields(looks.map((look) => look.title))}
              submitLabel="Prepare consultation note"
              mailto={fashionContact.email}
              subject="DEstylique Fashion Studio — consultation"
              preset={preset}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-fashion-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-title">The atelier</h2>
          <div className="mt-10">
            <ContactGrid division="fashion" />
          </div>
        </div>
      </section>

      <SiteFooter division="fashion" />
      {open ? <LookSheet look={open} onClose={() => setOpen(null)} onRequest={requestLook} /> : null}
    </main>
  );
}

function LookSheet({
  look,
  onClose,
  onRequest,
}: {
  look: Look;
  onClose: () => void;
  onRequest: (look: Look) => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [look.id, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/70" aria-label="Close look" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="look-title"
        className="sheet relative flex h-full w-full max-w-md flex-col bg-fashion-surface text-fashion-fg"
      >
        <img
          src={look.image}
          alt={look.alt}
          className="h-[42%] w-full shrink-0 object-cover object-top"
        />
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
          <p className="text-xs tracking-widest text-fashion-muted uppercase">{look.category}</p>
          <h2 id="look-title" className="font-display text-title">
            {look.title}
          </h2>
          <p className="text-sm text-gold">{look.fabric}</p>
          <p className="text-fashion-muted">{look.summary}</p>
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <button
              type="button"
              onClick={() => onRequest(look)}
              className="press h-11 bg-gold text-sm font-medium text-ink"
            >
              Request this look
            </button>
            <button type="button" onClick={onClose} className="press h-11 text-sm text-fashion-muted">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
