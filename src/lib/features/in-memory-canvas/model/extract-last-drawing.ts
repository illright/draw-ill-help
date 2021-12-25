import type { fabric } from 'fabric';

import {
  type BBox,
  getPathBBox,
  expandBBox,
  inscribeInSquare,
  relativeCoordinates,
  scaledCoordinates,
} from '$lib/shared/bounding-box';
import { strokeColor, backgroundColor, inputImageSize } from '$lib/shared/train-data';

import { requestCanvasToFit } from './in-memory-canvas';
import type { SingleDrawing } from '../types';

const modelInputBBox: BBox = [0, 0, inputImageSize, inputImageSize];

function crop(sourceCanvas: HTMLCanvasElement, sourcePosition: BBox) {
  const buffer = document.createElement('canvas');
  const targetPosition = modelInputBBox;
  buffer.width = modelInputBBox[2];
  buffer.height = modelInputBBox[3];

  const bufferContext = buffer.getContext('2d');
  if (bufferContext !== null) {
    bufferContext.fillStyle = backgroundColor;
    bufferContext.fillRect(0, 0, buffer.width, buffer.height);
    bufferContext.drawImage(sourceCanvas, ...sourcePosition, ...targetPosition);
    return buffer;
  } else {
    return null;
  }
}

export async function extractToSeparateCanvas(object: fabric.Path): Promise<SingleDrawing | null> {
  const offScreenCanvas = requestCanvasToFit(object);
  if (offScreenCanvas === null) {
    return null;
  }

  const serializedDrawing = {
    objects: [{ ...object.toObject(), stroke: strokeColor }],
    background: backgroundColor,
  };

  await new Promise((resolve) => offScreenCanvas.loadFromJSON(serializedDrawing, resolve));
  offScreenCanvas.renderAll();

  const bbox = getPathBBox(object);
  if (bbox !== undefined) {
    const regionAroundObject = inscribeInSquare(expandBBox(bbox, 1.1));
    const bboxInRegion = relativeCoordinates(bbox, regionAroundObject);
    const bboxInScaledRegion = scaledCoordinates(bboxInRegion, regionAroundObject, modelInputBBox);
    const croppedCanvas = crop(offScreenCanvas.getElement(), regionAroundObject);

    if (croppedCanvas !== null) {
      return {
        imageData: croppedCanvas,
        bbox: bboxInScaledRegion,
        regionBBox: regionAroundObject,
      };
    }
  }

  return null;
}
