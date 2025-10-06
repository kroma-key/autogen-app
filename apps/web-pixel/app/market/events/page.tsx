"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Gift,
  Calendar,
  Trophy,
  Zap,
  Clock,
  Star,
  ArrowRight,
  Tag,
  Heart,
  Sparkles,
} from "lucide-react";

export default function EventsPage() {
  const currentEvents = [
    {
      id: 1,
      title: "신규 회원 첫 구매 50% 할인",
      description:
        "픽셀마켓에 처음 오신 분들을 위한 특별한 혜택! 첫 구매 시 최대 50% 할인받으세요.",
      type: "할인",
      discount: "50%",
      endDate: "2024-02-29",
      participants: 1250,
      image: "🎁",
      color: "bg-red-500",
      status: "진행중",
    },
    {
      id: 2,
      title: "겨울 시즌 메가 세일",
      description:
        "겨울 상품 대규모 할인전! 의류, 액세서리, 가전제품까지 모든 카테고리 특가.",
      type: "세일",
      discount: "최대 70%",
      endDate: "2024-02-15",
      participants: 3420,
      image: "❄️",
      color: "bg-blue-500",
      status: "진행중",
    },
    {
      id: 3,
      title: "럭키 드로우 이벤트",
      description:
        "매일 오후 3시 럭키 드로우! 아이폰, 에어�팟, 상품권까지 푸짐한 상품을 받아가세요.",
      type: "추첨",
      discount: "무료",
      endDate: "2024-03-31",
      participants: 8950,
      image: "🎰",
      color: "bg-purple-500",
      status: "진행중",
    },
    {
      id: 4,
      title: "친구 추천 적립금 이벤트",
      description:
        "친구를 추천하고 둘 다 적립금을 받으세요! 추천인과 피추천인 모두에게 혜택을 드려요.",
      type: "적립금",
      discount: "5,000원",
      endDate: "2024-12-31",
      participants: 2150,
      image: "👥",
      color: "bg-green-500",
      status: "진행중",
    },
  ];

  const upcomingEvents = [
    {
      title: "발렌타인 데이 특별 이벤트",
      description: "사랑하는 사람을 위한 선물 추천과 특별 할인",
      startDate: "2024-02-10",
      image: "💝",
      type: "예정",
    },
    {
      title: "봄맞이 새 상품 출시 이벤트",
      description: "봄 신상품 런칭과 함께하는 얼리버드 할인",
      startDate: "2024-03-01",
      image: "🌸",
      type: "예정",
    },
    {
      title: "1주년 기념 대축제",
      description: "픽셀마켓 1주년을 기념하는 역대 최대 이벤트",
      startDate: "2024-04-15",
      image: "🎉",
      type: "예정",
    },
  ];

  const eventCategories = [
    { name: "전체", count: 12, active: true },
    { name: "할인/세일", count: 5, active: false },
    { name: "적립금", count: 3, active: false },
    { name: "추첨", count: 2, active: false },
    { name: "신규회원", count: 2, active: false },
  ];

  const winners = [
    { name: "김**", prize: "아이폰 15 Pro", date: "2024-01-25" },
    { name: "이**", prize: "에어팟 Pro", date: "2024-01-24" },
    { name: "박**", prize: "10만원 상품권", date: "2024-01-23" },
    { name: "정**", prize: "스타벅스 기프티콘", date: "2024-01-22" },
    { name: "최**", prize: "5만원 적립금", date: "2024-01-21" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "진행중":
        return <Badge className="bg-green-100 text-green-800">진행중</Badge>;
      case "예정":
        return <Badge className="bg-blue-100 text-blue-800">예정</Badge>;
      case "종료":
        return <Badge className="bg-gray-100 text-gray-800">종료</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <div className="flex justify-center mb-4">
          <Gift className="w-12 h-12 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">이벤트 존</h1>
        <p className="text-gray-600">
          다양한 이벤트와 혜택으로 더 즐거운 쇼핑을 경험하세요!
        </p>
      </div>

      {/* 이벤트 카테고리 */}
      <div className="flex flex-wrap gap-2">
        {eventCategories.map((category, index) => (
          <Button
            key={index}
            variant={category.active ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
          >
            {category.name}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* 진행 중인 이벤트 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            진행 중인 이벤트
          </h2>
          <Button variant="outline" size="sm">
            전체보기
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className={`${event.color} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{event.image}</span>
                    {getStatusBadge(event.status)}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm opacity-90">{event.description}</p>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">할인율</p>
                        <p className="font-bold text-lg text-red-600">
                          {event.discount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">참여자</p>
                        <p className="font-bold text-lg">
                          {event.participants.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {event.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {event.endDate}까지
                    </div>
                    <Button size="sm">
                      참여하기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 예정된 이벤트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          예정된 이벤트
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-3">{event.image}</div>
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {event.description}
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-blue-600">
                  <Calendar className="w-4 h-4" />
                  {event.startDate} 시작
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 이벤트 통계 및 당첨자 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 이벤트 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              이번 달 이벤트 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">총 이벤트 수</span>
                <span className="font-bold text-2xl">12개</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">총 참여자 수</span>
                <span className="font-bold text-2xl">15,820명</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">총 할인 혜택</span>
                <span className="font-bold text-2xl text-red-600">
                  ₩2,350만
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">만족도</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">4.8/5.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 최근 당첨자 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              최근 당첨자 발표
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{winner.name}</p>
                      <p className="text-sm text-gray-600">{winner.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {winner.prize}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              전체 당첨자 보기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 이벤트 알림 구독 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="text-center py-8">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">이벤트 알림 받기</h3>
          <p className="text-gray-600 mb-6">
            새로운 이벤트와 특별 혜택을 가장 먼저 알려드릴게요!
          </p>
          <div className="flex justify-center gap-4">
            <Button>이메일 구독</Button>
            <Button variant="outline">카카오톡 알림</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
