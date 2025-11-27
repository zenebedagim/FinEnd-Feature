import { MiniGame } from "@/types";

export const miniGames: MiniGame[] = [
  {
    id: "minigame-1",
    lessonId: "lesson-2-1",
    type: "budget",
    title: "Budget Simulator",
    instructions: "Drag items to create a balanced budget. Save at least 30%!",
    data: {
      income: 100,
      items: [
        { id: "food", name: "Food", cost: 50, category: "need" },
        { id: "toy", name: "Toy", cost: 30, category: "want" },
        { id: "savings", name: "Savings", cost: 0, category: "savings" },
      ],
      targetSavings: 30,
    },
    rewards: {
      xp: 25,
      coins: 15,
    },
  },
  {
    id: "minigame-2",
    lessonId: "lesson-2-2",
    type: "saving",
    title: "Saving Goal Challenge",
    instructions: "Set a savings goal and track your progress!",
    data: {
      goal: 200,
      current: 0,
      weeklyIncome: 50,
    },
    rewards: {
      xp: 30,
      coins: 20,
    },
  },
];
