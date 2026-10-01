"use client";

// Shared product catalogue for the Laminate and Carpets pages:
// product data, search + filters, product cards and the info pop-up.

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { EMBEDDED_IMAGES } from "./images";

// ===== PASTE YOUR PRODUCT DATA HERE =====
// (from "// ---------------- PRODUCT DATA & SPECS" down to the end of tarkettSpecs "};")

// Colour swatch dots used in the COLOUR filter rows
const COLOUR_DOT: Record<string, string> = {
  White: '#ece9e2', Grey: '#9a9a98', Natural: '#d9c3a0', Honey: '#c48f4e', Brown: '#8a5f3c', Dark: '#34302c',
  Beige: '#c9b596', Green: '#5f8a63', Charcoal: '#2f2c2b', Blue: '#3a566b', Yellow: '#b39640', Orange: '#b9713f', Red: '#8f3f33', Pink: '#d29d83',
  Assorted: 'linear-gradient(135deg,#c9b596,#5f8a63,#2f5876)'
};
const LAMINATE_COLOURS = ['White', 'Grey', 'Natural', 'Honey', 'Brown', 'Dark'];
const CARPET_COLOURS = ['Beige', 'Brown', 'Grey', 'Charcoal', 'Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Assorted'];

// Colour is derived from the product name (edit any product's colour here if a shade is wrong)
const getLaminateColour = (name: string) => {
  const n = name.toLowerCase();
  if (/smoked|tobacco|walnut|dark|black/.test(n)) return 'Dark';
  if (/white|marble/.test(n)) return 'White';
  if (/grey|taupe|platinum|palladium/.test(n)) return 'Grey';
  if (/honey/.test(n)) return 'Honey';
  if (/beige|light|natural/.test(n)) return 'Natural';
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
  { id: 'l_h_4', category: 'Herringbone', name: 'Smoked Cathedral Herringbone', thickness: '12mm', rating: 'AC5', dimensions: '90 x 450mm', image: '/flooring/herringbone/smoked-cathedral.webp', desc: 'Combines the appearance of traditional herringbone parquet with the practicality of laminate.' }
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

type Product = (typeof laminateCollections)[number] | (typeof carpetCollections)[number];
type Kind = 'laminate' | 'carpet';

const CONFIG = {
  laminate: {
    items: laminateCollections as Product[],
    search: 'Search a range or colour - try "Oak", "Grey", "Herringbone"...',
    filters: [
      { key: 'category', label: 'COLLECTION', options: ['White / Grey', 'Browns', 'Herringbone', '12mm Story'] },
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
} as const;

const field = (item: Product, key: string) => String((item as Record<string, unknown>)[key] ?? '');

// ---------------- UI COMPONENTS ---------------- //

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
      <Image
        src={img(item.image)}
        alt={item.name}
        fill
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
      `${item.name} ${item.category} ${item.colour} ${field(item, 'pile')}`.toLowerCase().includes(term) &&
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
                <Image src={img(selected.image)} alt={selected.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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