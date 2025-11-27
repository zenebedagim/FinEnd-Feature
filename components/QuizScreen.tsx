"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { QuizQuestion } from "@/types";

interface QuizScreenProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

export default function QuizScreen({
  questions,
  onComplete,
  onBack,
}: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(
        score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
        questions.length
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

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
            <h2 className="text-xl font-bold text-gray-900">Quiz</h2>
            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-[16px] p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
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
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-[16px] border-2 transition-all ${
                    showCorrect
                      ? "bg-secondary border-secondary text-white"
                      : showIncorrect
                      ? "bg-red-100 border-red-300 text-red-900"
                      : isSelected
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-white border-gray-300 text-gray-900 hover:border-primary"
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
                  ? "bg-secondary/20 border border-secondary"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p className="text-sm text-gray-700">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!showFeedback ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors"
            >
              {isLastQuestion ? "Complete Lesson" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
