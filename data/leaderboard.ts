import { LeaderboardEntry } from "@/types";

// Mock leaderboard data - in real app, this would come from backend
export const generateLeaderboard = (currentUser: any): LeaderboardEntry[] => {
  const mockUsers: LeaderboardEntry[] = [
    {
      userId: currentUser.id,
      name: currentUser.name,
      avatar: "👤",
      xp: currentUser.xp,
      level: currentUser.level,
      streak: currentUser.streak,
      rank: 1,
    },
    {
      userId: "user-2",
      name: "Alex",
      avatar: "👦",
      xp: 850,
      level: 8,
      streak: 12,
      rank: 2,
    },
    {
      userId: "user-3",
      name: "Sarah",
      avatar: "👧",
      xp: 720,
      level: 7,
      streak: 8,
      rank: 3,
    },
    {
      userId: "user-4",
      name: "Mike",
      avatar: "👨",
      xp: 650,
      level: 6,
      streak: 15,
      rank: 4,
    },
    {
      userId: "user-5",
      name: "Emma",
      avatar: "👩",
      xp: 580,
      level: 5,
      streak: 6,
      rank: 5,
    },
  ];

  // Sort by XP descending
  return mockUsers
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
};
