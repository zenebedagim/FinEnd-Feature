"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { onboardingQuestions } from "@/data/onboardingQuiz";

interface OnboardingQuizScreenProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function OnboardingQuizScreen({
  onComplete,
  onBack,
}: OnboardingQuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuestion = onboardingQuestions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === onboardingQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    console.log("Answer selected:", answerIndex);
    setSelectedAnswer(answerIndex);
    console.log("Selected answer state updated to:", answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      console.log("No answer selected");
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Update score if answer is correct (but not for last question to avoid double-counting)
    if (isCorrect && !isLastQuestion) {
      setScore((prevScore) => prevScore + 1);
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowFeedback(true);
    console.log("Answer submitted, feedback shown");
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // For the last question, calculate final score
      // Score already includes all previous correct answers (questions 1-4)
      // Add 1 if the last answer (question 5) is correct
      const isLastCorrect = selectedAnswer === currentQuestion.correctAnswer;
      const finalScore = isLastCorrect ? score + 1 : score;

      // Ensure we have a valid answer before completing
      if (selectedAnswer === null) {
        console.log("Cannot complete: no answer selected");
        return;
      }

      console.log("Completing onboarding with score:", finalScore);
      // Call onComplete with the final score (0-5)
      onComplete(finalScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-500 to-blue-600 pb-20">
      {/* Header */}
      <div className="bg-white/10 shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-3 text-white hover:text-white/80 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            <span>Back</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm opacity-80">Assessment</p>
              <h2 className="text-xl font-bold">
                Just 5 quick questions before we start your first lesson!
              </h2>
            </div>
            <div className="text-white text-sm font-semibold">
              {currentQuestionIndex + 1}/{onboardingQuestions.length}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / onboardingQuestions.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Debug: Show selected answer */}
        {selectedAnswer !== null && (
          <div className="mb-2 text-white text-sm">
            Selected: {selectedAnswer + 1} (Answer will be submitted)
          </div>
        )}
        <div className="bg-white/10 rounded-[16px] p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAnswerSelect(index);
                  }}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                    showCorrect
                      ? "bg-secondary border-secondary text-white"
                      : showIncorrect
                      ? "bg-red-500 border-red-600 text-white"
                      : isSelected
                      ? "bg-white/30 border-white text-white"
                      : "bg-white/10 border-white/30 text-white hover:border-white/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showIncorrect && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && currentQuestion.explanation && (
            <div
              className={`mt-4 p-4 rounded-[16px] ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-secondary/50 border-2 border-secondary"
                  : "bg-red-500/50 border-2 border-red-400"
              }`}
            >
              <p className="text-sm font-medium text-white">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!showFeedback ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(
                  "Submit button clicked, selectedAnswer:",
                  selectedAnswer
                );
                handleSubmitAnswer();
              }}
              disabled={selectedAnswer === null}
              className={`w-full py-4 rounded-[16px] text-lg font-bold transition-colors shadow-lg ${
                selectedAnswer === null
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                  : "bg-accent text-gray-900 hover:bg-yellow-400"
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNext();
              }}
              className="w-full bg-accent text-gray-900 py-4 rounded-[16px] text-lg font-bold hover:bg-yellow-400 transition-colors shadow-lg"
            >
              {isLastQuestion ? "Complete Assessment" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
