"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface ProfileScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onLogout: () => void;
  onLeaderboard: () => void;
  onCertificates: () => void;
  onParentPortal?: () => void;
  onTeacherDashboard?: () => void;
  onAITutor?: () => void;
  onPracticeMode?: () => void;
  onNotifications?: () => void;
  onFriends?: () => void;
  onAnalytics?: () => void;
}

export default function ProfileScreen({
  activeTab,
  onTabChange,
  onLogout,
  onLeaderboard,
  onCertificates,
  onParentPortal,
  onTeacherDashboard,
  onAITutor,
  onPracticeMode,
  onNotifications,
  onFriends,
  onAnalytics,
}: ProfileScreenProps) {
  const { user, badges, logout } = useApp();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  // Get earned badges
  const earnedBadges = badges.filter((badge) => user.badges.includes(badge.id));
  const lockedBadges = badges.filter(
    (badge) => !user.badges.includes(badge.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-white/80 text-sm">Member since January 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="max-w-md mx-auto px-4 -mt-6">
        <div className="bg-white rounded-[16px] p-6 shadow-lg mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {user.level}
              </p>
              <p className="text-sm text-gray-600">Level</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary mb-1">
                {user.xp}
              </p>
              <p className="text-sm text-gray-600">XP</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent mb-1">
                {user.coins}
              </p>
              <p className="text-sm text-gray-600">Coins</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500 mb-1">
                {user.streak}
              </p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-white rounded-[16px] p-6 shadow-lg mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Badges Earned ({earnedBadges.length}/{badges.length})
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl">{badge.icon}</span>
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {badge.name}
                </p>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center opacity-40"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl">{badge.icon}</span>
                </div>
                <p className="text-xs font-medium text-gray-500">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-[16px] p-6 shadow-lg mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">More</h3>
          <div className="space-y-3">
            <button
              onClick={onLeaderboard}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-primary">🏆</span>
                </div>
                <span className="font-medium text-gray-900">Leaderboard</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={onCertificates}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-accent">📜</span>
                </div>
                <span className="font-medium text-gray-900">Certificates</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {onAITutor && (
              <button
                onClick={onAITutor}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-secondary">🐿️</span>
                  </div>
                  <span className="font-medium text-gray-900">AI Tutor</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            {onPracticeMode && (
              <button
                onClick={onPracticeMode}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">📚</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    Practice Mode
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            {onNotifications && (
              <button
                onClick={onNotifications}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-primary">🔔</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    Notifications
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            {onFriends && (
              <button
                onClick={onFriends}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-secondary">👥</span>
                  </div>
                  <span className="font-medium text-gray-900">Friends</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            {onAnalytics && (
              <button
                onClick={onAnalytics}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">📊</span>
                  </div>
                  <span className="font-medium text-gray-900">Analytics</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-[16px] p-6 shadow-lg mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-primary">🔔</span>
                </div>
                <span className="font-medium text-gray-900">Notifications</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-primary">🔒</span>
                </div>
                <span className="font-medium text-gray-900">Privacy</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-primary">❓</span>
                </div>
                <span className="font-medium text-gray-900">
                  Help & Support
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-[16px] p-6 shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">🚪</span>
            </div>
            <span className="font-medium text-red-600">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
