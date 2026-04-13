import Link from "next/link";
import Image from "next/image";
import FotMap from "../Assets/footermap/footermap.svg";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-gray-300 pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Map */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <Image
          src={FotMap}
          alt="Footer Map Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Subtle Red Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-10 bg-[radial-gradient(#c8102e_0.8px,transparent_1px)] [background-size:30px_30px]" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Logo & Contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              
              <h2 className="text-3xl font-bold text-white tracking-tight">Canadex</h2>
            </div>

            <p className="text-gray-400 mb-8 max-w-xs">
              2307 Beverley Rd Brooklyn,<br />
              New York 11226 USA.
            </p>

            <div className="space-y-3 text-sm">
              <a href="tel:+0700020005" className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-secondary">•</span>
                +07 0 002 00 05
              </a>
              <a href="mailto:info@canadex.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-secondary">•</span>
                info@canadex.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h6 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="text-secondary">•</span> Social
            </h6>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-3">
            <h6 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="text-secondary">•</span> Company
            </h6>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Our Blog</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-3">
            <h6 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="text-secondary">•</span> Useful Links
            </h6>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Condition</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            Canadex by <span className="text-orange-400">Mr Mark</span>.
          </p>
          <p className="mt-4 md:mt-0">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}