import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "../lib/blogs";

export const metadata = {
  title: "Expert Insights & Articles | Dublin PropTech",
  description: "Read our latest expert guides on property snagging, premium flooring, and new build tips in Dublin.",
};

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen bg-[#faf9f5] text-gray-900 pb-24 font-sans">
      
      {/* Top Header Section - Cleaned up and brightened text */}
      <section className="bg-[#1a1814] text-white py-24 px-6 text-center border-b border-[#2a261f]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#b7935b] font-bold tracking-widest uppercase text-xs mb-4 block">Dublin PropTech Journal</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">Expert Insights & Articles</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Guides, tips, and industry standards for new build homeowners in Ireland.
          </p>
        </div>
      </section>

      {/* Main Content Full-Width Layout */}
      <section className="max-w-4xl mx-auto px-6 w-full pt-16">
        
        {/* Section Sub-header */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#b7935b]" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Latest Publications</h2>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
          </span>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-xl mx-auto">
            <p className="text-gray-500 text-lg font-medium">No articles published yet.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for our latest expert guides!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog: any, index: number) => (
              <Link 
                href={`/blog/${blog.slug}`} 
                key={blog.id || index} 
                className="group flex flex-col sm:flex-row items-stretch bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
              >
                
                {/* Left Side: Small Image Thumbnail */}
                <div className="relative w-full sm:w-[260px] md:w-[280px] h-[200px] sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
                  {blog.coverImage ? (
                    <Image 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 text-xs font-medium">
                      Dublin PropTech
                    </div>
                  )}
                </div>

                {/* Right Side: Title, Date, Description & Read Link */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Date */}
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                      {blog.date ? new Date(blog.date).toLocaleDateString("en-IE", { month: "long", day: "numeric", year: "numeric" }) : ""}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#b7935b] transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 font-normal mb-6">
                      {blog.description}
                    </p>
                  </div>

                  {/* Read Action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#b7935b] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Read Article <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>

                </div>

              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}