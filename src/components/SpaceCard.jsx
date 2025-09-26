import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  return (
    <Link
      to={`/space/${space.id}`}
      className="block group border border-gray-200 rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      {space.main_image && (
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={space.main_image}
            alt={space.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 group-hover:bg-gradient-to-br group-hover:from-[#fdfbf9] group-hover:to-[#f3ede8] transition-colors duration-500">
        <h3 className="text-lg font-bold text-[#6c584c] group-hover:text-[#8d7b68] transition-colors duration-300">
          {space.name}
        </h3>

        <p className="text-gray-600 text-sm flex items-center gap-1">
          📍 <span>{space.location}</span>
        </p>

        {/* Price styled with header color */}
        <p className="text-[#6c584c] font-semibold text-sm group-hover:text-[#8d7b68] transition-colors duration-300">
          ₱{space.price}/hr
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {space.description}
        </p>

        {/* Call-to-action button */}
        <button
          className="mt-3 px-4 py-2 rounded-lg text-white bg-[#6c584c] hover:bg-[#8d7b68] text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </Link>
  );
}
