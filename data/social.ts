export interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  status: "online" | "offline";
}

export interface ReferralCode {
  code: string;
  uses: number;
  maxUses?: number;
  reward: {
    xp: number;
    coins: number;
  };
}

// Mock friends data
export const mockFriends: Friend[] = [
  {
    id: "friend-1",
    name: "Alex",
    avatar: "👦",
    level: 8,
    xp: 850,
    streak: 12,
    status: "online",
  },
  {
    id: "friend-2",
    name: "Sarah",
    avatar: "👧",
    level: 7,
    xp: 720,
    streak: 8,
    status: "offline",
  },
  {
    id: "friend-3",
    name: "Mike",
    avatar: "👨",
    level: 6,
    xp: 650,
    streak: 15,
    status: "online",
  },
];

// Generate referral code
export const generateReferralCode = (userId: string): string => {
  return `FINED-${userId.slice(-6).toUpperCase()}`;
};

