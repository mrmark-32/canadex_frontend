"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type PortfolioItem = {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string;
  image: string | null;
  short_description: string;
};

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/portfolio/")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.category === filter);

  const categories = ["all", "web", "consulting", "marketing", "design", "immigration"];

  if (loading) return <div className="py-32 text-center text-2xl">Loading Portfolio...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-xl text-gray-600">Real projects. Real results. Canadian excellence.</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === cat 
                ? "bg-red-600 text-white" 
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat === "all" ? "All Projects" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <Link key={item.id} href={`/portfolio/${item.slug}`}>
            <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow hover:shadow-2xl transition">
              <div className="relative h-64">
                <img 
                  src={item.image || "https://picsum.photos/600/400?random=5"} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-8">
                <span className="text-red-600 text-sm font-semibold uppercase tracking-widest">
                  {item.category}
                </span>
                <h3 className="text-2xl font-semibold mt-3 mb-2 group-hover:text-red-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{item.short_description}</p>
                {item.client && (
                  <p className="text-sm text-gray-500 mt-4">Client: {item.client}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}