import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

export default function BookingForm({ space }) {
  const { user } = useAuth();
  const { bookings, addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.slots ? space.slots[0] : "");
  const [error, setError] = useState("");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Helper to check if slot is in the past
  const isPastTime = (selectedDate, selectedSlot) => {
    if (selectedDate > todayStr) return false; // future date is always valid
    const [startHour, startMin] = selectedSlot.split("-")[0].split(":").map(Number);
    const now = new Date();
    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(startHour, startMin, 0, 0);
    return slotDateTime < now;
  };

  const submit = (e) => {
    e.preventDefault();

    if (date < todayStr) {
      setError("You cannot book a past date!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (isPastTime(date, slot)) {
      setError("You cannot book a past time slot!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Check for duplicate booking
    const isDuplicate = bookings.some(
      (b) => b.spaceId === space.id && b.date === date && b.slot === slot
    );

    if (isDuplicate) {
      setError("This time slot is already booked for this space!");
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
    setSlot(space.slots ? space.slots[0] : "");
  };

  // Disable past time slots dynamically
  const availableSlots = space.slots?.filter((s) => !isPastTime(date, s));

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-6 w-full bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">Book Your Spot</h2>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium animate-shake">
          {error}
        </div>
      )}

      <label className="w-full">
        <span className="block text-sm font-medium text-gray-700 mb-1">Date</span>
        <input
          type="date"
          required
          min={todayStr}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#6c584c] focus:ring-2 focus:ring-[#8d7b68] outline-none transition-all duration-200"
        />
      </label>

      <label className="w-full">
        <span className="block text-sm font-medium text-gray-700 mb-1">Time Slot</span>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#6c584c] focus:ring-2 focus:ring-[#8d7b68] outline-none transition-all duration-200"
        >
          {availableSlots?.length > 0 ? (
            availableSlots.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))
          ) : (
            <option disabled>No available slots</option>
          )}
        </select>
      </label>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-[#6c584c] text-white text-lg font-semibold shadow-md hover:bg-[#8d7b68] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
        disabled={!availableSlots?.length}
      >
        Book this Study Hub
      </button>
    </form>
  );
}
