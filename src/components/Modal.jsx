import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, title, children, onConfirm, onClose }) {
  if (!open) return null;

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white p-6 rounded-xl w-96 shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Close Button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-[#6c584c] mb-3">{title}</h3>
        <div className="mb-5 text-gray-700">{children}</div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md font-medium text-white shadow-md 
                       bg-[#6c584c] hover:bg-[#8d7b68] hover:scale-105 active:scale-95 transition-all"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md font-medium text-[#6c584c] border border-[#6c584c] 
                       bg-white hover:bg-[#f0eae2] hover:scale-105 active:scale-95 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
