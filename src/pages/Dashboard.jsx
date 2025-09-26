import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import spaces from "../data/spaces";
import Modal from "../components/Modal";

export default function Dashboard() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const myBookings = bookings.filter((b) => b.userEmail === user.email);
  const [modalOpen, setModalOpen] = useState(false);
  const [toCancel, setToCancel] = useState(null);

  const onCancelClick = (id) => {
    setToCancel(id);
    setModalOpen(true);
  };

  const confirmCancel = () => {
    cancelBooking(toCancel);
    setToCancel(null);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-sm py-30">
      <div className="max-w-3xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 flex items-center gap-2">
          <span className="text-blue-600">📌</span> My Bookings
        </h1>

        {/* Empty State */}
        {myBookings.length === 0 ? (
          <div className="mt-20 bg-white/70 border border-gray-300 rounded-2xl shadow-lg p-16 flex flex-col items-center justify-center text-center">
            <p className="text-gray-800 text-xl font-semibold mb-2">
              You don’t have any bookings yet.
            </p>
            <p className="text-blue-600 text-lg">
              Go explore some study spots!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {myBookings.map((b) => {
              const s = spaces.find((x) => x.id === b.spaceId);
              return (
                <div
                  key={b.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{s?.name}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      📅 {b.date} • ⏰ {b.slot}
                    </p>
                  </div>
                  <button
                    onClick={() => onCancelClick(b.id)}
                    className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Confirmation Modal */}
        <Modal
          open={modalOpen}
          title="Cancel booking?"
          onConfirm={confirmCancel}
          onClose={() => setModalOpen(false)}
        >
          <p className="text-gray-700 mb-4">
            Are you sure you want to cancel this booking?
          </p>
        </Modal>
      </div>
    </div>
  );
}
