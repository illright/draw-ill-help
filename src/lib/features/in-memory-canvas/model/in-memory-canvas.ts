import { browser } from '$app/env';
import { fabric } from 'fabric';

import { getPathBBox } from '$lib/shared/bounding-box';

let offScreenCanvas: fabric.Canvas | null = null;

/**
 * Request the creation or expansion of an in-memory canvas to fit the bounding box of a given `Path`.
 *
 * Only works in the browser, returning `null` when executed on the server.
 */
export function requestCanvasToFit(object: fabric.Path): fabric.Canvas | null {
  if (!browser) {
    return null;
  }

  const objectBBox = getPathBBox(object);
  if (objectBBox === undefined) {
    return null;
  }

  const [objectLeft, objectTop, objectWidth, objectHeight] = objectBBox;

  if (offScreenCanvas === null) {
    offScreenCanvas = new fabric.Canvas(document.createElement('canvas'), {
      skipOffscreen: false,
      enableRetinaScaling: false,
    });
  }

  if ((offScreenCanvas.width ?? 0) < objectLeft + objectWidth) {
    offScreenCanvas.setWidth(objectLeft + objectWidth);
  }

  if ((offScreenCanvas.height ?? 0) < objectTop + objectHeight) {
    offScreenCanvas.setHeight(objectTop + objectHeight);
  }

  return offScreenCanvas;
}

/** Stop tracking the in-memory canvas. */
export function discardInMemoryCanvas(): void {
  offScreenCanvas?.dispose();
  offScreenCanvas = null;
}
