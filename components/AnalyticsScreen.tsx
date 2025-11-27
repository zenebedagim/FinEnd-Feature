"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface AnalyticsScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function AnalyticsScreen({
  activeTab,
  onTabChange,
  onBack,
}: AnalyticsScreenProps) {
  const { user, lessons, phases } = useApp();

  // Calculate analytics
  const totalLessons = lessons.length;
  const completedLessons = user.completedLessons.length;
  const completionRate =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const averageAccuracy = 85; // Mock - would calculate from quiz scores
  const totalLearningTime = 120; // Mock - in minutes
  const xpPerDay = user.xp / Math.max(user.streak, 1);

  // Weekly progress (mock data)
  const weeklyProgress = [
    { day: "Mon", xp: 50, lessons: 1 },
    { day: "Tue", xp: 75, lessons: 2 },
    { day: "Wed", xp: 30, lessons: 1 },
    { day: "Thu", xp: 100, lessons: 2 },
    { day: "Fri", xp: 60, lessons: 1 },
    { day: "Sat", xp: 40, lessons: 1 },
    { day: "Sun", xp: 80, lessons: 2 },
  ];

  const maxXP = Math.max(...weeklyProgress.map((d) => d.xp));

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
            <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {completionRate.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-secondary mb-1">
              {averageAccuracy}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {totalLearningTime}
            </div>
            <div className="text-sm text-gray-600">Minutes Learned</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {xpPerDay.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">XP per Day</div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white rounded-[16px] p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Weekly Progress
          </h3>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {day.day}
                  </span>
                  <span className="text-sm text-gray-600">
                    {day.xp} XP • {day.lessons} lessons
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${(day.xp / maxXP) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Progress */}
        <div className="bg-white rounded-[16px] p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Phase Progress
          </h3>
          <div className="space-y-3">
            {phases.map((phase) => {
              const phaseLessons = phase.lessons || [];
              const completed = phaseLessons.filter((l) =>
                user.completedLessons.includes(l.id)
              ).length;
              const progress =
                phaseLessons.length > 0
                  ? (completed / phaseLessons.length) * 100
                  : 0;

              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{phase.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {phase.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {completed}/{phaseLessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-white rounded-[16px] p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Learning Streak
          </h3>
          <div className="text-center">
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-4xl font-bold text-primary mb-1">
              {user.streak}
            </div>
            <div className="text-gray-600">Days in a row!</div>
            <p className="text-sm text-gray-500 mt-3">
              Keep it up! Learning every day helps you build strong financial
              habits.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
