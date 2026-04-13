"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type MenuItemType = {
  title: string;
  url: string;
  is_external: boolean;
  children: MenuItemType[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Fetch menu from production backend
  useEffect(() => {
    const API_URL = "https://canadex-backend.onrender.com/admin/api/menuitem/";   // ← Change if needed

    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add credentials if your API requires authentication later
      // credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMenuItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setMenuItems([]);
        setLoading(false);
      });
  }, []);

  // Close mobile menu + dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        const isInside = Object.values(dropdownRefs.current).some(
          (ref) => ref && ref.contains(e.target as Node)
        );
        if (!isInside) setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <nav className="white-bg shadow-md border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition hover:scale-105">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Canadex
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[17px] font-medium">
            {loading ? (
              <div className="text-gray-500">Loading menu...</div>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  ref={(el) => {
                    dropdownRefs.current[item.title] = el;
                  }}
                >
                  {item.children?.length > 0 ? (
                    <button
                      onMouseEnter={() => setOpenDropdown(item.title)}
                      onClick={() => toggleDropdown(item.title)} // fallback for touch
                      className="flex items-center gap-1.5 hover:text-secondary transition-colors py-1 focus:outline-none"
                    >
                      {item.title}
                      <span className="text-xs mt-0.5 transition-transform">▼</span>
                    </button>
                  ) : (
                    <Link
                      href={item.url || "#"}
                      target={item.is_external ? "_blank" : "_self"}
                      className={`transition-colors py-1 ${
                        pathname === item.url
                          ? "font-semibold text-secondary underline underline-offset-8 decoration-2"
                          : "hover:text-secondary"
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.children?.length > 0 && (
                    <div
                      className={`absolute left-0 mt-4 w-64 bg-white text-gray-800 border border-gray-100 rounded-2xl shadow-2xl py-4 z-50 transition-all duration-200 ${
                        openDropdown === item.title
                          ? "opacity-100 visible scale-100"
                          : "opacity-0 invisible scale-95 pointer-events-none"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.url || "#"}
                          target={child.is_external ? "_blank" : "_self"}
                          className="block px-6 py-3 hover:bg-gray-100 hover:text-secondary transition rounded-xl mx-2"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-primary px-8 py-3 text-base font-medium"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-3xl text-secondary transition-transform active:scale-90"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6 text-lg">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.children?.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="flex items-center justify-between w-full py-3 text-left font-medium text-secondary"
                    >
                      {item.title}
                      <span
                        className={`transition-transform duration-200 ${
                          openDropdown === item.title ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {openDropdown === item.title && (
                      <div className="pl-6 mt-2 flex flex-col gap-3 border-l border-gray-200">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.url || "#"}
                            target={child.is_external ? "_blank" : "_self"}
                            className="py-2 text-gray-700 hover:text-secondary transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.url || "#"}
                    target={item.is_external ? "_blank" : "_self"}
                    className={`block py-3 font-medium transition ${
                      pathname === item.url
                        ? "text-secondary"
                        : "text-gray-700 hover:text-secondary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-6 border-t mt-4">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center font-medium"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}