import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;   // ← Important: params is now a Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;   // ← Must await params

  const res = await fetch(`http://localhost:8000/api/blog/${slug}/`, {
    next: { revalidate: 3600 },   // ISR - revalidate every hour
  });

  if (!res.ok) {
    return {
      title: "Blog Post Not Found | Canadex",
      description: "The requested blog post could not be found.",
    };
  }

  const post = await res.json();

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.short_description,
    keywords: post.keywords ? post.keywords.split(",").map((k: string) => k.trim()) : [],
    
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description,
      images: post.og_image ? [{ url: post.og_image }] : 
              post.featured_image ? [{ url: post.featured_image }] : [],
      type: "article",
      publishedTime: post.published_at,
      authors: ["Canadex"],
    },

    twitter: {
      card: "summary_large_image",
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description,
      images: post.og_image ? [post.og_image] : 
              post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;   // ← Must await here too

  const res = await fetch(`http://localhost:8000/api/blog/${slug}/`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) notFound();

  const post = await res.json();

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[650px] overflow-hidden">
        <img
          src={post.featured_image || "https://picsum.photos/1200/650?random=20"}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-10 text-white max-w-5xl mx-auto">
          <div className="uppercase tracking-widest text-red-400 text-sm font-semibold mb-3">
            {post.category}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">{post.title}</h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm opacity-90">
            <span>{new Date(post.published_at).toLocaleDateString("en-CA")}</span>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div
          className="prose dark:prose-invert prose-lg max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Structured Data (JSON-LD) for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.meta_description,
            image: post.og_image || post.featured_image,
            datePublished: post.published_at,
            author: {
              "@type": "Organization",
              name: "Canadex",
            },
            publisher: {
              "@type": "Organization",
              name: "Canadex",
              logo: {
                "@type": "ImageObject",
                url: "https://canadex.com/logo.png", // change to your real logo later
              },
            },
          }),
        }}
      />
    </article>
  );
}