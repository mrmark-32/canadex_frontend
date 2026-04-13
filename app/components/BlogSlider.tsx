"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { RiH5 } from "react-icons/ri";

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

export default function BlogSlider() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/blog/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading latest insights...
      </div>
    );
  }

  return (
    <section className="py-20 sectiongraycolor">
      <div className="container mx-auto px-6">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-secondary ">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Canadex Insides
              </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-3">
              Latest from the Blog
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button className="blog-prev flex items-center justify-center w-12 h-12 border border-gray-300 hover:border-secondary hover:text-secondary rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="blog-next flex items-center justify-center w-12 h-12 border border-gray-300 hover:border-secondary hover:text-secondary rounded-full transition-all">
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
            prevEl: ".blog-prev",
            nextEl: ".blog-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="blog-swiper"
        >
          {posts.slice(0, 6).map((post) => (
            <SwiperSlide key={post.id}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-white border border-gray-200 hover:border-secondary rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  
                  {/* Blog Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.featured_image || "https://picsum.photos/600/400?random=20"}
                      alt={post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h5 className="text-1xl font-semibold text-gray-900 group-hover:text-secondary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </h5>

                    <p className="text-gray-600 mt-4 line-clamp-3 flex-1">
                      {post.short_description}
                    </p>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {new Date(post.published_at).toLocaleDateString('en-CA')}
                      </span>
                      <span>{post.reading_time} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div className=" mt-12">
          <Link
            href="/blog"
            className=""
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </section>
  );
}