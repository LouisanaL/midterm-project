import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react"; // for mobile menu icons

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f3ee] border-b border-gray-200 shadow-sm">
      <div className="max-w-[1500px] mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-2xl text-[#6c584c] hover:text-[#8d7b68] transition-colors duration-300"
        >
          StudySpot PH
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-700 text-base font-medium px-3 py-2 rounded-md transition hover:bg-[#715A5A]/10 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/dashboard/my-bookings"
            className="text-gray-700 text-base font-medium px-3 py-2 rounded-md transition hover:bg-[#715A5A]/10 hover:text-gray-900"
          >
            My Bookings
          </Link>

          {user ? (
            <>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#6c584c] text-white text-sm font-medium px-4 py-2 rounded-md transition hover:bg-[#8d7b68]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#6c584c] text-white text-sm font-medium px-4 py-2 rounded-md transition hover:bg-[#8d7b68]"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#f8f3ee] border-t border-gray-200 px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            className="text-gray-700 text-base font-medium px-2 py-1 rounded-md hover:bg-[#eae7dc] hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard/my-bookings"
            className="text-gray-700 text-base font-medium px-2 py-1 rounded-md hover:bg-[#eae7dc] hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            My Bookings
          </Link>

          {user ? (
            <>
              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#6c584c] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#8d7b68]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#6c584c] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#8d7b68]"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
