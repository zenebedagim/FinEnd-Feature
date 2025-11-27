"use client";

import { useApp } from "@/contexts/AppContext";
import { Lesson } from "@/types";

interface LessonDetailScreenProps {
  lesson: Lesson;
  onStartQuiz: () => void;
  onBack: () => void;
  onStartMiniGame?: (miniGame: any) => void;
}

export default function LessonDetailScreen({
  lesson,
  onStartQuiz,
  onBack,
  onStartMiniGame,
}: LessonDetailScreenProps) {
  const { getMiniGameByLessonId } = useApp();
  const lessonMiniGame = getMiniGameByLessonId(lesson.id);
  return (
    <div className="min-h-screen bg-white pb-20">
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
            <h2 className="text-xl font-bold text-gray-900">Lesson</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-[16px] p-6 mb-6">
          <div className="text-6xl mb-4 text-center">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {lesson.title}
          </h1>
          <p className="text-gray-600 text-center mb-4">{lesson.description}</p>
        </div>

        {/* Intro Story */}
        <div className="bg-gray-50 rounded-[16px] p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">📖 Story</h3>
          <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
        </div>

        {/* Lesson Info */}
        <div className="bg-white border border-gray-200 rounded-[16px] p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Questions</p>
              <p className="font-semibold text-gray-900">
                {lesson.quiz.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rewards</p>
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">
                  +{lesson.rewards.xp} XP
                </span>
                <span className="text-accent font-semibold">
                  +{lesson.rewards.coins} 💰
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {lessonMiniGame && onStartMiniGame && (
            <button
              onClick={() => onStartMiniGame(lessonMiniGame)}
              className="w-full bg-secondary text-white py-3 rounded-[16px] text-base font-bold hover:bg-green-600 transition-colors shadow-md"
            >
              🎮 Play Mini-Game
            </button>
          )}
          <button
            onClick={onStartQuiz}
            className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
