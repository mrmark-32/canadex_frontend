"use client";
import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: string | null;
  category: string;
  location: string;
  image: string;
};

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/listings/")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading maple goodness...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8 flex items-center gap-3">
        <span>🍁</span> All Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold">{listing.title}</h3>
                {listing.price && <span className="text-green-600 font-bold">${listing.price}</span>}
              </div>
              <p className="text-sm text-gray-500 mt-1">{listing.location} • {listing.category}</p>
              <p className="mt-4 line-clamp-3 text-gray-600">{listing.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}