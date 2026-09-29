/**
 * Homes catalog. To add a listing, copy an object into the matching array.
 * propertyType, subtype, city, and area must use the lists below or the file will not typecheck.
 * images is four paths. shotSet(n) builds a set; replace it with your own four files when you have them.
 */

export const propertyTypes = [
  "Flats / Apartments",
  "Houses",
  "Commercial Property",
  "Land",
  "Event Centre / Venue",
] as const;

export const subtypesByType = {
  "Flats / Apartments": [
    "Mini Flat (Room and Parlour)",
    "Self Contain (Single Rooms)",
    "Standard Apartment",
  ],
  Houses: [
    "Detached Bungalow",
    "Detached Duplex",
    "Semi-detached Bungalow",
    "Semi-detached Duplex",
    "Terraced Bungalow",
    "Terraced Duplex",
    "Maisonette",
  ],
  "Commercial Property": [
    "Church",
    "Factory",
    "Filling Station",
    "Hotel / Guest House",
    "Office Space",
    "Plaza / Complex / Mall",
    "Restaurant / Bar",
    "School",
    "Shop",
    "Tank Farm",
    "Warehouse",
  ],
  Land: [
    "Commercial Land",
    "Farm Land",
    "Industrial Land",
    "Mixed-use Land",
    "Residential Land",
  ],
  "Event Centre / Venue": ["Conference / Meeting / Training Room", "Hall"],
} as const;

export const abujaAreas = [
  "Wuse 2",
  "Wuse",
  "Maitama District",
  "Asokoro District",
  "Garki",
  "Gwarinpa",
  "Katampe",
  "Lugbe District",
  "Central Area Phase 2",
  "Central Business District",
  "Cultural Zones",
  "Diplomatic Zones",
] as const;

export const lagosAreas = [
  "Victoria Island (VI)",
  "Ikoyi",
  "Lekki",
  "Yaba",
  "Ikeja",
  "Ojo",
  "Oshodi",
  "Agege",
  "Apapa",
  "Iganmu",
  "Ipaja",
  "Badagry",
  "Ikorodu",
  "Oyingbo",
  "Lagos Island Central (Eko)",
  "Epe",
] as const;

type AbujaArea = (typeof abujaAreas)[number];
type LagosArea = (typeof lagosAreas)[number];

type Place = { city: "Abuja"; area: AbujaArea } | { city: "Lagos"; area: LagosArea };

type Kind = {
  [Key in keyof typeof subtypesByType]: {
    propertyType: Key;
    subtype: (typeof subtypesByType)[Key][number];
  };
}[keyof typeof subtypesByType];

const estateShots = [
  "/images/estate-villa.jpg",
  "/images/estate-interior.jpg",
  "/images/estate-dining.jpg",
  "/images/estate-room.jpg",
  "/images/estate-terrace.jpg",
  "/images/estate-tower.jpg",
  "/images/estate-site.jpg",
] as const;

export function shotSet(start: number): [string, string, string, string] {
  return [0, 1, 2, 3].map((step) => estateShots[(start + step) % estateShots.length]) as [
    string,
    string,
    string,
    string,
  ];
}

type CatalogItem = Place &
  Kind & {
    id: string;
    name: string;
    street: string;
    images: readonly [string, string, string, string];
    alt: string;
  };

export type SaleListing = CatalogItem & { amount: string; spec: string };
export type RentListing = CatalogItem & { stay: "rent" | "shortlet"; price: string; spec: string };
export type BuildListing = CatalogItem & { stage: string; progress: number };
export type DoneListing = CatalogItem;

export type AnyListing = SaleListing | RentListing | BuildListing | DoneListing;

export const saleListings: SaleListing[] = [
  {
    id: "stone-court",
    name: "Stone Court",
    propertyType: "Houses",
    subtype: "Detached Duplex",
    city: "Lagos",
    area: "Ikoyi",
    street: "14 Bourdillon Road",
    amount: "₦850,000,000",
    spec: "5 Bed | 6 Bath | Detached Duplex",
    images: shotSet(0),
    alt: "Detached duplex for sale in Ikoyi",
  },
  {
    id: "palm-row",
    name: "Palm Row",
    propertyType: "Houses",
    subtype: "Terraced Duplex",
    city: "Lagos",
    area: "Lekki",
    street: "8 Admiralty Way",
    amount: "₦420,000,000",
    spec: "4 Bed | 4 Bath | Terraced Duplex",
    images: shotSet(1),
    alt: "Terraced duplex terrace in Lekki",
  },
  {
    id: "katampe-court",
    name: "Katampe Court",
    propertyType: "Houses",
    subtype: "Detached Bungalow",
    city: "Abuja",
    area: "Katampe",
    street: "3 Ibrahim Way",
    amount: "₦310,000,000",
    spec: "4 Bed | 4 Bath | Detached Bungalow",
    images: shotSet(2),
    alt: "Detached bungalow for sale in Katampe",
  },
  {
    id: "bevril-house",
    name: "Bevril House",
    propertyType: "Houses",
    subtype: "Detached Duplex",
    city: "Lagos",
    area: "Agege",
    street: "23 Benin Road, Bevril Estate",
    amount: "₦145,000,000",
    spec: "4 Bed | 4 Bath | Detached Duplex",
    images: shotSet(3),
    alt: "Duplex for sale in Bevril Estate",
  },
  {
    id: "yaba-studio",
    name: "Yaba Studio",
    propertyType: "Flats / Apartments",
    subtype: "Mini Flat (Room and Parlour)",
    city: "Lagos",
    area: "Yaba",
    street: "22 Herbert Macaulay Way",
    amount: "₦48,000,000",
    spec: "1 Bed | 1 Bath | Mini Flat (Room and Parlour)",
    images: shotSet(4),
    alt: "Mini flat for sale in Yaba",
  },
  {
    id: "epe-acre",
    name: "Epe Acre",
    propertyType: "Land",
    subtype: "Commercial Land",
    city: "Lagos",
    area: "Epe",
    street: "Lekki-Epe Expressway",
    amount: "₦95,000,000",
    spec: "Commercial Land",
    images: shotSet(5),
    alt: "Commercial land for sale in Epe",
  },
  {
    id: "vi-annex",
    name: "VI Annex",
    propertyType: "Commercial Property",
    subtype: "Office Space",
    city: "Lagos",
    area: "Victoria Island (VI)",
    street: "23 Adeola Odeku Street",
    amount: "₦620,000,000",
    spec: "Office Space",
    images: shotSet(6),
    alt: "Office building for sale on Victoria Island",
  },
];

export const rentListings: RentListing[] = [
  {
    id: "maitama-wing",
    name: "Maitama Wing",
    propertyType: "Houses",
    subtype: "Detached Duplex",
    city: "Abuja",
    area: "Maitama District",
    street: "12 IBB Boulevard",
    stay: "rent",
    price: "₦18,000,000 / year",
    spec: "4 Bed | 5 Bath | Detached Duplex",
    images: shotSet(7),
    alt: "Duplex for yearly rent in Maitama",
  },
  {
    id: "lekki-shortlet",
    name: "Lekki Shortlet",
    propertyType: "Houses",
    subtype: "Terraced Duplex",
    city: "Lagos",
    area: "Lekki",
    street: "4 Chevron Drive",
    stay: "shortlet",
    price: "₦85,000 / night Shortlet",
    spec: "3 Bed | 3 Bath | Terraced Duplex",
    images: shotSet(8),
    alt: "Shortlet terrace house in Lekki",
  },
  {
    id: "wuse-room",
    name: "Wuse Room",
    propertyType: "Flats / Apartments",
    subtype: "Self Contain (Single Rooms)",
    city: "Abuja",
    area: "Wuse 2",
    street: "9 Aminu Kano Crescent",
    stay: "rent",
    price: "₦2,400,000 / year",
    spec: "1 Bed | 1 Bath | Self Contain (Single Rooms)",
    images: shotSet(9),
    alt: "Self contain for rent in Wuse 2",
  },
  {
    id: "allen-lease",
    name: "Allen Lease",
    propertyType: "Commercial Property",
    subtype: "Office Space",
    city: "Lagos",
    area: "Ikeja",
    street: "18 Allen Avenue",
    stay: "rent",
    price: "₦12,000,000 / year",
    spec: "Office Space",
    images: shotSet(10),
    alt: "Office for lease in Ikeja",
  },
  {
    id: "asokoro-lodge",
    name: "Asokoro Lodge",
    propertyType: "Houses",
    subtype: "Detached Bungalow",
    city: "Abuja",
    area: "Asokoro District",
    street: "2 Gana Street",
    stay: "shortlet",
    price: "₦85,000 / night Shortlet",
    spec: "3 Bed | 3 Bath | Detached Bungalow",
    images: shotSet(11),
    alt: "Shortlet bungalow in Asokoro",
  },
  {
    id: "creek-store",
    name: "Creek Store",
    propertyType: "Commercial Property",
    subtype: "Warehouse",
    city: "Lagos",
    area: "Apapa",
    street: "7 Creek Road",
    stay: "rent",
    price: "₦6,500,000 / year",
    spec: "Warehouse",
    images: shotSet(12),
    alt: "Warehouse for lease in Apapa",
  },
];

export const buildListings: BuildListing[] = [
  {
    id: "harbour-line",
    name: "Harbour Line",
    propertyType: "Commercial Property",
    subtype: "Plaza / Complex / Mall",
    city: "Lagos",
    area: "Lekki",
    street: "Waterfront Drive",
    stage: "Foundation Stage",
    progress: 30,
    images: shotSet(13),
    alt: "Foundation works on a Lekki waterfront site",
  },
  {
    id: "palm-axis",
    name: "Palm Axis",
    propertyType: "Commercial Property",
    subtype: "Office Space",
    city: "Lagos",
    area: "Ikeja",
    street: "Oba Akinjobi Way",
    stage: "Superstructure",
    progress: 45,
    images: shotSet(14),
    alt: "Office project rising in Ikeja",
  },
  {
    id: "quarry-house",
    name: "Quarry House",
    propertyType: "Houses",
    subtype: "Detached Duplex",
    city: "Lagos",
    area: "Ikoyi",
    street: "6 Glover Road",
    stage: "Finishing Stage",
    progress: 85,
    images: shotSet(15),
    alt: "Duplex nearing completion in Ikoyi",
  },
  {
    id: "lugbe-yards",
    name: "Lugbe Yards",
    propertyType: "Land",
    subtype: "Commercial Land",
    city: "Abuja",
    area: "Lugbe District",
    street: "Airport Road",
    stage: "Foundation Stage",
    progress: 30,
    images: shotSet(16),
    alt: "Commercial land project in Lugbe",
  },
  {
    id: "cbd-hall",
    name: "CBD Hall",
    propertyType: "Event Centre / Venue",
    subtype: "Hall",
    city: "Abuja",
    area: "Central Business District",
    street: "Shehu Shagari Way",
    stage: "Finishing Stage",
    progress: 85,
    images: shotSet(17),
    alt: "Event hall in finishing stage",
  },
];

export const doneListings: DoneListing[] = [
  {
    id: "court-eleven",
    name: "Court Eleven",
    propertyType: "Houses",
    subtype: "Detached Duplex",
    city: "Lagos",
    area: "Victoria Island (VI)",
    street: "Adeola Odeku Street",
    images: shotSet(18),
    alt: "Completed limestone interior on Victoria Island",
  },
  {
    id: "lagoon-terrace",
    name: "Lagoon Terrace",
    propertyType: "Houses",
    subtype: "Terraced Duplex",
    city: "Lagos",
    area: "Lekki",
    street: "Admiralty Way",
    images: shotSet(19),
    alt: "Completed terrace overlooking the lagoon",
  },
  {
    id: "daylight-suite",
    name: "Daylight Suite",
    propertyType: "Flats / Apartments",
    subtype: "Standard Apartment",
    city: "Lagos",
    area: "Victoria Island (VI)",
    street: "Akin Adesola Street",
    images: shotSet(20),
    alt: "Completed apartment interior",
  },
  {
    id: "garki-hall",
    name: "Garki Hall",
    propertyType: "Event Centre / Venue",
    subtype: "Hall",
    city: "Abuja",
    area: "Garki",
    street: "5 Tafawa Balewa Way",
    images: shotSet(21),
    alt: "Completed event hall in Garki",
  },
  {
    id: "gwarinpa-court",
    name: "Gwarinpa Court",
    propertyType: "Houses",
    subtype: "Detached Bungalow",
    city: "Abuja",
    area: "Gwarinpa",
    street: "1st Avenue",
    images: shotSet(22),
    alt: "Completed bungalow in Gwarinpa",
  },
];

export function subtypesFor(type: string) {
  if (type in subtypesByType) {
    return subtypesByType[type as keyof typeof subtypesByType];
  }
  return [] as const;
}

export function matchesListing(
  item: CatalogItem,
  query: { type: string; subtype: string; area: string; street: string },
) {
  if (query.type && item.propertyType !== query.type) return false;
  if (query.subtype && item.subtype !== query.subtype) return false;
  if (query.area && item.area !== query.area) return false;
  const needle = query.street.trim().toLowerCase();
  if (!needle) return true;
  return `${item.street} ${item.name} ${item.area}`.toLowerCase().includes(needle);
}
