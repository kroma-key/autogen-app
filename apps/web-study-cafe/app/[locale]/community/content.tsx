"use client";

import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Heart, MessageCircle, Share } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/localization/client";
import { LocaleTypes } from "@/lib/localization/setting";

type TabType = "all" | "achievements" | "tips" | "memes";

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  badge?: {
    text: string;
    color: string;
  };
  content: string;
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function CommunityPageContent({ locale }: { locale: LocaleTypes }) {
  const { t } = useTranslation(locale, "common");
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const tabs: TabType[] = ["all", "achievements", "tips", "memes"];

  const posts: CommunityPost[] = [
    {
      id: "1",
      user: {
        name: "Minji Park",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        timeAgo: "2h",
      },
      badge: {
        text: "100hr Milestone",
        color: "bg-purple-600",
      },
      content:
        "Finally hit the 100-hour mark! Studied for 10 hours today. Feeling accomplished. #1 in today's ranking! 🔥",
      interactions: {
        likes: 23,
        comments: 5,
        shares: 2,
      },
    },
    {
      id: "2",
      user: {
        name: "Jaehyun Kim",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        timeAgo: "5h",
      },
      badge: {
        text: "30-Day Streak",
        color: "bg-purple-600",
      },
      content:
        "Can't believe I've studied every day for a month. Today was 8 hours straight. Keep pushing!",
      interactions: {
        likes: 18,
        comments: 3,
        shares: 1,
      },
    },
    {
      id: "3",
      user: {
        name: "Seohee Lee",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        timeAgo: "8h",
      },
      badge: {
        text: "Top 100 Rank",
        color: "bg-purple-600",
      },
      content:
        "Broke into the top 100! A solid 12 hours of studying today made it happen. Let's go!",
      interactions: {
        likes: 35,
        comments: 8,
        shares: 4,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900 flex-1 text-center">
            {t("community")}
          </h1>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-5 py-3 border-b border-gray-100 overflow-x-auto">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium relative whitespace-nowrap transition-colors ${
                activeTab === tab ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {t(`tabs.${tab}`)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-5 py-4 pb-24 space-y-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-pink-100 text-orange-600 text-sm font-medium">
                    {post.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {post.user.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {post.user.timeAgo}
                    </span>
                  </div>
                  {post.badge && (
                    <Badge
                      className="bg-orange-50 text-orange-600 text-xs mt-1 border border-orange-200"
                      variant="outline"
                    >
                      {post.badge.text}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Interactions */}
              <div className="flex items-center space-x-5 pt-2 border-t border-gray-100">
                <button className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors py-1">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {post.interactions.likes}
                  </span>
                </button>
                <button className="flex items-center space-x-1.5 text-gray-500 hover:text-orange-500 transition-colors py-1">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {post.interactions.comments}
                  </span>
                </button>
                <button className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors py-1">
                  <Share className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {post.interactions.shares}
                  </span>
                </button>
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
