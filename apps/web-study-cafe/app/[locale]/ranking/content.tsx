"use client";

import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Trophy } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/localization/client";
import { LocaleTypes } from "@/lib/localization/setting";

type RankingPeriod = "daily" | "weekly" | "monthly" | "by_exam";

interface RankingUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  location: string;
  studyTime: string;
  isCurrentUser?: boolean;
}

export function RankingPageContent({ locale }: { locale: LocaleTypes }) {
  const { t } = useTranslation(locale, "common");
  const [activePeriod, setActivePeriod] = useState<RankingPeriod>("daily");

  const periods: RankingPeriod[] = ["daily", "weekly", "monthly", "by_exam"];

  const rankingUsers: RankingUser[] = [
    {
      id: "1",
      rank: 1,
      name: "민지 박",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "서울",
      studyTime: "12시간 30분",
    },
    {
      id: "2",
      rank: 2,
      name: "지우 김",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "부산",
      studyTime: "11시간 45분",
    },
    {
      id: "3",
      rank: 3,
      name: "서준 이",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "대구",
      studyTime: "10시간 50분",
    },
    {
      id: "4",
      rank: 4,
      name: "유나 최",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "인천",
      studyTime: "9시간 20분",
      isCurrentUser: true,
    },
    {
      id: "5",
      rank: 5,
      name: "현우 정",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      location: "광주",
      studyTime: "8시간 15분",
    },
    {
      id: "6",
      rank: 6,
      name: "수영 강",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "대전",
      studyTime: "7시간 50분",
    },
    {
      id: "7",
      rank: 7,
      name: "재현 윤",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "울산",
      studyTime: "6시간 30분",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Trophy className="h-5 w-5 text-yellow-500" fill="currentColor" />
        );
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" fill="currentColor" />;
      case 3:
        return (
          <Trophy className="h-5 w-5 text-orange-500" fill="currentColor" />
        );
      default:
        return (
          <span className="text-base font-semibold text-gray-600 w-5 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900">{t("ranking")}</h1>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Period Tabs */}
      <div className="bg-white px-5 py-3 border-b border-gray-100 overflow-x-auto">
        <div className="flex space-x-6">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`pb-2 text-sm font-medium relative whitespace-nowrap transition-colors ${
                activePeriod === period ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {t(`ranking_periods.${period}`)}
              {activePeriod === period && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Ranking List */}
      <div className="px-5 py-4 pb-24 space-y-2 bg-gray-50">
        {rankingUsers.map((user) => (
          <Card
            key={user.id}
            className={`border shadow-sm rounded-2xl transition-shadow ${
              user.isCurrentUser
                ? "bg-orange-50 border-orange-200"
                : "bg-white border-gray-200"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {/* Rank Icon/Number */}
                <div className="flex-shrink-0 w-8 flex justify-center">
                  {getRankIcon(user.rank)}
                </div>

                {/* User Avatar */}
                <Avatar className="h-11 w-11 ring-2 ring-white shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-pink-100 text-orange-600 text-sm font-medium">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">
                    {user.name}
                  </div>
                  <div className="text-gray-500 text-xs truncate">
                    {user.location}
                  </div>
                </div>

                {/* Study Time */}
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-base">
                    {user.studyTime}
                  </div>
                  <div className="text-xs text-gray-500">{t("study_time")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
