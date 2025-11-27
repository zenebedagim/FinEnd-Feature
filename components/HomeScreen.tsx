"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";

interface HomeScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onCityMap: () => void;
  onContinueLesson: (lessonId: string) => void;
  onQuests: () => void;
  onAchievements: () => void;
  onStory?: (story: any) => void;
}

export default function HomeScreen({
  activeTab,
  onTabChange,
  onCityMap,
  onContinueLesson,
  onQuests,
  onAchievements,
  onStory,
}: HomeScreenProps) {
  const { user, lessons, stories } = useApp();

  // Find next incomplete lesson
  const nextLesson = lessons.find(
    (lesson) => !user.completedLessons.includes(lesson.id) && !lesson.locked
  );

  // Get recent completed lesson
  const recentLesson = lessons.find((lesson) =>
    user.completedLessons.includes(lesson.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
                <p className="text-xs text-gray-500">Welcome back!</p>
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

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Continue Lesson Card */}
        {nextLesson && (
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[16px] p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white/90 text-sm mb-1">Continue Lesson</p>
                <h3 className="text-white text-xl font-bold mb-2">
                  {nextLesson.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2 w-2/5"></div>
                  </div>
                  <span className="text-white text-sm font-medium">40%</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💪</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onContinueLesson(nextLesson.id)}
              className="w-full mt-4 bg-white text-primary py-2 rounded-[16px] font-bold hover:bg-gray-100 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={onCityMap}
            className="bg-white rounded-[16px] p-4 shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🗺️</div>
            <p className="text-sm font-medium text-gray-700">City Map</p>
          </button>
          <button
            onClick={onQuests}
            className="bg-white rounded-[16px] p-4 shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📜</div>
            <p className="text-sm font-medium text-gray-700">Quests</p>
          </button>
          <button
            onClick={onAchievements}
            className="bg-white rounded-[16px] p-4 shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm font-medium text-gray-700">Achievements</p>
          </button>
        </div>

        {/* Interactive Stories */}
        {onStory && stories && stories.length > 0 && (
          <div className="bg-white rounded-[16px] p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📚 Interactive Stories
            </h3>
            <div className="space-y-3">
              {stories
                .filter((story: any) => story.unlocked)
                .slice(0, 2)
                .map((story: any) => (
                  <button
                    key={story.id}
                    onClick={() => onStory(story)}
                    className="w-full bg-gradient-to-r from-purple-50 to-blue-50 rounded-[16px] p-4 text-left hover:shadow-md transition-shadow border border-purple-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">📖</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">
                          {story.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {story.chapters.length} chapters
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {recentLesson && (
          <div className="bg-white rounded-[16px] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <span className="text-secondary text-xl">✓</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  Completed: {recentLesson.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">Recently</p>
              </div>
              <div className="text-accent font-bold">
                +{recentLesson.rewards.xp}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
