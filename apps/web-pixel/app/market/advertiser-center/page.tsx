"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function AdvertiserCenterPage() {
  const campaignData = [
    {
      name: "타겟 마케팅 캠페인",
      budget: 500000,
      spent: 320000,
      clicks: 2500,
      conversions: 85,
      status: "진행중",
    },
    {
      name: "브랜드 인지도 캠페인",
      budget: 300000,
      spent: 180000,
      clicks: 1800,
      conversions: 45,
      status: "진행중",
    },
    {
      name: "리타겟팅 캠페인",
      budget: 200000,
      spent: 200000,
      clicks: 1200,
      conversions: 38,
      status: "완료",
    },
  ];

  const quickActions = [
    {
      title: "새 캠페인 만들기",
      description: "타겟 고객에게 맞는 광고 캠페인을 시작하세요",
      icon: Target,
      color: "bg-blue-500",
    },
    {
      title: "예산 관리",
      description: "광고 예산을 효율적으로 관리하세요",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "성과 분석",
      description: "상세한 광고 성과 리포트를 확인하세요",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "계정 설정",
      description: "광고주 계정 정보를 관리하세요",
      icon: Settings,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">광고주 센터</h1>
          <p className="text-gray-600">
            효과적인 광고 캠페인을 관리하고 성과를 분석하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <HelpCircle className="w-4 h-4 mr-2" />
            도움말
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />새 캠페인
          </Button>
        </div>
      </div>

      {/* 대시보드 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />총 광고비
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩700,000</div>
            <p className="text-xs text-green-600 mt-1">지난 달 대비 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              도달 사용자
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,230</div>
            <p className="text-xs text-green-600 mt-1">지난 달 대비 +8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Target className="w-4 h-4 mr-1" />
              전환율
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-red-600 mt-1">지난 달 대비 -0.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              ROAS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8x</div>
            <p className="text-xs text-green-600 mt-1">지난 달 대비 +0.5x</p>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 작업 */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div
                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 진행 중인 캠페인 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>진행 중인 캠페인</span>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              전체 보고서
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {campaignData.map((campaign, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <Badge
                      variant={
                        campaign.status === "진행중" ? "default" : "secondary"
                      }
                      className="mt-1"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">예산 사용률</p>
                    <p className="font-semibold">
                      {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress
                    value={(campaign.spent / campaign.budget) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>사용: ₩{campaign.spent.toLocaleString()}</span>
                    <span>예산: ₩{campaign.budget.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">클릭 수</p>
                    <p className="font-semibold text-lg">
                      {campaign.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">전환 수</p>
                    <p className="font-semibold text-lg">
                      {campaign.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">전환율</p>
                    <p className="font-semibold text-lg">
                      {((campaign.conversions / campaign.clicks) * 100).toFixed(
                        2
                      )}
                      %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            최근 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">
                  새 캠페인 '타겟 마케팅 캠페인'이 시작되었습니다.
                </p>
                <p className="text-sm text-gray-600">2시간 전</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">
                  예산이 성공적으로 업데이트되었습니다.
                </p>
                <p className="text-sm text-gray-600">1일 전</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="font-medium">
                  월간 성과 보고서가 준비되었습니다.
                </p>
                <p className="text-sm text-gray-600">3일 전</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
