"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Flame,
  Crown,
  Zap,
  Download,
  Palette,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/localization/client";
import { LocaleTypes } from "@/lib/localization/setting";

export function StorePageContent({ locale }: { locale: LocaleTypes }) {
  const { t } = useTranslation(locale, "common");
  // User's current flame points (mock data)
  const userFlamePoints = 250;

  const flamePointPackages = [
    {
      id: 1,
      points: 100,
      price: "₩1,200",
      bonus: null,
      gradient: "from-orange-200 to-orange-300",
      popular: false,
    },
    {
      id: 2,
      points: 300,
      price: "₩2,900",
      bonus: "20% Bonus",
      gradient: "from-orange-400 to-red-400",
      popular: true,
    },
    {
      id: 3,
      points: 600,
      price: "₩4,900",
      bonus: "30% Bonus",
      gradient: "from-red-500 to-pink-500",
      popular: false,
    },
    {
      id: 4,
      points: 1500,
      price: "₩9,900",
      bonus: "40% Bonus",
      gradient: "from-purple-500 to-pink-600",
      popular: false,
    },
  ];

  const studyNotes = [
    {
      id: 1,
      titleKey: "advanced_calculus",
      subjectKey: "mathematics",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=120&fit=crop&crop=center",
      rating: 4.8,
      sales: 120,
      price: "₩15,000",
      flamePrice: 50,
    },
    {
      id: 2,
      titleKey: "organic_chemistry_guide",
      subjectKey: "chemistry",
      image:
        "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=200&h=120&fit=crop&crop=center",
      rating: 4.7,
      sales: 150,
      price: "₩18,000",
      flamePrice: 60,
    },
    {
      id: 3,
      titleKey: "physics_fundamentals",
      subjectKey: "physics",
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=200&h=120&fit=crop&crop=center",
      rating: 4.5,
      sales: 90,
      price: "₩12,000",
      flamePrice: 40,
    },
    {
      id: 4,
      titleKey: "english_literature",
      subjectKey: "literature",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=120&fit=crop&crop=center",
      rating: 4.6,
      sales: 85,
      price: "₩10,000",
      flamePrice: 35,
    },
  ];

  const themes = [
    {
      id: 1,
      nameKey: "sunset_vibes",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&crop=center",
      price: "₩5,000",
      flamePrice: 20,
      previewKey: "warm_orange_gradients",
    },
    {
      id: 2,
      nameKey: "ocean_breeze",
      image:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=200&h=120&fit=crop&crop=center",
      price: "₩5,000",
      flamePrice: 20,
      previewKey: "cool_blue_tones",
    },
    {
      id: 3,
      nameKey: "forest_green",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=120&fit=crop&crop=center",
      price: "₩5,000",
      flamePrice: 20,
      previewKey: "natural_green_shades",
    },
    {
      id: 4,
      nameKey: "midnight_dark",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop&crop=center",
      price: "₩7,000",
      flamePrice: 25,
      previewKey: "dark_mode_theme",
    },
  ];

  const premiumFeatures = [
    {
      icon: Crown,
      titleKey: "unlimited_study_rooms",
      descriptionKey: "join_any_room",
    },
    {
      icon: Zap,
      titleKey: "advanced_analytics",
      descriptionKey: "detailed_insights",
    },
    {
      icon: Download,
      titleKey: "offline_mode",
      descriptionKey: "study_without_internet",
    },
    {
      icon: Palette,
      titleKey: "custom_themes",
      descriptionKey: "access_all_themes",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-gray-900">{t("store")}</h1>
          <div className="flex items-center space-x-3">
            {/* User's Flame Points */}
            <div
              className="flex items-center space-x-1 bg-orange-50 px-3 py-1.5 rounded-full"
              aria-label={t("user_stats.current_flame_points", {
                count: userFlamePoints,
              })}
              role="status"
            >
              <Flame
                className="h-4 w-4 text-orange-500"
                fill="currentColor"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-orange-600">
                {userFlamePoints}
              </span>
            </div>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:bg-gray-50 rounded-full cursor-pointer focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              aria-label={t("user_stats.view_shopping_cart")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-5 pb-24 space-y-6">
        {/* Unlock Premium Section */}
        <Card
          className="bg-gradient-to-br from-orange-500 to-pink-500 text-white border-0 shadow-md rounded-2xl overflow-hidden mt-4 cursor-pointer hover:shadow-lg transition-shadow"
          role="button"
          tabIndex={0}
          aria-label="Premium subscription: Unlock all features for ₩4,900 per month"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 drop-shadow-sm">
                  {t("unlock_premium")}
                </h2>
                <p className="text-orange-100 text-sm mb-3 drop-shadow-sm">
                  {t("get_unlimited_access")}
                </p>

                {/* Premium Features Preview */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {premiumFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                      aria-label={feature.descriptionKey}
                    >
                      <feature.icon
                        className="h-4 w-4 text-orange-200 drop-shadow-sm"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-orange-100 drop-shadow-sm">
                        {t(`premium_features.${feature.titleKey}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-6 py-2.5 text-base font-semibold w-full cursor-pointer focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-orange-500"
                aria-label="Subscribe to Premium for ₩4,900 per month"
              >
                ₩4,900/month
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flame Points Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              {t("flame_points")}
            </h2>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Flame className="h-3 w-3" />
              <span>{t("earn_by_studying")}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {flamePointPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`bg-gradient-to-br ${pkg.gradient} border shadow-sm rounded-2xl p-4 relative overflow-hidden transition-all duration-200 hover:scale-105 cursor-pointer ${
                  pkg.popular
                    ? "border-orange-300 ring-2 ring-orange-100"
                    : "border-gray-200"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Flame points package: ${pkg.points} points for ${pkg.price}${pkg.bonus ? `, includes ${pkg.bonus}` : ""}${pkg.popular ? ", most popular option" : ""}`}
              >
                {pkg.popular && (
                  <Badge
                    className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full z-10 shadow-sm"
                    aria-label="Most popular package"
                  >
                    {t("popular")}
                  </Badge>
                )}
                {pkg.bonus && (
                  <Badge
                    className="absolute top-2 right-2 bg-white/95 text-gray-800 text-[10px] px-2 py-0.5 rounded-full z-10 shadow-sm backdrop-blur-sm"
                    aria-label={`Bonus: ${pkg.bonus}`}
                  >
                    {pkg.bonus}
                  </Badge>
                )}
                <CardContent className="p-0 text-center relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <Flame
                      className="h-6 w-6 text-white mr-1 drop-shadow-sm"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-lg font-bold text-white mb-1 drop-shadow-sm">
                    {pkg.points} {t("points")}
                  </p>
                  <p className="text-xs text-white/90 mb-3 drop-shadow-sm">
                    {pkg.price}
                  </p>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3 py-1 rounded-full cursor-pointer focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm"
                    variant="outline"
                    aria-label={`Purchase ${pkg.points} flame points for ${pkg.price}`}
                  >
                    {t("purchase")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Study Notes Section */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-900">
            {t("popular_study_notes")}
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {studyNotes.map((note) => (
              <Card
                key={note.id}
                className="flex-shrink-0 w-44 border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Study notes for ${note.subjectKey}: ${note.titleKey}, rated ${note.rating} stars`}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={note.image}
                    alt={`${note.titleKey} study notes cover image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 176px, 176px"
                  />
                  {/* Enhanced overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                  <Badge
                    className="absolute top-2 left-2 bg-white/95 text-gray-800 text-[10px] px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm border border-white/20"
                    aria-label={`${t("subjects")}: ${t(`subjects.${note.subjectKey}`)}`}
                  >
                    {t(`subjects.${note.subjectKey}`)}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p
                    className="font-medium text-sm text-gray-900 mb-1 truncate"
                    title={t(`study_notes.${note.titleKey}`)}
                  >
                    {t(`study_notes.${note.titleKey}`)}
                  </p>
                  <div
                    className="flex items-center text-xs text-gray-600 mb-2"
                    aria-label={`Rating: ${note.rating} out of 5 stars, ${note.sales} sales`}
                  >
                    <Star
                      className="h-3 w-3 text-yellow-500 mr-1 fill-current"
                      aria-hidden="true"
                    />
                    {note.rating} • {note.sales} {t("sales")}
                  </div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div
                      className="flex items-center space-x-1"
                      aria-label={`Flame points price: ${note.flamePrice}`}
                    >
                      <Flame
                        className="h-3 w-3 text-orange-500"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                      <span className="text-orange-600 font-medium">
                        {note.flamePrice}
                      </span>
                    </div>
                    <span
                      className="text-gray-500"
                      aria-label={`Cash price: ${note.price}`}
                    >
                      {note.price}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5 rounded-full cursor-pointer focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                    aria-label={`Purchase ${note.titleKey} for ${note.flamePrice} flame points or ${note.price}`}
                  >
                    {t("purchase")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Theme Customization Section */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-900">
            {t("theme_customization")}
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className="flex-shrink-0 w-40 border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Theme: ${theme.nameKey}, ${theme.previewKey}, costs ${theme.flamePrice} flame points or ${theme.price}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={theme.image}
                    alt={`${theme.nameKey} theme preview showing ${theme.previewKey}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                  {/* Enhanced overlay for better icon contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
                  <Palette
                    className="absolute top-2 right-2 h-4 w-4 text-white drop-shadow-lg"
                    aria-hidden="true"
                  />
                  {/* Theme name overlay for dark images */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium drop-shadow-lg truncate">
                      {t(`themes.${theme.nameKey}`)}
                    </p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p
                    className="font-medium text-sm text-gray-900 mb-1 truncate"
                    title={t(`themes.${theme.nameKey}`)}
                  >
                    {t(`themes.${theme.nameKey}`)}
                  </p>
                  <p
                    className="text-xs text-gray-500 mb-2 truncate"
                    title={t(`themes.${theme.previewKey}`)}
                  >
                    {t(`themes.${theme.previewKey}`)}
                  </p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div
                      className="flex items-center space-x-1"
                      aria-label={`Flame points price: ${theme.flamePrice}`}
                    >
                      <Flame
                        className="h-3 w-3 text-orange-500"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                      <span className="text-orange-600 font-medium">
                        {theme.flamePrice}
                      </span>
                    </div>
                    <span
                      className="text-gray-500"
                      aria-label={`Cash price: ${theme.price}`}
                    >
                      {theme.price}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1.5 rounded-full cursor-pointer focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    aria-label={`Preview ${theme.nameKey} theme`}
                  >
                    {t("preview")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
