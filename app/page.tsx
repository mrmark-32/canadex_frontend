import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import HeroBanner from "@/app/Assets/HeroBanner/cybersecurity.png";
import ServicesSlider from "./components/ServicesSlider";
import CTASection from "./components/CTASection";
import BrandLogos from "./components/BrandLogos";
import PortfolioSlider from "./components/PortfolioSlider";
import WhyUs from "./components/WhyUs";
import Hrline from "./components/HrLine";
import ServicesGrid from "./components/ServicesGrid";
import BlogSlider from "./components/BlogSlider";
import AwardsSection from "./components/AwardsSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Maple Red Background */}
      <div className=" relative overflow-hidden">
        <div className="container">
          <div className="relative z-10  mx-auto ">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* LEFT SIDE – Text content – 7 columns (≈70%) */}
              <div className="lg:col-span-8 text-center lg:text-left">
                <h6 className="text-lg sm:text-1xl font-medium tracking-wide text-primarycolor pb-4">
                  Canedex Smart Solutions
                </h6>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  <span className="block text-primarycolor">
                    Powering innovation{" "}
                  </span>
                  <span className="block">with generative AI</span>
                </h1>

                <p className="mt-6  text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  We build custom software, scalable digital products, and
                  dedicated development teams that put people at the center of
                  innovation — delivering real business impact with transparency
                  and care.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-red-700 rounded-lg transition shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Start a Project
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-red-primary bg-border-primary border-2 border-primary hover:bg-primary/5 rounded-lg transition"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE – Image – 5 columns (≈30%) */}
              <div className="relative hidden lg:block lg:col-span-4">
                <div className="relative">
                  <Image
                    src={HeroBanner}
                    alt="Cybersecurity and human-centered technology"
                    width={400}
                    priority
                    quality={100}
                  />

                  {/* Decorative floating accents */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesSlider />
      <CTASection/>
      <BrandLogos/>
      <PortfolioSlider />
      <WhyUs/>
      <Hrline />
      <ServicesGrid/>
      <BlogSlider />
      <AwardsSection />
    </div>
  );
}
