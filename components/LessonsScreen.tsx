"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface LessonsScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onPhaseSelect: (phaseId: string) => void;
  onLessonSelect: (lessonId: string) => void;
}

export default function LessonsScreen({
  activeTab,
  onTabChange,
  onPhaseSelect,
  onLessonSelect,
}: LessonsScreenProps) {
  const { user, phases, lessons } = useApp();

  // Get first phase with lessons
  const firstPhase = phases.find((p) => p.lessons.length > 0);
  const phaseLessons = firstPhase
    ? lessons.filter((l) => l.phaseId === firstPhase.id)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Level {user.level}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-accent text-sm">⭐</span>
                  <span className="text-xs text-gray-500">{user.xp} XP</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-accent text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                <span>💰</span>
                <span>{user.coins}</span>
              </div>
              <div className="bg-secondary text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                <span>🔥</span>
                <span>{user.streak}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Map */}
      <div className="max-w-md mx-auto px-8 py-6 relative">
        <div className="relative flex flex-col items-center">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>

          {/* Nodes */}
          <div className="relative z-10 w-full flex flex-col items-center gap-6">
            {/* Phase Title */}
            {firstPhase && (
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-semibold text-primary">
                  {firstPhase.title}
                </span>
              </div>
            )}

            {/* Lessons */}
            {phaseLessons.map((lesson, index) => {
              const isCompleted = user.completedLessons.includes(lesson.id);
              const isLocked = lesson.locked;
              const canStart = !isLocked && !isCompleted;

              return (
                <div key={lesson.id} className="flex flex-col items-center">
                  {/* Stars */}
                  {isCompleted && (
                    <div className="flex gap-1 mb-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-yellow-400">⭐</span>
                    </div>
                  )}

                  {/* Lesson Node */}
                  <div className="flex items-center gap-4">
                    {canStart && (
                      <button
                        onClick={() => onLessonSelect(lesson.id)}
                        className="bg-accent text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-400 transition-colors"
                      >
                        START
                      </button>
                    )}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                        isCompleted
                          ? "bg-secondary"
                          : isLocked
                          ? "bg-gray-200"
                          : "bg-white border-2 border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <span className="text-white text-xl">✓</span>
                      ) : isLocked ? (
                        <span className="text-gray-400 text-xl">🔒</span>
                      ) : (
                        <span className="text-2xl">📚</span>
                      )}
                    </div>
                  </div>

                  {/* Lesson Label */}
                  <div className="bg-white px-3 py-1 rounded-full shadow-md mt-2">
                    <span
                      className={`text-xs font-semibold ${
                        isCompleted
                          ? "text-secondary"
                          : isLocked
                          ? "text-gray-400"
                          : "text-primary"
                      }`}
                    >
                      {lesson.title}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Great Progress Popup */}
            {user.completedLessons.length > 0 && (
              <div className="bg-white rounded-[16px] shadow-lg p-4 max-w-xs border border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🐿️</span>
                  <p className="text-sm text-gray-700">
                    Great progress! Keep going to unlock more lessons!
                  </p>
                </div>
              </div>
            )}

            {/* Start Here Marker */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏁</span>
              </div>
              <div className="bg-white px-3 py-1 rounded-full shadow-md mt-2">
                <span className="text-xs font-semibold text-accent">
                  Start Here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
