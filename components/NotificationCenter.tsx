"use client";

import BottomNav from "./BottomNav";

interface NotificationCenterProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

interface Notification {
  id: string;
  type: "streak" | "quest" | "achievement" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export default function NotificationCenter({
  activeTab,
  onTabChange,
  onBack,
}: NotificationCenterProps) {
  // Mock notifications - in real app, this would come from backend
  const notifications: Notification[] = [
    {
      id: "notif-1",
      type: "streak",
      title: "Keep your streak alive!",
      message:
        "Don't forget to complete a lesson today to maintain your streak",
      time: "2 hours ago",
      read: false,
      icon: "🔥",
    },
    {
      id: "notif-2",
      type: "quest",
      title: "New Quest Available",
      message: "Complete 1 lesson today to earn 50 XP and 25 coins!",
      time: "5 hours ago",
      read: false,
      icon: "📜",
    },
    {
      id: "notif-3",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've earned the 'First Steps' achievement!",
      time: "1 day ago",
      read: true,
      icon: "🏆",
    },
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
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="max-w-md mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-[16px] p-8 text-center shadow-md">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Notifications
            </h3>
            <p className="text-gray-600">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-[16px] p-4 shadow-md border-2 ${
                  notification.read
                    ? "border-gray-200"
                    : "border-primary bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{notification.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
