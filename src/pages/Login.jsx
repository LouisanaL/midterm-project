import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/"; // where user came from

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email || "student@example.com");
    setEmail("");
    navigate(from); // redirect back where they came from
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-white/10" >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login to <span className="text-[#6C584C]">StudySpot PH</span>
        </h2>

        {/* Redirect Note */}
        {from === "/dashboard/my-bookings" && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 text-sm text-yellow-800">
            <p>
              ⚠️ Please log in to access your{" "}
              <strong className="font-semibold">My Bookings</strong> page.  
              Logging in allows you to view, manage, and track your reserved
              study spaces.
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition"
          >
            Login
          </button>
        </form>

        {/* Guest Option */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
