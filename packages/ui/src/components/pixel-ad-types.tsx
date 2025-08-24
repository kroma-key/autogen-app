"use client";

import React from "react";
import { PixelAd } from "./pixel-ad-canvas";

// 광고 타입별 색상 및 스타일 정의
export const AD_TYPE_STYLES = {
  ad: {
    color: "#ef4444", // Red
    textColor: "#ffffff",
    label: "광고",
  },
  brand: {
    color: "#f97316", // Orange
    textColor: "#ffffff",
    label: "브랜드",
  },
  product: {
    color: "#eab308", // Yellow
    textColor: "#000000",
    label: "상품",
  },
  discount: {
    color: "#dc2626", // Red
    textColor: "#ffffff",
    label: "할인",
  },
  logo: {
    color: "#22c55e", // Green
    textColor: "#ffffff",
    label: "로고",
  },
  shop: {
    color: "#1d4ed8", // Blue
    textColor: "#ffffff",
    label: "쇼핑",
  },
} as const;

// 광고 타입별 팩토리 함수
export function createAd(
  type: keyof typeof AD_TYPE_STYLES,
  x: number,
  y: number,
  width: number,
  height: number,
  content?: string,
  url?: string
): PixelAd {
  const style = AD_TYPE_STYLES[type];
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    x,
    y,
    width,
    height,
    type,
    content: content || style.label,
    color: style.color,
    textColor: style.textColor,
    url,
  };
}

// 광고 그룹 생성 함수
export function createAdGroup(
  baseX: number,
  baseY: number,
  cellSize: number,
  ads: Array<{
    type: keyof typeof AD_TYPE_STYLES;
    content?: string;
    url?: string;
  }>
): PixelAd[] {
  return ads.map((ad, index) => {
    const x = baseX + (index % 2) * cellSize;
    const y = baseY + Math.floor(index / 2) * cellSize;
    return createAd(ad.type, x, y, cellSize, cellSize, ad.content, ad.url);
  });
}

// 미리 정의된 광고 레이아웃
export const PRESET_LAYOUTS = {
  hero: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd("ad", x, y, cellSize * 2, cellSize, "메인 광고"),
  ],

  cluster: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd("ad", x, y, cellSize, cellSize, "AD"),
    createAd("brand", x + cellSize, y, cellSize, cellSize, "브랜드"),
    createAd("product", x, y + cellSize, cellSize, cellSize, "상품"),
    createAd(
      "discount",
      x + cellSize,
      y + cellSize,
      cellSize,
      cellSize,
      "할인"
    ),
  ],

  showcase: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd(
      "ad",
      x,
      y,
      cellSize * 3,
      cellSize * 2,
      "예광고",
      "https://example.com"
    ),
  ],

  topAds: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd("ad", x, y, cellSize * 2, cellSize, "AD"),
    createAd("brand", x + cellSize * 2, y, cellSize * 2, cellSize, "BRAND"),
    createAd("shop", x + cellSize * 4, y, cellSize * 2, cellSize, "SHOP"),
  ],

  newStore: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd("ad", x, y, cellSize * 2, cellSize, "AD"),
    createAd("ad", x + cellSize * 2, y, cellSize * 2, cellSize, "AD"),
    createAd("shop", x + cellSize * 4, y, cellSize * 2, cellSize, "SHOP"),
  ],
};
