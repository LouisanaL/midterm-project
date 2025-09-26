import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

export default function BookingForm({ space }) {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(space.slots ? space.slots[0] : "");

  if (!user) return <div>Please login to book this space.</div>;

  const today = new Date().toISOString().split("T")[0]; // block past dates

  const submit = (e) => {
    e.preventDefault();
    const booking = {
      id: Date.now().toString(),
      spaceId: space.id,
      userEmail: user.email,
      date,
      slot,
      price: space.price,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    alert("Booking confirmed!");
    setDate("");
    setSlot(space.slots ? space.slots[0] : "");
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      {/* Date */}
      <label>
        Date:
        <input
          type="date"
          required
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      {/* Slots */}
      <label>
        Available Slots:
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          {space.slots?.map((s, idx) => (
            <option key={idx} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {/* Price */}
      <p>
        <strong>Price:</strong> ₱{space.price} per hour
      </p>

      <button type="submit" style={{ padding: "0.5rem", borderRadius: 6 }}>
        Confirm Booking
      </button>
    </form>
  );
}
