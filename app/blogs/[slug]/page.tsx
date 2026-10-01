import { getBlogPost, getAllBlogs } from "@/app/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta, JsonLd, SITE_URL, BUSINESS_ID } from "@/app/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const meta = pageMeta({
    title: post.title,
    description: post.description || `${post.title} – guide from Dublin PropTech.`,
    path: `/blogs/${slug}`,
    image: post.coverImage,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date || undefined } };
}

// Keeps links/bold/italic from Notion (previously stripped to plain text)
function RichText({ items }: { items: any[] }) {
  return (
    <>
      {items.map((t: any, i: number) => {
        const text = t.plain_text;
        const href = t.href as string | null;
        const node = t.annotations?.bold ? <strong>{text}</strong> : t.annotations?.italic ? <em>{text}</em> : text;
        if (!href) return <span key={i}>{node}</span>;
        const internal = href.startsWith("/") || href.startsWith(SITE_URL);
        return internal ? (
          <Link key={i} href={href.replace(SITE_URL, "") || "/"} className="text-[#b7935b] underline underline-offset-2">{node}</Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#b7935b] underline underline-offset-2">{node}</a>
        );
      })}
    </>
  );
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog: any) => ({ slug: blog.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`,
    datePublished: post.date || undefined,
    mainEntityOfPage: `${SITE_URL}/blogs/${resolvedParams.slug}`,
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IE",
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-24 font-sans">
      <JsonLd data={articleLd} />
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/blogs" className="text-sm font-semibold text-[#b7935b] hover:underline flex items-center gap-2">
          &larr; Back to all articles
        </Link>
      </div>

      <header className="max-w-4xl mx-auto px-6 pt-8 pb-12 border-b border-gray-100 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          {post.date ? new Date(post.date).toLocaleDateString("en-IE", { month: "long", day: "numeric", year: "numeric" }) : ""}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">{post.description}</p>
      </header>

      <article className="max-w-3xl mx-auto px-6 prose prose-lg prose-stone text-gray-700 leading-relaxed space-y-6">
        {post.contentBlocks.map((block: any) => {
          const { type, id } = block;

          if (type === "paragraph") {
            const rich = block.paragraph.rich_text;
            const text = rich.map((t: any) => t.plain_text).join("");
            if (!text) return <br key={id} />;
            return <p key={id} className="text-lg text-gray-700 leading-relaxed"><RichText items={rich} /></p>;
          }

          // Notion headings shift down one level: the post title is the only H1
          if (type === "heading_1") {
            const text = block.heading_1.rich_text.map((t: any) => t.plain_text).join("");
            return <h2 key={id} className="text-3xl font-serif font-bold text-gray-900 mt-10 mb-4">{text}</h2>;
          }
          if (type === "heading_2") {
            const text = block.heading_2.rich_text.map((t: any) => t.plain_text).join("");
            return <h3 key={id} className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{text}</h3>;
          }
          if (type === "heading_3") {
            const text = block.heading_3.rich_text.map((t: any) => t.plain_text).join("");
            return <h4 key={id} className="text-xl font-serif font-bold text-gray-900 mt-6 mb-3">{text}</h4>;
          }

          if (type === "bulleted_list_item") {
            return <li key={id} className="list-disc ml-6 text-gray-700"><RichText items={block.bulleted_list_item.rich_text} /></li>;
          }
          if (type === "numbered_list_item") {
            return <li key={id} className="list-decimal ml-6 text-gray-700"><RichText items={block.numbered_list_item.rich_text} /></li>;
          }

          return null;
        })}
      </article>
    </main>
  );
}