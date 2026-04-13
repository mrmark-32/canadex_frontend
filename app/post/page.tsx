"use client";
import { useState } from "react";

export default function PostListing() {
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "product" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/listings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) || null }),
    });
    alert("Listing posted! 🍁");
    setForm({ title: "", description: "", price: "", category: "product" });
  };

  return (
    <div className="max-w-lg mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Post a New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* inputs for title, description, price, category (select) */}
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border p-4 rounded-xl" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border p-4 rounded-xl" rows={4} required />
        <input type="number" placeholder="Price (optional)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border p-4 rounded-xl" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border p-4 rounded-xl">
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="job">Job</option>
          <option value="realestate">Real Estate</option>
        </select>
        <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl text-xl font-semibold">Post to Canadex</button>
      </form>
    </div>
  );
}