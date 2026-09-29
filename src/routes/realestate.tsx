import { useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, ChevronLeft, ChevronRight, Handshake, Key, MapPin, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactGrid, DivisionHeader, SiteFooter } from "@/components/site/chrome";
import { PhotoSlider } from "@/components/site/photo-slider";
import {
  abujaAreas,
  buildListings,
  doneListings,
  lagosAreas,
  matchesListing,
  propertyTypes,
  rentListings,
  saleListings,
  subtypesFor,
  type BuildListing,
  type DoneListing,
  type RentListing,
  type SaleListing,
} from "@/content/listings";
import { estateStats, estateWhatsApp, estimateOptions, whatsappLink } from "@/content/site";

function formatNaira(value: number) {
  return `₦${new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(value)}`;
}

const feeds = [
  { id: "buy", label: "Buy", icon: Key },
  { id: "rent", label: "Rent", icon: Building2 },
  { id: "shortlet", label: "Shortlet", icon: Moon },
  { id: "jv", label: "JV", icon: Handshake },
] as const;

type Feed = "all" | (typeof feeds)[number]["id"];
type Query = { type: string; subtype: string; area: string; street: string };

export const Route = createFileRoute("/realestate")({
  head: () => ({
    meta: [
      { title: "DEstylique Homes — Real Estate & Projects" },
      {
        name: "description",
        content:
          "Search DEstylique Homes by buy, rent, shortlet, or joint venture across Lagos and Abuja.",
      },
    ],
  }),
  component: RealEstatePage,
});

function RealEstatePage() {
  const [feed, setFeed] = useState<Feed>("all");
  const [query, setQuery] = useState<Query>({ type: "", subtype: "", area: "", street: "" });
  const subtypes = subtypesFor(query.type);

  const salePool = feed === "all" || feed === "buy" ? saleListings : [];
  const rentPool = rentListings.filter((item) => {
    if (feed === "buy" || feed === "jv") return false;
    if (feed === "rent") return item.stay === "rent";
    if (feed === "shortlet") return item.stay === "shortlet";
    return true;
  });
  const buildPool = feed === "all" || feed === "jv" ? buildListings : [];
  const donePool = feed === "all" ? doneListings : [];

  const sale = salePool.filter((item) => matchesListing(item, query));
  const rent = rentPool.filter((item) => matchesListing(item, query));
  const build = buildPool.filter((item) => matchesListing(item, query));
  const done = donePool.filter((item) => matchesListing(item, query));
  const shown = sale.length + rent.length + build.length + done.length;
  const total = salePool.length + rentPool.length + buildPool.length + donePool.length;
  const filtering = Boolean(query.type || query.subtype || query.area || query.street);

  function setType(type: string) {
    const nextSubtypes = subtypesFor(type);
    setQuery((current) => ({
      ...current,
      type,
      subtype: (nextSubtypes as readonly string[]).includes(current.subtype) ? current.subtype : "",
    }));
  }

  const rentTitle =
    feed === "rent"
      ? "Long-term rentals"
      : feed === "shortlet"
        ? "Holiday and short stays"
        : "Properties for rent, lease & shortlets";

  return (
    <main className="min-h-svh bg-estate-bg text-estate-fg">
      <DivisionHeader
        division="estate"
        links={[
          { href: "#sale", label: "Sale" },
          { href: "#rent", label: "Rent" },
          { href: "#build", label: "Projects" },
          { href: "#portfolio", label: "Portfolio" },
        ]}
        siblingTo="/fashion"
        siblingLabel="Fashion"
      />

      <section className="relative min-h-[70svh]">
        <img
          src="/images/estate-villa.jpg"
          alt="Stone and glass villa with a reflecting pool at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="scrim-estate absolute inset-0" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-5 py-14 md:px-6 md:py-20">
          <p className="text-xs tracking-widest text-estate-accent uppercase">DEstylique Homes</p>
          <h1 className="mt-4 max-w-3xl font-display text-title md:text-display">
            The Ultimate Real Estate & Project Management Solutions
          </h1>
        </div>
      </section>

      <section className="border-b border-estate-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 px-5 md:px-6">
          {estateStats.map((stat) => (
            <div key={stat.label} className="py-8 md:py-10">
              <dt className="text-xs tracking-wide text-estate-muted md:text-sm">{stat.label}</dt>
              <dd className="mt-2 font-display text-title text-estate-accent tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="z-30 border-b border-estate-line bg-estate-bg md:sticky md:top-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 pt-4 md:px-6">
          {feeds.map((item) => {
            const selected = feed === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFeed(item.id)}
                className={cn(
                  "press inline-flex h-11 items-center gap-2 px-4 text-sm",
                  selected
                    ? "border border-estate-accent text-estate-accent"
                    : "border border-estate-accent/40 text-estate-fg",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={feed === "all"}
            onClick={() => setFeed("all")}
            className={cn(
              "press h-11 px-4 text-sm",
              feed === "all" ? "text-estate-accent" : "text-estate-muted",
            )}
          >
            All listings
          </button>
        </div>
        <form
          className="mx-auto grid max-w-6xl gap-3 px-5 py-4 md:grid-cols-4 md:px-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="mb-2 block text-xs tracking-wide text-estate-muted uppercase">Property type</span>
            <select
              className="field border-estate-accent bg-transparent"
              value={query.type}
              onChange={(event) => setType(event.target.value)}
              aria-label="Property type"
            >
              <option value="">All types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs tracking-wide text-estate-muted uppercase">Subtype</span>
            <select
              className="field border-estate-accent bg-transparent"
              value={query.subtype}
              onChange={(event) => setQuery((current) => ({ ...current, subtype: event.target.value }))}
              aria-label="Subtype"
            >
              <option value="">{query.type ? "All subtypes" : "Select a type first"}</option>
              {subtypes.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs tracking-wide text-estate-muted uppercase">Location</span>
            <select
              className="field border-estate-accent bg-transparent"
              value={query.area}
              onChange={(event) => setQuery((current) => ({ ...current, area: event.target.value }))}
              aria-label="Location"
            >
              <option value="">All areas</option>
              <optgroup label="Abuja">
                {abujaAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Lagos">
                {lagosAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs tracking-wide text-estate-muted uppercase">Street / road / estate</span>
            <input
              className="field border-estate-accent bg-transparent"
              placeholder="e.g. 23 Benin Road, Bevril Estate"
              value={query.street}
              onChange={(event) => setQuery((current) => ({ ...current, street: event.target.value }))}
              aria-label="Street, road, or estate"
            />
          </label>
        </form>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-4 md:px-6">
          <p className="text-sm text-estate-muted">
            Showing {shown} of {total}
          </p>
          {filtering ? (
            <button
              type="button"
              className="press h-11 text-sm text-estate-accent"
              onClick={() => setQuery({ type: "", subtype: "", area: "", street: "" })}
            >
              Clear search
            </button>
          ) : null}
        </div>
      </section>

      {salePool.length > 0 ? (
        <ListingRow id="sale" index="01 — Buy" title="Properties for sale" text="Homes, commercial purchases, and land.">
          {sale.map((item) => (
            <SaleCard key={item.id} item={item} />
          ))}
        </ListingRow>
      ) : null}
      {rentPool.length > 0 ? (
        <ListingRow id="rent" index="02 — Stay" title={rentTitle} text="Yearly leases and nightly shortlets.">
          {rent.map((item) => (
            <RentCard key={item.id} item={item} />
          ))}
        </ListingRow>
      ) : null}
      {buildPool.length > 0 ? (
        <ListingRow
          id="build"
          index="03 — Build"
          title="Projects under construction & joint ventures"
          text="Open to investors, landowners, and development partners."
        >
          {build.map((item) => (
            <BuildCard key={item.id} item={item} />
          ))}
        </ListingRow>
      ) : null}
      {donePool.length > 0 ? (
        <ListingRow
          id="portfolio"
          index="04 — Done"
          title="Completed projects portfolio"
          text="Finished work, shown for the quality of the execution."
        >
          {done.map((item) => (
            <DoneCard key={item.id} item={item} />
          ))}
        </ListingRow>
      ) : null}

      <EstimateCalculator />

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

function ListingRow({
  id,
  index,
  title,
  text,
  children,
}: {
  id: string;
  index: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const count = Array.isArray(children) ? children.length : children ? 1 : 0;

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({
      left: direction * Math.max(node.clientWidth * 0.8, 280),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <section id={id} className="scroll-mt-64 border-t border-estate-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs tracking-widest text-estate-accent uppercase">{index}</p>
            <h2 className="mt-3 font-display text-title">{title}</h2>
            <p className="mt-3 text-sm text-estate-muted">{text}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="press grid size-11 place-items-center border border-estate-accent text-estate-accent"
              aria-label={`Show earlier ${title}`}
              onClick={() => move(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className="press grid size-11 place-items-center border border-estate-accent text-estate-accent"
              aria-label={`Show more ${title}`}
              onClick={() => move(1)}
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        {count === 0 ? (
          <p className="mt-8 text-estate-muted">Nothing in this row matches the search.</p>
        ) : (
          <div ref={scroller} className="row-scroll mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

function cardClass(wide = false) {
  return wide
    ? "flex w-80 shrink-0 snap-start flex-col border border-estate-line bg-estate-surface md:w-96"
    : "flex w-72 shrink-0 snap-start flex-col border border-estate-line bg-estate-surface sm:w-80";
}

function PlaceLine({ area, city }: { area: string; city: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm text-estate-accent">
      <MapPin className="size-4 shrink-0" aria-hidden />
      {area}, {city}
    </p>
  );
}

function Spec({ children }: { children: string }) {
  return <p className="border border-estate-accent/50 px-3 py-1 text-xs text-estate-muted">{children}</p>;
}

function WaButton({ label, text }: { label: string; text: string }) {
  return (
    <a
      href={whatsappLink(estateWhatsApp, text)}
      target="_blank"
      rel="noopener noreferrer"
      className="press mt-auto inline-flex h-11 items-center justify-center border border-estate-accent px-3 text-center text-sm text-estate-accent"
    >
      {label}
    </a>
  );
}

function SaleCard({ item }: { item: SaleListing }) {
  return (
    <article className={cardClass()}>
      <PhotoSlider images={item.images} alt={item.alt} frameClass="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="border border-estate-accent px-2 py-1 text-xs tracking-wide text-estate-accent">₦ NGN</span>
          <span className="border border-estate-line px-3 py-1 font-display text-xl text-estate-accent tabular-nums">
            {item.amount}
          </span>
        </div>
        <h3 className="font-display text-3xl">{item.name}</h3>
        <PlaceLine area={item.area} city={item.city} />
        <Spec>{item.spec}</Spec>
        <WaButton
          label="Inquire About Buying"
          text={`Hi DEstylique Homes, I am inquiring about buying ${item.name} in ${item.area}.`}
        />
      </div>
    </article>
  );
}

function RentCard({ item }: { item: RentListing }) {
  return (
    <article className={cardClass()}>
      <PhotoSlider images={item.images} alt={item.alt} frameClass="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="border border-estate-accent px-3 py-2 font-display text-2xl text-estate-accent">{item.price}</p>
        <h3 className="font-display text-3xl">{item.name}</h3>
        <PlaceLine area={item.area} city={item.city} />
        <Spec>{item.spec}</Spec>
        <WaButton
          label="Check Availability / Book"
          text={`Hi DEstylique Homes, I would like to check availability for ${item.name} in ${item.area}.`}
        />
      </div>
    </article>
  );
}

function BuildCard({ item }: { item: BuildListing }) {
  return (
    <article className={cardClass()}>
      <PhotoSlider images={item.images} alt={item.alt} frameClass="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-xs tracking-widest text-estate-accent uppercase">Joint Venture Opportunity</p>
        <h3 className="font-display text-3xl">{item.name}</h3>
        <PlaceLine area={item.area} city={item.city} />
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-estate-muted">
            <span>
              {item.stage} — {item.progress}%
            </span>
          </div>
          <div
            className="h-1 bg-estate-line"
            role="progressbar"
            aria-valuenow={item.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${item.name} progress`}
          >
            <div className="h-full bg-estate-accent" style={{ width: `${item.progress}%` }} />
          </div>
        </div>
        <WaButton
          label="Discuss Partnership / JV"
          text={`Hi DEstylique Homes, I would like to discuss a partnership or joint venture on ${item.name}.`}
        />
      </div>
    </article>
  );
}

function DoneCard({ item }: { item: DoneListing }) {
  return (
    <article className={cardClass(true)}>
      <PhotoSlider images={item.images} alt={item.alt} frameClass="aspect-[16/10] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-3xl">{item.name}</h3>
        <PlaceLine area={item.area} city={item.city} />
        <p className="text-sm text-estate-muted">
          {item.subtype} · {item.propertyType}
        </p>
        <WaButton
          label="Consult on Similar Project"
          text={`Hi DEstylique Homes, I am looking at ${item.name} in your Completed Projects and would love to consult on a similar project.`}
        />
      </div>
    </article>
  );
}

function EstimateCalculator() {
  const [kind, setKind] = useState("");
  const [area, setArea] = useState("");
  const option = estimateOptions.find((item) => item.label === kind);
  const metres = Number(area);
  const total = option && metres > 0 && metres <= 20000 ? option.rate * metres : null;

  return (
    <section id="estimate" className="border-t border-estate-line">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 md:grid-cols-12 md:px-6 md:py-20">
        <div className="md:col-span-4">
          <p className="text-xs tracking-widest text-estate-accent uppercase">Estimate</p>
          <h2 className="mt-3 font-display text-title">Project estimate</h2>
          <p className="mt-4 text-estate-muted">
            Square metres times the rate for the work. The figure updates as you type. It is not a quotation.
          </p>
        </div>
        <form
          className="panel border border-estate-accent bg-estate-surface md:col-span-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2" htmlFor="estimate-type">
              <span className="mb-2 block text-sm">Project type</span>
              <select
                id="estimate-type"
                className="field border-estate-accent bg-transparent text-estate-fg"
                value={kind}
                onChange={(event) => setKind(event.target.value)}
              >
                <option value="">Select</option>
                {estimateOptions.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2" htmlFor="estimate-area">
              <span className="mb-2 block text-sm">Square metres</span>
              <input
                id="estimate-area"
                className="field border-estate-accent bg-transparent"
                inputMode="decimal"
                placeholder="0"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              />
            </label>
          </div>
          <p className="mt-6 font-display text-title text-estate-accent tabular-nums" aria-live="polite">
            {total === null ? "₦0" : formatNaira(total)}
          </p>
          <p className="mt-2 text-sm text-estate-muted">
            {option ? `${formatNaira(option.rate)} per square metre.` : "Choose a project type, then enter the area."}
          </p>
        </form>
      </div>
    </section>
  );
}
