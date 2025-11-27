"use client";

import { useApp } from "@/contexts/AppContext";
import BottomNav from "./BottomNav";
import { ShopItem } from "@/types";

interface ShopScreenProps {
  activeTab: "home" | "lessons" | "shop" | "profile";
  onTabChange: (tab: "home" | "lessons" | "shop" | "profile") => void;
}

const shopItems: ShopItem[] = [
  {
    id: "xp-boost",
    name: "XP Boost",
    description: "Double XP for 1 hour",
    price: 100,
    icon: "⚡",
    type: "boost",
  },
  {
    id: "streak-freeze",
    name: "Streak Freeze",
    description: "Protect your streak",
    price: 200,
    icon: "❄️",
    type: "freeze",
  },
  {
    id: "avatar-hat",
    name: "Avatar Hat",
    description: "Customize avatar",
    price: 200,
    icon: "🎩",
    type: "cosmetic",
  },
  {
    id: "mystery-box",
    name: "Mystery Box",
    description: "Random rewards",
    price: 150,
    icon: "🎁",
    type: "mystery",
  },
];

export default function ShopScreen({
  activeTab,
  onTabChange,
}: ShopScreenProps) {
  const { user, purchaseItem, updateUser } = useApp();

  const handlePurchase = (item: ShopItem) => {
    if (user.coins >= item.price) {
      purchaseItem(item);

      // Handle special item types
      if (item.type === "freeze") {
        updateUser({ streakFreezes: (user.streakFreezes || 0) + 1 });
        alert(
          `Purchased ${item.name}! You now have ${
            (user.streakFreezes || 0) + 1
          } streak freeze(s).`
        );
      } else if (item.type === "boost") {
        updateUser({ xpBoosts: (user.xpBoosts || 0) + 1 });
        alert(
          `Purchased ${item.name}! You now have ${
            (user.xpBoosts || 0) + 1
          } XP boost(s).`
        );
      } else {
        alert(`Purchased ${item.name}!`);
      }
    } else {
      alert("Not enough coins!");
    }
  };

  const handleDailyBonus = () => {
    const today = new Date().toDateString();
    if (user.lastDailyBonus !== today) {
      updateUser({
        coins: user.coins + 50,
        lastDailyBonus: today,
      });
      alert("Daily bonus claimed! You received 50 coins!");
    } else {
      alert("You've already claimed your daily bonus today!");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-6"></div>
            <h2 className="text-xl font-bold text-gray-900">Shop</h2>
            <div className="bg-accent text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
              <span>💰</span>
              <span>{user.coins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Bonus */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-gradient-to-br from-accent to-yellow-400 rounded-[16px] p-6 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-3">🎁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Daily Bonus
            </h3>
            <p className="text-gray-700 mb-4">Claim 50 coins every day!</p>
            <button
              onClick={handleDailyBonus}
              disabled={user.lastDailyBonus === new Date().toDateString()}
              className={`w-full py-3 rounded-[16px] font-bold text-lg transition-colors ${
                user.lastDailyBonus === new Date().toDateString()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-accent hover:bg-gray-100"
              }`}
            >
              {user.lastDailyBonus === new Date().toDateString()
                ? "Already Claimed Today"
                : "Claim Bonus"}
            </button>
          </div>
        </div>
      </div>

      {/* Shop Items */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Power-Ups</h3>
        <div className="grid grid-cols-2 gap-4">
          {shopItems.map((item) => {
            const canAfford = user.coins >= item.price;
            const colorMap: Record<string, string> = {
              boost: "bg-blue-100",
              freeze: "bg-blue-100",
              cosmetic: "bg-green-100",
              mystery: "bg-purple-100",
            };

            return (
              <div
                key={item.id}
                className="bg-white rounded-[16px] p-4 shadow-md border border-gray-100"
              >
                <div
                  className={`${
                    colorMap[item.type]
                  } w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 text-center mb-3">
                  {item.description}
                </p>
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded-[16px] font-semibold text-sm transition-colors flex items-center justify-center gap-1 ${
                    canAfford
                      ? "bg-accent text-gray-900 hover:bg-yellow-400"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>💰</span>
                  <span>{item.price}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
