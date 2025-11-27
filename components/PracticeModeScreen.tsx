"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface PracticeModeScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
  onPracticeLesson: (lessonId: string) => void;
}

export default function PracticeModeScreen({
  activeTab,
  onTabChange,
  onBack,
  onPracticeLesson,
}: PracticeModeScreenProps) {
  const { user, lessons } = useApp();

  // Find lessons that might need practice (completed but could be reviewed)
  const practiceLessons = lessons.filter((lesson) =>
    user.completedLessons.includes(lesson.id)
  );

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
            <h2 className="text-xl font-bold text-gray-900">Practice Mode</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-[16px] p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Review & Practice
          </h3>
          <p className="text-gray-600 text-sm">
            Practice lessons you've already completed to strengthen your
            understanding. Earn reduced rewards for practice!
          </p>
        </div>

        {practiceLessons.length === 0 ? (
          <div className="bg-white rounded-[16px] p-8 text-center shadow-md">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Lessons to Practice Yet
            </h3>
            <p className="text-gray-600">
              Complete some lessons first to practice them!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {practiceLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-[16px] p-4 shadow-md border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onPracticeLesson(lesson.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-[16px] font-semibold text-sm hover:bg-purple-700 transition-colors ml-4"
                  >
                    Practice
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span>📝 {lesson.quiz.length} questions</span>
                  <span className="text-purple-600">⭐ Reduced rewards</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
