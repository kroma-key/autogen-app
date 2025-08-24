"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconAd,
  IconBuildingStore,
  IconGift,
  IconInnerShadowTop,
  IconPhone,
  IconSettings,
  IconUsers,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useAuth, useUserProfile } from "@/hooks/supabase";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

const data = {
  user: {
    name: "픽셀마켓",
    email: "user@pixelmarket.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "내 광고 관리",
      url: "/market/my-ads",
      icon: IconAd,
    },
    {
      title: "광고주 센터",
      url: "/market/advertiser-center",
      icon: IconUsers,
    },
    {
      title: "입점하기",
      url: "/market/onboarding",
      icon: IconBuildingStore,
    },
    {
      title: "이벤트 존",
      url: "/market/events",
      icon: IconGift,
    },
  ],
  navSecondary: [
    {
      title: "설정",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "고객센터",
      url: "#",
      icon: IconPhone,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, signOut } = useAuth();
  const userProfile = useUserProfile();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/market">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">픽셀마켓</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!loading && (
          <div className="p-4 border-t">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 p-2 h-auto"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={userProfile?.avatarUrl}
                        alt={userProfile?.email || ""}
                      />
                      <AvatarFallback className="bg-blue-500 text-white text-sm">
                        {userProfile?.initials || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium text-foreground">
                        {userProfile?.displayName || "사용자"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {userProfile?.email}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/market/my-ads"
                      className="flex items-center gap-2"
                    >
                      <IconAd className="w-4 h-4" />내 광고 관리
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/market/advertiser-center"
                      className="flex items-center gap-2"
                    >
                      <IconUsers className="w-4 h-4" />
                      광고주 센터
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600">
                    <IconLogout className="w-4 h-4 mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  로그인하여 더 많은 기능을 이용하세요
                </p>
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href="/auth/login">
                      <IconUser className="w-4 h-4 mr-2" />
                      로그인
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Link href="/auth/signup">회원가입</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
