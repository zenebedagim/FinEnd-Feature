"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Story } from "@/types";
import BottomNav from "./BottomNav";

interface StoryScreenProps {
  story: Story;
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
  onComplete?: () => void;
}

export default function StoryScreen({
  story,
  activeTab,
  onTabChange,
  onBack,
  onComplete,
}: StoryScreenProps) {
  const { updateUser, user } = useApp();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const currentChapter = story.chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === story.chapters.length - 1;

  const handleChoice = (choiceId: string, nextChapterId: string) => {
    setSelectedChoice(choiceId);
    const nextIndex = story.chapters.findIndex((ch) => ch.id === nextChapterId);
    if (nextIndex !== -1) {
      setTimeout(() => {
        setCurrentChapterIndex(nextIndex);
        setSelectedChoice(null);
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < story.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else {
      // Story complete - award rewards
      updateUser({
        xp: user.xp + 50,
        coins: user.coins + 25,
      });
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
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
            <h2 className="text-xl font-bold text-gray-900">Story</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Story Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {story.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Chapter {currentChapterIndex + 1}</span>
            <span>•</span>
            <span>{story.chapters.length} total</span>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-white rounded-[16px] p-6 shadow-lg mb-6">
          {currentChapter.image && (
            <div className="text-8xl text-center mb-4">
              {currentChapter.image}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {currentChapter.title}
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {currentChapter.content}
          </p>

          {/* Choices */}
          {currentChapter.choices && !selectedChoice && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-900 mb-3">
                What should Seba do?
              </p>
              {currentChapter.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.id, choice.nextChapterId)}
                  className="w-full bg-primary text-white py-3 px-4 rounded-[16px] font-semibold hover:bg-blue-600 transition-colors text-left"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* Outcome Display */}
          {selectedChoice && currentChapter.choices && (
            <div className="bg-secondary/20 border-2 border-secondary rounded-[16px] p-4 mt-4">
              <p className="text-secondary font-semibold mb-2">Outcome:</p>
              <p className="text-gray-700">
                {
                  currentChapter.choices.find((c) => c.id === selectedChoice)
                    ?.outcome
                }
              </p>
            </div>
          )}

          {/* Next Button */}
          {(!currentChapter.choices || selectedChoice) && (
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors mt-4"
            >
              {isLastChapter ? "Finish Story" : "Continue"}
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 justify-center">
          {story.chapters.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index <= currentChapterIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 w-2"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
