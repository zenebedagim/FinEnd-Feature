"use client";

import { useState, FormEvent, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
}

export default function Login({
  onBack,
  onLoginSuccess,
  activeTab,
  onTabChange,
}: LoginProps) {
  const { updateUser } = useApp();
  const [email, setEmail] = useState("Leul@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Note: Even if user is already logged in, they must go through the login screen
  // The form will still work and proceed to the next step (Post-Login Welcome)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple login validation - in real app, this would call an API
    setTimeout(() => {
      // Simulate API call
      if (email && password) {
        // Save login state
        updateUser({ isLoggedIn: true });
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        alert("Please enter both email and password");
      }
    }, 500);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pb-20 relative">
      <div className="w-full max-w-md flex-1 flex flex-col justify-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-[16px] shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[16px] border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Leul@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[16px] border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-[16px] font-semibold hover:bg-blue-600 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Create Account Link */}
          <a
            href="#"
            className="block text-center text-primary text-sm hover:underline"
          >
            Create Account
          </a>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-md mx-auto">
          <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>
    </section>
  );
}
