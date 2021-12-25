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
import { requestCanvasToFit } from '$lib/shared/in-memory-canvas';

import type { SingleDrawing } from './types';

const modelInputBBox: BBox = [0, 0, inputImageSize, inputImageSize];

/** Crop a given region from a canvas and resize it to the model input image size. */
function crop(sourceCanvas: HTMLCanvasElement, sourcePosition: BBox) {
  const buffer = document.createElement('canvas');
  const targetPosition = modelInputBBox;
  buffer.width = inputImageSize;
  buffer.height = inputImageSize;

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

/** Clone the object and draw it on a blank in-memory canvas. */
export async function extractToSeparateCanvas(object: fabric.Path): Promise<SingleDrawing | null> {
  const objectBBox = getPathBBox(object);
  if (objectBBox === undefined) {
    return null;
  }

  const [objectLeft, objectTop, objectWidth, objectHeight] = objectBBox;
  const offScreenCanvas = requestCanvasToFit(objectLeft + objectWidth, objectTop + objectHeight);
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
