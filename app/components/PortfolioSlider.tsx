"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type PortfolioItem = {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string;
  image: string | null;
  short_description: string;
};

export default function PortfolioSlider() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/portfolio/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading portfolio projects...
      </div>
    );
  }

  return (
    <section className="py-20 sectiongraycolor">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-secondary ">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Our Work
              </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-3">
              Featured Projects
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button className="portfolio-prev flex items-center justify-center w-12 h-12 border border-gray-300 hover:border-secondary hover:text-secondary rounded-full transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="portfolio-next flex items-center justify-center w-12 h-12 border border-gray-300 hover:border-secondary hover:text-secondary rounded-full transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: ".portfolio-prev",
            nextEl: ".portfolio-next",
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="portfolio-swiper"
        >
          {items.slice(0, 6).map((item) => (   // Show max 6 featured projects
            <SwiperSlide key={item.id}>
              <Link href={`/portfolio/${item.slug}`} className="block">
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200 hover:border-secondary hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  
                  {/* Project Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={item.image || "https://picsum.photos/600/400?random=5"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-secondary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h5 className="text-1xl font-semibold text-gray-900 group-hover:text-secondary transition-colors line-clamp-2">
                      {item.title}
                    </h5>

                    {item.client && (
                      <p className="text-sm text-gray-500 mt-2">
                        Client: <span className="font-medium">{item.client}</span>
                      </p>
                    )}

                    <p className="text-gray-600 mt-4 line-clamp-3 flex-1">
                      {item.short_description}
                    </p>

                    <div className="mt-8 text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Project 
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        
      </div>
    </section>
  );
}