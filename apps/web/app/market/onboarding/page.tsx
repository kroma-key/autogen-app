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
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Store,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

export default function OnboardingPage() {
  const benefits = [
    {
      icon: Users,
      title: "대규모 고객층 확보",
      description: "월 100만+ 활성 사용자에게 상품을 노출하세요",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: "매출 증대",
      description: "평균 30% 매출 증가를 경험한 입점 업체들",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "안전한 거래",
      description: "에스크로 시스템으로 안전한 결제 보장",
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "24/7 고객지원",
      description: "언제든지 도움을 받을 수 있는 전담 지원팀",
      color: "bg-orange-500",
    },
  ];

  const plans = [
    {
      name: "베이직",
      price: "무료",
      period: "",
      description: "소규모 사업자를 위한 기본 플랜",
      features: [
        "상품 등록 최대 50개",
        "기본 분석 도구",
        "이메일 고객지원",
        "모바일 앱 지원",
      ],
      popular: false,
    },
    {
      name: "프로",
      price: "49,000원",
      period: "/월",
      description: "성장하는 비즈니스를 위한 전문가 플랜",
      features: [
        "상품 등록 무제한",
        "고급 분석 및 리포트",
        "우선 고객지원",
        "맞춤형 상점 디자인",
        "마케팅 도구",
        "API 연동",
      ],
      popular: true,
    },
    {
      name: "엔터프라이즈",
      price: "문의",
      period: "",
      description: "대기업을 위한 맞춤형 솔루션",
      features: [
        "모든 프로 기능 포함",
        "전담 계정 매니저",
        "맞춤형 통합",
        "고급 보안 기능",
        "SLA 보장",
        "교육 및 컨설팅",
      ],
      popular: false,
    },
  ];

  const steps = [
    {
      step: 1,
      title: "회원가입 및 계정 인증",
      description: "사업자 등록증으로 계정을 인증하세요",
    },
    {
      step: 2,
      title: "상점 정보 입력",
      description: "상점명, 소개, 로고 등 기본 정보를 등록하세요",
    },
    {
      step: 3,
      title: "상품 등록",
      description: "판매할 상품의 정보와 이미지를 업로드하세요",
    },
    {
      step: 4,
      title: "결제 정보 설정",
      description: "정산받을 계좌와 세금 정보를 등록하세요",
    },
    {
      step: 5,
      title: "심사 및 승인",
      description: "최대 3일 내 심사 완료 후 판매를 시작하세요",
    },
  ];

  const testimonials = [
    {
      name: "김영희",
      business: "핸드메이드 액세서리",
      rating: 5,
      comment:
        "입점 후 매출이 3배 증가했어요. 고객 관리 도구도 정말 유용합니다!",
    },
    {
      name: "박민수",
      business: "홈카페 용품",
      rating: 5,
      comment: "마케팅 도구 덕분에 신제품 출시가 훨씬 쉬워졌습니다.",
    },
    {
      name: "이지은",
      business: "반려동물 용품",
      rating: 5,
      comment: "고객지원팀이 정말 친절하고 빠르게 도와주세요.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 히어로 섹션 */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Store className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            픽셀마켓에서 사업을 시작하세요
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            100만 고객에게 상품을 판매하고, 비즈니스를 성장시킬 수 있는 최고의
            플랫폼
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="px-8">
              지금 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              더 알아보기
            </Button>
          </div>
        </div>
      </div>

      {/* 주요 혜택 */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          왜 픽셀마켓을 선택해야 할까요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div
                  className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 요금제 */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">요금제 선택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-blue-500 border-2" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  인기
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "엔터프라이즈" ? "문의하기" : "시작하기"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 입점 절차 */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          간단한 5단계로 입점 완료
        </h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 고객 후기 */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">입점 업체 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.business}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 입점 신청 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            지금 바로 입점 신청하세요
          </CardTitle>
        </CardHeader>
        <CardContent className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-name">상호명 *</Label>
                <Input id="company-name" placeholder="상호명을 입력하세요" />
              </div>
              <div>
                <Label htmlFor="business-number">사업자등록번호 *</Label>
                <Input id="business-number" placeholder="000-00-00000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name">담당자명 *</Label>
                <Input id="contact-name" placeholder="담당자명을 입력하세요" />
              </div>
              <div>
                <Label htmlFor="contact-phone">연락처 *</Label>
                <Input id="contact-phone" placeholder="010-0000-0000" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">이메일 *</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>

            <div>
              <Label htmlFor="business-category">사업 분야 *</Label>
              <Input
                id="business-category"
                placeholder="예: 의류, 전자제품, 식품 등"
              />
            </div>

            <div>
              <Label htmlFor="business-description">사업 소개</Label>
              <Textarea
                id="business-description"
                placeholder="사업에 대해 간단히 소개해주세요"
                rows={4}
              />
            </div>

            <Button className="w-full" size="lg">
              입점 신청하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-sm text-gray-600 text-center">
              신청 후 영업일 기준 3일 내 심사 결과를 안내드립니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
