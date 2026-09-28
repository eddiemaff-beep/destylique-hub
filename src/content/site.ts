/**
 * DEstylique copy, contacts, and image paths.
 * Swap text and filenames here; photos live in public/images.
 */

export type Division = "fashion" | "estate";

export const house = {
  name: "DEstylique",
  domain: "destylique.com.ng",
  city: "Lagos",
};

export const fashionContact = {
  email: "studio@destylique.com.ng",
  phone: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  hours: "Tuesday to Saturday, by appointment",
};

export const estateContact = {
  email: "projects@destylique.com.ng",
  phone: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  hours: "Monday to Friday, 9:00–17:00",
};

export const fashionCategories = ["All", "Evening", "Tailoring", "Atelier"] as const;
export type FashionCategory = (typeof fashionCategories)[number];

export type Look = {
  id: string;
  title: string;
  category: Exclude<FashionCategory, "All">;
  fabric: string;
  image: string;
  alt: string;
  summary: string;
};

export const looks: Look[] = [
  {
    id: "noir-column",
    title: "Noir Column",
    category: "Evening",
    fabric: "Matte silk crepe, antique-gold chain",
    image: "/images/fashion-noir.jpg",
    alt: "Floor-length black silk gown with a single gold chain at the shoulder",
    summary:
      "A column that reads as one line from shoulder to hem. For dinners and ceremonies that prefer quiet over ornament.",
  },
  {
    id: "ivory-architecture",
    title: "Ivory Architecture",
    category: "Tailoring",
    fabric: "Wool-silk suiting",
    image: "/images/fashion-ivory.jpg",
    alt: "Ivory tailored jumpsuit with a sharp shoulder in a pale studio",
    summary:
      "A jumpsuit cut like a jacket: square shoulder, clean leg, nothing extra. Made for rooms where you are the only one speaking.",
  },
  {
    id: "champagne-drape",
    title: "Champagne Drape",
    category: "Evening",
    fabric: "Metallic chiffon",
    image: "/images/fashion-champagne.jpg",
    alt: "Champagne evening gown with quiet draping against a dark studio",
    summary:
      "Light caught in the cloth, not in the jewellery. The drape is set in the fitting so it stays put when you sit.",
  },
  {
    id: "atelier-coat",
    title: "Atelier Coat",
    category: "Atelier",
    fabric: "Double-faced wool, silk lining",
    image: "/images/fashion-atelier.jpg",
    alt: "Black wool coat on a dress form beside cream silk in a sunlit atelier",
    summary:
      "Cut on the form in the Victoria Island workroom. The coat is the piece; the dress underneath stays plain.",
  },
  {
    id: "indigo-geometry",
    title: "Indigo Geometry",
    category: "Atelier",
    fabric: "Handwoven indigo, gold hem",
    image: "/images/fashion-indigo.jpg",
    alt: "Deep indigo couture gown with a narrow gold hem",
    summary:
      "A woven textile treated as couture cloth: strict seams, a narrow gold hem, no costume drama.",
  },
];

export const fashionServices = [
  {
    title: "Made to measure",
    text: "Two fittings in the atelier. Your pattern is kept for the next commission.",
  },
  {
    title: "Private styling",
    text: "A wardrobe edited for work, travel, and the evenings that matter this season.",
  },
  {
    title: "Ceremony",
    text: "Hosts and bridal parties dressed as one story, not a matching set.",
  },
];

export const fashionInterests = [
  "Private styling",
  "Made to measure",
  "Ceremony",
  "A look from the edit",
] as const;

export type ProjectPhase = "Active" | "Handover" | "Pipeline";
export const projectPhases = ["All", "Active", "Handover", "Pipeline"] as const;

export type Project = {
  id: string;
  name: string;
  place: string;
  kind: string;
  phase: ProjectPhase;
  progress: number;
  milestone: string;
  image: string;
  alt: string;
  note: string;
};

export const projects: Project[] = [
  {
    id: "harbour-line",
    name: "Harbour Line",
    place: "Lekki Phase 1",
    kind: "Residential",
    phase: "Active",
    progress: 68,
    milestone: "Facade and services",
    image: "/images/estate-tower.jpg",
    alt: "Glass apartment tower on a lagoon at blue hour",
    note: "Waterfront apartments. Structure is closed. The envelope and building services are underway, with monthly owner reports.",
  },
  {
    id: "court-eleven",
    name: "Court Eleven",
    place: "Victoria Island",
    kind: "Residential",
    phase: "Handover",
    progress: 94,
    milestone: "Snagging and keys",
    image: "/images/estate-interior.jpg",
    alt: "Limestone living room with linen seating and a tall window",
    note: "Interiors are in snagging. Keys follow the defect list, not the other way around.",
  },
  {
    id: "quarry-house",
    name: "Quarry House",
    place: "Ikoyi",
    kind: "Villa",
    phase: "Pipeline",
    progress: 18,
    milestone: "Design development",
    image: "/images/estate-villa.jpg",
    alt: "Modern stone and glass villa with a still pool at dusk",
    note: "A detached house in design development. Consultants are aligned before a contractor is appointed.",
  },
  {
    id: "palm-axis",
    name: "Palm Axis",
    place: "Ikeja GRA",
    kind: "Workplace",
    phase: "Active",
    progress: 41,
    milestone: "Superstructure",
    image: "/images/estate-site.jpg",
    alt: "Mid-rise concrete and glass building at dusk with a distant crane",
    note: "A mid-rise workplace. Superstructure is rising on a programme the owner can read in one page.",
  },
];

export type Residence = {
  id: string;
  name: string;
  place: string;
  type: string;
  status: string;
  facts: string[];
  image: string;
  alt: string;
  note: string;
};

export const residences: Residence[] = [
  {
    id: "lagoon-terrace",
    name: "Lagoon Terrace",
    place: "Lekki",
    type: "Penthouse",
    status: "By enquiry",
    facts: ["4 bedrooms", "Private terrace", "Lagoon aspect"],
    image: "/images/estate-terrace.jpg",
    alt: "Penthouse terrace at twilight overlooking calm water",
    note: "A high floor with a stone terrace and an uninterrupted lagoon line. Shown by appointment.",
  },
  {
    id: "stone-court",
    name: "Stone Court",
    place: "Ikoyi",
    type: "Detached villa",
    status: "By enquiry",
    facts: ["5 bedrooms", "Pool court", "Staff wing"],
    image: "/images/estate-villa.jpg",
    alt: "Detached villa of dark stone and glass beside a reflecting pool",
    note: "A family house set back from the street, with a quiet court rather than a show facade.",
  },
  {
    id: "harbour-residence",
    name: "Harbour Residence",
    place: "Lekki Phase 1",
    type: "Apartment",
    status: "Reserved",
    facts: ["3 bedrooms", "High floor", "Concierge"],
    image: "/images/estate-tower.jpg",
    alt: "Waterfront residential tower reflected in the lagoon",
    note: "Held for a client of the Harbour Line mandate. Listed here so the building can be read as a home, not only a site.",
  },
  {
    id: "daylight-suite",
    name: "Daylight Suite",
    place: "Victoria Island",
    type: "Residence",
    status: "By enquiry",
    facts: ["Open plan", "Limestone", "City light"],
    image: "/images/estate-interior.jpg",
    alt: "Quiet luxury living room in limestone and linen",
    note: "An interior we finished and still use as the reference for how Court Eleven should feel at handover.",
  },
];

export const estateServices = [
  {
    title: "Project management",
    text: "Programme, cost, and site notes written so an owner can read them once a month and know where things stand.",
  },
  {
    title: "Owner’s side",
    text: "We sit with you opposite the consultants and the contractor, not between them.",
  },
  {
    title: "Residences",
    text: "A short list of homes we would show a client. Nothing is priced until a conversation.",
  },
];

export const estateStats = [
  { value: "11", label: "Years in practice" },
  { value: "04", label: "Live mandates" },
  { value: "28", label: "Homes delivered" },
];

export const estateRoles = ["Owner", "Investor", "Advisor"] as const;
