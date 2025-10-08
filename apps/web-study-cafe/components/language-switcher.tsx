"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Globe } from "lucide-react";
import { fallbackLng, LocaleTypes } from "@/lib/localization/setting";
import { useTranslation } from "@/lib/localization/client";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as LocaleTypes) || fallbackLng;
  const { i18n } = useTranslation(locale, "common");

  const segmentsPath = pathname.slice(1).split("/");
  const withoutLocalePath =
    locale === fallbackLng ? segmentsPath : segmentsPath.slice(1);

  const changeLanguage = (newLocale: LocaleTypes) => {
    i18n.changeLanguage(newLocale); // 클라이언트 측 언어 변경
    router.push(`/${newLocale}/${withoutLocalePath.join("/")}`); // URL에 언어 반영
  };

  const getLanguageLabel = (lang: LocaleTypes) => {
    return lang === "ko" ? "한국어" : "English";
  };

  const otherLocale = locale === "ko" ? "en" : "ko";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center space-x-1 text-gray-600 hover:bg-gray-50 rounded-full cursor-pointer"
      onClick={() => changeLanguage(otherLocale)}
      aria-label={`Switch to ${getLanguageLabel(otherLocale)}`}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-medium">
        {getLanguageLabel(otherLocale)}
      </span>
    </Button>
  );
}
