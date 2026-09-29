import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContactGrid, DivisionHeader, SiteFooter } from "@/components/site/chrome";
import { PhotoSlider } from "@/components/site/photo-slider";
import {
  fashionCollections,
  fashionConsultText,
  fashionContact,
  fashionHeadline,
  fashionWhatsApp,
  whatsappLink,
  type FashionPiece,
} from "@/content/site";

const consultHref = whatsappLink(fashionWhatsApp, fashionConsultText);

export const Route = createFileRoute("/fashion")({
  head: () => ({
    meta: [
      { title: "Fashion Beyond Imagination — DEstylique" },
      {
        name: "description",
        content:
          "DEstylique Fashion Studio: bespoke men's tailoring, luxury women's couture, and ready-to-wear.",
      },
    ],
  }),
  component: FashionPage,
});

function FashionPage() {
  const [open, setOpen] = useState<FashionPiece | null>(null);

  return (
    <main className="min-h-svh bg-fashion-bg text-fashion-fg">
      <DivisionHeader
        division="fashion"
        links={[
          { href: "#tailoring", label: "Tailoring" },
          { href: "#couture", label: "Couture" },
          { href: "#ready", label: "Ready-to-wear" },
          { href: "#consultation", label: "Consultation" },
        ]}
        siblingTo="/realestate"
        siblingLabel="Homes"
      />

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-12 md:grid-cols-12 md:px-6 md:py-20">
        <div className="md:col-span-5">
          <p className="text-xs tracking-widest text-fashion-muted uppercase">DEstylique Fashion Studio</p>
          <h1 className="mt-4 font-display text-display">{fashionHeadline}</h1>
          <p className="mt-6 max-w-md text-lead text-fashion-muted">
            Bespoke tailoring, couture, and a short ready-to-wear edit. Appointments are taken on WhatsApp.
          </p>
          <a
            href={consultHref}
            target="_blank"
            rel="noopener noreferrer"
            className="press mt-8 inline-flex h-11 items-center border border-gold px-5 text-sm text-gold"
          >
            Book a consultation
          </a>
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
          {fashionCollections.map((collection) => (
            <a key={collection.id} href={`#${collection.id}`}>
              <h2 className="font-display text-2xl">{collection.title}</h2>
              <p className="mt-3 text-sm text-fashion-muted">{collection.text}</p>
            </a>
          ))}
        </div>
      </section>

      {fashionCollections.map((collection) => (
        <section
          key={collection.id}
          id={collection.id}
          className="border-b border-fashion-line"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
            <p className="text-xs tracking-widest text-fashion-muted uppercase">Collection</p>
            <h2 className="mt-3 font-display text-title">{collection.title}</h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {collection.pieces.map((piece) => (
                <li key={`${collection.id}-${piece.title}`}>
                  <article className="relative">
                    <PhotoSlider
                      images={piece.images}
                      alt={piece.alt}
                      tone="fashion"
                      marks="top"
                      frameClass="aspect-[3/4] w-full object-cover object-top"
                    />
                    <span className="scrim-fashion pointer-events-none absolute inset-0" />
                    <button
                      type="button"
                      onClick={() => setOpen(piece)}
                      className="absolute inset-x-0 bottom-0 p-4 text-left"
                    >
                      <span className="block font-display text-3xl">{piece.title}</span>
                      <span className="mt-1 block text-sm text-fashion-muted">{piece.detail}</span>
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section id="consultation" className="border-b border-fashion-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-5">
            <p className="text-xs tracking-widest text-fashion-muted uppercase">Consultation</p>
            <h2 className="mt-3 font-display text-title">Book the atelier.</h2>
            <p className="mt-4 text-fashion-muted">
              Styling and fittings are arranged directly with the studio on WhatsApp, {fashionContact.phone}.
            </p>
          </div>
          <div className="flex items-end md:col-span-7">
            <a
              href={consultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-11 items-center border border-gold px-5 text-sm text-gold"
            >
              Book a luxury consultation
            </a>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-title">The atelier</h2>
          <div className="mt-10">
            <ContactGrid division="fashion" />
          </div>
        </div>
      </section>

      <SiteFooter division="fashion" />
      {open ? <PieceSheet piece={open} onClose={() => setOpen(null)} /> : null}
    </main>
  );
}

function PieceSheet({ piece, onClose }: { piece: FashionPiece; onClose: () => void }) {
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
  }, [piece.title, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/70" aria-label="Close look" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="piece-title"
        className="sheet relative flex h-full w-full max-w-md flex-col bg-fashion-surface text-fashion-fg"
      >
        <PhotoSlider
          images={piece.images}
          alt={piece.alt}
          tone="fashion"
          frameClass="h-[42vh] w-full object-cover object-top"
        />
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
          <h2 id="piece-title" className="font-display text-title">
            {piece.title}
          </h2>
          <p className="text-sm text-gold">{piece.detail}</p>
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <a
              href={consultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-11 items-center justify-center bg-gold text-sm font-medium text-ink"
            >
              Book a consultation
            </a>
            <button type="button" onClick={onClose} className="press h-11 text-sm text-fashion-muted">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
