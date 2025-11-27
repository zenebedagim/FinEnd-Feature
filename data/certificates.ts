import { Certificate } from "@/types";

// Generate certificates based on completed phases
export const generateCertificates = (
  completedPhases: string[]
): Certificate[] => {
  const phaseCertificates: Record<string, Omit<Certificate, "earnedAt">> = {
    "phase-1": {
      id: "cert-1",
      phaseId: "phase-1",
      title: "Money Basics Certificate",
      description: "Completed Phase 1: Money Basics",
      imageUrl: "/certificates/phase-1.png",
    },
    "phase-2": {
      id: "cert-2",
      phaseId: "phase-2",
      title: "Saving & Budgeting Certificate",
      description: "Completed Phase 2: Saving and Budgeting",
      imageUrl: "/certificates/phase-2.png",
    },
    "phase-3": {
      id: "cert-3",
      phaseId: "phase-3",
      title: "Smart Spending Certificate",
      description: "Completed Phase 3: Smart Spending",
      imageUrl: "/certificates/phase-3.png",
    },
    "phase-4": {
      id: "cert-4",
      phaseId: "phase-4",
      title: "Entrepreneurship Certificate",
      description: "Completed Phase 4: Entrepreneurship",
      imageUrl: "/certificates/phase-4.png",
    },
    "phase-5": {
      id: "cert-5",
      phaseId: "phase-5",
      title: "Investing Basics Certificate",
      description: "Completed Phase 5: Investing Basics",
      imageUrl: "/certificates/phase-5.png",
    },
    "phase-6": {
      id: "cert-6",
      phaseId: "phase-6",
      title: "Digital Money & Banking Certificate",
      description: "Completed Phase 6: Digital Money & Banking",
      imageUrl: "/certificates/phase-6.png",
    },
    "phase-7": {
      id: "cert-7",
      phaseId: "phase-7",
      title: "Sustainability and Giving Certificate",
      description: "Completed Phase 7: Sustainability and Giving",
      imageUrl: "/certificates/phase-7.png",
    },
  };

  return completedPhases
    .map((phaseId) => {
      const cert = phaseCertificates[phaseId];
      if (!cert) return null;
      return {
        ...cert,
        earnedAt: new Date(), // In real app, this would be the actual completion date
      };
    })
    .filter((cert): cert is Certificate => cert !== null);
};
