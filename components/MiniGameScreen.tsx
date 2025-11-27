"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { MiniGame } from "@/types";

interface MiniGameScreenProps {
  miniGame: MiniGame;
  onComplete: () => void;
  onBack: () => void;
}

export default function MiniGameScreen({
  miniGame,
  onComplete,
  onBack,
}: MiniGameScreenProps) {
  const { updateUser, user } = useApp();
  const [gameComplete, setGameComplete] = useState(false);

  const handleComplete = () => {
    // Award rewards
    updateUser({
      xp: user.xp + miniGame.rewards.xp,
      coins: user.coins + miniGame.rewards.coins,
    });
    setGameComplete(true);
  };

  const handleFinish = () => {
    onComplete();
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-blue-500 to-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[16px] p-8 shadow-2xl text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Great job!
            </h2>
            <p className="text-gray-600 mb-6">
              You've completed the {miniGame.title}!
            </p>
            <div className="bg-gray-50 rounded-[16px] p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">XP Earned</span>
                <span className="text-primary font-bold">
                  +{miniGame.rewards.xp}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Coins Earned</span>
                <span className="text-accent font-bold">
                  +{miniGame.rewards.coins}
                </span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full bg-primary text-white py-3 rounded-[16px] font-bold hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Budget Simulator Game
  if (miniGame.type === "budget") {
    const [budget, setBudget] = useState(miniGame.data);
    const totalSpent =
      budget.items.reduce((sum: number, item: any) => sum + item.cost, 0) -
        budget.items.find((i: any) => i.id === "savings")?.cost || 0;
    const savings = budget.income - totalSpent;
    const savingsPercent = (savings / budget.income) * 100;

    return (
      <div className="min-h-screen bg-white pb-20">
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
              <h2 className="text-xl font-bold text-gray-900">
                {miniGame.title}
              </h2>
              <div className="w-6"></div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-[16px] p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Instructions</h3>
            <p className="text-gray-700 text-sm">{miniGame.instructions}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[16px] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Income:</span>
              <span className="font-bold text-primary">{budget.income} 💰</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Spent:</span>
              <span className="font-bold text-gray-900">{totalSpent} 💰</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Savings:</span>
              <span
                className={`font-bold ${
                  savingsPercent >= budget.targetSavings
                    ? "text-secondary"
                    : "text-red-500"
                }`}
              >
                {savings} 💰 ({Math.round(savingsPercent)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  savingsPercent >= budget.targetSavings
                    ? "bg-secondary"
                    : "bg-red-400"
                }`}
                style={{ width: `${Math.min(savingsPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {budget.items
              .filter((item: any) => item.id !== "savings")
              .map((item: any) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-[16px] p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max={budget.income}
                      value={item.cost}
                      onChange={(e) => {
                        const newCost = parseInt(e.target.value) || 0;
                        setBudget({
                          ...budget,
                          items: budget.items.map((i: any) =>
                            i.id === item.id ? { ...i, cost: newCost } : i
                          ),
                        });
                      }}
                      className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center"
                    />
                    <span className="text-gray-600">💰</span>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={handleComplete}
            disabled={savingsPercent < budget.targetSavings}
            className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {savingsPercent >= budget.targetSavings
              ? "Complete Challenge"
              : `Save at least ${budget.targetSavings}% to continue`}
          </button>
        </div>
      </div>
    );
  }

  // Saving Goal Game
  if (miniGame.type === "saving") {
    const [current, setCurrent] = useState(miniGame.data.current);
    const progress = (current / miniGame.data.goal) * 100;

    return (
      <div className="min-h-screen bg-white pb-20">
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
              <h2 className="text-xl font-bold text-gray-900">
                {miniGame.title}
              </h2>
              <div className="w-6"></div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-[16px] p-6 mb-6 text-center">
            <div className="text-6xl mb-4">🐷</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Savings Goal
            </h3>
            <p className="text-gray-600">{miniGame.instructions}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[16px] p-6 mb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">Current Savings</p>
              <p className="text-4xl font-bold text-primary">{current} 💰</p>
              <p className="text-sm text-gray-600 mt-2">
                Goal: {miniGame.data.goal} 💰
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-secondary h-4 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrent(Math.max(0, current - 10))}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold"
              >
                -10
              </button>
              <button
                onClick={() =>
                  setCurrent(
                    Math.min(
                      miniGame.data.goal,
                      current + miniGame.data.weeklyIncome
                    )
                  )
                }
                className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold"
              >
                +{miniGame.data.weeklyIncome} (Weekly)
              </button>
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={current < miniGame.data.goal}
            className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {current >= miniGame.data.goal
              ? "Goal Achieved! Complete"
              : `Save ${miniGame.data.goal - current} more to complete`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-600">Mini-game type not implemented yet</p>
    </div>
  );
}
