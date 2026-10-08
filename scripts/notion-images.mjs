// Runs automatically before every build ("prebuild" in package.json).
// Notion's uploaded-image links expire after ~1 hour, so this script downloads every
// uploaded cover and in-post image of your PUBLISHED blog posts into public/blog-images/.
// The website then shows those saved copies, which never expire.
// If the Notion keys are missing (e.g. on your computer), it simply skips.

import fs from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;
const OUT_DIR = path.join(process.cwd(), "public", "blog-images");

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

// Same rule the website uses: keep the file extension from the Notion link
export function extFromUrl(url) {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    return /^\.(jpe?g|png|webp|gif|avif|svg)$/.test(ext) ? ext : ".jpg";
  } catch {
    return ".jpg";
  }
}

async function download(url, fileName) {
  const target = path.join(OUT_DIR, fileName);
  try {
    await fs.access(target);
    return; // already saved
  } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await fs.writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`  saved ${fileName}`);
}

async function main() {
  if (!apiKey || !databaseId) {
    console.log("[blog-images] Notion keys not set, skipping image download.");
    return;
  }
  await fs.mkdir(OUT_DIR, { recursive: true });

  const q = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers,
    body: JSON.stringify({ filter: { property: "Published", checkbox: { equals: true } } }),
  });
  if (!q.ok) {
    console.log(`[blog-images] Could not read Notion (HTTP ${q.status}), skipping.`);
    return;
  }
  const { results = [] } = await q.json();
  console.log(`[blog-images] ${results.length} published post(s)`);

  for (const page of results) {
    try {
      // Uploaded cover
      if (page.cover?.type === "file") {
        await download(page.cover.file.url, `${page.id}-cover${extFromUrl(page.cover.file.url)}`);
      }
      // Uploaded images inside the post
      const b = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`, { headers });
      if (!b.ok) continue;
      const { results: blocks = [] } = await b.json();
      for (const block of blocks) {
        if (block.type === "image" && block.image?.type === "file") {
          await download(block.image.file.url, `${block.id}${extFromUrl(block.image.file.url)}`);
        }
      }
    } catch (e) {
      console.log(`[blog-images] skipped one image: ${e.message}`);
    }
  }
}

main().catch((e) => {
  // Never fail the whole build because of an image
  console.log(`[blog-images] ${e.message}`);
});
