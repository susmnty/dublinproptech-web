import { getBlogPost, getAllBlogs } from "@/app/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";

// Required for static export to generate pages for each Notion blog slug
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object in Next.js 15+
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
      {/* Back to Blog Button */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/blog" className="text-sm font-semibold text-[#b7935b] hover:underline flex items-center gap-2">
          &larr; Back to all articles
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-12 border-b border-gray-100 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          {post.date ? new Date(post.date).toLocaleDateString("en-IE", { month: "long", day: "numeric", year: "numeric" }) : ""}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          {post.description}
        </p>
      </header>

      {/* Notion Content Renderer */}
      <article className="max-w-3xl mx-auto px-6 prose prose-lg prose-stone text-gray-700 leading-relaxed space-y-6">
        {post.contentBlocks.map((block: any) => {
          const { type, id } = block;
          
          if (type === "paragraph") {
            const text = block.paragraph.rich_text.map((t: any) => t.plain_text).join("");
            if (!text) return <br key={id} />;
            return <p key={id} className="text-lg text-gray-700 leading-relaxed">{text}</p>;
          }
          
          if (type === "heading_1") {
            const text = block.heading_1.rich_text.map((t: any) => t.plain_text).join("");
            return <h1 key={id} className="text-3xl font-serif font-bold text-gray-900 mt-10 mb-4">{text}</h1>;
          }

          if (type === "heading_2") {
            const text = block.heading_2.rich_text.map((t: any) => t.plain_text).join("");
            return <h2 key={id} className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{text}</h2>;
          }

          if (type === "heading_3") {
            const text = block.heading_3.rich_text.map((t: any) => t.plain_text).join("");
            return <h3 key={id} className="text-xl font-serif font-bold text-gray-900 mt-6 mb-3">{text}</h3>;
          }

          if (type === "bulleted_list_item") {
            const text = block.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("");
            return <li key={id} className="list-disc ml-6 text-gray-700">{text}</li>;
          }

          if (type === "numbered_list_item") {
            const text = block.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("");
            return <li key={id} className="list-decimal ml-6 text-gray-700">{text}</li>;
          }

          return null;
        })}
      </article>
    </main>
  );
}