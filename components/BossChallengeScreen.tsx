"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { BossChallenge } from "@/types";
import QuizScreen from "./QuizScreen";

interface BossChallengeScreenProps {
  challenge: BossChallenge;
  onComplete: () => void;
  onBack: () => void;
}

export default function BossChallengeScreen({
  challenge,
  onComplete,
  onBack,
}: BossChallengeScreenProps) {
  const { completeBossChallenge, user, badges } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState({ score: 0, total: 0 });

  const handleStartChallenge = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (quizScore: number, total: number) => {
    setScore({ score: quizScore, total });
    setShowQuiz(false);
    // Complete challenge and award rewards
    completeBossChallenge(challenge.id);
    setShowCompletion(true);
  };

  const earnedBadge = challenge.rewards.badge
    ? badges.find((b) => b.id === challenge.rewards.badge)
    : null;
  const isNewBadge = earnedBadge && !user.badges.includes(earnedBadge.id);

  if (showQuiz) {
    return (
      <QuizScreen
        questions={challenge.questions}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[16px] p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Challenge Complete!
              </h2>
              <p className="text-gray-600">You've mastered this phase!</p>
            </div>

            <div className="bg-gray-50 rounded-[16px] p-4 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-1">Your Score</p>
              <p className="text-3xl font-bold text-primary">
                {score.score}/{score.total}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-blue-50 rounded-[16px] p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold text-gray-900">XP Earned</span>
                </div>
                <span className="text-primary font-bold text-lg">
                  +{challenge.rewards.xp}
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
                  +{challenge.rewards.coins}
                </span>
              </div>
              {isNewBadge && earnedBadge && (
                <div className="flex items-center justify-between bg-green-50 rounded-[16px] p-4 border-2 border-secondary">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{earnedBadge.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">New Badge!</p>
                      <p className="text-sm text-gray-600">
                        {earnedBadge.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onComplete}
              className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 pb-20">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="text-white hover:text-white/80">
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
            <h2 className="text-xl font-bold text-white">Boss Challenge</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="text-8xl mb-4">👹</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {challenge.title}
          </h1>
          <p className="text-white/90 text-lg">{challenge.description}</p>
        </div>

        {/* Scenario Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-6 mb-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-3">📖 Scenario</h3>
          <p className="text-white leading-relaxed">{challenge.scenario}</p>
        </div>

        {/* Rewards Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-4 mb-6 border border-white/20">
          <h3 className="text-white font-bold mb-3">🏆 Rewards</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-white font-semibold">
                +{challenge.rewards.xp} XP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="text-white font-semibold">
                +{challenge.rewards.coins} Coins
              </span>
            </div>
            {challenge.rewards.badge && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏅</span>
                <span className="text-white font-semibold">Badge</span>
              </div>
            )}
          </div>
        </div>

        {/* Challenge Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-4 mb-6 border border-white/20">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm">Questions</span>
            <span className="font-bold">{challenge.questions.length}</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartChallenge}
          className="w-full bg-accent text-gray-900 py-4 rounded-[16px] text-lg font-bold hover:bg-yellow-400 transition-colors shadow-xl"
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
}
