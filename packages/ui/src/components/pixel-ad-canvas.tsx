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
  mediaUrl?: string; // 이미지/동영상/GIF URL
  mediaType?: "image" | "video" | "gif"; // 미디어 타입
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
    e.stopPropagation();

    if (onAdClick) {
      onAdClick(ad);
    }

    // URL이 있으면 새 탭에서 열기
    if (ad.url) {
      window.open(ad.url, "_blank");
    }
  };

  const renderAdContent = (ad: PixelAd) => {
    if (ad.mediaUrl && ad.mediaType) {
      if (ad.mediaType === "video") {
        return (
          <>
            <video
              className="w-full h-full object-contain rounded-md"
              autoPlay
              muted
              loop
              playsInline
              poster={`${ad.mediaUrl}?w=${ad.width}&h=${ad.height}&fit=crop&crop=center`}
            >
              <source src={ad.mediaUrl} type="video/mp4" />
              <source src={ad.mediaUrl} type="video/webm" />
            </video>
            {/* Fallback content for video */}
            <div
              className="w-full h-full flex items-center justify-center text-center font-bold text-white absolute inset-0 hidden"
              style={{
                backgroundColor: ad.color,
                color: ad.textColor || "#ffffff",
                fontSize: Math.min(ad.width, ad.height) * 0.3,
              }}
            >
              {ad.content}
            </div>
          </>
        );
      } else if (ad.mediaType === "gif") {
        return (
          <>
            <img
              src={ad.mediaUrl}
              alt={ad.content}
              className="w-full h-full object-contain rounded-md"
              loading="lazy"
              onError={(e) => {
                // GIF 로드 실패 시 fallback으로 텍스트 표시
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
            {/* Fallback content for GIF */}
            <div
              className="w-full h-full flex items-center justify-center text-center font-bold text-white absolute inset-0 hidden"
              style={{
                backgroundColor: ad.color,
                color: ad.textColor || "#ffffff",
                fontSize: Math.min(ad.width, ad.height) * 0.3,
              }}
            >
              {ad.content}
            </div>
          </>
        );
      } else {
        // 이미지 타입
        return (
          <>
            <img
              src={`${ad.mediaUrl}?w=${ad.width}&h=${ad.height}&fit=cover&crop=center`}
              alt={ad.content}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
              onError={(e) => {
                // 이미지 로드 실패 시 fallback으로 텍스트 표시
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
            {/* Fallback content for image */}
            <div
              className="w-full h-full flex items-center justify-center text-center font-bold text-white absolute inset-0 hidden"
              style={{
                backgroundColor: ad.color,
                color: ad.textColor || "#ffffff",
                fontSize: Math.min(ad.width, ad.height) * 0.3,
              }}
            >
              {ad.content}
            </div>
          </>
        );
      }
    }

    // Fallback: 텍스트 기반 광고
    return (
      <div
        className="w-full h-full flex items-center justify-center text-center font-bold transition-all duration-200 hover:ring-2 hover:ring-black/30"
        style={{
          backgroundColor: ad.color,
          color: ad.textColor || "#ffffff",
          fontSize: Math.min(ad.width, ad.height) * 0.3,
        }}
      >
        <span className="px-1 leading-tight truncate w-full">{ad.content}</span>
      </div>
    );
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
          className="absolute group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
          style={{
            left: ad.x,
            top: ad.y,
            width: ad.width,
            height: ad.height,
          }}
          onClick={(e) => handleAdClick(ad, e)}
          title={`${ad.content} - ${ad.type} (${ad.width}×${ad.height}px)${ad.url ? " - 클릭하여 링크 열기" : ""}`}
        >
          {renderAdContent(ad)}

          {/* Hover Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {ad.content} - {ad.type}
            {ad.url && <div className="text-blue-300">클릭하여 링크 열기</div>}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>

          {/* Play button for videos */}
          {ad.mediaType === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-4 border-l-black border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
