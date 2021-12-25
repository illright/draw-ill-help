import noop from 'lodash.noop';
import type { fabric } from 'fabric';

/** Reflect the changes to the drawing mode in the Fabric instance. */
export function syncDrawingMode(
  fabricCanvas: fabric.Canvas | undefined,
  drawingMode: boolean
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.isDrawingMode = drawingMode;
  }
}

/**
 * Reflect the changes to the brush width in the Fabric instance.
 *
 * Will redraw every object with the new value.
 */
export function syncBrushWidth(
  fabricCanvas: fabric.Canvas | undefined,
  brushWidth: number
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.freeDrawingBrush.width = brushWidth;
    for (const object of fabricCanvas.getObjects()) {
      object.set({ strokeWidth: brushWidth });
    }
  }
}

/**
 * Reflect the changes to the brush color in the Fabric instance.
 *
 * Will redraw every object with the new value.
 */
export function syncBrushColor(
  fabricCanvas: fabric.Canvas | undefined,
  brushColor: string
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.freeDrawingBrush.color = brushColor;
    for (const object of fabricCanvas.getObjects()) {
      object.set({ stroke: brushColor });
    }
  }
}

/** Reflect the changes to the background color in the Fabric instance. */
export function syncBackgroundColor(
  fabricCanvas: fabric.Canvas | undefined,
  backgroundColor: string
): void {
  if (fabricCanvas !== undefined) {
    fabricCanvas.setBackgroundColor(backgroundColor, noop);
    fabricCanvas.renderAll();
  }
}
