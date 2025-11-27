"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  Lesson,
  Phase,
  Badge,
  ShopItem,
  Quest,
  Achievement,
  BossChallenge,
  MiniGame,
  Story,
} from "@/types";
import { phases } from "@/data/phases";
import { lessons } from "@/data/lessons";
import { badges } from "@/data/badges";
import { dailyQuests, weeklyQuests } from "@/data/quests";
import { achievements as allAchievements } from "@/data/achievements";
import { bossChallenges } from "@/data/bossChallenges";
import { stories } from "@/data/stories";
import { miniGames } from "@/data/miniGames";
import {
  calculateLevel,
  updateStreak,
  checkBadgeUnlock,
} from "@/utils/gamification";

interface AppContextType {
  user: User;
  phases: Phase[];
  lessons: Lesson[];
  badges: Badge[];
  quests: Quest[];
  achievements: Achievement[];
  bossChallenges: BossChallenge[];
  miniGames: MiniGame[];
  stories: Story[];
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  completeLesson: (lessonId: string) => void;
  completeOnboarding: (score: number) => void;
  completeQuest: (questId: string) => void;
  completeBossChallenge: (challengeId: string) => void;
  purchaseItem: (item: ShopItem) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  getLessonById: (id: string) => Lesson | undefined;
  getPhaseById: (id: string) => Phase | undefined;
  getBossChallengeByPhase: (phaseId: string) => BossChallenge | undefined;
  getMiniGameByLessonId: (lessonId: string) => MiniGame | undefined;
  refreshStreak: () => void;
  updateQuestProgress: () => void;
  updateAchievementProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUser: User = {
  id: "user-1",
  name: "Young Learner",
  level: 1,
  xp: 0,
  coins: 0,
  streak: 0,
  badges: [],
  completedLessons: [],
  unlockedPhases: ["phase-1"],
  onboardingCompleted: false,
  onboardingScore: 0,
  isLoggedIn: false,
  streakFreezes: 0,
  xpBoosts: 0,
  lastDailyBonus: undefined,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fined-user");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initialUser;
  });

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // Load lessons into phases - MUST be defined before any state that uses it
  const phasesWithLessons = phases.map((phase) => ({
    ...phase,
    lessons: lessons.filter((lesson) => lesson.phaseId === phase.id),
  }));

  const [quests, setQuests] = useState<Quest[]>(() => {
    // Initialize quests with user progress
    const allQuests = [...dailyQuests, ...weeklyQuests];
    return allQuests.map((quest) => {
      // Update quest progress based on user stats
      if (quest.category === "lessons") {
        quest.current = user.completedLessons.length;
      } else if (quest.category === "streak") {
        quest.current = user.streak;
      } else if (quest.category === "xp") {
        quest.current = user.xp;
      } else if (quest.category === "coins") {
        quest.current = user.coins;
      }
      quest.completed = quest.current >= quest.target;
      return quest;
    });
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    return allAchievements.map((achievement) => {
      // Update achievement progress based on user stats
      if (
        achievement.category === "learning" ||
        achievement.category === "lessons"
      ) {
        achievement.current = user.completedLessons.length;
      } else if (achievement.category === "streaks") {
        achievement.current = user.streak;
      } else if (achievement.category === "coins") {
        achievement.current = user.coins;
      } else if (achievement.category === "phases") {
        achievement.current = user.unlockedPhases.length;
      }
      achievement.unlocked = achievement.current >= achievement.target;
      return achievement;
    });
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fined-user", JSON.stringify(user));
      localStorage.setItem("lastLogin", new Date().toDateString());
    }
    // Update quest and achievement progress when user stats change
    updateQuestProgress();
    updateAchievementProgress();

    // Update boss challenge unlock status
    setBossChallengesState((prev) =>
      prev.map((challenge) => {
        const phase = phasesWithLessons.find((p) => p.id === challenge.phaseId);
        if (phase) {
          const phaseLessons = phase.lessons || [];
          const allCompleted =
            phaseLessons.length > 0 &&
            phaseLessons.every((l) => user.completedLessons.includes(l.id));
          challenge.unlocked = allCompleted;
        }
        return challenge;
      })
    );
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      // Recalculate level based on XP
      updated.level = calculateLevel(updated.xp);
      return updated;
    });
  };

  // Update boss challenges unlock status
  const [bossChallengesState, setBossChallengesState] = useState<
    BossChallenge[]
  >(() => {
    return bossChallenges.map((challenge) => {
      // Check if phase is complete to unlock boss challenge
      const phase = phasesWithLessons.find((p) => p.id === challenge.phaseId);
      if (phase) {
        const phaseLessons = phase.lessons || [];
        const allCompleted =
          phaseLessons.length > 0 &&
          phaseLessons.every((l) => user.completedLessons.includes(l.id));
        challenge.unlocked = allCompleted;
      }
      return challenge;
    });
  });

  const completeLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    // Check if already completed
    if (user.completedLessons.includes(lessonId)) return;

    // Update user progress
    const newXP = user.xp + lesson.rewards.xp;
    const newCoins = user.coins + lesson.rewards.coins;
    const newLevel = calculateLevel(newXP);

    // Check for badge unlock
    const newBadge = checkBadgeUnlock(user, lesson, badges);
    const newBadges = newBadge ? [...user.badges, newBadge] : user.badges;

    // Unlock next lesson in same phase
    const phaseLessons = lessons.filter((l) => l.phaseId === lesson.phaseId);
    const currentIndex = phaseLessons.findIndex((l) => l.id === lessonId);
    const nextLesson = phaseLessons[currentIndex + 1];

    // Update completed lessons
    const updatedCompleted = [...user.completedLessons, lessonId];

    // Unlock next lesson in phase
    if (nextLesson) {
      nextLesson.locked = false;
    }

    // Check if phase is complete
    const phaseComplete = phaseLessons.every((l) =>
      updatedCompleted.includes(l.id)
    );

    // Unlock next phase if current phase is complete
    let updatedUnlockedPhases = [...user.unlockedPhases];
    if (phaseComplete) {
      const currentPhaseIndex = phases.findIndex(
        (p) => p.id === lesson.phaseId
      );
      const nextPhase = phases[currentPhaseIndex + 1];
      if (nextPhase && !updatedUnlockedPhases.includes(nextPhase.id)) {
        updatedUnlockedPhases.push(nextPhase.id);
      }
    }

    updateUser({
      xp: newXP,
      coins: newCoins,
      level: newLevel,
      badges: newBadges,
      completedLessons: updatedCompleted,
      unlockedPhases: updatedUnlockedPhases,
    });
  };

  const purchaseItem = (item: ShopItem) => {
    if (user.coins >= item.price) {
      updateUser({
        coins: user.coins - item.price,
      });
      return true;
    }
    return false;
  };

  const getLessonById = (id: string): Lesson | undefined => {
    return lessons.find((l) => l.id === id);
  };

  const getPhaseById = (id: string): Phase | undefined => {
    return phasesWithLessons.find((p) => p.id === id);
  };

  const getBossChallengeByPhase = (
    phaseId: string
  ): BossChallenge | undefined => {
    return bossChallenges.find((bc) => bc.phaseId === phaseId);
  };

  const getMiniGameByLessonId = (lessonId: string): MiniGame | undefined => {
    return miniGames.find((mg) => mg.lessonId === lessonId);
  };

  const completeBossChallenge = (challengeId: string) => {
    const challenge = bossChallenges.find((bc) => bc.id === challengeId);
    if (!challenge) return;

    // Award rewards
    updateUser({
      xp: user.xp + challenge.rewards.xp,
      coins: user.coins + challenge.rewards.coins,
    });

    // Unlock badge if provided
    if (
      challenge.rewards.badge &&
      !user.badges.includes(challenge.rewards.badge)
    ) {
      updateUser({
        badges: [...user.badges, challenge.rewards.badge!],
      });
    }
  };

  const completeOnboarding = (score: number) => {
    updateUser({
      onboardingCompleted: true,
      onboardingScore: score,
    });
  };

  const updateQuestProgress = () => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) => {
        if (quest.category === "lessons") {
          quest.current = user.completedLessons.length;
        } else if (quest.category === "streak") {
          quest.current = user.streak;
        } else if (quest.category === "xp") {
          quest.current = user.xp;
        } else if (quest.category === "coins") {
          quest.current = user.coins;
        }
        quest.completed = quest.current >= quest.target;
        return quest;
      })
    );
  };

  const completeQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return;

    if (quest.current >= quest.target) {
      // Award rewards
      updateUser({
        xp: user.xp + quest.reward.xp,
        coins: user.coins + quest.reward.coins,
      });

      // Mark as completed
      setQuests((prevQuests) =>
        prevQuests.map((q) =>
          q.id === questId ? { ...q, completed: true } : q
        )
      );
    }
  };

  const updateAchievementProgress = () => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (
          achievement.category === "learning" ||
          achievement.category === "lessons"
        ) {
          achievement.current = user.completedLessons.length;
        } else if (achievement.category === "streaks") {
          achievement.current = user.streak;
        } else if (achievement.category === "coins") {
          achievement.current = user.coins;
        } else if (achievement.category === "phases") {
          achievement.current = user.unlockedPhases.length;
        }
        achievement.unlocked = achievement.current >= achievement.target;
        return achievement;
      })
    );
  };

  const logout = () => {
    // Set logged out state but keep user data in localStorage
    // This way progress is preserved if user logs back in
    updateUser({
      isLoggedIn: false,
    });
  };

  const refreshStreak = () => {
    const newStreak = updateStreak(user);
    if (newStreak !== user.streak) {
      updateUser({ streak: newStreak });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        phases: phasesWithLessons,
        lessons,
        badges,
        quests,
        achievements,
        bossChallenges: bossChallengesState,
        miniGames,
        stories,
        currentLesson,
        setCurrentLesson,
        completeLesson,
        completeOnboarding,
        completeQuest,
        completeBossChallenge,
        purchaseItem,
        updateUser,
        logout,
        getLessonById,
        getPhaseById,
        getBossChallengeByPhase,
        getMiniGameByLessonId,
        refreshStreak,
        updateQuestProgress,
        updateAchievementProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
