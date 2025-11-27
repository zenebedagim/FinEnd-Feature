"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { generateLeaderboard } from "@/data/leaderboard";
import BottomNav from "./BottomNav";

interface LeaderboardScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function LeaderboardScreen({
  activeTab,
  onTabChange,
  onBack,
}: LeaderboardScreenProps) {
  const { user } = useApp();
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all">(
    "weekly"
  );

  const leaderboard = generateLeaderboard(user);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
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
            <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex gap-2 bg-white rounded-[16px] p-1 shadow-sm">
          <button
            onClick={() => setTimeframe("weekly")}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
              timeframe === "weekly"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
              timeframe === "monthly"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe("all")}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
              timeframe === "all"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-3">
          {leaderboard.map((entry) => {
            const isCurrentUser = entry.userId === user.id;

            return (
              <div
                key={entry.userId}
                className={`bg-white rounded-[16px] p-4 shadow-md border-2 ${
                  isCurrentUser
                    ? "border-primary bg-primary/5"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">
                      {getRankIcon(entry.rank)}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                    {entry.avatar}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900">{entry.name}</p>
                      {isCurrentUser && (
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>Level {entry.level}</span>
                      <span>🔥 {entry.streak}</span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{entry.xp}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
