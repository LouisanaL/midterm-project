import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

export default function BookingForm({ space }) {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("09:00-11:00");
  const [error, setError] = useState("");


  // Today's date (YYYY-MM-DD)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const submit = (e) => {
    e.preventDefault();

    if (date < todayStr) {
      setError("You cannot book a past date!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const booking = {
      id: Date.now().toString(),
      spaceId: space.id,
      userId: user.id,
      userEmail: user.email,
      date,
      slot,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    alert("Booking confirmed!");
    setDate("");
    setSlot("09:00-11:00");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-6 w-full bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        📅 Book Your Spot
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium animate-shake">
          {error}
        </div>
      )}

      {/* Date Input */}
      <label className="w-full">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </span>
        <input
          type="date"
          required
          min={todayStr}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#6c584c] focus:ring-2 focus:ring-[#8d7b68] outline-none transition-all duration-200"
        />
      </label>

      {/* Slot Select */}
      <label className="w-full">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Time Slot
        </span>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#6c584c] focus:ring-2 focus:ring-[#8d7b68] outline-none transition-all duration-200"
        >
          <option>09:00-11:00</option>
          <option>12:00-14:00</option>
          <option>15:00-17:00</option>
        </select>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-[#6c584c] text-white text-lg font-semibold shadow-md hover:bg-[#8d7b68] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
      >
        ✅ Book this Study Hub
      </button>
    </form>
  );
}
