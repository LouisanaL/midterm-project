import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [allBookings, setAllBookings] = useLocalStorage("ss_bookings", {});
  const { user } = useAuth();

  // Filter bookings only for the logged-in user
  const userBookings = user ? allBookings[user.email] || [] : [];

  // Add a new booking
  const addBooking = (booking) => {
    if (!user) return;
    setAllBookings((prev) => {
      const updated = { ...prev };
      const list = updated[user.email] || [];
      updated[user.email] = [...list, booking];
      return updated;
    });
  };

  // Cancel a booking by ID
  const cancelBooking = (id) => {
    if (!user) return;
    setAllBookings((prev) => {
      const updated = { ...prev };
      updated[user.email] = (updated[user.email] || []).filter(
        (b) => b.id !== id
      );
      return updated;
    });
  };

  // Cleanup old bookings when user logs in
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];

    setAllBookings((prev) => {
      const updated = { ...prev };
      updated[user.email] = (updated[user.email] || []).filter(
        (b) => b.date >= today
      );
      return updated;
    });
  }, [user, setAllBookings]);

  const value = {
    bookings: userBookings,
    addBooking,
    cancelBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
