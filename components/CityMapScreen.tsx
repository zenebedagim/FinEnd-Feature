"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface CityMapScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
  onPhaseSelect: (phaseId: string) => void;
  onBossChallenge?: (challenge: any) => void;
}

export default function CityMapScreen({
  activeTab,
  onTabChange,
  onBack,
  onPhaseSelect,
  onBossChallenge,
}: CityMapScreenProps) {
  const { phases, user, getBossChallengeByPhase } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pb-20">
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
            <h2 className="text-xl font-bold text-gray-900">City of Wealth</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* City Map */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const isUnlocked = user.unlockedPhases.includes(phase.id);
            const phaseLessons = phase.lessons || [];
            const completedCount = phaseLessons.filter((lesson) =>
              user.completedLessons.includes(lesson.id)
            ).length;
            const totalLessons = phaseLessons.length;
            const progress =
              totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
            const phaseComplete =
              totalLessons > 0 && completedCount === totalLessons;

            return (
              <div
                key={phase.id}
                className={`relative ${
                  isUnlocked
                    ? "border-2 border-primary"
                    : "border-2 border-gray-300 opacity-60"
                } rounded-[16px] p-4 bg-white shadow-md`}
              >
                <div className="flex items-center gap-4">
                  {/* Phase Icon */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                      isUnlocked ? "bg-primary/10" : "bg-gray-200"
                    }`}
                  >
                    {phase.icon}
                  </div>

                  {/* Phase Info */}
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isUnlocked ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {phase.title}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${
                        isUnlocked ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {phase.description}
                    </p>

                    {/* Progress Bar */}
                    {isUnlocked && totalLessons > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>
                            {completedCount}/{totalLessons} lessons
                          </span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Stars */}
                    {isUnlocked && (
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < phase.stars
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Locked Message */}
                    {!isUnlocked && (
                      <p className="text-xs text-gray-500 italic">
                        Complete previous phases to unlock
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {phaseComplete && onBossChallenge && (
                      <button
                        onClick={() => {
                          const challenge = getBossChallengeByPhase(phase.id);
                          if (challenge) {
                            onBossChallenge(challenge);
                          }
                        }}
                        className="px-4 py-2 rounded-full font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm"
                      >
                        👹 Boss Challenge
                      </button>
                    )}
                    <button
                      onClick={() => isUnlocked && onPhaseSelect(phase.id)}
                      disabled={!isUnlocked}
                      className={`px-4 py-2 rounded-full font-semibold ${
                        isUnlocked
                          ? "bg-primary text-white hover:bg-blue-600"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      } transition-colors`}
                    >
                      {isUnlocked ? "Start" : "Locked"}
                    </button>
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
