"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import Hero from "@/components/Hero";
import Login from "@/components/Login";
import PostLoginWelcome from "@/components/PostLoginWelcome";
import HomeScreen from "@/components/HomeScreen";
import LessonsScreen from "@/components/LessonsScreen";
import ShopScreen from "@/components/ShopScreen";
import ProfileScreen from "@/components/ProfileScreen";
import CityMapScreen from "@/components/CityMapScreen";
import LessonDetailScreen from "@/components/LessonDetailScreen";
import QuizScreen from "@/components/QuizScreen";
import LessonCompleteScreen from "@/components/LessonCompleteScreen";
import GreetingScreen from "@/components/GreetingScreen";
import OnboardingQuizScreen from "@/components/OnboardingQuizScreen";
import QuestsScreen from "@/components/QuestsScreen";
import AchievementsScreen from "@/components/AchievementsScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import CertificateScreen from "@/components/CertificateScreen";
import MiniGameScreen from "@/components/MiniGameScreen";
import BossChallengeScreen from "@/components/BossChallengeScreen";
import ParentPortalScreen from "@/components/ParentPortalScreen";
import TeacherDashboardScreen from "@/components/TeacherDashboardScreen";
import AITutorScreen from "@/components/AITutorScreen";
import PracticeModeScreen from "@/components/PracticeModeScreen";
import NotificationCenter from "@/components/NotificationCenter";
import StoryScreen from "@/components/StoryScreen";
import FriendsScreen from "@/components/FriendsScreen";
import AnalyticsScreen from "@/components/AnalyticsScreen";

export default function Home() {
  const { refreshStreak, user, completeOnboarding, updateUser } = useApp();
  const [currentScreen, setCurrentScreen] = useState<
    | "welcome"
    | "login"
    | "postLogin"
    | "greeting"
    | "onboardingQuiz"
    | "app"
    | "cityMap"
    | "lessonDetail"
    | "quiz"
    | "lessonComplete"
    | "quests"
    | "achievements"
    | "leaderboard"
    | "certificates"
    | "miniGame"
    | "bossChallenge"
    | "parentPortal"
    | "teacherDashboard"
    | "aiTutor"
    | "practiceMode"
    | "notifications"
    | "story"
    | "friends"
    | "analytics"
  >("welcome");
  const [activeTab, setActiveTab] = useState<
    "home" | "lessons" | "shop" | "profile"
  >("home");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });
  const [selectedMiniGame, setSelectedMiniGame] = useState<any>(null);
  const [selectedBossChallenge, setSelectedBossChallenge] = useState<any>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  // Check login status on mount and navigate accordingly
  useEffect(() => {
    refreshStreak();
    // Always start with welcome screen on page load/refresh
    // Only run once on initial mount, not on every render
    setCurrentScreen("welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  const handleGetStarted = () => {
    // Always go to login screen first, following the exact order:
    // Welcome → Login → Post-Login Welcome → Greeting → Onboarding Quiz → App
    setCurrentScreen("login");
  };

  const handleBack = () => {
    if (currentScreen === "quiz") {
      setCurrentScreen("lessonDetail");
    } else if (currentScreen === "lessonDetail") {
      if (selectedPhaseId) {
        setCurrentScreen("cityMap");
      } else {
        setCurrentScreen("app");
        setActiveTab("lessons");
      }
    } else if (currentScreen === "lessonComplete") {
      setCurrentScreen("app");
      setActiveTab("home");
    } else if (
      currentScreen === "cityMap" ||
      currentScreen === "quests" ||
      currentScreen === "achievements" ||
      currentScreen === "leaderboard" ||
      currentScreen === "certificates" ||
      currentScreen === "parentPortal" ||
      currentScreen === "teacherDashboard" ||
      currentScreen === "aiTutor" ||
      currentScreen === "practiceMode" ||
      currentScreen === "notifications"
    ) {
      setCurrentScreen("app");
      setActiveTab("home");
    } else if (currentScreen === "miniGame") {
      setCurrentScreen("lessonDetail");
    } else if (currentScreen === "bossChallenge") {
      setCurrentScreen("cityMap");
    } else if (currentScreen === "onboardingQuiz") {
      // Back from Onboarding Quiz → Greeting
      setCurrentScreen("greeting");
    } else if (currentScreen === "greeting") {
      // Back from Greeting → Post-Login Welcome
      setCurrentScreen("postLogin");
    } else if (currentScreen === "postLogin") {
      // Back from Post-Login Welcome → Login
      setCurrentScreen("login");
    } else if (currentScreen === "login") {
      // Back from Login → Welcome
      setCurrentScreen("welcome");
    } else {
      setCurrentScreen("welcome");
    }
  };

  const handleLoginSuccess = () => {
    // After login, always go to Post-Login Welcome (next step in order)
    setCurrentScreen("postLogin");
  };

  const handlePostLoginGetStarted = () => {
    // Always go to Greeting next (following the order)
    // The order is: Post-Login Welcome → Greeting → Onboarding Quiz → App
    setCurrentScreen("greeting");
  };

  const handleGreetingContinue = () => {
    // Always go to Onboarding Quiz next (following the order)
    setCurrentScreen("onboardingQuiz");
  };

  const { getPhaseById, getLessonById, lessons: allLessons } = useApp();

  const handleOnboardingComplete = (score: number) => {
    console.log("handleOnboardingComplete called with score:", score);

    // Mark onboarding as completed and save score
    completeOnboarding(score);

    // Determine starting phase based on score
    // High score (4-5) = unlock phase 2, Low score (0-3) = start from phase 1
    const startPhase = score >= 4 ? "phase-2" : "phase-1";

    // Unlock the starting phase if not already unlocked
    if (!user.unlockedPhases.includes(startPhase)) {
      updateUser({
        unlockedPhases: [...user.unlockedPhases, startPhase],
      });
    }

    console.log("Navigating to app screen");
    // Always navigate to App screen after onboarding (final step in order)
    // User can then navigate to lessons from the home screen
    setCurrentScreen("app");
    setActiveTab("home");
  };

  const handleTabChange = (tab: "home" | "lessons" | "shop" | "profile") => {
    setActiveTab(tab);
    if (currentScreen === "welcome" || currentScreen === "login") {
      if (currentScreen === "login") {
        return;
      }
      setCurrentScreen("app");
    }
  };

  const handleCityMap = () => {
    setCurrentScreen("cityMap");
  };

  const handlePhaseSelect = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    const phase = getPhaseById(phaseId);
    if (phase && phase.lessons.length > 0) {
      const firstLesson =
        phase.lessons.find((l) => !l.locked) || phase.lessons[0];
      setSelectedLessonId(firstLesson.id);
      setCurrentScreen("lessonDetail");
    }
  };

  const handleContinueLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentScreen("lessonDetail");
  };

  const handleStartQuiz = () => {
    setCurrentScreen("quiz");
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore({ score, total });
    setCurrentScreen("lessonComplete");
  };

  const handleNextLesson = () => {
    if (selectedLessonId) {
      const currentLesson = getLessonById(selectedLessonId);
      if (currentLesson) {
        const phaseLessons = allLessons.filter(
          (l) => l.phaseId === currentLesson.phaseId
        );
        const currentIndex = phaseLessons.findIndex(
          (l) => l.id === selectedLessonId
        );
        const nextLesson = phaseLessons[currentIndex + 1];
        if (nextLesson && !nextLesson.locked) {
          setSelectedLessonId(nextLesson.id);
          setCurrentScreen("lessonDetail");
        } else {
          setCurrentScreen("app");
          setActiveTab("home");
        }
      }
    } else {
      setCurrentScreen("app");
      setActiveTab("home");
    }
  };

  const currentLesson = selectedLessonId
    ? getLessonById(selectedLessonId)
    : null;

  return (
    <main className="min-h-screen">
      {currentScreen === "welcome" ? (
        <Hero
          onGetStarted={handleGetStarted}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      ) : currentScreen === "login" ? (
        <Login
          onBack={handleBack}
          onLoginSuccess={handleLoginSuccess}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      ) : currentScreen === "postLogin" ? (
        <PostLoginWelcome
          onGetStarted={handlePostLoginGetStarted}
          onBack={handleBack}
        />
      ) : currentScreen === "greeting" ? (
        <GreetingScreen
          onContinue={handleGreetingContinue}
          onBack={handleBack}
        />
      ) : currentScreen === "onboardingQuiz" ? (
        <OnboardingQuizScreen
          onComplete={handleOnboardingComplete}
          onBack={handleBack}
        />
      ) : currentScreen === "cityMap" ? (
        <CityMapScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
          onPhaseSelect={handlePhaseSelect}
          onBossChallenge={(challenge) => {
            setSelectedBossChallenge(challenge);
            setCurrentScreen("bossChallenge");
          }}
        />
      ) : currentScreen === "quests" ? (
        <QuestsScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "achievements" ? (
        <AchievementsScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "leaderboard" ? (
        <LeaderboardScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "certificates" ? (
        <CertificateScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "miniGame" && selectedMiniGame ? (
        <MiniGameScreen
          miniGame={selectedMiniGame}
          onComplete={() => setCurrentScreen("lessonDetail")}
          onBack={handleBack}
        />
      ) : currentScreen === "bossChallenge" && selectedBossChallenge ? (
        <BossChallengeScreen
          challenge={selectedBossChallenge}
          onComplete={() => {
            setCurrentScreen("cityMap");
            setSelectedBossChallenge(null);
          }}
          onBack={handleBack}
        />
      ) : currentScreen === "parentPortal" ? (
        <ParentPortalScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "teacherDashboard" ? (
        <TeacherDashboardScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "aiTutor" ? (
        <AITutorScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "practiceMode" ? (
        <PracticeModeScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
          onPracticeLesson={(lessonId) => {
            setSelectedLessonId(lessonId);
            setCurrentScreen("lessonDetail");
          }}
        />
      ) : currentScreen === "notifications" ? (
        <NotificationCenter
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "story" && selectedStory ? (
        <StoryScreen
          story={selectedStory}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
          onComplete={() => {
            setCurrentScreen("app");
            setActiveTab("home");
            setSelectedStory(null);
          }}
        />
      ) : currentScreen === "friends" ? (
        <FriendsScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "analytics" ? (
        <AnalyticsScreen
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBack={handleBack}
        />
      ) : currentScreen === "lessonDetail" && currentLesson ? (
        <LessonDetailScreen
          lesson={currentLesson}
          onStartQuiz={handleStartQuiz}
          onBack={handleBack}
          onStartMiniGame={(miniGame) => {
            setSelectedMiniGame(miniGame);
            setCurrentScreen("miniGame");
          }}
        />
      ) : currentScreen === "quiz" && currentLesson ? (
        <QuizScreen
          questions={currentLesson.quiz}
          onComplete={handleQuizComplete}
          onBack={handleBack}
        />
      ) : currentScreen === "lessonComplete" && currentLesson ? (
        <LessonCompleteScreen
          lesson={currentLesson}
          score={quizScore.score}
          totalQuestions={quizScore.total}
          onNextLesson={handleNextLesson}
          onBack={handleBack}
        />
      ) : (
        <>
          {activeTab === "home" && (
            <HomeScreen
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onCityMap={handleCityMap}
              onContinueLesson={handleContinueLesson}
              onQuests={() => setCurrentScreen("quests")}
              onAchievements={() => setCurrentScreen("achievements")}
              onStory={(story) => {
                setSelectedStory(story);
                setCurrentScreen("story");
              }}
            />
          )}
          {activeTab === "lessons" && (
            <LessonsScreen
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onPhaseSelect={handlePhaseSelect}
              onLessonSelect={handleContinueLesson}
            />
          )}
          {activeTab === "shop" && (
            <ShopScreen activeTab={activeTab} onTabChange={handleTabChange} />
          )}
          {activeTab === "profile" && (
            <ProfileScreen
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onLogout={() => setCurrentScreen("welcome")}
              onLeaderboard={() => setCurrentScreen("leaderboard")}
              onCertificates={() => setCurrentScreen("certificates")}
              onAITutor={() => setCurrentScreen("aiTutor")}
              onPracticeMode={() => setCurrentScreen("practiceMode")}
              onNotifications={() => setCurrentScreen("notifications")}
              onFriends={() => setCurrentScreen("friends")}
              onAnalytics={() => setCurrentScreen("analytics")}
            />
          )}
        </>
      )}
    </main>
  );
}
