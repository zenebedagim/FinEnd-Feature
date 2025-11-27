"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface ParentPortalScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function ParentPortalScreen({
  activeTab,
  onTabChange,
  onBack,
}: ParentPortalScreenProps) {
  const { user, phases, lessons } = useApp();

  const totalLessonsCompleted = user.completedLessons.length;
  const totalLessons = lessons.length;
  const totalPhasesCompleted = user.unlockedPhases.length;
  const averageAccuracy = 85; // Mock data - would calculate from quiz scores

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
            <h2 className="text-xl font-bold text-gray-900">Parent Portal</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Child Info */}
        <div className="bg-white rounded-[16px] p-6 shadow-md mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">Level {user.level}</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-[16px] p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Learning Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Lessons Completed</span>
                <span className="font-bold text-primary">
                  {totalLessonsCompleted}/{totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${(totalLessonsCompleted / totalLessons) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Phases Completed</span>
                <span className="font-bold text-secondary">
                  {totalPhasesCompleted}/7
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${(totalPhasesCompleted / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {user.xp}
            </div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {user.streak}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-secondary mb-1">
              {averageAccuracy}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {user.badges.length}
            </div>
            <div className="text-sm text-gray-600">Badges</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[16px] p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {user.completedLessons
              .slice(-3)
              .reverse()
              .map((lessonId) => {
                const lesson = lessons.find((l) => l.id === lessonId);
                if (!lesson) return null;
                return (
                  <div
                    key={lessonId}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-secondary">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
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
