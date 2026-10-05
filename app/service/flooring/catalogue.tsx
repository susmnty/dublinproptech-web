"use client";

// Shared product catalogue for the Laminate, Carpets, Tiles, Stairs, Wall Panels and LVT pages:
// product data, search + filters, product cards and the info pop-up.

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { EMBEDDED_IMAGES } from "./images";

// ---------------- PRODUCT DATA & SPECS ---------------- //

// Colour swatch dots used in the COLOUR filter rows
const COLOUR_DOT: Record<string, string> = {
  White: '#ece9e2', Grey: '#9a9a98', Natural: '#d9c3a0', Honey: '#c48f4e', Brown: '#8a5f3c', Dark: '#34302c',
  Beige: '#c9b596', Green: '#5f8a63', Charcoal: '#2f2c2b', Blue: '#3a566b', Yellow: '#b39640', Orange: '#b9713f', Red: '#8f3f33', Pink: '#d29d83',
  Assorted: 'linear-gradient(135deg,#c9b596,#5f8a63,#2f5876)',
  Cream: '#e3d9c6', Taupe: '#a39482', Wood: '#a77b52'
};
const LAMINATE_COLOURS = ['White', 'Grey', 'Natural', 'Honey', 'Brown', 'Dark'];
const PANEL_COLOURS = ['White', 'Natural', 'Honey', 'Brown', 'Grey', 'Blue'];
const TILE_COLOURS = ['White', 'Cream', 'Taupe', 'Grey', 'Black', 'Blue', 'Green', 'Pink', 'Wood'];
const CARPET_COLOURS = ['Beige', 'Brown', 'Grey', 'Charcoal', 'Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Assorted'];

// Colour is derived from the product name (edit any product's colour here if a shade is wrong)
const getLaminateColour = (name: string) => {
  const n = name.toLowerCase();
  if (/smoked|tobacco|walnut|dark|black|graphite|bronze/.test(n)) return 'Dark';
  if (/white|marble|snow|ivory/.test(n)) return 'White';
  if (/grey|taupe|platinum|palladium|silver/.test(n)) return 'Grey';
  if (/honey|gold|sunshine/.test(n)) return 'Honey';
  if (/beige|light|natural|cream|moon|sand|dune/.test(n)) return 'Natural';
  return 'Brown';
};

const laminateRaw = [
  // 12mm Story
  { id: 'l_12_1', category: '12mm Story', name: 'Roverto Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/roverto-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_2', category: '12mm Story', name: 'River Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/river-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_3', category: '12mm Story', name: 'Smoked Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/smoked-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_4', category: '12mm Story', name: 'Waldorf Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/waldorf-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_5', category: '12mm Story', name: 'Kolari Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/kolari-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_6', category: '12mm Story', name: 'Matte Taupe Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/matte-taupe.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_7', category: '12mm Story', name: 'Matte Tobacco Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/matte-tobacco.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },
  { id: 'l_12_8', category: '12mm Story', name: 'Honey Oak', thickness: '12mm', rating: 'AC5', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story/honey-oak.webp', desc: 'STORY 12MM premium quality waterproof product. 3D EIR natural touch finish.' },

  // White / Grey
  { id: 'l_wg_1', category: 'White / Grey', name: 'White Bayford Oak Long', thickness: '10mm', rating: 'Heavy Duty', dimensions: 'Long Plank', image: '/flooring/white-grey/white-bayford.webp', desc: 'Beautiful grey oak finish perfect for modern and minimalist interiors.' },
  { id: 'l_wg_2', category: 'White / Grey', name: 'Asgil Oak White Large', thickness: '8mm', rating: 'Heavy Duty', dimensions: 'Large Plank', image: '/flooring/white-grey/asgil-oak-white.webp', desc: 'Wide plank design offering a spacious feel with authentic white oak textures.' },
  { id: 'l_wg_3', category: 'White / Grey', name: 'Light Levanto Marble', thickness: '8mm', rating: 'Heavy Duty', dimensions: 'Standard Tile', image: '/flooring/white-grey/levanto-marble.webp', desc: 'Elegant light marble aesthetic with the warmth and durability of laminate.' },
  { id: 'l_wg_4', category: 'White / Grey', name: 'Platinum Grey Oak Plank', thickness: '12mm', rating: 'AC5 (Heavy Commercial)', dimensions: 'Standard Plank', image: '/flooring/white-grey/platinum-grey.webp', desc: 'Deeply textured platinum grey tones for high-traffic environments.' },

  // Browns
  { id: 'l_b_1', category: 'Browns', name: 'Albi Honey Oak', thickness: '12mm', rating: 'Heavy Duty', dimensions: 'Standard Plank', image: '/flooring/browns/albi-honey.webp', desc: 'Rich honey tones bringing warmth and traditional elegance to any room.' },
  { id: 'l_b_2', category: 'Browns', name: 'Wilderness Oak', thickness: '14mm', rating: 'Premium Heavy Duty', dimensions: 'Standard Plank', image: '/flooring/browns/wilderness-oak.webp', desc: 'Exceptionally thick 14mm core providing a feeling closest to solid wood.' },
  { id: 'l_b_3', category: 'Browns', name: 'Beige Melba Oak', thickness: '8mm', rating: 'Standard Duty', dimensions: 'Standard Plank', image: '/flooring/browns/beige-melba.webp', desc: 'Soft beige-brown hues perfect for creating a cozy, inviting atmosphere.' },
  { id: 'l_b_4', category: 'Browns', name: 'Dark Walnut', thickness: '12mm', rating: 'Heavy Duty', dimensions: 'Standard Plank', image: '/flooring/browns/dark-walnut.webp', desc: 'Luxurious dark walnut finish for sophisticated residential or commercial spaces.' },

  // Herringbone
  { id: 'l_h_1', category: 'Herringbone', name: 'Kittila Oak Herringbone', thickness: '12mm', rating: 'AC5', dimensions: '90 x 450mm', image: '/flooring/herringbone/kittila-herringbone.webp', desc: 'Combines the appearance of traditional herringbone parquet with the practicality of laminate.' },
  { id: 'l_h_2', category: 'Herringbone', name: 'Icelandic Oak Herringbone', thickness: '12mm', rating: 'AC5', dimensions: '90 x 450mm', image: '/flooring/herringbone/icelandic-herringbone.webp', desc: 'Combines the appearance of traditional herringbone parquet with the practicality of laminate.' },
  { id: 'l_h_3', category: 'Herringbone', name: 'Palladium Grey Herringbone', thickness: '12mm', rating: 'AC5', dimensions: '90 x 450mm', image: '/flooring/herringbone/palladium-herringbone.webp', desc: 'Combines the appearance of traditional herringbone parquet with the practicality of laminate.' },
  { id: 'l_h_4', category: 'Herringbone', name: 'Smoked Cathedral Herringbone', thickness: '12mm', rating: 'AC5', dimensions: '90 x 450mm', image: '/flooring/herringbone/smoked-cathedral.webp', desc: 'Combines the appearance of traditional herringbone parquet with the practicality of laminate.' },

  // Wide Plank 14mm (oversized planks)
  { id: 'l_sko_1', category: 'Wide Plank 14mm', name: 'Moon Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-moon.webp', desc: 'Crisp light French oak in oversized 14mm planks with synchronised pore structure. Water resistant.' },
  { id: 'l_sko_2', category: 'Wide Plank 14mm', name: 'Snow Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-snow.webp', desc: 'Bright white-washed oak in extra-long, extra-wide planks. Water resistant.' },
  { id: 'l_sko_3', category: 'Wide Plank 14mm', name: 'Dune Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-dune.webp', desc: 'Soft sandy oak tone with an authentic rustic real-wood feel.' },
  { id: 'l_sko_4', category: 'Wide Plank 14mm', name: 'Rock Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-rock.webp', desc: 'Rustic French oak with 4-sided bevel and 5G click installation.' },
  { id: 'l_sko_5', category: 'Wide Plank 14mm', name: 'Beach Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-beach.webp', desc: 'The look and feel of a valuable hardwood floor, scratch and impact resistant.' },
  { id: 'l_sko_6', category: 'Wide Plank 14mm', name: 'Terra Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-terra.webp', desc: 'Warm rustic oak. Water resistant and suitable for damp rooms.' },
  { id: 'l_sko_7', category: 'Wide Plank 14mm', name: 'Sunshine Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '2025mm x 244mm', image: '/flooring/swiss-krono/origin-sunshine.webp', desc: 'Golden warm oak tones that brighten large open-plan spaces.' },

  // Premium 14mm
  { id: 'l_ske_1', category: 'Premium 14mm', name: 'Gold Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '1380mm x 193mm', image: '/flooring/swiss-krono/evolution-gold.webp', desc: 'Honey-toned French oak with embossed-in-register texture. Water resistant, 5G click.' },
  { id: 'l_ske_2', category: 'Premium 14mm', name: 'Ivory Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '1380mm x 193mm', image: '/flooring/swiss-krono/evolution-ivory.webp', desc: 'Light ivory oak with perfectly matched decor and surface structure.' },
  { id: 'l_ske_3', category: 'Premium 14mm', name: 'Sandstone Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '1380mm x 193mm', image: '/flooring/swiss-krono/evolution-sandstone.webp', desc: 'Natural sandy oak, antistatic and anti-bacterial, suitable for kitchens.' },
  { id: 'l_ske_4', category: 'Premium 14mm', name: 'Graphite Oak', thickness: '14mm', rating: 'AC5 / Class 33', dimensions: '1380mm x 193mm', image: '/flooring/swiss-krono/evolution-graphite.webp', desc: 'Deep graphite oak for bold, modern interiors and commercial spaces.' },

  // Long Plank 12mm
  { id: 'l_km_1', category: 'Long Plank 12mm', name: 'Everest Oak White', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/everest-oak-white.webp', desc: 'White oak with registered embossed finish, 4V bevel and 5G click. 30-year residential warranty.' },
  { id: 'l_km_2', category: 'Long Plank 12mm', name: 'Mountain Oak Beige', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/mountain-oak-beige.webp', desc: 'Light sandy oak with visible grain and moisture-protected core.' },
  { id: 'l_km_3', category: 'Long Plank 12mm', name: 'Highland Oak Silver', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/highland-oak-silver.webp', desc: 'Silver-grey oak, suitable for water-based underfloor heating.' },
  { id: 'l_km_4', category: 'Long Plank 12mm', name: 'Macro Oak Grey', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/macro-oak-grey.webp', desc: 'Grey oak with registered embossed surface, built for heavy traffic.' },
  { id: 'l_km_5', category: 'Long Plank 12mm', name: 'Macro Oak Brown', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/macro-oak-brown.webp', desc: 'Rich rustic brown oak, water resistant, ideal for kitchens and hallways.' },
  { id: 'l_km_6', category: 'Long Plank 12mm', name: 'Everest Oak Bronze', thickness: '12mm', rating: 'AC5 / Class 33', dimensions: '1845mm x 188mm', image: '/flooring/kronotex/everest-oak-bronze.webp', desc: 'Deep-toned oak with warm copper undertones for statement rooms.' },

  // Classic 8mm
  { id: 'l_eg_1', category: 'Classic 8mm', name: 'Asgil Light Oak', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/asgil-light-oak.webp', desc: 'Warm natural oak with 4V bevel, click system and 20-year guarantee.' },
  { id: 'l_eg_2', category: 'Classic 8mm', name: 'Natural Soria Oak', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/natural-soria-oak.webp', desc: 'Natural pore surface, antibacterial and suitable for underfloor heating.' },
  { id: 'l_eg_3', category: 'Classic 8mm', name: 'Parquet Oak Dark', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/parquet-oak-dark.webp', desc: 'Dark oak, 100% PVC-free HDF core, easy-care melamine surface.' },
  { id: 'l_eg_4', category: 'Classic 8mm', name: 'Moor Acacia', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/moor-acacia.webp', desc: 'Characterful acacia decor, European-made with 20-year guarantee.' },
  { id: 'l_eg_5', category: 'Classic 8mm', name: 'Natural North Oak Water Resistant', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/natural-north-oak.webp', desc: 'Moisture-resistant laminate for kitchens, bathrooms and entrances.' },
  { id: 'l_eg_6', category: 'Classic 8mm', name: 'Grey Soria Oak Water Resistant', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 193mm', image: '/flooring/egger/grey-soria-oak.webp', desc: 'Moisture-resistant grey oak, steam-cleaner safe.' },
  { id: 'l_eg_7', category: 'Classic 8mm', name: 'Cream Hamilton Oak Extra Wide', thickness: '8mm', rating: 'AC4 / Class 32', dimensions: '1292mm x 327mm', image: '/flooring/egger/cream-hamilton-oak.webp', desc: 'Extra-wide planks for a spacious, modern look.' },
];

const laminateCollections = laminateRaw.map(item => ({ ...item, colour: getLaminateColour(item.name) }));

const carpetCollections = [
  // Essence Pure (28 colours)
  { id: 'c_pure_1510', category: 'Essence Pure', colour: 'Beige', name: 'Essence Pure (1510)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-1510.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_2031', category: 'Essence Pure', colour: 'Brown', name: 'Essence Pure (2031)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-2031.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_2084', category: 'Essence Pure', colour: 'Orange', name: 'Essence Pure (2084)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-2084.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_2087', category: 'Essence Pure', colour: 'Red', name: 'Essence Pure (2087)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-2087.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_2121', category: 'Essence Pure', colour: 'Red', name: 'Essence Pure (2121)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-2121.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_2911', category: 'Essence Pure', colour: 'Brown', name: 'Essence Pure (2911)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-2911.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_4422', category: 'Essence Pure', colour: 'Red', name: 'Essence Pure (4422)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-4422.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_5411', category: 'Essence Pure', colour: 'Orange', name: 'Essence Pure (5411)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-5411.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_6112', category: 'Essence Pure', colour: 'Yellow', name: 'Essence Pure (6112)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-6112.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_6321', category: 'Essence Pure', colour: 'Yellow', name: 'Essence Pure (6321)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-6321.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_7283', category: 'Essence Pure', colour: 'Green', name: 'Essence Pure (7283)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-7283.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_7802', category: 'Essence Pure', colour: 'Green', name: 'Essence Pure (7802)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-7802.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_7841', category: 'Essence Pure', colour: 'Green', name: 'Essence Pure (7841)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-7841.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_7925', category: 'Essence Pure', colour: 'Green', name: 'Essence Pure (7925)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-7925.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_8823', category: 'Essence Pure', colour: 'Blue', name: 'Essence Pure (8823)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-8823.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_8912', category: 'Essence Pure', colour: 'Blue', name: 'Essence Pure (8912)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-8912.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_8915', category: 'Essence Pure', colour: 'Grey', name: 'Essence Pure (8915)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-8915.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9022', category: 'Essence Pure', colour: 'Blue', name: 'Essence Pure (9022)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9022.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9044', category: 'Essence Pure', colour: 'Grey', name: 'Essence Pure (9044)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9044.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9083', category: 'Essence Pure', colour: 'Green', name: 'Essence Pure (9083)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9083.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9104', category: 'Essence Pure', colour: 'Grey', name: 'Essence Pure (9104)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9104.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9111', category: 'Essence Pure', colour: 'Charcoal', name: 'Essence Pure (9111)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9111.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9512', category: 'Essence Pure', colour: 'Charcoal', name: 'Essence Pure (9512)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9512.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9526', category: 'Essence Pure', colour: 'Beige', name: 'Essence Pure (9526)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9526.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9531', category: 'Essence Pure', colour: 'Charcoal', name: 'Essence Pure (9531)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9531.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9850', category: 'Essence Pure', colour: 'Charcoal', name: 'Essence Pure (9850)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9850.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9945', category: 'Essence Pure', colour: 'Grey', name: 'Essence Pure (9945)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9945.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  { id: 'c_pure_9960', category: 'Essence Pure', colour: 'Grey', name: 'Essence Pure (9960)', pile: 'Loop Pile', thickness: '6.0mm', weight: '3900 g/m²', image: '/carpets/essence-pure/pure-9960.webp', desc: 'Tarkett DESSO Essence Elements Pure. Solution dyed BCF Polyamide 6 loop pile.' },
  // Essence Roots (12 colours)
  { id: 'c_roots_2032', category: 'Essence Roots', colour: 'Beige', name: 'Essence Roots (2032)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-2032.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_2085', category: 'Essence Roots', colour: 'Pink', name: 'Essence Roots (2085)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-2085.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_2088', category: 'Essence Roots', colour: 'Pink', name: 'Essence Roots (2088)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-2088.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_5412', category: 'Essence Roots', colour: 'Orange', name: 'Essence Roots (5412)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-5412.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_6322', category: 'Essence Roots', colour: 'Yellow', name: 'Essence Roots (6322)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-6322.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_7284', category: 'Essence Roots', colour: 'Green', name: 'Essence Roots (7284)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-7284.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_7803', category: 'Essence Roots', colour: 'Green', name: 'Essence Roots (7803)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-7803.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_8913', category: 'Essence Roots', colour: 'Blue', name: 'Essence Roots (8913)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-8913.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_9513', category: 'Essence Roots', colour: 'Grey', name: 'Essence Roots (9513)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-9513.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_9532', category: 'Essence Roots', colour: 'Grey', name: 'Essence Roots (9532)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-9532.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_9851', category: 'Essence Roots', colour: 'Charcoal', name: 'Essence Roots (9851)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-9851.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_roots_9961', category: 'Essence Roots', colour: 'Grey', name: 'Essence Roots (9961)', pile: 'Structured Loop', thickness: '6.5mm', weight: '4050 g/m²', image: '/carpets/essence-roots/roots-9961.webp', desc: 'Tarkett DESSO Essence Elements Roots. Solution dyed BCF Polyamide 6 structured loop pile.' },
  // Essence Traces (6 colours)
  { id: 'c_traces_1511', category: 'Essence Traces', colour: 'Brown', name: 'Essence Traces (1511)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-1511.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_traces_9105', category: 'Essence Traces', colour: 'Red', name: 'Essence Traces (9105)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-9105.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_traces_9112', category: 'Essence Traces', colour: 'Charcoal', name: 'Essence Traces (9112)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-9112.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_traces_9527', category: 'Essence Traces', colour: 'Green', name: 'Essence Traces (9527)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-9527.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_traces_9528', category: 'Essence Traces', colour: 'Grey', name: 'Essence Traces (9528)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-9528.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  { id: 'c_traces_9946', category: 'Essence Traces', colour: 'Grey', name: 'Essence Traces (9946)', pile: 'Structured Loop', thickness: '6.0mm', weight: '4050 g/m²', image: '/carpets/essence-traces/traces-9946.webp', desc: 'Tarkett DESSO Essence Elements Traces. Solution dyed BCF Polyamide 6 structured loop pile.' },
  // Luxury Carpets
  { id: 'c1', category: 'Luxury Carpets', colour: 'Assorted', name: 'Apollo Elite', pile: 'Deep Pile', thickness: '4m Width', weight: '40oz', image: '/carpets/luxury-carpets/apollo-elite.webp', desc: '100% Excellon Polypropylene. Luxurious look and feel with stain-resistant technology.' },
  { id: 'c2', category: 'Luxury Carpets', colour: 'Assorted', name: 'Primo Grande', pile: 'Deep Pile', thickness: '4m Width', weight: '58oz', image: '/carpets/luxury-carpets/primo-grande.webp', desc: 'The heavyweight champion. Deep, luxurious pile structure.' },
  { id: 'c3', category: 'Luxury Carpets', colour: 'Assorted', name: 'Sensation Original', pile: 'Deep Pile', thickness: '4m & 5m', weight: '58oz', image: '/carpets/luxury-carpets/sensation-original.webp', desc: 'Incredibly soft, deep pile providing unparalleled softness.' },
  { id: 'c4', category: 'Luxury Carpets', colour: 'Assorted', name: 'Riva', pile: 'Deep Pile', thickness: '4m Width', weight: '53oz', image: '/carpets/luxury-carpets/riva.webp', desc: 'Ultra-deep and plush finish engineered for absolute comfort.' }
];

// Tiles (sourced from our distributor's range). Size, finish and use shown in the pop-up.
const tileCollections = [
  // Marble-Effect
  { id: 't_m_1', category: 'Marble-Effect', colour: 'Blue', name: 'Marmo Azul', size: '120 x 60cm', material: 'Porcelain', finish: 'Gloss', use: 'Floor & Wall', image: '/tiles/marble/marmo-azul.webp', desc: 'Deep blue marble-effect porcelain with soft white veining. 10mm thick, gloss finish for a striking feature floor or wall.' },
  { id: 't_m_2', category: 'Marble-Effect', colour: 'White', name: 'Bianco Statuario', size: '160 x 80cm', material: 'Porcelain', finish: 'Gloss', use: 'Floor & Wall', image: '/tiles/marble/bianco-statuario.webp', desc: 'Classic white Statuario marble look with bold grey veining in an extra-large 160x80cm format. 10mm thick, gloss finish.' },
  { id: 't_m_3', category: 'Marble-Effect', colour: 'Grey', name: 'Dexter Dove', size: '160 x 80cm', material: 'Porcelain', finish: 'Gloss', use: 'Floor & Wall', image: '/tiles/marble/dexter-dove.webp', desc: 'Soft dove-grey marble effect in an extra-large slab format with fewer grout lines. 10mm thick, gloss finish.' },
  { id: 't_m_4', category: 'Marble-Effect', colour: 'Grey', name: 'Statuario Smoke', size: '100 x 100cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/marble/statuario-smoke.webp', desc: 'Smoky grey Statuario marble effect in a large 100x100cm square. 10mm thick, matt finish for a calm, modern look.' },
  { id: 't_m_5', category: 'Marble-Effect', colour: 'Grey', name: 'Versilia Smoke', size: '100 x 100cm', material: 'Porcelain', finish: 'Gloss', use: 'Floor & Wall', image: '/tiles/marble/versilia-smoke.webp', desc: 'Dark smoke-grey marble with light veining in a large square format. 10mm thick, gloss finish.' },
  // Concrete-Effect
  { id: 't_c_1', category: 'Concrete-Effect', colour: 'White', name: 'Arena White', size: '100 x 100cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/arena-white.webp', desc: 'Clean white concrete-effect porcelain in a large 100x100cm format. Matt finish, suitable for floors and walls.' },
  { id: 't_c_2', category: 'Concrete-Effect', colour: 'Grey', name: 'Arena Grey', size: '100 x 100cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/arena-grey.webp', desc: 'Minimalist grey concrete-effect porcelain, perfect for modern interiors. Matt finish, suitable for floors and walls.' },
  { id: 't_c_3', category: 'Concrete-Effect', colour: 'Grey', name: 'Dextor Smoke', size: '100 x 100cm', material: 'Porcelain', finish: 'Satin Matt', use: 'Floor & Wall', image: '/tiles/concrete/dextor-smoke.webp', desc: 'Smoky mid-grey concrete look in a large square format with a soft satin-matt sheen.' },
  { id: 't_c_4', category: 'Concrete-Effect', colour: 'Grey', name: 'Breton Grey', size: '100 x 100cm', material: 'Porcelain', finish: 'Satin Matt', use: 'Floor & Wall', image: '/tiles/concrete/breton-grey.webp', desc: 'Warm grey concrete effect with subtle texture, satin-matt finish in a 100x100cm format.' },
  { id: 't_c_5', category: 'Concrete-Effect', colour: 'Grey', name: 'Dom Gris', size: '80 x 80cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/dom-gris.webp', desc: 'Urban grey concrete-effect porcelain in an 80x80cm square. Matt finish, hard-wearing for busy rooms.' },
  { id: 't_c_6', category: 'Concrete-Effect', colour: 'Grey', name: 'Lunar Ash', size: '120 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/lunar-ash.webp', desc: 'Ash-grey concrete effect in a large 120x60cm rectangle. Matt finish for kitchens, hallways and open-plan spaces.' },
  { id: 't_c_7', category: 'Concrete-Effect', colour: 'Grey', name: 'Lunar Silver', size: '120 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/lunar-silver.webp', desc: 'Light silver-grey concrete effect in a 120x60cm format. Matt finish with a clean, contemporary look.' },
  { id: 't_c_8', category: 'Concrete-Effect', colour: 'White', name: 'Manhattan Bianco', size: '60 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/concrete/manhattan-bianco.webp', desc: 'Soft off-white concrete-effect porcelain in a versatile 60x60cm size. Matt finish.' },
  // Wood-Effect
  { id: 't_w_1', category: 'Wood-Effect', colour: 'Taupe', name: 'Moneo Taupe', size: '120 x 20cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/wood/moneo-taupe.webp', desc: 'Taupe wood-effect porcelain plank. The look of timber with the water resistance of tile, ideal over underfloor heating.' },
  { id: 't_w_2', category: 'Wood-Effect', colour: 'Wood', name: 'Kael Roble', size: '120 x 23cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/wood/kael-roble.webp', desc: 'Warm oak (roble) wood-effect porcelain plank in a 120x23cm format. Matt finish, perfect for kitchens and hallways.' },
  { id: 't_w_3', category: 'Wood-Effect', colour: 'Wood', name: 'Origen Natural', size: '120 x 23cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/wood/origen-natural.webp', desc: 'Natural light-oak wood effect in a long porcelain plank. Matt finish, easy to clean and scratch resistant.' },
  { id: 't_w_4', category: 'Wood-Effect', colour: 'White', name: 'IWood White', size: '90 x 15cm', material: 'Porcelain', finish: 'Matt', use: 'Floor & Wall', image: '/tiles/wood/iwood-white.webp', desc: 'White-washed wood-effect porcelain in a slim 90x15cm plank. Matt finish for a bright Scandi look.' },
  // Wall & Metro
  { id: 't_mt_1', category: 'Wall & Metro', colour: 'White', name: 'Metro XL White', size: '30 x 10cm', material: 'Ceramic', finish: 'Gloss', use: 'Wall', image: '/tiles/metro/metro-xl-white.webp', desc: 'Bright white flat metro wall tile, 300x100x8mm. Gloss finish, easy to clean, perfect for kitchens, bathrooms or feature walls.' },
  { id: 't_mt_2', category: 'Wall & Metro', colour: 'Black', name: 'Metro Polar Noir', size: '30 x 10cm', material: 'Ceramic', finish: 'Gloss', use: 'Wall', image: '/tiles/metro/metro-polar-noir.webp', desc: 'Black gloss ceramic metro wall tile in a 30x10cm format. A bold, modern splashback choice.' },
  { id: 't_mt_3', category: 'Wall & Metro', colour: 'Green', name: 'Metro Alma Verde', size: '30 x 10cm', material: 'Porcelain', finish: 'Gloss', use: 'Wall', image: '/tiles/metro/metro-alma-verde.webp', desc: 'Rich green gloss metro wall tile with a hand-made, glazed character. 30x10cm.' },
  { id: 't_mt_4', category: 'Wall & Metro', colour: 'Blue', name: 'Soldeu Blue', size: '30 x 7.5cm', material: 'Ceramic', finish: 'Textured Gloss', use: 'Wall', image: '/tiles/metro/soldeu-blue.webp', desc: 'Blue textured-gloss ceramic metro wall tile in a slim 30x7.5cm format with an artisan, uneven surface.' },
  { id: 't_mt_5', category: 'Wall & Metro', colour: 'Pink', name: 'Soldeu Pink', size: '30 x 7.5cm', material: 'Ceramic', finish: 'Textured Gloss', use: 'Wall', image: '/tiles/metro/soldeu-pink.webp', desc: 'Soft pink textured-gloss ceramic metro wall tile, 30x7.5cm. Adds warmth to bathrooms and kitchens.' },
  { id: 't_mt_6', category: 'Wall & Metro', colour: 'Grey', name: 'Iceberg Grey', size: '22.5 x 7.5cm', material: 'Ceramic', finish: 'Gloss', use: 'Wall', image: '/tiles/metro/iceberg-grey.webp', desc: 'Light grey gloss ceramic metro wall tile in a 22.5x7.5cm size.' },
  { id: 't_mt_7', category: 'Wall & Metro', colour: 'White', name: 'Mini Metro White Bevelled', size: '15 x 7.5cm', material: 'Ceramic', finish: 'Gloss', use: 'Wall', image: '/tiles/metro/mini-metro-white-bevelled.webp', desc: 'Classic small white bevelled metro wall tile, 15x7.5cm. Gloss finish, a timeless splashback.' },
  // Outdoor
  { id: 't_o_1', category: 'Outdoor', colour: 'Grey', name: 'Kandla Grey', size: '120 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/kandla-grey.webp', desc: 'Grey sandstone-effect outdoor porcelain, 1200x600x20mm. Matt finish for patios and garden paths.' },
  { id: 't_o_2', category: 'Outdoor', colour: 'Grey', name: 'Howth Grey', size: '120 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/howth-grey.webp', desc: 'Grey limestone-effect outdoor porcelain, 1200x600x20mm. Matt, frost-resistant and easy to maintain.' },
  { id: 't_o_3', category: 'Outdoor', colour: 'Taupe', name: 'Berlin Taupe', size: '120 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/berlin-taupe.webp', desc: 'Warm taupe limestone-effect outdoor porcelain, 1200x600x20mm. Matt finish.' },
  { id: 't_o_4', category: 'Outdoor', colour: 'Wood', name: 'Riverwood Pearl', size: '120 x 30cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/riverwood-pearl.webp', desc: 'Pearl-toned wood-effect outdoor porcelain plank, 1200x300x20mm. The decking look with no rot or splinters.' },
  { id: 't_o_5', category: 'Outdoor', colour: 'Black', name: 'Black Terrazzo', size: '60 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/black-terrazzo.webp', desc: 'Black terrazzo-effect outdoor porcelain, 600x600x20mm. Matt finish for a bold patio.' },
  { id: 't_o_6', category: 'Outdoor', colour: 'Cream', name: 'Laguna Cream', size: '60 x 60cm', material: 'Porcelain', finish: 'Matt', use: 'Outdoor', image: '/tiles/outdoor/laguna-cream.webp', desc: 'Light cream marble-effect outdoor porcelain, 600x600x20mm. Matt finish, ideal for bright patios.' },
];

// Stair cladding (treads, risers and kits). Size shown as thickness x width x length.
const stairCollections = [
  // Laminate 8mm
  { id: 's_l_1_1', category: 'Laminate 8mm', colour: 'Natural', name: 'Light Oak Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/light-oak-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_1_2', category: 'Laminate 8mm', colour: 'Natural', name: 'Light Oak Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/light-oak-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_1_3', category: 'Laminate 8mm', colour: 'Natural', name: 'Light Oak Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/light-oak-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_1_4', category: 'Laminate 8mm', colour: 'Natural', name: 'Light Oak Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/light-oak-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_2_1', category: 'Laminate 8mm', colour: 'Honey', name: 'Honey Oak Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/honey-oak-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_2_2', category: 'Laminate 8mm', colour: 'Honey', name: 'Honey Oak Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/honey-oak-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_2_3', category: 'Laminate 8mm', colour: 'Honey', name: 'Honey Oak Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/honey-oak-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_2_4', category: 'Laminate 8mm', colour: 'Honey', name: 'Honey Oak Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/honey-oak-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_3_1', category: 'Laminate 8mm', colour: 'Brown', name: 'Wild Oak Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/wild-oak-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_3_2', category: 'Laminate 8mm', colour: 'Brown', name: 'Wild Oak Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/wild-oak-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_3_3', category: 'Laminate 8mm', colour: 'Brown', name: 'Wild Oak Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/wild-oak-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_3_4', category: 'Laminate 8mm', colour: 'Brown', name: 'Wild Oak Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/wild-oak-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_4_1', category: 'Laminate 8mm', colour: 'Dark', name: 'Milani Dark Oak Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/milani-dark-oak-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_4_2', category: 'Laminate 8mm', colour: 'Dark', name: 'Milani Dark Oak Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/milani-dark-oak-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_4_3', category: 'Laminate 8mm', colour: 'Dark', name: 'Milani Dark Oak Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/milani-dark-oak-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_4_4', category: 'Laminate 8mm', colour: 'Dark', name: 'Milani Dark Oak Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/milani-dark-oak-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_5_1', category: 'Laminate 8mm', colour: 'Grey', name: 'Lizzy Oak Grey Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/lizzy-oak-grey-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_5_2', category: 'Laminate 8mm', colour: 'Grey', name: 'Lizzy Oak Grey Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/lizzy-oak-grey-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_5_3', category: 'Laminate 8mm', colour: 'Grey', name: 'Lizzy Oak Grey Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/lizzy-oak-grey-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_5_4', category: 'Laminate 8mm', colour: 'Grey', name: 'Lizzy Oak Grey Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/lizzy-oak-grey-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_6_1', category: 'Laminate 8mm', colour: 'Natural', name: 'Roicha Oak Beige Single Tread & Riser', size: '8 x 340 x 1000mm', piece: 'Single Tread & Riser', range: 'Laminate', image: '/stairs/laminate/roicha-oak-beige-single-tread-and-riser.webp', desc: 'Pack of 1 tread + 1 riser. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_6_2', category: 'Laminate 8mm', colour: 'Natural', name: 'Roicha Oak Beige Bullnose Tread & Riser', size: '8 x 340 x 1200mm', piece: 'Bullnose Tread & Riser', range: 'Laminate', image: '/stairs/laminate/roicha-oak-beige-bullnose-tread-and-riser.webp', desc: 'Pack of 1 bullnose tread + 1 riser, for the rounded bottom step. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_6_3', category: 'Laminate 8mm', colour: 'Natural', name: 'Roicha Oak Beige Quattro Treads & Risers', size: '8 x 340 x 1000mm', piece: 'Multi-Pack (4 Steps)', range: 'Laminate', image: '/stairs/laminate/roicha-oak-beige-quattro-treads-and-risers.webp', desc: 'Value pack of 4 treads + 4 risers. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  { id: 's_l_6_4', category: 'Laminate 8mm', colour: 'Natural', name: 'Roicha Oak Beige Double Winder Tread & Riser', size: '8 x 690 x 1200mm', piece: 'Winder Tread & Riser', range: 'Laminate', image: '/stairs/laminate/roicha-oak-beige-double-winder-tread-and-riser.webp', desc: 'Extra-deep 690mm tread for turning (winder) steps. Laminate stair cladding, 8mm thick. Reversible riser in matching decor or white. Resistant to stains, impacts and scratches, UV-protected and suitable for underfloor heating. Glue-down installation with a 40mm drop. Matching stair nose, top-step transition, infill panels and flat profiles available.' },
  // Engineered Oak 14mm
  { id: 's_e_1_1', category: 'Engineered Oak 14mm', colour: 'White', name: 'Mountain Chalk Bullnose Stair Tread', size: '14 x 300 x 1200mm', piece: 'Bullnose Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-chalk-bullnose-stair-tread.webp', desc: 'Rounded bullnose tread for the bottom or feature step. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_1_2', category: 'Engineered Oak 14mm', colour: 'White', name: 'Mountain Chalk Stair Tread', size: '14 x 115 x 945mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-chalk-stair-tread.webp', desc: 'Nosing tread piece used with matching floor planks to clad each step. Packs of 2. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_1_3', category: 'Engineered Oak 14mm', colour: 'White', name: 'Mountain Chalk Long Stair Tread', size: '14 x 115 x 1900mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-chalk-long-stair-tread.webp', desc: 'Extra-long 1900mm nosing tread for wide staircases. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_2_1', category: 'Engineered Oak 14mm', colour: 'Grey', name: 'Mountain Mist Bullnose Stair Tread', size: '14 x 300 x 1200mm', piece: 'Bullnose Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-mist-bullnose-stair-tread.webp', desc: 'Rounded bullnose tread for the bottom or feature step. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_2_2', category: 'Engineered Oak 14mm', colour: 'Grey', name: 'Mountain Mist Stair Tread', size: '14 x 115 x 945mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-mist-stair-tread.webp', desc: 'Nosing tread piece used with matching floor planks to clad each step. Packs of 2. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_2_3', category: 'Engineered Oak 14mm', colour: 'Grey', name: 'Mountain Mist Long Stair Tread', size: '14 x 115 x 1900mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-mist-long-stair-tread.webp', desc: 'Extra-long 1900mm nosing tread for wide staircases. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_3_1', category: 'Engineered Oak 14mm', colour: 'Honey', name: 'Mountain Rustic Oak Bullnose Stair Tread', size: '14 x 300 x 1200mm', piece: 'Bullnose Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-rustic-oak-bullnose-stair-tread.webp', desc: 'Rounded bullnose tread for the bottom or feature step. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_3_2', category: 'Engineered Oak 14mm', colour: 'Honey', name: 'Mountain Rustic Oak Stair Tread', size: '14 x 115 x 945mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-rustic-oak-stair-tread.webp', desc: 'Nosing tread piece used with matching floor planks to clad each step. Packs of 2. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_3_3', category: 'Engineered Oak 14mm', colour: 'Honey', name: 'Mountain Rustic Oak Long Stair Tread', size: '14 x 115 x 1900mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-rustic-oak-long-stair-tread.webp', desc: 'Extra-long 1900mm nosing tread for wide staircases. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_4_1', category: 'Engineered Oak 14mm', colour: 'Brown', name: 'Mountain Ridge Bullnose Stair Tread', size: '14 x 300 x 1200mm', piece: 'Bullnose Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-ridge-bullnose-stair-tread.webp', desc: 'Rounded bullnose tread for the bottom or feature step. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_4_2', category: 'Engineered Oak 14mm', colour: 'Brown', name: 'Mountain Ridge Stair Tread', size: '14 x 115 x 945mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-ridge-stair-tread.webp', desc: 'Nosing tread piece used with matching floor planks to clad each step. Packs of 2. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_4_3', category: 'Engineered Oak 14mm', colour: 'Brown', name: 'Mountain Ridge Long Stair Tread', size: '14 x 115 x 1900mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-ridge-long-stair-tread.webp', desc: 'Extra-long 1900mm nosing tread for wide staircases. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_5_1', category: 'Engineered Oak 14mm', colour: 'Dark', name: 'Mountain Deep Smoked Bullnose Stair Tread', size: '14 x 300 x 1200mm', piece: 'Bullnose Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-deep-smoked-bullnose-stair-tread.webp', desc: 'Rounded bullnose tread for the bottom or feature step. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_5_2', category: 'Engineered Oak 14mm', colour: 'Dark', name: 'Mountain Deep Smoked Stair Tread', size: '14 x 115 x 945mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-deep-smoked-stair-tread.webp', desc: 'Nosing tread piece used with matching floor planks to clad each step. Packs of 2. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
  { id: 's_e_5_3', category: 'Engineered Oak 14mm', colour: 'Dark', name: 'Mountain Deep Smoked Long Stair Tread', size: '14 x 115 x 1900mm', piece: 'Stair Tread', range: 'Engineered Oak', image: '/stairs/engineered/mountain-deep-smoked-long-stair-tread.webp', desc: 'Extra-long 1900mm nosing tread for wide staircases. Engineered oak with a 3mm real-wood top layer and brushed matt lacquered finish that shows natural grain and knots. Glue-down installation with a 60mm drop. Matches the same range of floor planks, herringbone and chevron.' },
];

// Wall panels (fluted MDF and acoustic slat panels). Size shown as thickness x width x height.
const panelCollections = [
  { id: 'w_1', category: 'Slat Panels', colour: 'Brown', name: 'Walnut Narrow Slat Panel', size: '12 x 122 x 2400mm', panel: 'Slat Panel (Narrow)', finish: 'Wood-effect PVC', image: '/wall-panels/walnut-narrow-slat-panel.webp', desc: 'Warm walnut tone with narrow fluting for a refined, linear look. MDF panel with a wood-effect PVC finish, 2400mm tall so one length covers a standard wall. Fixes with glue or screws. Not suitable for bathrooms.' },
  { id: 'w_2', category: 'Slat Panels', colour: 'Honey', name: 'Medium Oak Narrow Slat Panel', size: '12 x 122 x 2400mm', panel: 'Slat Panel (Narrow)', finish: 'Wood-effect PVC', image: '/wall-panels/medium-oak-narrow-slat-panel.webp', desc: 'Mid-tone oak with narrow fluting, great behind TVs and beds. MDF panel with a wood-effect PVC finish, 2400mm tall so one length covers a standard wall. Fixes with glue or screws. Not suitable for bathrooms.' },
  { id: 'w_3', category: 'Slat Panels', colour: 'Grey', name: 'Anthracite Grey Slat Panel', size: '12 x 122 x 2400mm', panel: 'Slat Panel (Medium)', finish: 'Wood-effect PVC', image: '/wall-panels/anthracite-grey-slat-panel.webp', desc: 'Deep anthracite grey for bold, modern feature walls. MDF panel with a wood-effect PVC finish, 2400mm tall so one length covers a standard wall. Fixes with glue or screws. Not suitable for bathrooms.' },
  { id: 'w_4', category: 'Slat Panels', colour: 'Blue', name: 'Blue Textured Slat Panel', size: '12 x 122 x 2400mm', panel: 'Slat Panel (Medium)', finish: 'Wood-effect PVC', image: '/wall-panels/blue-textured-slat-panel.webp', desc: 'Rich blue textured finish for a striking statement wall. MDF panel with a wood-effect PVC finish, 2400mm tall so one length covers a standard wall. Fixes with glue or screws. Not suitable for bathrooms.' },
  { id: 'w_5', category: 'Slat Panels', colour: 'White', name: 'White Textured Slat Panel', size: '12 x 122 x 2400mm', panel: 'Slat Panel (Medium)', finish: 'Wood-effect PVC', image: '/wall-panels/white-textured-slat-panel.webp', desc: 'Fresh white textured finish that brightens a room while adding depth. MDF panel with a wood-effect PVC finish, 2400mm tall so one length covers a standard wall. Fixes with glue or screws. Not suitable for bathrooms.' },
  { id: 'w_6', category: 'Acoustic Panels', colour: 'Natural', name: 'Oak Veneer Acoustic Panel', size: '21 x 600 x 2400mm', panel: 'Acoustic Slat Panel', finish: 'Oak-look veneer on black felt', image: '/wall-panels/oak-veneer-acoustic-panel.webp', desc: 'Classic oak slats on black felt, ideal for living rooms, home offices and studios. Real-look slats on an MDF core over a polyester felt backing that cuts echo and noise. NRC 0.3 fixed directly to the wall, up to NRC 0.8 on battens with a rockwool-filled gap. Fixes with glue or screws; matching end profiles available.' },
  { id: 'w_7', category: 'Acoustic Panels', colour: 'Brown', name: 'Dark Walnut Acoustic Panel', size: '21 x 600 x 2400mm', panel: 'Acoustic Slat Panel', finish: 'Walnut-look veneer on black felt', image: '/wall-panels/dark-walnut-acoustic-panel.webp', desc: 'Rich dark walnut slats on black felt for a luxurious, sound-softening feature wall. Real-look slats on an MDF core over a polyester felt backing that cuts echo and noise. NRC 0.3 fixed directly to the wall, up to NRC 0.8 on battens with a rockwool-filled gap. Fixes with glue or screws; matching end profiles available.' },
];

// LVT / SPC rigid-core vinyl. Size shown as thickness (core + pad) x width x length.
const lvtCollections = [
  // Wide Plank 6mm
  { id: 'v_w_1', category: 'Wide Plank 6mm', colour: 'Dark', name: 'Coastal Drift Oak', size: '5+1 x 229 x 1219mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/coastal-drift-oak.webp', desc: 'Dark brown oak in an extra-wide 229mm plank. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_w_2', category: 'Wide Plank 6mm', colour: 'Natural', name: 'Harbour Mist Oak', size: '5+1 x 229 x 1219mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/harbour-mist-oak.webp', desc: 'Neutral beige oak in an extra-wide 229mm plank. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_w_3', category: 'Wide Plank 6mm', colour: 'Brown', name: 'Lagoon Sand Oak', size: '5+1 x 229 x 1219mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/lagoon-sand-oak.webp', desc: 'Warm brown oak in an extra-wide 229mm plank. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_w_4', category: 'Wide Plank 6mm', colour: 'Brown', name: 'Riptide Oak', size: '5+1 x 229 x 1219mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/riptide-oak.webp', desc: 'Warm mid-brown oak in an extra-wide 229mm plank. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_w_5', category: 'Wide Plank 6mm', colour: 'Grey', name: 'Silver Stream Oak', size: '5+1 x 229 x 1219mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/silver-stream-oak.webp', desc: 'Silver-grey oak in an extra-wide 229mm plank. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  // Herringbone 6mm
  { id: 'v_h_1', category: 'Herringbone 6mm', colour: 'Dark', name: 'Coastal Drift Oak Herringbone', size: '5+1 x 153 x 600mm', format: 'Herringbone', usage: 'Class 34', image: '/lvt/herringbone/coastal-drift-oak-herringbone.webp', desc: 'Dark brown oak laid in a classic herringbone pattern. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_h_2', category: 'Herringbone 6mm', colour: 'Natural', name: 'Harbour Mist Oak Herringbone', size: '5+1 x 153 x 600mm', format: 'Herringbone', usage: 'Class 34', image: '/lvt/herringbone/harbour-mist-oak-herringbone.webp', desc: 'Neutral beige oak herringbone for a bright, elegant room. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_h_3', category: 'Herringbone 6mm', colour: 'Brown', name: 'Lagoon Sand Oak Herringbone', size: '5+1 x 153 x 600mm', format: 'Herringbone', usage: 'Class 34', image: '/lvt/herringbone/lagoon-sand-oak-herringbone.webp', desc: 'Warm brown oak herringbone. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_h_4', category: 'Herringbone 6mm', colour: 'Brown', name: 'Riptide Oak Herringbone', size: '5+1 x 153 x 600mm', format: 'Herringbone', usage: 'Class 34', image: '/lvt/herringbone/riptide-oak-herringbone.webp', desc: 'Warm mid-brown oak herringbone. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  { id: 'v_h_5', category: 'Herringbone 6mm', colour: 'Grey', name: 'Silver Stream Oak Herringbone', size: '5+1 x 153 x 600mm', format: 'Herringbone', usage: 'Class 34', image: '/lvt/herringbone/silver-stream-oak-herringbone.webp', desc: 'Silver-grey oak herringbone for a modern look. Rigid SPC core with integrated underlay, so no separate underlay is needed. Waterproof core, suitable for bathrooms and kitchens. Usage class 34 for heavy domestic and commercial traffic. Hickory scrape finish, scratch and slip resistant, anti-bacterial, pet and kid friendly. Floating click installation. 30-year domestic guarantee.' },
  // Classic Plank 6mm
  { id: 'v_r_1', category: 'Classic Plank 6mm', colour: 'Brown', name: 'Scandipure', size: '5+1 x 192 x 1210mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/scandipure.webp', desc: 'Warm brown oak with a subtle Scandinavian-style woodgrain. Rigid SPC core with integrated underlay pad. Waterproof and dimensionally stable, suitable for underfloor heating. Usage class 34. Hickory scrape soft-touch finish, scratch resistant and stain proof, with 4-sided V-groove and click-fit installation. 30-year domestic guarantee.' },
  { id: 'v_r_2', category: 'Classic Plank 6mm', colour: 'Dark', name: 'Bourbon Cask', size: '5+1 x 192 x 1210mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/bourbon-cask.webp', desc: 'Rich dark brown oak with a warm tone. Rigid SPC core with integrated underlay pad. Waterproof and dimensionally stable, suitable for underfloor heating. Usage class 34. Hickory scrape soft-touch finish, scratch resistant and stain proof, with 4-sided V-groove and click-fit installation. 30-year domestic guarantee.' },
  { id: 'v_r_3', category: 'Classic Plank 6mm', colour: 'Brown', name: 'Barista', size: '5+1 x 192 x 1210mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/barista.webp', desc: 'Earthy brown tones with detailed woodgrain. Rigid SPC core with integrated underlay pad. Waterproof and dimensionally stable, suitable for underfloor heating. Usage class 34. Hickory scrape soft-touch finish, scratch resistant and stain proof, with 4-sided V-groove and click-fit installation. 30-year domestic guarantee.' },
  { id: 'v_r_4', category: 'Classic Plank 6mm', colour: 'White', name: 'Airflow', size: '5+1 x 192 x 1210mm', format: 'Plank', usage: 'Class 34', image: '/lvt/plank/airflow.webp', desc: 'Light white-washed oak that brightens any space. Rigid SPC core with integrated underlay pad. Waterproof and dimensionally stable, suitable for underfloor heating. Usage class 34. Hickory scrape soft-touch finish, scratch resistant and stain proof, with 4-sided V-groove and click-fit installation. 30-year domestic guarantee.' },
  // Essential 5mm
  { id: 'v_e_1', category: 'Essential 5mm', colour: 'Grey', name: 'Orchid Oak', size: '4+1 x 192 x 1280mm', format: 'Plank', usage: 'Class 32', image: '/lvt/plank/orchid-oak.webp', desc: 'Soft light-grey oak with a clean plank design. Rigid SPC core with integrated underlay pad. Water resistant, suitable for bathrooms, and suitable for underfloor heating. Usage class 32 for domestic use. A great-value waterproof floor for any room.' },
  { id: 'v_e_2', category: 'Essential 5mm', colour: 'Natural', name: 'Malt Tree', size: '4+1 x 192 x 1280mm', format: 'Plank', usage: 'Class 32', image: '/lvt/plank/malt-tree.webp', desc: 'Warm beige wood look. Rigid SPC core with integrated underlay pad. Water resistant, suitable for bathrooms, and suitable for underfloor heating. Usage class 32 for domestic use. A great-value waterproof floor for any room.' },
];

// Shown inside the product info modal (Tarkett DESSO Essence Elements collections)
const tarkettSpecs: Record<string, { overview: string[]; tech: string[] }> = {
  'Essence Pure': {
    overview: ['Collection: Essence Elements Pure', 'Product type: Carpet Tiles', 'Construction: Tufted 1/10"', 'Surface: Loop pile', 'Dye method: Solution dyed', 'Tile size: 50 × 50 cm', 'Tiles per box: 20', 'Primary backing: Polyester fleece', 'Secondary backing: ProBase – modified bitumen', 'Pile fibre: BCF Polyamide 6'],
    tech: ['Total thickness: 6.0 mm', 'Effective pile thickness: 2.7 mm', 'Total mass: 3900 g/m²', 'Total pile mass: 500 g/m²', 'Use classification: Class 33 – Heavy Commercial Use', 'Luxury rating: LC 1', 'Dimensional stability: ≤ 0.2%', 'Impact sound reduction: 26 dB', 'Noise reduction: αw 0.15', 'Thermal resistance: 0.062 m²·K/W', 'Flammability: Bfl-s1', 'Manufacturer: Tarkett BV']
  },
  'Essence Roots': {
    overview: ['Collection: Essence Elements Roots', 'Product type: Carpet Tiles', 'Construction: Tufted 1/10"', 'Surface: Structured loop pile', 'Dye method: Solution dyed', 'Tile size: 50 × 50 cm', 'Tiles per box: 20', 'Primary backing: Polyester fleece', 'Secondary backing: ProBase – modified bitumen', 'Pile fibre: BCF Polyamide 6'],
    tech: ['Total thickness: 6.5 mm', 'Effective pile thickness: 3.4 mm', 'Total mass: 4050 g/m²', 'Total pile mass: 580 g/m²', 'Use classification: Class 33 – Heavy Commercial Use', 'Luxury rating: LC 1', 'Dimensional stability: ≤ 0.2%', 'Impact sound reduction: 25 dB', 'Noise reduction: αw 0.20', 'Thermal resistance: 0.078 m²·K/W', 'Flammability: Bfl-s1', 'Manufacturer: Tarkett BV']
  },
  'Essence Traces': {
    overview: ['Collection: Essence Elements Traces', 'Product type: Carpet Tiles', 'Construction: Tufted 1/10"', 'Surface: Structured loop pile', 'Dye method: Solution dyed', 'Tile size: 50 × 50 cm', 'Tiles per box: 20', 'Primary backing: Polyester fleece', 'Secondary backing: ProBase – modified bitumen', 'Pile fibre: BCF Polyamide 6'],
    tech: ['Total thickness: 6.0 mm', 'Effective pile thickness: 2.6 mm', 'Total mass: 4050 g/m²', 'Total pile mass: 580 g/m²', 'Effective pile mass: 315 g/m²', 'Pile density: 0.121 g/cm³', 'Number of tufts: 1580 /dm²', 'Use classification: Class 33 – Heavy Commercial Use', 'Luxury rating: LC 1', 'Dimensional stability: ≤ 0.2%', 'Impact sound reduction: 26 dB', 'Noise reduction: αw 0.20', 'Thermal resistance: 0.062 m²·K/W', 'Flammability: Bfl-s1', 'Manufacturer: Tarkett BV']
  }
};

// Images come from images.ts (embedded). Paths not found there load from /public.
const img = (path: string): string => EMBEDDED_IMAGES[path] ?? path;

type Product = (typeof laminateCollections)[number] | (typeof carpetCollections)[number] | (typeof tileCollections)[number] | (typeof stairCollections)[number] | (typeof panelCollections)[number] | (typeof lvtCollections)[number];
type Kind = 'laminate' | 'carpet' | 'tile' | 'stair' | 'panel' | 'lvt';

const CONFIG = {
  laminate: {
    items: laminateCollections as Product[],
    search: 'Search a range or colour - try "Oak", "Grey", "Wide Plank", "14mm"...',
    filters: [
      { key: 'category', label: 'COLLECTION', options: ['White / Grey', 'Browns', 'Herringbone', '12mm Story', 'Wide Plank 14mm', 'Premium 14mm', 'Long Plank 12mm', 'Classic 8mm'] },
      { key: 'colour', label: 'COLOUR', options: LAMINATE_COLOURS, dots: true },
      { key: 'thickness', label: 'THICKNESS', options: ['8mm', '10mm', '12mm', '14mm'] },
    ],
  },
  carpet: {
    items: carpetCollections as Product[],
    search: 'Search a range or product - try "Essence", "Elite", "Loop"...',
    filters: [
      { key: 'category', label: 'COLLECTION', options: ['Luxury Carpets', 'Essence Pure', 'Essence Roots', 'Essence Traces'] },
      { key: 'colour', label: 'COLOUR', options: CARPET_COLOURS, dots: true },
      { key: 'pile', label: 'PILE STRUCTURE', options: ['Deep Pile', 'Loop Pile', 'Structured Loop'] },
    ],
  },
  tile: {
    items: tileCollections as Product[],
    search: 'Search a tile or colour - try "Marble", "Grey", "Metro", "120 x 60"...',
    filters: [
      { key: 'category', label: 'STYLE', options: ['Marble-Effect', 'Concrete-Effect', 'Wood-Effect', 'Wall & Metro', 'Outdoor'] },
      { key: 'colour', label: 'COLOUR', options: TILE_COLOURS, dots: true },
      { key: 'finish', label: 'FINISH', options: ['Matt', 'Satin Matt', 'Gloss', 'Textured Gloss'] },
      { key: 'use', label: 'SUITABLE FOR', options: ['Floor & Wall', 'Wall', 'Outdoor'] },
    ],
  },
  stair: {
    items: stairCollections as Product[],
    search: 'Search a colour or piece - try "Oak", "Bullnose", "Grey", "Winder"...',
    filters: [
      { key: 'category', label: 'RANGE', options: ['Laminate 8mm', 'Engineered Oak 14mm'] },
      { key: 'colour', label: 'COLOUR', options: LAMINATE_COLOURS, dots: true },
      { key: 'piece', label: 'TYPE', options: ['Single Tread & Riser', 'Bullnose Tread & Riser', 'Multi-Pack (4 Steps)', 'Winder Tread & Riser', 'Bullnose Tread', 'Stair Tread'] },
    ],
  },
  panel: {
    items: panelCollections as Product[],
    search: 'Search a colour or style - try "Oak", "Acoustic", "Grey", "Walnut"...',
    filters: [
      { key: 'category', label: 'STYLE', options: ['Slat Panels', 'Acoustic Panels'] },
      { key: 'colour', label: 'COLOUR', options: PANEL_COLOURS, dots: true },
    ],
  },
  lvt: {
    items: lvtCollections as Product[],
    search: 'Search a colour or style - try "Oak", "Herringbone", "Grey", "Wide"...',
    filters: [
      { key: 'category', label: 'RANGE', options: ['Wide Plank 6mm', 'Herringbone 6mm', 'Classic Plank 6mm', 'Essential 5mm'] },
      { key: 'colour', label: 'COLOUR', options: LAMINATE_COLOURS, dots: true },
      { key: 'format', label: 'FORMAT', options: ['Plank', 'Herringbone'] },
    ],
  },
} as const;

const field = (item: Product, key: string) => String((item as Record<string, unknown>)[key] ?? '');

// ---------------- UI COMPONENTS ---------------- //

// Product photo with a styled fallback tile if the image file is missing
function ProductImage({ src, alt, sizes, className, priority = false }: { src: string, alt: string, sizes: string, className: string, priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#d9c3a0] via-[#b7935b] to-[#6b4a2e] flex items-center justify-center">
        <span className="text-white/80 text-[11px] uppercase tracking-widest font-bold">Image coming soon</span>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} onError={() => setFailed(true)} />;
}

function FilterPill({ label, count, isActive, onClick, dot }: { label: string, count?: number, isActive: boolean, onClick: () => void, dot?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
        isActive
          ? 'bg-[#1a1814] text-white border-[#1a1814]'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
      }`}
    >
      {dot && <span className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0" style={{ background: dot }} />}
      {label}
      {count !== undefined && (
        <span className={`${isActive ? 'text-gray-300' : 'text-gray-400'} text-[11px]`}>{count}</span>
      )}
    </button>
  );
}

function SpecList({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="mb-6">
      <h4 className="text-[#b7935b] font-bold uppercase tracking-widest text-[11px] mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item, i) => (
          <li key={i} className="flex items-start"><span className="mr-2 text-[#b7935b]">•</span><span>{item}</span></li>
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ item, onClick, priority = false }: { item: Product, onClick: () => void, priority?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      className="relative h-[420px] w-full rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gray-100"
    >
      <ProductImage
        key={item.image}
        src={img(item.image)}
        alt={item.name}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
        <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-1">{item.category}</span>
        <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md leading-tight">{item.name}</h3>
        <span className="text-[#b7935b] text-sm font-bold mt-2 flex items-center gap-2 drop-shadow-sm group-hover:text-white transition-colors">
          View details
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string, value: string }) {
  return <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</span><span className="text-gray-900 font-semibold">{value}</span></div>;
}

// ---------------- CATALOGUE (search + filters + grid + info pop-up) ---------------- //

export default function Catalogue({ type }: { type: Kind }) {
  const { items, search: placeholder, filters } = CONFIG[type];
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Product | null>(null);

  // Lock background scroll while the pop-up is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(item =>
      `${item.name} ${item.category} ${item.colour} ${field(item, 'pile')} ${field(item, 'size')} ${item.desc}`.toLowerCase().includes(term) &&
      filters.every(f => !active[f.key] || active[f.key] === 'All' || field(item, f.key) === active[f.key])
    );
  }, [items, filters, search, active]);

  const count = (key: string, value: string) => items.filter(i => field(i, key) === value).length;
  const isFiltered = search || Object.values(active).some(v => v && v !== 'All');
  const specs = type === 'carpet' && selected ? tarkettSpecs[selected.category] : undefined;

  return (
    <>
      {/* -------------------- INFO POP-UP -------------------- */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }} className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]">

              {/* Close button (outside the scroll area so it stays visible) */}
              <button onClick={() => setSelected(null)} aria-label="Close" className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-100 bg-white/70 backdrop-blur-md rounded-full p-2 transition-colors z-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="w-full md:w-1/2 relative h-[250px] md:h-auto bg-gray-100 flex-shrink-0">
                <ProductImage key={selected.image} src={img(selected.image)} alt={selected.name} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>

              <div className="w-full md:w-1/2 min-h-0 p-6 md:px-12 md:pt-8 md:pb-10 flex flex-col overflow-y-auto">
                <span className="text-[#b7935b] font-bold tracking-widest uppercase text-[11px] mb-2 block">{selected.category}</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight pr-8">{selected.name}</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-8">{selected.desc}</p>

                <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  {type === 'laminate' ? (
                    <>
                      <Spec label="Thickness" value={field(selected, 'thickness')} />
                      <Spec label="Rating" value={field(selected, 'rating')} />
                      <Spec label="Colour" value={selected.colour} />
                      <Spec label="Dimensions" value={field(selected, 'dimensions')} />
                    </>
                  ) : type === 'lvt' ? (
                    <>
                      <Spec label="Format" value={field(selected, 'format')} />
                      <Spec label="Colour" value={selected.colour} />
                      <Spec label="Size (T x W x L)" value={field(selected, 'size')} />
                      <Spec label="Usage Class" value={field(selected, 'usage')} />
                    </>
                  ) : type === 'panel' ? (
                    <>
                      <Spec label="Type" value={field(selected, 'panel')} />
                      <Spec label="Colour" value={selected.colour} />
                      <Spec label="Size (T x W x H)" value={field(selected, 'size')} />
                      <Spec label="Finish" value={field(selected, 'finish')} />
                    </>
                  ) : type === 'stair' ? (
                    <>
                      <Spec label="Range" value={field(selected, 'range')} />
                      <Spec label="Type" value={field(selected, 'piece')} />
                      <Spec label="Colour" value={selected.colour} />
                      <Spec label="Size (T x W x L)" value={field(selected, 'size')} />
                    </>
                  ) : type === 'tile' ? (
                    <>
                      <Spec label="Size" value={field(selected, 'size')} />
                      <Spec label="Finish" value={field(selected, 'finish')} />
                      <Spec label="Material" value={field(selected, 'material')} />
                      <Spec label="Suitable For" value={field(selected, 'use')} />
                    </>
                  ) : (
                    <>
                      <Spec label="Pile Type" value={field(selected, 'pile')} />
                      <Spec label="Colour" value={selected.colour} />
                      <Spec label="Thickness/Width" value={field(selected, 'thickness')} />
                      <Spec label="Weight" value={field(selected, 'weight')} />
                    </>
                  )}
                </div>

                {specs && (
                  <>
                    <SpecList title="Product Overview" items={specs.overview} />
                    <SpecList title="Technical Specs" items={specs.tech} />
                  </>
                )}

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href="/service/contact" className="flex justify-center items-center w-full bg-[#1a1814] text-white px-6 py-4 font-bold tracking-widest uppercase text-[12px] hover:bg-[#b7935b] transition-colors duration-300 rounded-md shadow-lg">Inquire Price &rarr;</Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADVANCED FILTER PANEL */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-10 max-w-5xl mx-auto">
        <div className="relative mb-8">
          <svg className="absolute left-4 top-3.5 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} aria-label="Search products" className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-[#faf9f8] focus:bg-white focus:ring-2 focus:ring-[#b7935b] outline-none text-gray-700 transition-all placeholder:text-gray-400" />
        </div>

        <div className="space-y-6">
          {filters.map(f => (
            <div key={f.key}>
              <h4 className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 ml-1">{f.label}</h4>
              <div className="flex flex-wrap gap-2">
                <FilterPill label="All" isActive={!active[f.key] || active[f.key] === 'All'} onClick={() => setActive(a => ({ ...a, [f.key]: 'All' }))} />
                {f.options.filter(o => count(f.key, o) > 0).map(o => (
                  <FilterPill key={o} label={o} dot={'dots' in f && f.dots ? COLOUR_DOT[o] : undefined} count={count(f.key, o)} isActive={active[f.key] === o} onClick={() => setActive(a => ({ ...a, [f.key]: o }))} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing <strong className="text-gray-900">{filtered.length}</strong> of {items.length} products</span>
          {isFiltered && (
            <button onClick={() => { setSearch(''); setActive({}); }} className="text-sm font-bold text-[#b7935b] hover:text-gray-900 transition-colors underline underline-offset-4">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((item, index) => (
            <ProductCard key={item.id} item={item} priority={index < 2} onClick={() => setSelected(item)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">No products match those filters. <button onClick={() => { setSearch(''); setActive({}); }} className="text-[#b7935b] font-bold underline underline-offset-4">Clear filters</button></p>
      )}
    </>
  );
}