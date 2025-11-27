"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface HeroProps {
  onGetStarted: () => void;
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
}

export default function Hero({
  onGetStarted,
  activeTab,
  onTabChange,
}: HeroProps) {
  const { user } = useApp();
  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center relative pb-20">
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center text-center flex-1">
        {/* Welcome Title - white, bold */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
          Welcome to City of Wealth
        </h1>

        {/* Subtitle - white/light blue */}
        <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12">
          Learn money skills the fun way!
        </p>

        {/* Seba the Squirrel Circle - white background */}
        <div className="relative mb-6 md:mb-8">
          <div className="w-56 h-56 md:w-64 md:h-64 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Squirrel Icon */}
            <div className="text-7xl md:text-8xl mb-2">🐿️</div>
            {/* Seba the Squirrel Text - dark blue/primary color */}
            <p className="text-primary font-bold text-base md:text-lg px-4 text-center">
              Seba the Squirrel
            </p>
          </div>
        </div>

        {/* Get Started Button - yellow accent */}
        <button
          onClick={onGetStarted}
          className="bg-accent text-white px-10 md:px-12 py-3 md:py-4 rounded-[16px] text-base md:text-lg font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-xl mb-6"
        >
          Get Started
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2 mb-16 md:mb-20">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white/30 rounded-full border border-white/50"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white/30 rounded-full border border-white/50"></div>
        </div>
      </div>

      {/* Bottom Navigation Bar - using BottomNav component */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto">
          <BottomNav
            activeTab={activeTab}
            onTabChange={onTabChange}
            variant="transparent"
          />
        </div>
      </div>
    </section>
  );
}
