import { User, Lesson, Badge } from "@/types";

export function calculateXP(user: User, lesson: Lesson): number {
  return lesson.rewards.xp;
}

export function calculateCoins(user: User, lesson: Lesson): number {
  return lesson.rewards.coins;
}

export function checkBadgeUnlock(
  user: User,
  lesson: Lesson,
  badges: Badge[]
): string | null {
  if (lesson.rewards.badge) {
    if (!user.badges.includes(lesson.rewards.badge)) {
      return lesson.rewards.badge;
    }
  }
  return null;
}

export function updateStreak(user: User): number {
  const lastLogin = localStorage.getItem("lastLogin");
  const today = new Date().toDateString();

  if (lastLogin === today) {
    return user.streak; // Already logged in today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastLogin === yesterday.toDateString()) {
    return user.streak + 1; // Continue streak
  }

  return 1; // New streak
}

export function calculateLevel(xp: number): number {
  // Level 1: 0-99 XP, Level 2: 100-199 XP, etc.
  return Math.floor(xp / 100) + 1;
}

export function canAffordItem(user: User, price: number): boolean {
  return user.coins >= price;
}
