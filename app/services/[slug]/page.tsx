"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  slug: string;
  short_para: string;
  image: string | null;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  features: string[];
  detail_content: string;     // ← This is the rich text
  created_at: string;
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/services/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Service not found");
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading service details... 🍁</p>
      </div>
    );
  }

  if (error || !service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-900 border-b py-4">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>›</span>
          <Link href="/services" className="hover:text-red-600">Services</Link>
          <span>›</span>
          <span className="text-red-600 font-medium">{service.title}</span>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={service.image || "https://picsum.photos/id/1015/1200/600"}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {service.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Short Description */}
        <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
          {service.short_para}
        </p>

        {/* Features */}
        {service.features.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-red-600">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border-l-4 border-red-600 shadow-sm"
                >
                  <span className="text-4xl text-green-500 mt-1">✔</span>
                  <p className="text-lg font-medium">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich Text Content from CKEditor */}
        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
          <div
            dangerouslySetInnerHTML={{ __html: service.detail_content || "" }}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <a
            href="#contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl text-xl font-semibold transition-all"
          >
            Get a Free Quote for this Service
          </a>
        </div>
      </div>
    </div>
  );
}