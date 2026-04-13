import Image from "next/image";
import Link from "next/link";
import VrImage from "../Assets/Cta/man-experiencing-virtual-reality.webp"


export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={VrImage}           // ← Change this path to your image
          alt="Canadian technology background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Optional red tint overlay */}
        <div className="absolute inset-0 bg-secondary/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Small Label */}
          <span className="inline-block font-semibold tracking-widest text-white/90 uppercase text-sm mb-4">
            Our Services and Solutions
          </span>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-8 pt-3 pb-5">
            Compare Canadex Plans
          </h2>

          

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/pricing"
              className="btn-primary text-lg px-12 py-5 font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Compare Plans
            </Link>

            <Link
              href="/services"
              className="btn-outline border-2 border-white text-white hover:bg-white hover:text-secondary 
                         text-lg px-12 py-5 font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
}