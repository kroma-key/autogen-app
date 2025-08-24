"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  PixelAdGrid,
  createAd,
  PRESET_LAYOUTS,
  type PixelAd,
} from "@workspace/ui";
import { env } from "@/lib/env/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Info } from "lucide-react";

// 타입 정의
interface ScreenSize {
  width: number;
  height: number;
}

interface GridConfig {
  cellSize: number;
  gridWidth: number;
  gridHeight: number;
  actualWidth: number;
  actualHeight: number;
}

interface AdPlacement {
  type: keyof typeof PRESET_LAYOUTS;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  url?: string;
}

// 순수 함수들
const calculateOptimalCellSize = (screenSize: ScreenSize): number => {
  const minCellSize = 20;
  const maxCellSize = 100;
  const optimalSize = Math.floor(
    Math.min(screenSize.width, screenSize.height) / 50
  );
  return Math.max(minCellSize, Math.min(maxCellSize, optimalSize));
};

const calculateGridDimensions = (
  screenSize: ScreenSize,
  cellSize: number
): { width: number; height: number } => {
  const gridWidth = Math.floor((screenSize.width * 0.8) / cellSize);
  const gridHeight = Math.floor((screenSize.height * 0.6) / cellSize);
  return { width: gridWidth, height: gridHeight };
};

const createGridConfig = (screenSize: ScreenSize): GridConfig => {
  const cellSize = calculateOptimalCellSize(screenSize);
  const { width: gridWidth, height: gridHeight } = calculateGridDimensions(
    screenSize,
    cellSize
  );

  return {
    cellSize,
    gridWidth,
    gridHeight,
    actualWidth: gridWidth * cellSize,
    actualHeight: gridHeight * cellSize,
  };
};

const createAdPlacements = (gridConfig: GridConfig): AdPlacement[] => {
  const { cellSize, gridWidth, gridHeight } = gridConfig;

  return [
    // 상단 메인 광고
    {
      type: "hero",
      x: Math.floor(gridWidth * 0.4) * cellSize,
      y: 0,
      width: Math.floor(gridWidth * 0.2) * cellSize,
      height: Math.floor(gridHeight * 0.1) * cellSize,
      content: "메인 광고",
    },
    // 중앙 클러스터
    {
      type: "cluster",
      x: Math.floor(gridWidth * 0.3) * cellSize,
      y: Math.floor(gridHeight * 0.2) * cellSize,
      width: Math.floor(gridWidth * 0.15) * cellSize,
      height: Math.floor(gridHeight * 0.15) * cellSize,
    },
    // 우측 광고
    {
      type: "showcase",
      x: Math.floor(gridWidth * 0.7) * cellSize,
      y: Math.floor(gridHeight * 0.3) * cellSize,
      width: Math.floor(gridWidth * 0.25) * cellSize,
      height: Math.floor(gridHeight * 0.2) * cellSize,
      content: "우측 광고",
    },
    // 하단 광고 행
    {
      type: "topAds",
      x: Math.floor(gridWidth * 0.1) * cellSize,
      y: Math.floor(gridHeight * 0.8) * cellSize,
      width: Math.floor(gridWidth * 0.15) * cellSize,
      height: Math.floor(gridHeight * 0.15) * cellSize,
    },
    // 로고
    {
      type: "newStore",
      x: Math.floor(gridWidth * 0.05) * cellSize,
      y: Math.floor(gridHeight * 0.85) * cellSize,
      width: Math.floor(gridWidth * 0.08) * cellSize,
      height: Math.floor(gridWidth * 0.08) * cellSize,
      content: "LOGO",
    },
  ];
};

const generateAdsFromPlacements = (placements: AdPlacement[]): PixelAd[] => {
  const ads: PixelAd[] = [];

  placements.forEach((placement) => {
    const { type, x, y, width, height, content, url } = placement;

    if (type === "hero") {
      ads.push(createAd("ad", x, y, width, height, content));
    }

    if (type === "cluster") {
      const clusterSize = Math.floor(width / 2);
      ads.push(
        createAd("ad", x, y, clusterSize, clusterSize, "AD"),
        createAd(
          "brand",
          x + clusterSize,
          y,
          clusterSize,
          clusterSize,
          "브랜드"
        ),
        createAd(
          "product",
          x,
          y + clusterSize,
          clusterSize,
          clusterSize,
          "상품"
        ),
        createAd(
          "discount",
          x + clusterSize,
          y + clusterSize,
          clusterSize,
          clusterSize,
          "할인"
        )
      );
    }

    if (type === "showcase") {
      ads.push(createAd("ad", x, y, width, height, content));
    }

    if (type === "topAds") {
      const adWidth = Math.floor(width / 5);
      for (let i = 0; i < 5; i++) {
        ads.push(
          createAd("ad", x + i * adWidth, y, adWidth, height, `광고 ${i + 1}`)
        );
      }
    }

    if (type === "newStore") {
      ads.push(createAd("logo", x, y, width, height, content));
    }
  });

  return ads;
};

const calculateComputedHeight = (): number => {
  try {
    const viewportHeight = window.innerHeight;
    const fixedHeaderHeight = 64;
    const controlsHeight = 120;
    const margins = 40;

    const calculatedHeight =
      viewportHeight - fixedHeaderHeight - controlsHeight - margins;
    return Math.max(calculatedHeight, 400);
  } catch (error) {
    console.warn("Height calculation failed, using fallback:", error);
    const viewportHeight = window.innerHeight;
    const fallbackHeight = viewportHeight - 304;
    return Math.max(fallbackHeight, 400);
  }
};

export default function PixelMarket() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 1920,
    height: 1080,
  });
  const [debugDialogOpen, setDebugDialogOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedAd, setSelectedAd] = useState<PixelAd | null>(null);
  const [computedHeight, setComputedHeight] = useState<number>(0);

  // 화면 해상도 감지 및 높이 계산
  const updateScreenSize = useCallback(() => {
    const newScreenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setScreenSize(newScreenSize);
    setComputedHeight(calculateComputedHeight());
  }, []);

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [updateScreenSize]);

  // 그리드 설정 계산
  const gridConfig = useMemo(() => createGridConfig(screenSize), [screenSize]);

  // 광고 생성
  const ads = useMemo(() => {
    const placements = createAdPlacements(gridConfig);
    return generateAdsFromPlacements(placements);
  }, [gridConfig]);

  // 이벤트 핸들러들
  const handleAdClick = useCallback((ad: PixelAd) => {
    setSelectedAd(ad);
    console.log("광고 클릭:", ad);
    if (ad.url) {
      window.open(ad.url, "_blank");
    }
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleGridToggle = useCallback((show: boolean) => {
    setShowGrid(show);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* 메인 광고 그리드 - Compound Pattern 사용 */}
        <PixelAdGrid
          gridWidth={gridConfig.gridWidth}
          gridHeight={gridConfig.gridHeight}
          cellSize={gridConfig.cellSize}
          ads={ads}
          onAdClick={handleAdClick}
          className="flex-1 relative"
          height={computedHeight}
        >
          {env.NEXT_PUBLIC_ENABLE_DEBUG && (
            <Dialog open={debugDialogOpen} onOpenChange={setDebugDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 absolute top-0 right-0 z-10"
                >
                  <Info className="w-4 h-4" />
                  디버그 정보
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>디버그 정보</DialogTitle>
                  <DialogDescription>광고 그리드 디버그 정보</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                  <PixelAdGrid.Controls
                    gridWidth={gridConfig.gridWidth}
                    gridHeight={gridConfig.gridHeight}
                    cellSize={gridConfig.cellSize}
                    zoom={zoom}
                    showGrid={showGrid}
                    onZoomChange={handleZoomChange}
                    onGridToggle={handleGridToggle}
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
          <PixelAdGrid.Canvas
            gridWidth={gridConfig.gridWidth}
            gridHeight={gridConfig.gridHeight}
            cellSize={gridConfig.cellSize}
            ads={ads}
            onAdClick={handleAdClick}
            zoom={zoom}
            showGrid={showGrid}
            containerHeight={computedHeight}
          />
          {env.NEXT_PUBLIC_ENABLE_DEBUG && (
            <div className="absolute top-0 right-0 z-10">
              <PixelAdGrid.Info selectedAd={selectedAd} />
            </div>
          )}
        </PixelAdGrid>
      </div>
    </div>
  );
}
