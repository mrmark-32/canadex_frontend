"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Use environment variable (highly recommended)
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://canadex-backend.onrender.com";

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`${API_BASE_URL}/api/menu/`, {
          headers: {
            "Content-Type": "application/json",
          },
          // You can add cache: 'no-store' if menu changes frequently
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch menu: ${res.status}`);
        }

        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Menu fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [API_BASE_URL]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="white-bg shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:scale-105"
          >
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Canadex
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[17px] font-medium">
            {loading ? (
              <div className="text-gray-500">Loading menu...</div>
            ) : error ? (
              <div className="text-red-500 text-sm">Menu unavailable</div>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children?.length > 0 ? (
                    <button className="flex items-center gap-1.5 hover:text-secondary transition-colors py-1">
                      {item.title}
                      <span className="text-xs mt-0.5">▼</span>
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
                          ? "opacity-100 visible"
                          : "opacity-0 invisible pointer-events-none"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.url}
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
              className="btn-primary px-8 py-3 text-base"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-3xl text-secondary transition-transform"
            aria-label="Toggle menu"
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
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.title ? null : item.title
                        )
                      }
                      className="flex items-center justify-between w-full py-3 text-left font-medium text-secondary"
                    >
                      {item.title}
                      <span
                        className={`transition-transform ${
                          openDropdown === item.title ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    {openDropdown === item.title && (
                      <div className="pl-6 mt-2 flex flex-col gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.url}
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
            <div className="pt-6 border-t">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center"
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