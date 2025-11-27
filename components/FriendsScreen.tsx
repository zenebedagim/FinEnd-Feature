"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { mockFriends } from "@/data/social";
import BottomNav from "./BottomNav";

interface FriendsScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function FriendsScreen({
  activeTab,
  onTabChange,
  onBack,
}: FriendsScreenProps) {
  const { user } = useApp();
  const [referralCode] = useState(`FINED-${user.id.slice(-6).toUpperCase()}`);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on FinEd!",
        text: `Learn financial literacy with me! Use my code: ${referralCode}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Join me on FinEd! Use my referral code: ${referralCode}`
      );
      alert("Referral code copied to clipboard!");
    }
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
            <h2 className="text-xl font-bold text-gray-900">Friends</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Referral Code Card */}
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[16px] p-6 shadow-lg mb-6 text-white">
          <h3 className="text-lg font-bold mb-2">Your Referral Code</h3>
          <div className="bg-white/20 rounded-[16px] p-4 mb-4">
            <p className="text-2xl font-bold text-center">{referralCode}</p>
          </div>
          <button
            onClick={handleShare}
            className="w-full bg-white text-primary py-3 rounded-[16px] font-bold hover:bg-gray-100 transition-colors"
          >
            Share & Earn Rewards
          </button>
          <p className="text-white/80 text-sm mt-3 text-center">
            Share your code and earn 50 XP + 25 coins for each friend who joins!
          </p>
        </div>

        {/* Friends List */}
        <div className="bg-white rounded-[16px] p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Your Friends ({mockFriends.length})
          </h3>
          <div className="space-y-3">
            {mockFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-[16px]"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                    {friend.avatar}
                  </div>
                  {friend.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{friend.name}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Level {friend.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <span>⭐ {friend.xp} XP</span>
                    <span>🔥 {friend.streak}</span>
                  </div>
                </div>
                <button className="text-primary text-sm font-semibold">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Friends */}
        <div className="mt-6 bg-white rounded-[16px] p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add Friends</h3>
          <div className="space-y-3">
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-[16px] font-semibold hover:bg-gray-200 transition-colors">
              🔍 Search by Username
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-[16px] font-semibold hover:bg-gray-200 transition-colors">
              📱 Invite via Phone
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-[16px] font-semibold hover:bg-gray-200 transition-colors">
              📧 Invite via Email
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
