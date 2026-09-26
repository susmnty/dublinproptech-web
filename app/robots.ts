import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add any folders here that you DO NOT want Google to show in search results
      disallow: ['/private/', '/api/'], 
    },
    // Update this with your actual live domain once you deploy
    sitemap: 'https://dublinproptech.com/sitemap.xml', 
  }
}