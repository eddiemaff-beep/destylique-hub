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

export const fashionWhatsApp = "2347089990259";
export const estateWhatsApp = "2347089993865";

export const fashionConsultText =
  "Hi DEstylique, I would love to book a luxury fashion/styling consultation.";

export function whatsappLink(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export const fashionContact = {
  email: "studio@destylique.com.ng",
  phone: "+234 708 999 0259",
  phoneHref: whatsappLink(fashionWhatsApp, fashionConsultText),
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  hours: "Tuesday to Saturday, by appointment",
};

export const estateContact = {
  email: "projects@destylique.com.ng",
  phone: "+234 708 999 3865",
  phoneHref: whatsappLink(
    estateWhatsApp,
    "Hi DEstylique Homes, I would like to speak with the practice.",
  ),
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  hours: "Monday to Friday, 9:00–17:00",
};

export const fashionHeadline = "Fashion Beyond Imagination";

export const hubFashion =
  "DEstylique Fashion Studio — Fashion Beyond Imagination";

export const hubHomes =
  "DEstylique Homes — The Ultimate Real Estate & Project Management Solutions";

export type FashionPiece = {
  title: string;
  detail: string;
  images: readonly [string, string, string, string];
  alt: string;
};

export type FashionCollection = {
  id: string;
  title: string;
  text: string;
  pieces: FashionPiece[];
};

export const fashionCollections: FashionCollection[] = [
  {
    id: "tailoring",
    title: "Bespoke Men's Tailoring",
    text: "Suits cut in the atelier, patterned to the client, and finished for the rooms where he actually works.",
    pieces: [
      {
        title: "Charcoal Lounge",
        detail: "Wool suit, gold pocket square",
        images: [
          "/images/fashion-mens-charcoal.jpg",
          "/images/fashion-mens-side.jpg",
          "/images/fashion-mens-ivory.jpg",
          "/images/fashion-atelier.jpg",
        ],
        alt: "Charcoal bespoke suit in the DEstylique studio",
      },
      {
        title: "Ivory Double Breast",
        detail: "Cream jacket, tailored trouser",
        images: [
          "/images/fashion-mens-ivory.jpg",
          "/images/fashion-mens-charcoal.jpg",
          "/images/fashion-mens-side.jpg",
          "/images/fashion-atelier.jpg",
        ],
        alt: "Cream double-breasted bespoke jacket",
      },
      {
        title: "Atelier Cloth",
        detail: "Double-faced wool, cut on the form",
        images: [
          "/images/fashion-atelier.jpg",
          "/images/fashion-mens-charcoal.jpg",
          "/images/fashion-mens-ivory.jpg",
          "/images/fashion-mens-side.jpg",
        ],
        alt: "Tailoring cloth and a coat on a dress form",
      },
    ],
  },
  {
    id: "couture",
    title: "Luxury Women's Couture",
    text: "Evening and ceremony clothes made to one wearing, with the drape set in the fitting.",
    pieces: [
      {
        title: "Noir Column",
        detail: "Silk crepe, antique-gold chain",
        images: [
          "/images/fashion-noir.jpg",
          "/images/fashion-noir-side.jpg",
          "/images/fashion-champagne.jpg",
          "/images/fashion-indigo.jpg",
        ],
        alt: "Black silk column gown",
      },
      {
        title: "Champagne Drape",
        detail: "Metallic chiffon",
        images: [
          "/images/fashion-champagne.jpg",
          "/images/fashion-noir.jpg",
          "/images/fashion-noir-side.jpg",
          "/images/fashion-indigo.jpg",
        ],
        alt: "Champagne evening gown",
      },
      {
        title: "Indigo Geometry",
        detail: "Woven indigo, gold hem",
        images: [
          "/images/fashion-indigo.jpg",
          "/images/fashion-noir-side.jpg",
          "/images/fashion-champagne.jpg",
          "/images/fashion-noir.jpg",
        ],
        alt: "Indigo couture gown with a gold hem",
      },
    ],
  },
  {
    id: "ready",
    title: "Ready-to-Wear Collections",
    text: "A short seasonal edit. Limited numbers, the same cloth standard as the commissions.",
    pieces: [
      {
        title: "Ivory Architecture",
        detail: "Wool-silk tailoring",
        images: [
          "/images/fashion-ivory.jpg",
          "/images/fashion-noir.jpg",
          "/images/fashion-champagne.jpg",
          "/images/fashion-indigo.jpg",
        ],
        alt: "Ivory tailored jumpsuit",
      },
      {
        title: "Noir Column",
        detail: "Evening, ready in limited size",
        images: [
          "/images/fashion-noir.jpg",
          "/images/fashion-noir-side.jpg",
          "/images/fashion-ivory.jpg",
          "/images/fashion-champagne.jpg",
        ],
        alt: "Black evening column from the ready-to-wear edit",
      },
      {
        title: "Champagne Drape",
        detail: "Evening chiffon",
        images: [
          "/images/fashion-champagne.jpg",
          "/images/fashion-ivory.jpg",
          "/images/fashion-indigo.jpg",
          "/images/fashion-noir.jpg",
        ],
        alt: "Champagne ready-to-wear evening dress",
      },
    ],
  },
];

export const estateServices = [
  {
    title: "Full construction",
    text: "Premium residential delivery, from drawing to keys, with one point of contact.",
  },
  {
    title: "Project management",
    text: "Commercial and residential programmes reported so an owner can read them once a month.",
  },
  {
    title: "Homes for sale",
    text: "A short list. Price, place, and a conversation on WhatsApp before any viewing.",
  },
];

export const estateStats = [
  { value: "11", label: "Years in practice" },
  { value: "03", label: "Sites in build" },
  { value: "28", label: "Homes delivered" },
];

export const estimateOptions = [
  { label: "Full Construction (Premium Residential)", rate: 450000 },
  { label: "Commercial Project Management", rate: 550000 },
  { label: "Luxury Renovation & Remodeling", rate: 250000 },
  { label: "Interior Architecture & Design", rate: 180000 },
] as const;
