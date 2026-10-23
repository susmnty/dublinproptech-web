// Lists every photo in public/instagram/ so the homepage "Discover" carousel shows them automatically.
// Runs before "npm run dev" and "npm run build". Photos show in name order — name them 01-, 02-, 03-... (01 = first).
// Optional: put the Instagram post code at the end of the file name to link the photo to that post,
//   e.g. "01-oak-herringbone__DAbC123xYz.webp" -> links to https://www.instagram.com/p/DAbC123xYz/
// Without a code, the photo links to the Instagram profile.
import fs from "node:fs";
import path from "node:path";

const PROFILE = "https://www.instagram.com/dublinproptech/";
const dir = path.join(process.cwd(), "public", "instagram");
const out = path.join(process.cwd(), "app", "components", "instagram.json");

const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort()
  : [];

const photos = files.map((f) => {
  const base = f.replace(/\.[^.]+$/, "");
  const [name, postCode] = base.split("__");
  return {
    src: `/instagram/${f}`,
    href: postCode ? `https://www.instagram.com/p/${postCode}/` : PROFILE,
    // "01-oak-herringbone" -> "Oak herringbone"
    alt:
      name
        .replace(/^\d+[-_ ]*/, "")
        .replace(/[-_]+/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase()) || "Dublin PropTech project",
  };
});

fs.writeFileSync(out, JSON.stringify(photos, null, 2) + "\n");
console.log(`Instagram: ${photos.length} photo(s) found`);