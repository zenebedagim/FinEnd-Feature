import { Story } from "@/types";

export const stories: Story[] = [
  {
    id: "story-1",
    phaseId: "phase-1",
    title: "Seba's First Coin",
    chapters: [
      {
        id: "ch1-1",
        title: "The Discovery",
        content:
          "One sunny day, Seba the Squirrel found a shiny coin under an oak tree. 'What is this?' he wondered. His friend, Wise Owl, explained that this was money - something people use to buy things they need.",
        image: "🐿️",
      },
      {
        id: "ch1-2",
        title: "The Decision",
        content:
          "Seba had to decide: should he spend the coin on acorns right away, or save it for something special? Wise Owl taught him about needs vs wants. 'Food is a need,' said the owl, 'but a fancy toy is a want.'",
        choices: [
          {
            id: "choice-1",
            text: "Spend it on acorns",
            nextChapterId: "ch1-3a",
            outcome:
              "Seba bought acorns and enjoyed them, but learned that saving could help him get something bigger later.",
          },
          {
            id: "choice-2",
            text: "Save it for later",
            nextChapterId: "ch1-3b",
            outcome:
              "Seba saved the coin and later bought a special gift for his family. He learned that saving feels good!",
          },
        ],
      },
      {
        id: "ch1-3a",
        title: "The Lesson",
        content:
          "Seba enjoyed his acorns, but he realized that if he had saved more coins, he could have bought something even better. 'Next time, I'll save some coins too!' he decided.",
      },
      {
        id: "ch1-3b",
        title: "The Reward",
        content:
          "By saving his coin, Seba was able to buy a beautiful gift for his family. They were so happy! Seba learned that saving money can help you do special things for the people you love.",
      },
    ],
    unlocked: true,
  },
  {
    id: "story-2",
    phaseId: "phase-2",
    title: "The Savings Goal",
    chapters: [
      {
        id: "ch2-1",
        title: "A Big Dream",
        content:
          "Seba wanted to buy a new treehouse, but it cost 100 coins! That seemed like so much money. 'How will I ever save that much?' he asked Wise Owl.",
        image: "🏠",
      },
      {
        id: "ch2-2",
        title: "Making a Plan",
        content:
          "Wise Owl helped Seba create a budget. 'If you save 10 coins every week, you'll have 100 coins in 10 weeks!' Seba was excited. He made a plan to save some of his weekly allowance.",
        choices: [
          {
            id: "choice-3",
            text: "Save 5 coins per week",
            nextChapterId: "ch2-3a",
            outcome:
              "It will take 20 weeks, but Seba learns that even small savings add up!",
          },
          {
            id: "choice-4",
            text: "Save 10 coins per week",
            nextChapterId: "ch2-3b",
            outcome:
              "Seba reaches his goal in 10 weeks and gets his treehouse!",
          },
        ],
      },
      {
        id: "ch2-3a",
        title: "Patience Pays Off",
        content:
          "Seba saved 5 coins each week. It took longer, but he learned that being patient and consistent with saving is important. After 20 weeks, he finally got his treehouse!",
      },
      {
        id: "ch2-3b",
        title: "Goal Achieved!",
        content:
          "By saving 10 coins every week, Seba reached his goal in just 10 weeks! He was so proud of himself. His new treehouse was beautiful, and he learned that setting goals and sticking to a plan really works!",
      },
    ],
    unlocked: false,
  },
];
