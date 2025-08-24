"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Search, Plus, Eye, Edit, Trash2, BarChart3 } from "lucide-react";

export default function MyAdsPage() {
  const myAds = [
    {
      id: 1,
      title: "신상품 출시 이벤트",
      status: "활성",
      clicks: 1250,
      impressions: 15420,
      ctr: "8.1%",
      budget: "50,000원",
      remaining: "32,000원",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      title: "겨울 세일 특가",
      status: "일시정지",
      clicks: 856,
      impressions: 12300,
      ctr: "6.9%",
      budget: "30,000원",
      remaining: "15,500원",
      endDate: "2024-01-31",
    },
    {
      id: 3,
      title: "브랜드 소개 캠페인",
      status: "종료",
      clicks: 2100,
      impressions: 28500,
      ctr: "7.4%",
      budget: "100,000원",
      remaining: "0원",
      endDate: "2024-01-20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "활성":
        return <Badge className="bg-green-100 text-green-800">활성</Badge>;
      case "일시정지":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">일시정지</Badge>
        );
      case "종료":
        return <Badge className="bg-gray-100 text-gray-800">종료</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">내 광고 관리</h1>
          <p className="text-gray-600">광고 성과를 확인하고 관리하세요</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />새 광고 만들기
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              총 광고 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              총 클릭 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,206</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              총 노출 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56,220</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              평균 CTR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5%</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="광고 제목으로 검색..." className="pl-10" />
        </div>
        <Button variant="outline">필터</Button>
      </div>

      {/* 광고 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>광고 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myAds.map((ad) => (
              <div
                key={ad.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{ad.title}</h3>
                    {getStatusBadge(ad.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">클릭 수</p>
                    <p className="font-semibold">
                      {ad.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">노출 수</p>
                    <p className="font-semibold">
                      {ad.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">CTR</p>
                    <p className="font-semibold">{ad.ctr}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">예산</p>
                    <p className="font-semibold">{ad.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">잔여 예산</p>
                    <p className="font-semibold">{ad.remaining}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">종료일</p>
                    <p className="font-semibold">{ad.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
