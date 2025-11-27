"use client";

import React, { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Lesson } from "@/types";

interface LessonCompleteScreenProps {
  lesson: Lesson;
  score: number;
  totalQuestions: number;
  onNextLesson: () => void;
  onBack: () => void;
}

export default function LessonCompleteScreen({
  lesson,
  score,
  totalQuestions,
  onNextLesson,
  onBack,
}: LessonCompleteScreenProps) {
  const { user, badges, completeLesson } = useApp();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const earnedBadge = lesson.rewards.badge
    ? badges.find((b) => b.id === lesson.rewards.badge)
    : null;
  const isNewBadge = earnedBadge && !user.badges.includes(earnedBadge.id);

  // Complete the lesson when this screen is shown
  useEffect(() => {
    if (!user.completedLessons.includes(lesson.id)) {
      const oldLevel = user.level;
      completeLesson(lesson.id);

      // Check for level up (new level would be calculated in completeLesson)
      // This is a simplified check - in real app, we'd track level changes
      const newXP = user.xp + lesson.rewards.xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel > oldLevel) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      // Show badge unlock animation
      if (isNewBadge) {
        setShowBadgeUnlock(true);
        setTimeout(() => setShowBadgeUnlock(false), 3000);
      }
    }
  }, [lesson.id, user.completedLessons, completeLesson]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-[16px] p-8 text-center max-w-sm mx-4 animate-bounce">
            <div className="text-8xl mb-4">🎊</div>
            <h2 className="text-3xl font-bold text-primary mb-2">Level Up!</h2>
            <p className="text-gray-600 text-lg">
              Congratulations on reaching the next level!
            </p>
          </div>
        </div>
      )}

      {/* Badge Unlock Animation */}
      {showBadgeUnlock && earnedBadge && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-[16px] p-8 text-center max-w-sm mx-4 animate-scale-in">
            <div className="text-8xl mb-4 animate-bounce">
              {earnedBadge.icon}
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Badge Unlocked!
            </h2>
            <p className="text-gray-900 font-semibold text-lg mb-2">
              {earnedBadge.name}
            </p>
            <p className="text-gray-600">{earnedBadge.description}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Celebration Card */}
        <div className="bg-white rounded-[16px] p-8 shadow-2xl">
          {/* Celebration Icon */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Well done!
            </h2>
            <p className="text-gray-600">You've completed this lesson</p>
          </div>

          {/* Score */}
          <div className="bg-gray-50 rounded-[16px] p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Your Score</p>
            <p className="text-3xl font-bold text-primary">
              {score}/{totalQuestions}
            </p>
            <p className="text-sm text-gray-600 mt-1">{percentage}% Correct</p>
          </div>

          {/* Rewards */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between bg-blue-50 rounded-[16px] p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold text-gray-900">XP Earned</span>
              </div>
              <span className="text-primary font-bold text-lg">
                +{lesson.rewards.xp}
              </span>
            </div>
            <div className="flex items-center justify-between bg-yellow-50 rounded-[16px] p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span className="font-semibold text-gray-900">
                  Coins Earned
                </span>
              </div>
              <span className="text-accent font-bold text-lg">
                +{lesson.rewards.coins}
              </span>
            </div>
            {isNewBadge && earnedBadge && (
              <div className="flex items-center justify-between bg-green-50 rounded-[16px] p-4 border-2 border-secondary">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{earnedBadge.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">New Badge!</p>
                    <p className="text-sm text-gray-600">{earnedBadge.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onNextLesson}
              className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors"
            >
              Next Lesson
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-primary border-2 border-primary py-4 rounded-[16px] text-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
