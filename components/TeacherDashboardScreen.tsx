"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface TeacherDashboardScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function TeacherDashboardScreen({
  activeTab,
  onTabChange,
  onBack,
}: TeacherDashboardScreenProps) {
  // Mock student data - in real app, this would come from backend
  const mockStudents = [
    { id: "s1", name: "Alex", progress: 75, streak: 10 },
    { id: "s2", name: "Sarah", progress: 60, streak: 5 },
    { id: "s3", name: "Mike", progress: 90, streak: 15 },
  ];

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
            <h2 className="text-xl font-bold text-gray-900">
              Teacher Dashboard
            </h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Class Overview */}
        <div className="bg-white rounded-[16px] p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Class Overview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockStudents.length}
              </div>
              <div className="text-xs text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">75%</div>
              <div className="text-xs text-gray-600">Avg Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">10</div>
              <div className="text-xs text-gray-600">Avg Streak</div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-[16px] p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Students</h3>
          <div className="space-y-3">
            {mockStudents.map((student) => (
              <div
                key={student.id}
                className="bg-gray-50 rounded-[16px] p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        🔥 {student.streak} day streak
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
