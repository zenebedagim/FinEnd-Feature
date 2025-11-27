import { QuizQuestion } from "@/types";

export const onboardingQuestions: QuizQuestion[] = [
  {
    id: "onboarding-1",
    question: "What is money used for?",
    options: [
      "Only for buying toys",
      "To buy goods and services",
      "Just for saving",
      "Only for adults",
    ],
    correctAnswer: 1,
    explanation:
      "Money is used to buy goods and services that we need or want.",
  },
  {
    id: "onboarding-2",
    question: "What does saving money mean?",
    options: [
      "Spending all your money",
      "Putting money aside for later",
      "Giving money away",
      "Hiding money",
    ],
    correctAnswer: 1,
    explanation: "Saving means putting money aside for future use or goals.",
  },
  {
    id: "onboarding-3",
    question: "What is a budget?",
    options: [
      "A type of bank account",
      "A plan for how to spend money",
      "A way to earn money",
      "A type of loan",
    ],
    correctAnswer: 1,
    explanation:
      "A budget is a plan that helps you decide how to spend your money wisely.",
  },
  {
    id: "onboarding-4",
    question: "Which is a need?",
    options: ["Video game", "Food", "New toy", "Fancy shoes"],
    correctAnswer: 1,
    explanation:
      "Food is a need because we need it to survive and stay healthy.",
  },
  {
    id: "onboarding-5",
    question: "Why is it important to learn about money?",
    options: [
      "It's not important",
      "To make smart decisions about spending and saving",
      "Only adults need to know",
      "It's too complicated",
    ],
    correctAnswer: 1,
    explanation:
      "Learning about money helps you make smart decisions about spending, saving, and planning for the future.",
  },
];
