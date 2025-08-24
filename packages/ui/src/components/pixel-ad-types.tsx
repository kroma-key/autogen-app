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

// 광고 타입별 샘플 URL (실제 링크)
export const AD_TYPE_URLS = {
  ad: "https://unsplash.com/photos/random?query=product",
  brand: "https://unsplash.com/photos/random?query=brand",
  product: "https://unsplash.com/photos/random?query=shopping",
  discount: "https://unsplash.com/photos/random?query=sale",
  logo: "https://unsplash.com/photos/random?query=company",
  shop: "https://unsplash.com/photos/random?query=store",
} as const;

// 광고 타입별 샘플 콘텐츠
export const AD_TYPE_CONTENTS = {
  ad: ["특가 상품", "신상 입고", "한정 특가", "추천 상품", "인기 상품"],
  brand: [
    "브랜드 스토리",
    "신제품 출시",
    "브랜드 이벤트",
    "VIP 혜택",
    "시즌 컬렉션",
  ],
  product: ["신상품", "베스트", "세일", "추천", "인기"],
  discount: [
    "50% 할인",
    "2+1 이벤트",
    "첫 구매 할인",
    "시즌 세일",
    "특별 할인",
  ],
  logo: ["브랜드 로고", "회사 소개", "연혁", "비전", "미션"],
  shop: ["매장 찾기", "오시는 길", "영업시간", "연락처", "매장 정보"],
} as const;

// 광고 타입별 미디어 URL (Unsplash, Pexels, GIPHY 등)
export const AD_TYPE_MEDIA = {
  ad: [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      type: "image" as const,
    },
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      type: "image" as const,
    },
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
      type: "gif" as const,
    },
    {
      url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
      type: "video" as const,
    },
  ],
  brand: [
    {
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      type: "image" as const,
    },
    {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/26ufcVAuSqHwJQvCE/giphy.gif",
      type: "gif" as const,
    },
    {
      url: "https://player.vimeo.com/external/371433808.sd.mp4?s=236da2f3c0fd273d2c6d9a064d3a355c8b674bdf5&profile_id=139&oauth2_token_id=57447761",
      type: "video" as const,
    },
  ],
  product: [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      type: "image" as const,
    },
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
      type: "gif" as const,
    },
    {
      url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
      type: "video" as const,
    },
  ],
  discount: [
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/26ufcVAuSqHwJQvCE/giphy.gif",
      type: "gif" as const,
    },
    {
      url: "https://player.vimeo.com/external/371433808.sd.mp4?s=236da2f3c0fd273d2c6d9a064d3a355c8b674bdf5&profile_id=139&oauth2_token_id=57447761",
      type: "video" as const,
    },
  ],
  logo: [
    {
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
      type: "gif" as const,
    },
  ],
  shop: [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      type: "image" as const,
    },
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      type: "image" as const,
    },
    {
      url: "https://media.giphy.com/media/26ufcVAuSqHwJQvCE/giphy.gif",
      type: "gif" as const,
    },
  ],
} as const;

// 샘플 동영상 URL (Pexels, Pixabay 등)
export const SAMPLE_VIDEOS = [
  "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/371433808.sd.mp4?s=236da2f3c0fd273d2c6d9a064d3a355c8b674bdf5&profile_id=139&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/371433808.sd.mp4?s=236da2f3c0fd273d2c6d9a064d3a355c8b674bdf5&profile_id=139&oauth2_token_id=57447761",
];

// 샘플 GIF URL (GIPHY)
export const SAMPLE_GIFS = [
  "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
  "https://media.giphy.com/media/26ufcVAuSqHwJQvCE/giphy.gif",
  "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
];

// 광고 타입별 샘플 콘텐츠에서 랜덤 선택
function getRandomContent(type: keyof typeof AD_TYPE_CONTENTS): string {
  const contents = AD_TYPE_CONTENTS[type];
  const randomIndex = Math.floor(Math.random() * contents.length);
  return contents[randomIndex] as string;
}

// 광고 타입별 샘플 URL에서 선택 (랜덤하게 URL이 있거나 없음)
function getRandomUrl(type: keyof typeof AD_TYPE_URLS): string | undefined {
  // 70% 확률로 URL 제공
  if (Math.random() < 0.7) {
    return AD_TYPE_URLS[type];
  }
  return undefined;
}

// 광고 타입별 미디어에서 랜덤 선택
function getRandomMedia(
  type: keyof typeof AD_TYPE_MEDIA
): { url: string; type: "image" | "video" | "gif" } | undefined {
  // 80% 확률로 미디어 제공
  if (Math.random() < 0.8) {
    const media = AD_TYPE_MEDIA[type];
    const randomIndex = Math.floor(Math.random() * media.length);
    return media[randomIndex];
  }
  return undefined;
}

// 광고 타입별 팩토리 함수
export function createAd(
  type: keyof typeof AD_TYPE_STYLES,
  x: number,
  y: number,
  width: number,
  height: number,
  content?: string,
  url?: string,
  mediaUrl?: string,
  mediaType?: "image" | "video" | "gif"
): PixelAd {
  const style = AD_TYPE_STYLES[type];
  const finalContent = content || getRandomContent(type);
  const finalUrl = url || getRandomUrl(type);
  const finalMedia = mediaUrl
    ? { url: mediaUrl, type: mediaType || "image" }
    : getRandomMedia(type);

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    x,
    y,
    width,
    height,
    type,
    content: finalContent,
    color: style.color,
    textColor: style.textColor,
    url: finalUrl,
    mediaUrl: finalMedia?.url,
    mediaType: finalMedia?.type,
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
    mediaUrl?: string;
    mediaType?: "image" | "video";
  }>
): PixelAd[] {
  return ads.map((ad, index) => {
    const x = baseX + (index % 2) * cellSize;
    const y = baseY + Math.floor(index / 2) * cellSize;
    return createAd(
      ad.type,
      x,
      y,
      cellSize,
      cellSize,
      ad.content,
      ad.url,
      ad.mediaUrl,
      ad.mediaType
    );
  });
}

// 미리 정의된 광고 레이아웃
export const PRESET_LAYOUTS = {
  hero: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd(
      "ad",
      x,
      y,
      cellSize * 2,
      cellSize,
      "메인 광고",
      "https://unsplash.com/photos/random?query=hero",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      "image"
    ),
  ],

  cluster: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd(
      "ad",
      x,
      y,
      cellSize,
      cellSize,
      "AD",
      "https://unsplash.com/photos/random?query=ad"
    ),
    createAd(
      "brand",
      x + cellSize,
      y,
      cellSize,
      cellSize,
      "브랜드",
      "https://unsplash.com/photos/random?query=brand"
    ),
    createAd(
      "product",
      x,
      y + cellSize,
      cellSize,
      cellSize,
      "상품",
      "https://unsplash.com/photos/random?query=product"
    ),
    createAd(
      "discount",
      x + cellSize,
      y + cellSize,
      cellSize,
      cellSize,
      "할인",
      "https://unsplash.com/photos/random?query=discount"
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
      "https://unsplash.com/photos/random?query=showcase",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "image"
    ),
  ],

  topAds: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd(
      "ad",
      x,
      y,
      cellSize * 2,
      cellSize,
      "AD",
      "https://unsplash.com/photos/random?query=ad1"
    ),
    createAd(
      "brand",
      x + cellSize * 2,
      y,
      cellSize * 2,
      cellSize,
      "BRAND",
      "https://unsplash.com/photos/random?query=brand1"
    ),
    createAd(
      "shop",
      x + cellSize * 4,
      y,
      cellSize * 2,
      cellSize,
      "SHOP",
      "https://unsplash.com/photos/random?query=shop1"
    ),
  ],

  newStore: (x: number, y: number, cellSize: number): PixelAd[] => [
    createAd(
      "ad",
      x,
      y,
      cellSize * 2,
      cellSize,
      "AD",
      "https://unsplash.com/photos/random?query=ad2"
    ),
    createAd(
      "ad",
      x + cellSize * 2,
      y,
      cellSize * 2,
      cellSize,
      "AD",
      "https://unsplash.com/photos/random?query=ad3"
    ),
    createAd(
      "shop",
      x + cellSize * 4,
      y,
      cellSize * 2,
      cellSize,
      "SHOP",
      "https://unsplash.com/photos/random?query=shop2"
    ),
  ],
};
