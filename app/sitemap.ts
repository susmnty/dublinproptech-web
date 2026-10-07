import { MetadataRoute } from "next";
import { getAllBlogs } from "./lib/blogs";

export const dynamic = "force-static";

const baseUrl = "https://dublinproptech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs();

  // FIX: was /blog/ — the route is /blogs/, so every blog URL was a 404
  const blogUrls: MetadataRoute.Sitemap = blogs
    .filter((blog: any) => blog.slug && blog.slug !== blog.id)
    .map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}/`,
      lastModified: blog.date ? new Date(blog.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/service/snaglist", priority: 0.9, freq: "monthly" },
    { path: "/service/flooring", priority: 0.9, freq: "monthly" },
    { path: "/service/flooring/laminate", priority: 0.8, freq: "monthly" },
    { path: "/service/flooring/carpets", priority: 0.8, freq: "monthly" },
    { path: "/service/flooring/tiles", priority: 0.7, freq: "monthly" },
    { path: "/service/lvt", priority: 0.8, freq: "monthly" },
    { path: "/service/stairs", priority: 0.8, freq: "monthly" },
    { path: "/service/wall-panels", priority: 0.8, freq: "monthly" },
    { path: "/service/flooring/engineered-wood", priority: 0.8, freq: "monthly" },
    { path: "/service/flooring/herringbone", priority: 0.8, freq: "monthly" },
    { path: "/service/blinds", priority: 0.7, freq: "monthly" },
    { path: "/service/contact", priority: 0.7, freq: "yearly" },
    { path: "/reviews", priority: 0.7, freq: "monthly" },
    { path: "/blogs", priority: 0.7, freq: "weekly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/cookie-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms-conditions", priority: 0.2, freq: "yearly" },
  ];

  const staticUrls: MetadataRoute.Sitemap = routes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}/`,
    changeFrequency: freq,
    priority,
  }));

  return [...staticUrls, ...blogUrls];
}