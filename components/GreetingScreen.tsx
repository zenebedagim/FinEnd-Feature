"use client";

import { useApp } from "@/contexts/AppContext";

interface GreetingScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function GreetingScreen({
  onContinue,
  onBack,
}: GreetingScreenProps) {
  const { user } = useApp();

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-white hover:text-white/80 z-10"
      >
        <svg
          className="w-6 h-6"
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
      </button>

      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
        {/* Greeting with user's name */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hi {user.name}! 👋
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Welcome to City of Wealth!
          </p>
        </div>

        {/* Mascot */}
        <div className="mb-8">
          <div className="w-48 h-48 md:w-56 md:h-56 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-8xl md:text-9xl">🐿️</div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-6 mb-8 border border-white/20">
          <p className="text-white text-lg leading-relaxed">
            We're excited to help you learn about money in a fun and interactive
            way! Let's get started with a quick assessment to personalize your
            learning journey.
          </p>
        </div>

        {/* Back and Next Buttons */}
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={onBack}
            className="flex-1 bg-white/20 text-white border-2 border-white/50 px-6 py-4 rounded-[16px] text-lg font-bold hover:bg-white/30 transition-all"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-accent text-gray-900 px-12 py-4 rounded-[16px] text-lg font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-xl"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
