import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // Phase 1: Money Basics
  {
    id: "lesson-1-1",
    phaseId: "phase-1",
    title: "What is Money?",
    description: "Learn the basics of money and its value",
    type: "quiz",
    content:
      "Money is a medium of exchange that people use to buy goods and services. It has value because we all agree it does!",
    locked: false,
    quiz: [
      {
        id: "q1",
        question: "What is money?",
        options: [
          "A type of object",
          "A medium of exchange",
          "Just paper",
          "A game",
        ],
        correctAnswer: 1,
        explanation:
          "Money is a medium of exchange that people use to buy goods and services.",
      },
      {
        id: "q2",
        question: "Why does money have value?",
        options: [
          "Because it's shiny",
          "Because we all agree it does",
          "Because it's heavy",
          "Because it's old",
        ],
        correctAnswer: 1,
        explanation:
          "Money has value because society agrees to accept it as payment.",
      },
    ],
    rewards: {
      xp: 30,
      coins: 15,
    },
  },
  {
    id: "lesson-1-2",
    phaseId: "phase-1",
    title: "Needs vs Wants",
    description: "Understanding the difference between needs and wants",
    type: "quiz",
    content:
      "Needs are things we must have to survive, like food and shelter. Wants are things we'd like to have but don't need.",
    locked: true,
    quiz: [
      {
        id: "q3",
        question: "Which is a need?",
        options: ["Video game", "Food", "New shoes", "Toy"],
        correctAnswer: 1,
        explanation: "Food is a need because we need it to survive.",
      },
    ],
    rewards: {
      xp: 30,
      coins: 15,
    },
  },
  // Phase 2: Saving and Budgeting
  {
    id: "lesson-2-1",
    phaseId: "phase-2",
    title: "Introduction to Saving",
    description: "Learn why saving money is important",
    type: "quiz",
    content:
      "Saving money means putting some aside for the future instead of spending it all now. It helps you reach your goals!",
    locked: false,
    quiz: [
      {
        id: "q4",
        question: "What is saving?",
        options: [
          "Spending all your money",
          "Putting money aside for the future",
          "Borrowing money",
          "Losing money",
        ],
        correctAnswer: 1,
        explanation: "Saving means putting money aside for future use.",
      },
      {
        id: "q5",
        question: "Why is saving important?",
        options: [
          "It's not important",
          "It helps you reach goals",
          "It makes money disappear",
          "It's boring",
        ],
        correctAnswer: 1,
        explanation:
          "Saving helps you reach your goals and be prepared for unexpected expenses.",
      },
    ],
    rewards: {
      xp: 40,
      coins: 20,
      badge: "saver",
    },
  },
  {
    id: "lesson-2-2",
    phaseId: "phase-2",
    title: "Creating a Budget",
    description: "Learn how to plan your spending",
    type: "quiz",
    content:
      "A budget is a plan for how you'll spend your money. It helps you make sure you have enough for important things.",
    locked: true,
    quiz: [
      {
        id: "q6",
        question: "What is a budget?",
        options: [
          "A plan for spending",
          "A type of bank",
          "A loan",
          "A paycheck",
        ],
        correctAnswer: 0,
        explanation: "A budget is a plan for how you'll spend your money.",
      },
    ],
    rewards: {
      xp: 40,
      coins: 20,
      badge: "budget-hero",
    },
  },
  // Phase 3: Smart Spending
  {
    id: "lesson-3-1",
    phaseId: "phase-3",
    title: "Comparing Prices",
    description: "Learn to compare prices and find the best deals",
    type: "quiz",
    content:
      "Before buying something, always compare prices from different stores. Look for sales and discounts to save money!",
    locked: true,
    quiz: [
      {
        id: "q7",
        question: "Why is it important to compare prices?",
        options: [
          "It's not important",
          "To find the best deal and save money",
          "To waste time",
          "To confuse yourself",
        ],
        correctAnswer: 1,
        explanation:
          "Comparing prices helps you find the best deal and save money.",
      },
      {
        id: "q8",
        question: "What should you do before buying something expensive?",
        options: [
          "Buy immediately",
          "Compare prices at different stores",
          "Never buy it",
          "Borrow money",
        ],
        correctAnswer: 1,
        explanation:
          "Always compare prices at different stores before making a purchase.",
      },
    ],
    rewards: {
      xp: 50,
      coins: 25,
    },
  },
  {
    id: "lesson-3-2",
    phaseId: "phase-3",
    title: "Avoiding Scams",
    description: "Learn to recognize and avoid financial scams",
    type: "quiz",
    content:
      "Be careful of scams! If something seems too good to be true, it probably is. Always verify before giving money or personal information.",
    locked: true,
    quiz: [
      {
        id: "q9",
        question: "What is a red flag for a scam?",
        options: [
          "A good deal",
          "Something that seems too good to be true",
          "A normal price",
          "A discount",
        ],
        correctAnswer: 1,
        explanation:
          "If something seems too good to be true, it's often a scam.",
      },
    ],
    rewards: {
      xp: 50,
      coins: 25,
      badge: "smart-spender",
    },
  },
  // Phase 4: Entrepreneurship
  {
    id: "lesson-4-1",
    phaseId: "phase-4",
    title: "Starting a Mini Business",
    description: "Learn the basics of starting your own small business",
    type: "quiz",
    content:
      "Starting a business means creating something valuable that others want. You can sell products or services to earn money!",
    locked: true,
    quiz: [
      {
        id: "q10",
        question: "What is a business?",
        options: [
          "A game",
          "A way to create value and earn money",
          "A hobby",
          "Something boring",
        ],
        correctAnswer: 1,
        explanation:
          "A business is a way to create value and earn money by providing products or services.",
      },
    ],
    rewards: {
      xp: 60,
      coins: 30,
    },
  },
  // Phase 5: Investing Basics
  {
    id: "lesson-5-1",
    phaseId: "phase-5",
    title: "Understanding Interest",
    description: "Learn how interest works and helps your money grow",
    type: "quiz",
    content:
      "Interest is money you earn on money you save or invest. It helps your money grow over time!",
    locked: true,
    quiz: [
      {
        id: "q11",
        question: "What is interest?",
        options: [
          "Money you spend",
          "Money you earn on saved or invested money",
          "A type of loan",
          "A fee",
        ],
        correctAnswer: 1,
        explanation: "Interest is money you earn on money you save or invest.",
      },
    ],
    rewards: {
      xp: 60,
      coins: 30,
      badge: "investor",
    },
  },
  // Phase 6: Digital Money & Banking
  {
    id: "lesson-6-1",
    phaseId: "phase-6",
    title: "Digital Payments",
    description: "Learn about mobile banking and digital money",
    type: "quiz",
    content:
      "Digital payments let you pay with your phone or card instead of cash. Always keep your information safe!",
    locked: true,
    quiz: [
      {
        id: "q12",
        question: "What should you do to keep digital payments safe?",
        options: [
          "Share your password",
          "Keep your information private and secure",
          "Tell everyone your PIN",
          "Never use digital payments",
        ],
        correctAnswer: 1,
        explanation:
          "Always keep your digital payment information private and secure.",
      },
    ],
    rewards: {
      xp: 60,
      coins: 30,
    },
  },
  // Phase 7: Sustainability and Giving
  {
    id: "lesson-7-1",
    phaseId: "phase-7",
    title: "The Value of Giving",
    description: "Learn why giving back is important",
    type: "quiz",
    content:
      "Giving to others and helping your community is important. It makes the world a better place and feels good too!",
    locked: true,
    quiz: [
      {
        id: "q13",
        question: "Why is giving important?",
        options: [
          "It's not important",
          "It helps others and makes the world better",
          "It wastes money",
          "It's boring",
        ],
        correctAnswer: 1,
        explanation: "Giving helps others and makes the world a better place.",
      },
    ],
    rewards: {
      xp: 60,
      coins: 30,
    },
  },
];
