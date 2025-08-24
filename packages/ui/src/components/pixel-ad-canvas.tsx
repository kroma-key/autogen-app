"use client";

import React, { useMemo } from "react";

export interface PixelAd {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "ad" | "brand" | "product" | "discount" | "logo" | "shop";
  content: string;
  color: string;
  textColor?: string;
  url?: string;
}

interface PixelAdCanvasProps {
  ads: PixelAd[];
  canvasWidth: number;
  canvasHeight: number;
  containerHeight: number; // 외부에서 주입받는 높이
  onAdClick?: (ad: PixelAd) => void;
  className?: string;
  zoom?: number;
  showGrid?: boolean;
}

export function PixelAdCanvas({
  ads,
  canvasWidth,
  canvasHeight,
  containerHeight,
  onAdClick,
  className = "",
  zoom = 1,
  showGrid = true,
}: PixelAdCanvasProps) {
  // Compute CSS background to visualize grid
  const gridBackground = useMemo(() => {
    if (!showGrid) return "";

    const cellSize = Math.max(10, Math.floor(50 / zoom)); // Dynamic grid size based on zoom
    const majorSize = Math.max(50, Math.floor(200 / zoom));

    return `repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0 1px, transparent 1px ${cellSize}px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 1px, transparent 1px ${cellSize}px),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px ${majorSize}px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px ${majorSize}px)`;
  }, [showGrid, zoom]);

  const handleAdClick = (ad: PixelAd, e: React.MouseEvent) => {
    e.preventDefault();
    if (onAdClick) {
      onAdClick(ad);
    }
  };

  return (
    <div
      className={`pixel-ad-canvas w-full ${className}`}
      style={{
        width: canvasWidth,
        height: containerHeight,
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f8fafc",
        backgroundImage: gridBackground,
        backgroundSize: `${50 / zoom}px ${50 / zoom}px, ${50 / zoom}px ${50 / zoom}px, ${200 / zoom}px ${200 / zoom}px, ${200 / zoom}px ${200 / zoom}px`,
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
        minHeight: "100%",
      }}
    >
      {/* Ads */}
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="absolute group cursor-pointer transition-all duration-200 hover:shadow-lg"
          style={{
            left: ad.x,
            top: ad.y,
            width: ad.width,
            height: ad.height,
          }}
          onClick={(e) => handleAdClick(ad, e)}
          title={`${ad.content} - ${ad.type}`}
        >
          <div
            className="w-full h-full rounded-md shadow-sm ring-1 ring-black/10 flex items-center justify-center text-center font-bold transition-all duration-200 hover:ring-2 hover:ring-black/30"
            style={{
              backgroundColor: ad.color,
              color: ad.textColor || "#ffffff",
              fontSize: Math.min(ad.width, ad.height) * 0.3,
            }}
          >
            <span className="px-1 leading-tight truncate w-full">
              {ad.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
