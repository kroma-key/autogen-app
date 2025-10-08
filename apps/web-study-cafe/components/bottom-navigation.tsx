"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Clock, Users, User, Trophy, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/lib/localization/client";
import { LocaleTypes } from "@/lib/localization/setting";

interface NavigationItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    icon: Clock,
    labelKey: "timer",
  },
  {
    href: "/community",
    icon: Users,
    labelKey: "community",
  },
  {
    href: "/profile",
    icon: User,
    labelKey: "profile",
  },
  {
    href: "/ranking",
    icon: Trophy,
    labelKey: "ranking",
  },
  {
    href: "/store",
    icon: ShoppingBag,
    labelKey: "store",
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as LocaleTypes) || "ko";
  const { t } = useTranslation(locale, "common");

  // Remove locale prefix from pathname for comparison
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around py-2">
        {navigationItems.map((item) => {
          const isActive = pathWithoutLocale === item.href;
          const Icon = item.icon;
          const localizedHref = `/${locale}${item.href === "/" ? "" : item.href}`;

          return (
            <Link
              key={item.href}
              href={localizedHref}
              className="flex flex-col items-center space-y-1 py-1.5 px-3 min-w-[64px] transition-all cursor-pointer"
              aria-label={t(item.labelKey)}
            >
              <Icon
                className={`h-6 w-6 transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
