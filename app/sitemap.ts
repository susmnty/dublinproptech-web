import { MetadataRoute } from 'next';
import { getAllBlogs } from './lib/blogs';

// Forces Next.js to build this file at build-time for static exports
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dublinproptech.com';

  // 1. Fetch all your dynamic Notion blog posts
  const blogs = await getAllBlogs();
  
  const blogUrls = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 2. Define your core static routes
  const staticRoutes = [
    '',
    '/service/flooring',
    '/service/snaglist',
    '/service/contact',
    '/blogs',
    '/reviews',
    '/cookie-policy',
    '/privacy-policy',
    '/terms-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 3. Combine both lists and return them for Googlebot
  return [...staticRoutes, ...blogUrls];
}