// Lists every photo in public/showroom/ so the flooring page carousel shows them automatically.
// Runs before "npm run dev" and "npm run build". Photos show in name order (01-, 02-... to control it).
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "showroom");
const out = path.join(process.cwd(), "app", "service", "flooring", "showroom.json");

const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort()
  : [];

const photos = files.map((f) => ({
  src: `/showroom/${f}`,
  // "02-herringbone-wall.webp" -> "Herringbone Wall"
  title: f
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
}));

fs.writeFileSync(out, JSON.stringify(photos, null, 2) + "\n");
console.log(`Showroom: ${photos.length} photo(s) found`);