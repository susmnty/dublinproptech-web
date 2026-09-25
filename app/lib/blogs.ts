export async function getRecentBlogs() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) return [];

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 3,
      }),
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];
    const data = await response.json();

    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Name?.title[0]?.plain_text || "Untitled",
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      date: page.properties.Date?.date?.start || "",
      coverImage: page.cover?.external?.url || page.cover?.file?.url || "/flooring.jpeg", 
      description: page.properties.Description?.rich_text[0]?.plain_text || "",
    }));
  } catch (error) {
    return [];
  }
}

// Fetch ALL published blogs for the /blog page
export async function getAllBlogs() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) return [];

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];
    const data = await response.json();

    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Name?.title[0]?.plain_text || "Untitled",
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      date: page.properties.Date?.date?.start || "",
      coverImage: page.cover?.external?.url || page.cover?.file?.url || "/flooring.jpeg", 
      description: page.properties.Description?.rich_text[0]?.plain_text || "",
    }));
  } catch (error) {
    return [];
  }
}

// Fetch a single blog post and its Notion body blocks by slug
export async function getBlogPost(slug: string) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) return null;

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Published", checkbox: { equals: true } },
            { property: "Slug", rich_text: { equals: slug } }
          ]
        }
      }),
      next: { revalidate: 60 }
    });

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    const page = data.results[0];
    
    // Fetch block contents inside the Notion page
    const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
      },
      next: { revalidate: 60 }
    });
    const blocksData = await blocksRes.json();

    return {
      title: page.properties.Name?.title[0]?.plain_text || "Untitled",
      date: page.properties.Date?.date?.start || "",
      coverImage: page.cover?.external?.url || page.cover?.file?.url || "/flooring.jpeg",
      description: page.properties.Description?.rich_text[0]?.plain_text || "",
      contentBlocks: blocksData.results || [],
    };
  } catch (error) {
    return null;
  }
}