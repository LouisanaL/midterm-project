import React, { useState } from "react";
import { useParams } from "react-router-dom";
import spaces from "../data/spaces";
import { useAuth } from "../contexts/AuthContext";
import BookingForm from "../components/BookingForm";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const { user } = useAuth();
  const space = spaces.find((s) => s.id.toString() === spaceId);

  const [selectedImage, setSelectedImage] = useState(null); // For modal

  if (!space)
    return (
      <p className="p-8 text-center text-gray-500 text-lg">
        Space not found.
      </p>
    );

  return (
    <div className="bg-transparent min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Main Image */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={space.mainImage}
                alt={space.name}
                className="w-full h-[420px] object-cover transition-transform duration-700 ease-in-out hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImage(space.mainImage)}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 text-[#4B2E2E]">{space.name}</h1>
              <p className="text-[#F6F1EB] mb-6 text-lg">📍 {space.location}</p>
              <p className="mb-6 text-[#E1D5C9] leading-relaxed">{space.description}</p>
              <div className="mb-6 space-y-1 text-[#EDE1C9]">
                <p className="font-medium">🕒 Opening: {space.openingTime || "8:00 AM"}</p>
                <p className="font-medium">🕔 Closing: {space.closingTime || "9:00 PM"}</p>
              </div>
              <p className="text-2xl font-bold text-[#261616] mb-6">₱{space.price}/hr</p>
            </div>

            {/* Booking */}
            <div className={`mt-4 ${user ? "bg-transparent p-0 shadow-none" : "bg-[#F9F9F9]/50 border border-[#e5e2dc] p-6 rounded-xl shadow-md"}`}>
              {user ? <BookingForm space={space} /> : <p className="font-semibold text-red-700 text-lg">
                ⚠ Please login to book this space.</p>}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#331F1F]">Gallery</h2>
          {space.gallery && space.gallery.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {space.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-700 ease-in-out"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No gallery images available.</p>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-white/50 bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
          />
          <button
            className="absolute top-5 right-5 text-gray text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
