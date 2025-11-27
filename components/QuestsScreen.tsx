"use client";

import { useApp } from "@/contexts/AppContext";
import { Quest } from "@/types";
import BottomNav from "./BottomNav";

interface QuestsScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function QuestsScreen({
  activeTab,
  onTabChange,
  onBack,
}: QuestsScreenProps) {
  const { user, quests, completeQuest } = useApp();

  const dailyQuests = quests.filter((q) => q.type === "daily");
  const weeklyQuests = quests.filter((q) => q.type === "weekly");

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
            <h2 className="text-xl font-bold text-gray-900">Quests</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Daily Quests */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📅</span>
            <span>Daily Quests</span>
          </h3>
          <div className="space-y-3">
            {dailyQuests.map((quest) => {
              const progress = (quest.current / quest.target) * 100;
              const isCompleted =
                quest.completed || quest.current >= quest.target;

              return (
                <div
                  key={quest.id}
                  className={`bg-white rounded-[16px] p-4 shadow-md border-2 ${
                    isCompleted ? "border-secondary" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{quest.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {quest.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {quest.description}
                      </p>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>
                            {quest.current}/{quest.target}
                          </span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isCompleted ? "bg-secondary" : "bg-primary"
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-primary font-semibold">
                            +{quest.reward.xp} XP
                          </span>
                          <span className="text-accent font-semibold">
                            +{quest.reward.coins} 💰
                          </span>
                        </div>
                        {isCompleted ? (
                          <span className="text-secondary font-bold text-sm">
                            ✓ Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => completeQuest(quest.id)}
                            className="text-primary text-sm font-semibold hover:underline"
                          >
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Quests */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📆</span>
            <span>Weekly Quests</span>
          </h3>
          <div className="space-y-3">
            {weeklyQuests.map((quest) => {
              const progress = (quest.current / quest.target) * 100;
              const isCompleted =
                quest.completed || quest.current >= quest.target;

              return (
                <div
                  key={quest.id}
                  className={`bg-white rounded-[16px] p-4 shadow-md border-2 ${
                    isCompleted ? "border-secondary" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{quest.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {quest.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {quest.description}
                      </p>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>
                            {quest.current}/{quest.target}
                          </span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isCompleted ? "bg-secondary" : "bg-primary"
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-primary font-semibold">
                            +{quest.reward.xp} XP
                          </span>
                          <span className="text-accent font-semibold">
                            +{quest.reward.coins} 💰
                          </span>
                        </div>
                        {isCompleted ? (
                          <span className="text-secondary font-bold text-sm">
                            ✓ Completed
                          </span>
                        ) : (
                          <button
                            onClick={() => completeQuest(quest.id)}
                            className="text-primary text-sm font-semibold hover:underline"
                          >
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
