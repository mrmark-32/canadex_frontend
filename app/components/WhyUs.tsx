"use client";

import Image from "next/image";

// Import Main Image
import AboutUs from "../Assets/AboutUs/why_choose_us.jpg";

// Import Avatars (adjust path if folder name is different)
import avatar1 from "../Assets/Avtar/avatar-1.jpg";


export default function WhyUs() {
  const avatars = [avatar1];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Main Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src={AboutUs}
                alt="Canadex team working together"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
              />
              
              {/* Red Accent Decorative Shape */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-secondary/90 rounded-tr-3xl" />
            </div>

            {/* Review Rating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-[280px] border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-3">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm"
                    >
                      <Image
                        src={avatar}
                        alt={`Team member ${index + 1}`}
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">4.5</span>
                <div className="flex text-yellow-400 text-2xl">★★★★☆</div>
              </div>
              <p className="text-sm text-gray-500 mt-1">From +5,000 happy clients</p>
            </div>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="space-y-8 lg:pt-8">
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-medium tracking-[2px] text-sm ">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Designed For Developers
              </div>

              <h2 className=" tracking-tight text-gray-900 leading-[1.05] mt-5">
                Powerful and Easy
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Our platform is tailor-made for developers, providing a powerful and easy-to-use 
              solution. With our tools, you can streamline your development process and achieve 
              better outcomes.
            </p>

            <ul className="space-y-6  text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-secondary  leading-none mt-0.5">•</span>
                <span>Our platform places strong emphasis on user experience.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary  leading-none mt-0.5">•</span>
                <span>Building websites, mobile apps, and enterprise software.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary  leading-none mt-0.5">•</span>
                <span>Designed to help you achieve your goals efficiently.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary  leading-none mt-0.5">•</span>
                <span>Exceed expectations with every project.</span>
              </li>
            </ul>

            <div className="pt-4">
              <a 
                href="/contact"
                className="btn-primary text-lg px-12 py-5 inline-flex items-center gap-3 font-semibold"
              >
                Get Started Today
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}