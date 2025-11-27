import { BossChallenge } from "@/types";

export const bossChallenges: BossChallenge[] = [
  {
    id: "boss-1",
    phaseId: "phase-1",
    title: "Money Basics Challenge",
    description: "Test your understanding of money fundamentals",
    scenario:
      "You have 100 coins. You need to buy food (50 coins), save for a toy (30 coins), and have some left for emergencies. How will you manage your money?",
    questions: [
      {
        id: "bq1",
        question: "What should you do first with your money?",
        options: [
          "Spend it all on toys",
          "Save for important things first",
          "Give it all away",
          "Hide it",
        ],
        correctAnswer: 1,
        explanation:
          "It's important to save for important things and emergencies first.",
      },
      {
        id: "bq2",
        question: "How much should you save from 100 coins?",
        options: ["0 coins", "20 coins", "30-40 coins", "All 100 coins"],
        correctAnswer: 2,
        explanation: "Saving 30-40% is a good rule for managing money wisely.",
      },
    ],
    rewards: {
      xp: 100,
      coins: 50,
      badge: "money-master",
    },
    unlocked: false,
    completed: false,
  },
  {
    id: "boss-2",
    phaseId: "phase-2",
    title: "Saving & Budgeting Challenge",
    description: "Prove you can save and budget like a pro",
    scenario:
      "You want to save 200 coins for a bicycle. You earn 50 coins per week. Create a savings plan!",
    questions: [
      {
        id: "bq3",
        question: "How many weeks will it take to save 200 coins?",
        options: ["2 weeks", "4 weeks", "6 weeks", "8 weeks"],
        correctAnswer: 1,
        explanation: "200 coins ÷ 50 coins per week = 4 weeks",
      },
      {
        id: "bq4",
        question: "What's the best way to reach your savings goal?",
        options: [
          "Spend everything",
          "Save all your money",
          "Save some and spend some wisely",
          "Borrow money",
        ],
        correctAnswer: 2,
        explanation:
          "A balanced approach of saving and spending wisely is best.",
      },
    ],
    rewards: {
      xp: 150,
      coins: 75,
      badge: "savings-hero",
    },
    unlocked: false,
    completed: false,
  },
];
