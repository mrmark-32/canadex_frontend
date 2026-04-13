import Image from "next/image";

import audioJungle from "../Assets/BrandLogo/p1.png";

const brands = [
  { name: "Shopify", logo: audioJungle },
  { name: "Stripe", logo: audioJungle },
  { name: "AWS", logo: audioJungle },
  { name: "Google Cloud", logo: audioJungle },
  { name: "Microsoft", logo: audioJungle },
  { name: "Salesforce", logo: audioJungle },
];

export default function BrandLogos() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-12 items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex justify-center items-center h-24 
                         hover:scale-110 transition-transform duration-300 
                         grayscale hover:grayscale-0"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={160}
                height={70}
                className="object-contain opacity-70 group-hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}