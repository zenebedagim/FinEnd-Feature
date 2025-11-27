"use client";

interface BottomNavProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  variant?: "default" | "transparent";
}

export default function BottomNav({
  activeTab,
  onTabChange,
  variant = "default",
}: BottomNavProps) {
  const isTransparent = variant === "transparent";

  return (
    <div
      className={`${
        isTransparent
          ? "bg-white/10 backdrop-blur-sm border-t border-white/20"
          : "bg-white border-t border-gray-200 shadow-lg"
      } fixed bottom-0 left-0 right-0 z-50`}
    >
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        {/* Home Tab */}
        <button
          onClick={() => onTabChange("home")}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-6 mb-1">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={
                activeTab === "home"
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                  ? "text-white/70"
                  : "text-gray-400"
              }
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span
            className={`text-xs ${
              activeTab === "home"
                ? isTransparent
                  ? "text-white font-medium"
                  : "text-primary font-medium"
                : isTransparent
                ? "text-white/70"
                : "text-gray-400"
            }`}
          >
            Home
          </span>
        </button>

        {/* Lessons Tab */}
        <button
          onClick={() => onTabChange("lessons")}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-6 mb-1">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={
                activeTab === "lessons"
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                  ? "text-white/70"
                  : "text-gray-400"
              }
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <span
            className={`text-xs ${
              activeTab === "lessons"
                ? isTransparent
                  ? "text-white font-medium"
                  : "text-primary font-medium"
                : isTransparent
                ? "text-white/70"
                : "text-gray-400"
            }`}
          >
            Lessons
          </span>
        </button>

        {/* Shop Tab */}
        <button
          onClick={() => onTabChange("shop")}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-6 mb-1">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={
                activeTab === "shop"
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                  ? "text-white/70"
                  : "text-gray-400"
              }
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <span
            className={`text-xs ${
              activeTab === "shop"
                ? isTransparent
                  ? "text-white font-medium"
                  : "text-primary font-medium"
                : isTransparent
                ? "text-white/70"
                : "text-gray-400"
            }`}
          >
            Shop
          </span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onTabChange("profile")}
          className="flex flex-col items-center"
        >
          <div className="w-6 h-6 mb-1">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={
                activeTab === "profile"
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                  ? "text-white/70"
                  : "text-gray-400"
              }
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span
            className={`text-xs ${
              activeTab === "profile"
                ? isTransparent
                  ? "text-white font-medium"
                  : "text-primary font-medium"
                : isTransparent
                ? "text-white/70"
                : "text-gray-400"
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}
