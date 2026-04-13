"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Service = {
  id: number;
  slug: string;
  title: string;
  short_para: string;
  features: string[];
  image: string;
};

export default function ServicesSlider() {
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

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading premium Canadian services...
      </div>
    );
  }

  return (
    <section className="w-full py-20 sectiongraycolor">
      <div className="container ">
        
        {/* Section Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-secondary ">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Our Services and Solutions
              </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-3">
              Technological Applications
            </h2>
          </div>

          {/* Navigation Buttons - Always Visible */}
          <div className="flex items-center gap-4">
            <button 
              className="swiper-prev flex items-center justify-center w-12 h-12 
                         border border-gray-300 hover:border-secondary 
                         hover:text-secondary rounded-full transition-all duration-300 
                         active:scale-95"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              className="swiper-next flex items-center justify-center w-12 h-12 
                         border border-gray-300 hover:border-secondary 
                         hover:text-secondary rounded-full transition-all duration-300 
                         active:scale-95"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
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
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="services-swiper"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className=" rounded-3xl overflow-hidden  border border-gray-300 hover:border-[var(--secondary)]  transition-all duration-300 h-full flex flex-col group">
                
                

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-[22px] font-semibold mb-3 text-gray-900 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-gray-600 mb-8 line-clamp-3 flex-1">
                    {service.short_para}
                  </p>

                  <hr className="border-gray-200 mb-6" />

                  {/* Features List */}
                  <div className="mb-10">
                    <p className="font-medium text-sm uppercase tracking-widest text-gray-500 mb-4">
                      Key Features
                    </p>
                    <ul className="space-y-3">
                      {service.features.slice(0, 4).map((feat, i) =>
                        feat && (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="text-secondary mt-1 text-xl leading-none">•</span>
                            <span>{feat}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn-primary mt-auto w-full text-center py-4 text-base font-semibold group-hover:scale-[1.02] transition-transform"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}