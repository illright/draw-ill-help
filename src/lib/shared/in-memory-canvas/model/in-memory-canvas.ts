import { browser } from '$app/env';
import { fabric } from 'fabric';

let offScreenCanvas: fabric.Canvas | null = null;

/**
 * Request the creation or expansion of an in-memory canvas to fit the a given point.
 *
 * Only works in the browser, returning `null` when executed on the server.
 */
export function requestCanvasToFit(left: number, top: number): fabric.Canvas | null {
  if (!browser) {
    return null;
  }

  if (offScreenCanvas === null) {
    offScreenCanvas = new fabric.Canvas(document.createElement('canvas'), {
      skipOffscreen: false,
      enableRetinaScaling: false,
    });
  }

  if ((offScreenCanvas.width ?? 0) < left) {
    offScreenCanvas.setWidth(left);
  }

  if ((offScreenCanvas.height ?? 0) < top) {
    offScreenCanvas.setHeight(top);
  }

  return offScreenCanvas;
}

/** Stop tracking the in-memory canvas. */
export function discardInMemoryCanvas(): void {
  offScreenCanvas?.dispose();
  offScreenCanvas = null;
}
