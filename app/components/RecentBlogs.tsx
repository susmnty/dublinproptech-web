import { getAllBlogs } from "@/app/lib/blogs";
import Link from "next/link";
import Image from "next/image";

export default async function RecentBlogs() {
  const blogs = await getAllBlogs();

  if (!blogs || blogs.length === 0) {
    return null; 
  }

  return (
    <section className="px-6 max-w-7xl mx-auto w-full pt-12 pb-10 border-t border-gray-100 mt-0 bg-white">
      
      {/* Section Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#b7935b] mb-1 block">Expert Advice</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">Latest Insights.</h2>
        </div>
        <Link href="/blogs" className="text-sm font-semibold text-gray-900 hover:text-[#b7935b] transition-colors flex items-center gap-1">
          View all articles &rarr;
        </Link>
      </div>

      {/* Horizontal Scroll Container with fixed height so it doesn't stretch */}
      <div className="w-full overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory">
        {blogs.map((blog: any) => (
          <Link 
            key={blog.slug} 
            href={`/blogs/${blog.slug}`}
            className="group w-[320px] md:w-[360px] flex-shrink-0 snap-start bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            {/* Blog Cover Image */}
            {blog.coverImage ? (
              <div className="relative w-full h-[200px] bg-gray-100 overflow-hidden">
                <Image 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
            ) : (
              <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Blog Details */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs text-gray-400 mb-2 block font-medium">
                {blog.date ? new Date(blog.date).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" }) : ""}
              </span>
              <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#b7935b] transition-colors mb-2 line-clamp-1">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {blog.description}
              </p>
              <div className="mt-auto text-xs font-bold uppercase tracking-widest text-[#b7935b] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}