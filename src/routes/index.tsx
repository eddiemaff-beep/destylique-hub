import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { house } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEstylique — Fashion & Real Estate" },
      {
        name: "description",
        content:
          "Choose a division of DEstylique: the fashion studio, or real estate and project management.",
      },
    ],
  }),
  component: Hub,
});

function Hub() {
  return (
    <main className="flex h-svh flex-col bg-ink text-ivory md:block md:overflow-hidden">
      <header className="flex shrink-0 items-center justify-between px-5 py-4 md:absolute md:inset-x-0 md:top-0 md:z-20 md:px-8 md:py-5">
        <p className="font-display text-2xl leading-none">{house.name}</p>
        <p className="text-xs tracking-widest uppercase text-ivory/80">{house.city}</p>
        <p className="hidden text-xs tracking-wide text-ivory/70 sm:block">{house.domain}</p>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-2 md:h-full md:grid-cols-2 md:grid-rows-1">
        <Link
          to="/fashion"
          className="group relative min-h-0 overflow-hidden focus-visible:outline-gold"
        >
          <img
            src="/images/fashion-noir.jpg"
            alt=""
            className="img-zoom absolute inset-0 h-full w-full object-cover object-top"
          />
          <span className="scrim-fashion absolute inset-0" />
          <span className="relative flex h-full flex-col justify-end gap-1.5 p-4 md:gap-4 md:p-10 md:pb-12">
            <span className="rise text-xs tracking-widest text-fashion-muted uppercase">01 — Atelier</span>
            <span className="rise delay-1 font-display text-3xl leading-none md:text-display">Fashion Studio</span>
            <span className="rise delay-2 hidden max-w-sm text-fashion-fg/90 md:block md:text-lead">
              Private clothing, cut and styled in Lagos.
            </span>
            <span className="rise delay-3 inline-flex h-11 items-center gap-2 text-sm text-gold">
              Enter the studio
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </span>
        </Link>

        <Link
          to="/realestate"
          className="group relative min-h-0 overflow-hidden border-t border-ivory/15 focus-visible:outline-estate-accent md:border-t-0 md:border-l"
        >
          <img
            src="/images/estate-villa.jpg"
            alt=""
            className="img-zoom absolute inset-0 h-full w-full object-cover"
          />
          <span className="scrim-estate absolute inset-0" />
          <span className="relative flex h-full flex-col justify-end gap-1.5 p-4 pb-6 md:gap-4 md:p-10 md:pb-12">
            <span className="rise text-xs tracking-widest text-estate-muted uppercase">02 — Practice</span>
            <span className="rise delay-1 font-display text-3xl leading-none md:text-display">
              Real Estate & Projects
            </span>
            <span className="rise delay-2 hidden max-w-sm text-estate-fg/90 md:block md:text-lead">
              Residences and sites, managed from drawing to keys.
            </span>
            <span className="rise delay-3 inline-flex h-11 items-center gap-2 text-sm text-estate-accent">
              Enter the practice
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
}
