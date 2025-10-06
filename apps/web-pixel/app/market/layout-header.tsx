"use client";

import * as React from "react";
import { Search, Home } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
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

// 타입 정의
interface BreadcrumbItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

interface PageNameMapping {
  [key: string]: string;
}

// 순수 함수들
const getPageNameMapping = (): PageNameMapping => ({
  "my-ads": "내 광고 관리",
  "advertiser-center": "광고주 센터",
  onboarding: "입점하기",
  events: "이벤트 존",
});

const createHomeBreadcrumb = (): BreadcrumbItem => ({
  name: "홈",
  href: "/",
  icon: Home,
});

const createMarketBreadcrumb = (): BreadcrumbItem => ({
  name: "픽셀마켓",
  href: "/market",
  icon: null,
});

const createSubPageBreadcrumb = (
  pathname: string,
  pageName: string
): BreadcrumbItem => {
  const pageNames = getPageNameMapping();
  const displayName = pageNames[pageName] || pageName;

  return {
    name: displayName,
    href: pathname,
    icon: null,
  };
};

const generateBreadcrumbData = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // 홈 추가
  breadcrumbs.push(createHomeBreadcrumb());

  // 마켓 추가
  if (segments.includes("market")) {
    breadcrumbs.push(createMarketBreadcrumb());
  }

  // 서브 페이지 추가
  const marketIndex = segments.indexOf("market");
  if (marketIndex !== -1 && segments[marketIndex + 1]) {
    const pageName = segments[marketIndex + 1];
    if (pageName) {
      breadcrumbs.push(createSubPageBreadcrumb(pathname, pageName));
    }
  }

  return breadcrumbs;
};

const renderBreadcrumbItem = (
  breadcrumb: BreadcrumbItem,
  index: number,
  totalItems: number
): React.ReactNode => {
  const isLast = index === totalItems - 1;

  if (isLast) {
    return (
      <BreadcrumbPage className="text-blue-600 font-medium whitespace-nowrap">
        {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4 mr-1" />}
        {breadcrumb.name}
      </BreadcrumbPage>
    );
  }

  return (
    <BreadcrumbLink asChild>
      <Link
        href={breadcrumb.href}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors whitespace-nowrap"
      >
        {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4 mr-1" />}
        {breadcrumb.name}
      </Link>
    </BreadcrumbLink>
  );
};

const renderSearchOrLogin = (user: any, loading: boolean): React.ReactNode => {
  if (loading) return null;

  if (user) {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input placeholder="검색..." className="pl-10 w-80" />
      </div>
    );
  }

  return (
    <Link href="/auth/login">
      <Button variant="outline">로그인</Button>
    </Link>
  );
};

export function SiteHeader() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Breadcrumb 데이터 생성
  const breadcrumbData = React.useMemo(
    () => generateBreadcrumbData(pathname),
    [pathname]
  );

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumb with ScrollArea for horizontal scrolling */}
        <ScrollArea className="flex-1 max-w-md">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              {breadcrumbData.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem className="flex-shrink-0">
                    {renderBreadcrumbItem(
                      breadcrumb,
                      index,
                      breadcrumbData.length
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </ScrollArea>

        <div className="ml-auto flex items-center gap-4">
          {renderSearchOrLogin(user, loading)}
        </div>
      </div>
    </header>
  );
}
