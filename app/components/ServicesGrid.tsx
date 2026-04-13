"use client";

import { 
  BsCloudCheck, 
  BsSearch, 
  BsGraphUp, 
  BsGear 
} from "react-icons/bs";



export default function ServicesGrid() {
  const services = [
    {
      icon: <BsCloudCheck size={52} />,
      smallTitle: "Data Security",
      mainTitle: "Powerful Cloud Security Solutions",
    },
    {
      icon: <BsSearch size={52} />,
      smallTitle: "SEO and Optimization",
      mainTitle: "Project Management Systems and Software",
    },
    {
      icon: <BsGraphUp size={52} />,
      smallTitle: "Analytics and Research",
      mainTitle: "Integration Dynamics CRM with External Services",
    },
    {
      icon: <BsGear size={52} />,
      smallTitle: "IT Services",
      mainTitle: "End-to-End SaaS Development and Support",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
       

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center 
                          border-gray-
                         rounded-2xl p-5 "
            >
              {/* Icon Container with Orange Dot */}
              <div className="relative mb-10">
                <div className="text-secondary transition-transform group-hover:scale-110 duration-300">
                  {service.icon}
                </div>
                
                {/* Orange Accent Dot */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Small Title */}
              <p className="text-gray-500 tracking-widest mb-4 ">
                {service.smallTitle}
              </p>

              {/* Main Title */}
              <p className=" text-gray-900 font-bold">
                {service.mainTitle}
              </p>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}