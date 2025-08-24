"use client";

import React, { useState, useCallback } from "react";
import { PixelAdCanvas, PixelAd } from "./pixel-ad-canvas";
import { Button } from "./button";
import { Switch } from "./switch";
import { Slider } from "./slider";
import { ZoomIn, ZoomOut, Grid as GridIcon } from "lucide-react";

interface PixelAdGridProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  ads: PixelAd[];
  onAdClick?: (ad: PixelAd) => void;
  className?: string;
  children?: React.ReactNode;
  height?: number; // 외부에서 주입받는 높이
}

interface PixelAdGridControlsProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  zoom: number;
  showGrid: boolean;
  onZoomChange: (zoom: number) => void;
  onGridToggle: (show: boolean) => void;
  className?: string;
}

interface PixelAdGridCanvasProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  ads: PixelAd[];
  onAdClick?: (ad: PixelAd) => void;
  zoom: number;
  showGrid: boolean;
  className?: string;
}

interface PixelAdGridInfoProps {
  selectedAd: PixelAd | null;
  className?: string;
}

// Main Grid Component
export function PixelAdGrid({
  gridWidth,
  gridHeight,
  cellSize,
  ads,
  onAdClick,
  className = "",
  children,
  height,
}: PixelAdGridProps) {
  const [selectedAd, setSelectedAd] = useState<PixelAd | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  const handleAdClick = useCallback(
    (ad: PixelAd) => {
      setSelectedAd(ad);
      if (onAdClick) {
        onAdClick(ad);
      }
    },
    [onAdClick]
  );

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleGridToggle = useCallback((show: boolean) => {
    setShowGrid(show);
  }, []);

  return (
    <div className={`pixel-ad-grid flex flex-col h-screen ${className}`}>
      {children ? (
        // Compound Pattern: 사용자가 정의한 레이아웃 사용
        children
      ) : (
        // Default Layout
        <>
          <PixelAdGridControls
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            cellSize={cellSize}
            zoom={zoom}
            showGrid={showGrid}
            onZoomChange={handleZoomChange}
            onGridToggle={handleGridToggle}
          />
          <PixelAdGridCanvas
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            cellSize={cellSize}
            ads={ads}
            onAdClick={handleAdClick}
            zoom={zoom}
            showGrid={showGrid}
            containerHeight={height || gridHeight * cellSize}
          />
          <PixelAdGridInfo selectedAd={selectedAd} />
        </>
      )}
    </div>
  );
}

// Controls Component
export function PixelAdGridControls({
  gridWidth,
  gridHeight,
  cellSize,
  zoom,
  showGrid,
  onZoomChange,
  onGridToggle,
  className = "",
}: PixelAdGridControlsProps) {
  const handleZoomIn = () => {
    onZoomChange(Math.min(5, zoom + 0.25));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(0.5, zoom - 0.25));
  };

  const canvasWidth = gridWidth * cellSize;
  const canvasHeight = gridHeight * cellSize;

  return (
    <div
      className={`mb-4 p-4 bg-white rounded-lg shadow-sm border ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          픽셀 광고 그리드 ({gridWidth} × {gridHeight})
        </h3>
        <div className="flex items-center gap-4">
          {/* Grid Toggle */}
          <div className="flex items-center gap-2">
            <GridIcon className="w-4 h-4" />
            <span className="text-sm">그리드</span>
            <Switch checked={showGrid} onCheckedChange={onGridToggle} />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">
              {(zoom * 100).toFixed(0)}%
            </span>
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>셀 크기: {cellSize}px</span>
          <span>
            총 크기: {canvasWidth} × {canvasHeight}px
          </span>
        </div>

        {/* Zoom Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">줌</span>
          <Slider
            value={[zoom]}
            min={0.5}
            max={5}
            step={0.25}
            onValueChange={(v) => onZoomChange(v[0] || zoom)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

// Canvas Component
export function PixelAdGridCanvas({
  gridWidth,
  gridHeight,
  cellSize,
  ads,
  onAdClick,
  zoom,
  showGrid,
  containerHeight,
  className = "",
}: PixelAdGridCanvasProps & { containerHeight: number }) {
  const canvasWidth = gridWidth * cellSize;
  const canvasHeight = gridHeight * cellSize;

  return (
    <div
      className={`border rounded-lg overflow-auto bg-gray-50 flex-1 ${className}`}
    >
      <PixelAdCanvas
        ads={ads}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        containerHeight={containerHeight}
        onAdClick={onAdClick}
        zoom={zoom}
        showGrid={showGrid}
        className="mx-auto"
      />
    </div>
  );
}

// Info Component
export function PixelAdGridInfo({
  selectedAd,
  className = "",
}: PixelAdGridInfoProps) {
  if (!selectedAd) return null;

  return (
    <div
      className={`mt-4 p-4 bg-white rounded-lg shadow-sm border ${className}`}
    >
      <h4 className="font-semibold text-gray-900 mb-2">선택된 광고</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">ID:</span> {selectedAd.id}
        </div>
        <div>
          <span className="font-medium">위치:</span> ({selectedAd.x},{" "}
          {selectedAd.y})
        </div>
        <div>
          <span className="font-medium">크기:</span> {selectedAd.width} ×{" "}
          {selectedAd.height}
        </div>
        <div>
          <span className="font-medium">타입:</span> {selectedAd.type}
        </div>
        <div>
          <span className="font-medium">내용:</span> {selectedAd.content}
        </div>
        {selectedAd.url && (
          <div>
            <span className="font-medium">URL:</span> {selectedAd.url}
          </div>
        )}
      </div>
    </div>
  );
}

// Compound Pattern을 위한 타입 정의
PixelAdGrid.Controls = PixelAdGridControls;
PixelAdGrid.Canvas = PixelAdGridCanvas;
PixelAdGrid.Info = PixelAdGridInfo;
