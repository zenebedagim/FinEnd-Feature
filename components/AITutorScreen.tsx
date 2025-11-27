"use client";

import { useState } from "react";
import BottomNav from "./BottomNav";

interface AITutorScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function AITutorScreen({
  activeTab,
  onTabChange,
  onBack,
}: AITutorScreenProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Finny, your financial mentor. Ask me anything about money! 💰",
      sender: "tutor",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Saving money is important because it helps you reach your goals and be prepared for unexpected expenses.",
        "Remember, a budget is a plan for how you'll spend your money. It helps you make sure you have enough for important things!",
        "Smart spending means comparing prices and thinking carefully before buying. Always ask yourself: Do I really need this?",
        "Keep up the great work! Learning about money is an important skill that will help you throughout your life.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const tutorMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "tutor",
      };
      setMessages([...messages, userMessage, tutorMessage]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
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
            <h2 className="text-xl font-bold text-gray-900">AI Tutor</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-[16px] p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-900 shadow-md"
                }`}
              >
                {message.sender === "tutor" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🐿️</span>
                    <span className="font-semibold">Finny</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 sticky bottom-20">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Finny anything about money..."
              className="flex-1 px-4 py-3 rounded-[16px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-6 py-3 rounded-[16px] font-semibold hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
