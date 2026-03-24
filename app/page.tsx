import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍁</span>
            <h1 className="text-3xl font-bold">Canadex</h1>
          </div>
          <div className="flex gap-8">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/listings" className="hover:underline">Listings</Link>
            <Link href="/post" className="hover:underline">Post Listing</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-6">Your Gateway to Canadian Excellence</h2>
          <p className="text-2xl mb-10">Buy • Sell • Connect • Maple Strong</p>
          <Link
            href="/listings"
            className="inline-block bg-white text-red-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-yellow-300 transition"
          >
            Browse Listings →
          </Link>
        </div>
      </header>

      {/* Quick stats / features */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-5xl mb-4">🍁</div>
          <h3 className="text-2xl font-semibold">100% Canadian</h3>
          <p className="text-gray-600">Products & services from coast to coast</p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-4">🔥</div>
          <h3 className="text-2xl font-semibold">Live Marketplace</h3>
          <p className="text-gray-600">Real-time listings &amp; deals</p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-2xl font-semibold">Trusted Community</h3>
          <p className="text-gray-600">Verified Canadian sellers</p>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>&copy; 2026 Canadex • Built with ❤️ for Canada</p>
      </footer>
    </div>
  );
}