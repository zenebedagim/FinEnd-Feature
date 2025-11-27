"use client";

interface PostLoginWelcomeProps {
  onGetStarted: () => void;
  onBack: () => void;
}

export default function PostLoginWelcome({
  onGetStarted,
  onBack,
}: PostLoginWelcomeProps) {
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 z-10"
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

      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center flex-1">
        {/* Welcome Title - darker gray, bold */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Welcome to City of Wealth
        </h1>

        {/* Subtitle - lighter gray */}
        <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-12">
          Learn money skills the fun way!
        </p>

        {/* Gradient Circle with Squirrel - teal-blue to lime-green */}
        <div className="relative mb-8 md:mb-12">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-lime-400 flex items-center justify-center shadow-2xl">
            {/* Squirrel Icon - white/light colored */}
            <div className="text-8xl md:text-9xl filter drop-shadow-lg">🐿️</div>
          </div>
        </div>
      </div>

      {/* Back and Next Buttons - at bottom, full width */}
      <div className="w-full max-w-md mx-auto px-4 pb-8">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-white text-primary border-2 border-primary px-6 py-4 rounded-[16px] text-lg font-bold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onGetStarted}
            className="flex-1 bg-primary text-white px-8 py-4 rounded-[16px] text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
