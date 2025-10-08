"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Play, Pause, Square, Settings, Camera } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/localization/client";
import { LocaleTypes } from "@/lib/localization/setting";

type Subject = "math" | "english" | "science" | "history";

interface StudyRoomUser {
  id: string;
  name: string;
  avatar: string;
  status: "studying" | "short-break" | "long-break";
  subject: string;
  studyTime: string;
}

export function StudyCafePageContent({ locale }: { locale: LocaleTypes }) {
  const { t } = useTranslation(locale, "common");

  const [selectedSubject, setSelectedSubject] = useState<Subject>("math");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [todayStats] = useState({
    totalStudyTime: "2h 30m",
    streak: 5,
    rank: 12,
  });

  const subjects: Subject[] = ["math", "english", "science", "history"];

  const studyRoomUsers: StudyRoomUser[] = [
    {
      id: "1",
      name: "Alex",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "studying",
      subject: "Math",
      studyTime: "1h 20m",
    },
    {
      id: "2",
      name: "Sarah",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "short-break",
      subject: "English",
      studyTime: "2h 15m",
    },
    {
      id: "3",
      name: "Mike",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "long-break",
      subject: "Science",
      studyTime: "45m",
    },
    {
      id: "4",
      name: "Emma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "studying",
      subject: "History",
      studyTime: "3h 10m",
    },
    {
      id: "5",
      name: "John",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "studying",
      subject: "Math",
      studyTime: "1h 45m",
    },
  ];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "studying":
        return "bg-green-500";
      case "short-break":
        return "bg-yellow-500";
      case "long-break":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Toss style */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900">{t("app_name")}</h1>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:bg-gray-50 rounded-full cursor-pointer"
              aria-label={t("settings")}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-5 pb-24 space-y-4">
        {/* Subject Selection - Chip style */}
        <div className="py-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {subjects.map((subject) => (
              <button
                key={subject}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedSubject === subject
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSubject(subject)}
                aria-label={t(`subjects.${subject}`)}
              >
                {t(`subjects.${subject}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Card - Toss card style */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              {/* Timer Display */}
              <div className="space-y-2">
                <div className="text-5xl font-bold text-gray-900 tracking-tight">
                  {formatTime(time)}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {t(`subjects.${selectedSubject}`)}
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  onClick={handlePause}
                  disabled={!isRunning || isPaused}
                >
                  <Pause className="h-5 w-5 text-gray-700" />
                </Button>

                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  onClick={handlePlay}
                  disabled={isRunning && !isPaused}
                >
                  <Play className="h-7 w-7 text-white ml-0.5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  onClick={handleStop}
                  disabled={!isRunning}
                >
                  <Square className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Stats - Grid layout like Toss */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                {t("total_study_time")}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {todayStats.totalStudyTime}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                {t("streak")}
              </div>
              <div className="text-2xl font-bold text-orange-500">
                {todayStats.streak}
                <span className="text-sm ml-0.5">{t("days")}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">
                {t("rank")}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                #{todayStats.rank}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Room - Cleaner design */}
        <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {t("study_room")}
              </h3>
              <span className="text-xs text-gray-500">
                {studyRoomUsers.length} {t("studying")}
              </span>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto">
              {studyRoomUsers.map((user) => (
                <div key={user.id} className="flex-shrink-0 relative">
                  <Avatar className="h-14 w-14 ring-2 ring-white shadow-sm">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-100 to-pink-100 text-orange-600 text-sm font-medium">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                  />
                </div>
              ))}
              <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0"
              >
                <Camera className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
