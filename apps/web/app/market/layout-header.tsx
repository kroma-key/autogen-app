"use client";

import * as React from "react";
import { Search, Home } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/supabase";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Breadcrumb 데이터 생성
  const generateBreadcrumbData = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // 홈 추가
    breadcrumbs.push({
      name: "홈",
      href: "/",
      icon: Home,
    });

    // 마켓 추가
    if (segments.includes("market")) {
      breadcrumbs.push({
        name: "픽셀마켓",
        href: "/market",
        icon: null,
      });
    }

    // 서브 페이지 추가
    const marketIndex = segments.indexOf("market");
    if (marketIndex !== -1 && segments[marketIndex + 1]) {
      const pageName = segments[marketIndex + 1];
      const pageNames: { [key: string]: string } = {
        "my-ads": "내 광고 관리",
        "advertiser-center": "광고주 센터",
        onboarding: "입점하기",
        events: "이벤트 존",
      };

      breadcrumbs.push({
        name: pageNames[pageName as keyof typeof pageNames] || pageName,
        href: pathname,
        icon: null,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbData = generateBreadcrumbData();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbData.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbData.length - 1 ? (
                    <BreadcrumbPage className="text-blue-600 font-medium">
                      {breadcrumb.icon && (
                        <breadcrumb.icon className="w-4 h-4 mr-1" />
                      )}
                      {breadcrumb.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={breadcrumb.href}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        {breadcrumb.icon && (
                          <breadcrumb.icon className="w-4 h-4 mr-1" />
                        )}
                        {breadcrumb.name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-4">
          {/* 로그인 상태에 따른 조건부 렌더링 */}
          {!loading && (
            <>
              {user ? (
                // 로그인된 경우: 검색바만 표시
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="검색..." className="pl-10 w-80" />
                </div>
              ) : (
                // 로그인되지 않은 경우: 로그인 버튼 표시
                <Link href="/auth/login">
                  <Button variant="outline">로그인</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
