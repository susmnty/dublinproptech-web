import type { Metadata } from "next";

export const SITE_URL = "https://dublinproptech.com";
export const SITE_NAME = "Dublin PropTech";
export const BUSINESS_ID = `${SITE_URL}/#business`;

// Single source of truth for service areas — used by the "Areas We Serve" section AND Google schema.
export const SERVICE_AREAS = [
  // x / y = pin position on the Ireland map (viewBox 0 0 400 500), from real coordinates
  { name: "Dublin", detail: "City & County", schemaType: "City", x: 317.6, y: 263.4, label: "right" },
  { name: "Drogheda", detail: "& Co. Louth", schemaType: "City", x: 311.2, y: 219.6, label: "right" },
  { name: "Westmeath", detail: "Mullingar · Athlone", schemaType: "AdministrativeArea", x: 241.6, y: 242.2, label: "left" },
  { name: "Kildare", detail: "Naas · Newbridge", schemaType: "AdministrativeArea", x: 284.5, y: 281.1, label: "left" },
] as const;

export const areaServedSchema = () =>
  SERVICE_AREAS.map((a) => ({ "@type": a.schemaType, name: a.name }));

// Swap for a 1200x630 JPG/PNG when you have one (some share previews ignore WebP).
const DEFAULT_OG_IMAGE = "/d-logo-irish.webp";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean; // true = skip the "| Dublin PropTech" template
};

// Next.js replaces (not merges) openGraph/twitter from the root layout,
// so every page sends the complete set.
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IE",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function serviceJsonLd(name: string, serviceType: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServedSchema(),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}