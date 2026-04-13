"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  featured_image: string | null;
  reading_time: number;
  published_at: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/blog/")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-32 text-center text-2xl">Loading latest insights...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Canadex Blog</h1>
        <p className="text-xl text-gray-600">Insights, tips, and stories from the Canadian marketplace</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow hover:shadow-2xl transition">
              <div className="relative h-64">
                <img 
                  src={post.featured_image || "https://picsum.photos/600/400?random=10"} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-8">
                <span className="uppercase text-red-600 text-xs font-semibold tracking-widest">{post.category}</span>
                <h3 className="text-2xl font-semibold mt-3 mb-3 line-clamp-2 group-hover:text-red-600">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{post.short_description}</p>
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <span>{new Date(post.published_at).toLocaleDateString('en-CA')}</span>
                  <span className="mx-3">•</span>
                  <span>{post.reading_time} min read</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}