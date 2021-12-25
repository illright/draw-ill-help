import noop from 'lodash.noop';
import type { fabric } from 'fabric';

export function syncDrawingMode(
  fabricCanvas: fabric.Canvas | undefined,
  drawingMode: boolean
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.isDrawingMode = drawingMode;
  }
}

export function syncBrushWidth(
  fabricCanvas: fabric.Canvas | undefined,
  brushWidth: number
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.freeDrawingBrush.width = brushWidth;
    for (const object of fabricCanvas.getObjects()) {
      object.strokeWidth = brushWidth;
      object.dirty = true;
    }
    fabricCanvas.renderAll();
  }
}

export function syncBrushColor(
  fabricCanvas: fabric.Canvas | undefined,
  brushColor: string
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.freeDrawingBrush.color = brushColor;
    for (const object of fabricCanvas.getObjects()) {
      object.stroke = brushColor;
      object.dirty = true;
    }
    fabricCanvas.renderAll();
  }
}

export function syncBackgroundColor(
  fabricCanvas: fabric.Canvas | undefined,
  backgroundColor: string
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.setBackgroundColor(backgroundColor, noop);
    fabricCanvas.renderAll();
  }
}
