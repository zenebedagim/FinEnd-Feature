"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface AchievementsScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function AchievementsScreen({
  activeTab,
  onTabChange,
  onBack,
}: AchievementsScreenProps) {
  const { achievements } = useApp();

  const categories = [
    "learning",
    "streaks",
    "coins",
    "lessons",
    "phases",
  ] as const;

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      learning: "Learning",
      streaks: "Streaks",
      coins: "Coins",
      lessons: "Lessons",
      phases: "Phases",
    };
    return names[category] || category;
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: "bg-gray-100 border-gray-300",
      rare: "bg-blue-100 border-blue-300",
      epic: "bg-purple-100 border-purple-300",
      legendary: "bg-yellow-100 border-yellow-400",
    };
    return colors[rarity] || colors.common;
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
            <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {categories.map((category) => {
          const categoryAchievements = achievements.filter(
            (a) => a.category === category
          );
          const unlockedCount = categoryAchievements.filter(
            (a) => a.unlocked
          ).length;

          if (categoryAchievements.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {getCategoryName(category)}
                </h3>
                <span className="text-sm text-gray-600">
                  {unlockedCount}/{categoryAchievements.length}
                </span>
              </div>
              <div className="space-y-3">
                {categoryAchievements.map((achievement) => {
                  const progress =
                    (achievement.current / achievement.target) * 100;
                  const isUnlocked = achievement.unlocked;

                  return (
                    <div
                      key={achievement.id}
                      className={`bg-white rounded-[16px] p-4 shadow-md border-2 ${
                        isUnlocked
                          ? getRarityColor(achievement.rarity)
                          : "border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`text-4xl ${
                            isUnlocked ? "" : "grayscale opacity-50"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">
                              {achievement.name}
                            </h4>
                            {isUnlocked && (
                              <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full">
                                Unlocked
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {achievement.description}
                          </p>
                          {!isUnlocked && (
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>
                                  {achievement.current}/{achievement.target}
                                </span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(progress, 100)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                achievement.rarity === "legendary"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : achievement.rarity === "epic"
                                  ? "bg-purple-200 text-purple-800"
                                  : achievement.rarity === "rare"
                                  ? "bg-blue-200 text-blue-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
