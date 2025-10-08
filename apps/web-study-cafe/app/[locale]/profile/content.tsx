"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Settings } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export function ProfilePageContent() {
  const userStats = {
    totalHours: 247,
    streak: 28,
    rank: 23,
  };

  const achievementBadges = [
    { id: 1, name: "First Study", unlocked: true, icon: "🌱" },
    { id: 2, name: "Natural Color", unlocked: true, icon: "🌿" },
    { id: 3, name: "True Love", unlocked: true, icon: "💚" },
    { id: 4, name: "Mineral Natural", unlocked: true, icon: "💎" },
    { id: 5, name: "Safe Safe", unlocked: true, icon: "🛡️" },
    { id: 6, name: "Night Owl", unlocked: false, icon: "🦉" },
    { id: 7, name: "Early Bird", unlocked: false, icon: "🐦" },
    { id: 8, name: "Marathon", unlocked: false, icon: "🏃" },
    { id: 9, name: "Scholar", unlocked: false, icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-50 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-5 pb-24 space-y-6">
        {/* User Profile Card */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden mt-4">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Avatar className="h-24 w-24 mx-auto ring-4 ring-white shadow-md">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Jaehyun"
                />
                <AvatarFallback className="bg-gradient-to-br from-orange-100 to-pink-100 text-orange-600 text-xl font-semibold">
                  J
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">Jaehyun</h2>
                <p className="text-sm text-gray-500 font-medium">D-180</p>
              </div>

              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-6 py-2 text-sm font-medium">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                Total
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {userStats.totalHours}
                <span className="text-sm ml-0.5">h</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                Streak
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {userStats.streak}
                <span className="text-sm ml-0.5">days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">Rank</div>
              <div className="text-2xl font-bold text-gray-900">
                #{userStats.rank}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">
            Achievement Badges
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {achievementBadges.map((badge) => (
              <Card
                key={badge.id}
                className={`aspect-square border shadow-sm rounded-2xl transition-all ${
                  badge.unlocked
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <CardContent className="p-3 h-full flex flex-col items-center justify-center">
                  <div
                    className={`text-3xl mb-2 ${!badge.unlocked && "opacity-30"}`}
                  >
                    {badge.icon}
                  </div>
                  <div
                    className={`text-[10px] font-medium text-center leading-tight ${
                      badge.unlocked ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {badge.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Heatmap */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">
            Study Activity
          </h3>
          <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-6 flex items-center justify-center h-32">
              <div className="text-gray-500 text-sm font-medium">
                Study Activity Heatmap
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
