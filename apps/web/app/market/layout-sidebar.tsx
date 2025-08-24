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
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
