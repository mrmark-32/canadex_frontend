"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Service = {
  id: number;
  slug: string;
  title: string;
  short_para: string;
  features: string[];
  image: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/services/")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center">Loading Canadian services...</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className=" mb-12">
      
        <h1 className=" font-bold mt-4">Our Services</h1>
        <p className="text-xl text-gray-600 mt-3">
          Premium services delivered with Canadian pride
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow hover:shadow-2xl transition group"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-8">
              <h4 className="font-semibold mb-4 group-hover:text-red-600 transition">
                {service.title}
              </h4>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.short_para}
              </p>

              <div className="grid md:grid-cols-1 gap-6 mb-16">
                {service.features.map(
                  (feat, i) =>
                    feat && (
                      <div
                        key={i}
                        className="bg-white     flex items-center gap-4"
                      >
                        <span className="text-3xl mt-1">✔</span>
                        <p className="font-medium">{feat}</p>
                      </div>
                    )
                )}
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="block text-center bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
