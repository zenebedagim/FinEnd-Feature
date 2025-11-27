export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  badges: string[];
  completedLessons: string[];
  unlockedPhases: string[];
  onboardingCompleted?: boolean;
  onboardingScore?: number;
  isLoggedIn?: boolean;
  streakFreezes?: number;
  xpBoosts?: number;
  lastDailyBonus?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  locked: boolean;
  stars: number;
  icon: string;
}

export interface Lesson {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  type: "video" | "quiz" | "game";
  content: string;
  quiz: QuizQuestion[];
  rewards: {
    xp: number;
    coins: number;
    badge?: string;
  };
  locked: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  type: "boost" | "freeze" | "cosmetic" | "mystery";
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  target: number;
  current: number;
  reward: {
    xp: number;
    coins: number;
  };
  icon: string;
  category: "lessons" | "streak" | "xp" | "coins" | "phases";
  completed: boolean;
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "learning" | "streaks" | "coins" | "lessons" | "phases";
  target: number;
  current: number;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface BossChallenge {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  scenario: string;
  questions: QuizQuestion[];
  rewards: {
    xp: number;
    coins: number;
    badge?: string;
  };
  unlocked: boolean;
  completed: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
}

export interface Certificate {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  earnedAt: Date;
  imageUrl?: string;
}

export interface MiniGame {
  id: string;
  lessonId: string;
  type: "drag-drop" | "sorting" | "matching" | "budget" | "saving";
  title: string;
  instructions: string;
  data: any;
  rewards: {
    xp: number;
    coins: number;
  };
}

export interface Story {
  id: string;
  phaseId: string;
  title: string;
  chapters: StoryChapter[];
  unlocked: boolean;
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  choices?: StoryChoice[];
  image?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  nextChapterId: string;
  outcome: string;
}
