import { Quest } from "@/types";

export const dailyQuests: Quest[] = [
  {
    id: "daily-1",
    title: "Complete a Lesson",
    description: "Finish any lesson to earn rewards",
    type: "daily",
    target: 1,
    current: 0,
    reward: {
      xp: 50,
      coins: 25,
    },
    icon: "📚",
    category: "lessons",
    completed: false,
  },
  {
    id: "daily-2",
    title: "Maintain Your Streak",
    description: "Keep your learning streak alive",
    type: "daily",
    target: 1,
    current: 0,
    reward: {
      xp: 30,
      coins: 15,
    },
    icon: "🔥",
    category: "streak",
    completed: false,
  },
  {
    id: "daily-3",
    title: "Earn 100 XP",
    description: "Complete lessons to reach 100 XP",
    type: "daily",
    target: 100,
    current: 0,
    reward: {
      xp: 25,
      coins: 20,
    },
    icon: "⭐",
    category: "xp",
    completed: false,
  },
];

export const weeklyQuests: Quest[] = [
  {
    id: "weekly-1",
    title: "Weekly Warrior",
    description: "Earn 300 XP this week",
    type: "weekly",
    target: 300,
    current: 0,
    reward: {
      xp: 100,
      coins: 50,
    },
    icon: "🏆",
    category: "xp",
    completed: false,
  },
  {
    id: "weekly-2",
    title: "Lesson Master",
    description: "Complete 5 lessons this week",
    type: "weekly",
    target: 5,
    current: 0,
    reward: {
      xp: 150,
      coins: 75,
    },
    icon: "📖",
    category: "lessons",
    completed: false,
  },
  {
    id: "weekly-3",
    title: "Streak Champion",
    description: "Maintain a 7-day streak",
    type: "weekly",
    target: 7,
    current: 0,
    reward: {
      xp: 200,
      coins: 100,
    },
    icon: "🔥",
    category: "streak",
    completed: false,
  },
];
