import Link from "next/link";

const awards = [
  {
    title: "CSS Design",
    description: "Recognizes exceptional websites with outstanding visual appeal and technical functionality.",
  },
  {
    title: "W3 Design Award",
    description: "Considers aspects such as user experience, visual aesthetics, and technical prowess. Based on specific criteria.",
  },
  {
    title: "The FWA Award",
    description: "The best in digital creativity and innovation. Internationally accolade, showcasing excellence in design.",
  },
  {
    title: "WWWW Awards",
    description: "Excellence in web design, content creation, and user experience. Based on specific criteria such as creativity.",
  },
];

export default function AwardsSection() {
  return (
    <section className="bg-[#0f172a] text-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-primary font-medium tracking-[2px] text-sm ">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Designed For Developers
              </div>

            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              Our <span className="text-secondary">Awards</span> and<br />
              Recognitions
            </h2>

            <p className=" text-gray-300">
              Awarded for its contributions to the field of AI, including being 
              named one of MIT Technology Review's 50 Smartest Companies and 
              winning the Association for Computing Machinery.
            </p>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-3 hover:text-white transition-all group"
            >
              About us
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                →
              </div>
            </Link>
          </div>

          {/* RIGHT SIDE - Awards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div 
                key={index}
                className="bg-[#1e2937] rounded-3xl p-8 group hover:bg-[#334155] transition-all duration-300 border border-gray-700 hover:border-secondary"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-12 h-12 border border-gray-500 rounded-2xl flex items-center justify-center text-2xl">
                    📖
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full"></div>
                </div>

                {/* Title */}
                <h6 className="text-xl font-semibold mb-4 text-white">
                  {award.title}
                </h6>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}