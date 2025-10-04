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
        {/* Main Image */}
        <div className="overflow-hidden rounded-2xl shadow-xl mb-8">
          <img
            src={space.mainImage}
            alt={space.name}
            className="w-full h-[420px] object-cover transition-transform duration-700 ease-in-out hover:scale-105 cursor-pointer"
            onClick={() => setSelectedImage(space.mainImage)}
          />
        </div>

        {/* Gallery */}
        <div className="mb-10">
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

        {/* Space Details */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-4 text-[#F0E4D3]">{space.name}</h1>
          <p className="text-[#F6F1EB] mb-7 text-lg">📍 {space.location}</p>
          <p className="mb-7 text-[#FAF7F3] leading-relaxed">{space.description}</p>
          <div className="mb-6 space-y-1 text-[#EDE1C9]">
            <p className="font-medium">Opening: {space.openingTime || "8:00 AM"}</p>
            <p className="font-medium">Closing: {space.closingTime || "9:00 PM"}</p>
          </div>
          <p className="text-2xl font-bold text-[#FAF7F3] mb-6">₱{space.price}</p>
        </div>

        {/* Booking Form */}
        <div className="mb-12">
          {user ? (
            <BookingForm space={space} />
          ) : (
            <p className="font-semibold text-red-700 text-lg">
              ⚠ Please login to book this space.
            </p>
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
            onClick={(e) => e.stopPropagation()}
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
