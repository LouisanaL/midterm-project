import React, { useState } from "react";
import { Link } from "react-router-dom";
import spaces from "../data/spaces";

export default function Home() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Filter spaces by search
  const filtered = spaces.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.location.toLowerCase().includes(q.toLowerCase())
  );

  // Sort spaces based on user selection
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
    if (sortBy === "nameZA") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <div
            className="bg-gradient-to-r from-[#6C584C] to-[#E9DDC8]
              rounded-2xl shadow-lg border border-white/20 
              max-w-4xl mx-auto px-10 py-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#4B3A36] to-[#8D7B68] bg-clip-text text-transparent">
                StudySpot PH
              </span>
            </h1>
            <p className="text-[#1F1F1F] text-lg">
              Discover the best study hubs and co-working spaces across the
              Philippines. Book your spot today and stay productive in a quiet,
              professional environment.
            </p>
          </div>
        </section>

        {/* Search + Sort Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 ">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="🔍 Search by name or location..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 px-5 py-3 
                       border border-gray-200 rounded-2xl shadow-lg 
                       backdrop-blur-sm bg-white/80
                       shadow-md transition hover:shadow-lg hover:shadow-[#715A5A]/40
                       focus:ring-2 focus:ring-[#6c584c]/50 focus:outline-none"
          />

          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl shadow-md bg-white/90 hover:shadow-lg hover:shadow-[#715A5A]/40
                       focus:ring-2 focus:ring-[#6c584c]/50 focus:outline-none"
          >
            <option value="">Sort by...</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
            <option value="nameZA">Name: Z → A</option>
          </select>
        </div>

        {/* Study Spaces Grid */}
        {sorted.length === 0 ? (
          <p className="text-center text-gray-500">No study spaces found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl 
                           transition transform hover:-translate-y-2 
                           overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src={s.mainImage}
                    alt={s.name}
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-[#6c584c] mb-2 leading-tight">
                    {s.name}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    📍 {s.location}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-[#6c584c] font-bold text-lg">₱{s.price}</p>
                    <Link
                      to={`/space/${s.id}`}
                      className="inline-block bg-gradient-to-r from-[#6c584c] to-[#8d7b68] 
                                 text-white px-4 py-2 rounded-lg text-sm font-medium 
                                 hover:from-[#5a463c] hover:to-[#7a6b58] transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
