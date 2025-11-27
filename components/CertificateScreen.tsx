"use client";

import { useApp } from "@/contexts/AppContext";
import { Certificate } from "@/types";
import BottomNav from "./BottomNav";

interface CertificateScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
  onBack: () => void;
}

export default function CertificateScreen({
  activeTab,
  onTabChange,
  onBack,
}: CertificateScreenProps) {
  const { user, phases } = useApp();

  // Generate certificates for completed phases
  const certificates: Certificate[] = user.unlockedPhases
    .map((phaseId) => {
      const phase = phases.find((p) => p.id === phaseId);
      if (!phase) return null;
      return {
        id: `cert-${phaseId}`,
        phaseId: phase.id,
        title: `${phase.title} Master`,
        description: `Completed all lessons in ${phase.title}`,
        earnedAt: new Date(),
      };
    })
    .filter((c): c is Certificate => c !== null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900">Certificates</h2>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {certificates.length === 0 ? (
          <div className="bg-white rounded-[16px] p-8 text-center shadow-md">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600">
              Complete phases to earn certificates!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certificates.map((certificate) => {
              const phase = phases.find((p) => p.id === certificate.phaseId);

              return (
                <div
                  key={certificate.id}
                  className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-accent/20 rounded-[16px] p-6 shadow-lg border-2 border-accent"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {certificate.description}
                    </p>
                    <div className="bg-white/50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Earned on</p>
                      <p className="font-semibold text-gray-900">
                        {certificate.earnedAt.toLocaleDateString()}
                      </p>
                    </div>
                    {phase && (
                      <div className="flex items-center justify-center gap-2 text-2xl">
                        {phase.icon}
                        <span className="text-gray-700 font-semibold">
                          {phase.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
