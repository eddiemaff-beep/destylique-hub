import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  estateContact,
  fashionContact,
  house,
  type Division,
} from "@/content/site";

const bar = {
  fashion: "border-fashion-line bg-fashion-bg text-fashion-fg",
  estate: "border-estate-line bg-estate-bg text-estate-fg",
} as const;

const muted = {
  fashion: "text-fashion-muted",
  estate: "text-estate-muted",
} as const;

export function DivisionHeader({
  division,
  links,
  siblingTo,
  siblingLabel,
}: {
  division: Division;
  links: { href: string; label: string }[];
  siblingTo: "/fashion" | "/realestate";
  siblingLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-40 border-b", bar[division])}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-6">
        <Link to="/" className="font-display text-2xl leading-none tracking-tight">
          {house.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Page">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={cn("hover:text-current", muted[division])}>
              {link.label}
            </a>
          ))}
          <Link
            to={siblingTo}
            className={cn(
              "border-b pb-0.5",
              division === "estate" ? "border-estate-accent text-estate-accent" : "border-current",
            )}
          >
            {siblingLabel}
          </Link>
        </nav>
        <button
          type="button"
          className="press grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="division-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative grid size-5 place-items-center">
            <Menu
              className={cn(
                "col-start-1 row-start-1 size-5 transition-[opacity,scale,filter] duration-150",
                open ? "scale-[0.25] opacity-0 blur-sm" : "opacity-100",
              )}
              aria-hidden
            />
            <X
              className={cn(
                "col-start-1 row-start-1 size-5 transition-[opacity,scale,filter] duration-150",
                open ? "opacity-100" : "scale-[0.25] opacity-0 blur-sm",
              )}
              aria-hidden
            />
          </span>
        </button>
      </div>
      {open ? (
        <nav
          id="division-menu"
          className={cn("border-t px-5 py-3 md:hidden", bar[division])}
          aria-label="Page"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex h-11 items-center text-base"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to={siblingTo}
                className="flex h-11 items-center text-base"
                onClick={() => setOpen(false)}
              >
                {siblingLabel}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter({ division }: { division: Division }) {
  return (
    <footer className={cn("border-t", bar[division])}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="font-display text-3xl leading-none">{house.name}</p>
          <p className={cn("mt-2 text-sm", muted[division])}>
            {house.city} · {house.domain}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="House">
          <Link to="/">Hub</Link>
          <Link to="/fashion">Fashion Studio</Link>
          <Link to="/realestate">Real Estate</Link>
        </nav>
      </div>
    </footer>
  );
}

export function ContactGrid({ division }: { division: Division }) {
  const contact = division === "fashion" ? fashionContact : estateContact;
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      <div>
        <p className={cn("text-xs tracking-widest uppercase", muted[division])}>Visit</p>
        <p className="mt-3 max-w-xs text-lead">{contact.address}</p>
      </div>
      <div>
        <p className={cn("text-xs tracking-widest uppercase", muted[division])}>Write</p>
        <p className="mt-3">
          <a className="text-lead underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </p>
        <p className="mt-2">
          <a className="text-lead underline-offset-4 hover:underline" href={contact.phoneHref}>
            {contact.phone}
          </a>
        </p>
      </div>
      <div>
        <p className={cn("text-xs tracking-widest uppercase", muted[division])}>Hours</p>
        <p className="mt-3 text-lead">{contact.hours}</p>
      </div>
    </div>
  );
}
