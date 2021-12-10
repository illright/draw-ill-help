import type { Path } from 'fabric/fabric-impl';

import {
  type BBox,
  getPathBBox,
  expandBBox,
  inscribeInSquare,
  relativeCoordinates,
  scaledCoordinates,
} from '$lib/entities/bounding-box';

const MODEL_INPUT_SIZE = 416;
const modelInputBBox: BBox = [0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE];

function crop(sourceCanvas: HTMLCanvasElement, sourcePosition: BBox) {
  const buffer = document.createElement('canvas');
  const targetPosition = modelInputBBox;
  buffer.width = modelInputBBox[2];
  buffer.height = modelInputBBox[3];

  const bufferContext = buffer.getContext('2d');
  if (bufferContext !== null) {
    bufferContext.fillStyle = 'white';
    bufferContext.fillRect(0, 0, buffer.width, buffer.height);
    bufferContext.drawImage(sourceCanvas, ...sourcePosition, ...targetPosition);
    return buffer;
  } else {
    return null;
  }
}

export async function extractLastDrawing(
  object: Path,
  fromCanvas: fabric.Canvas,
  toCanvas: fabric.Canvas
): Promise<[HTMLCanvasElement, BBox] | null> {
  if (object === undefined) {
    return null;
  }

  await new Promise((resolve) => toCanvas.loadFromJSON(fromCanvas.toJSON(), resolve));
  toCanvas.renderAll();

  const bbox = getPathBBox(object);
  if (bbox !== undefined) {
    const regionAroundObject = inscribeInSquare(expandBBox(bbox, 1.1));
    const bboxInRegion = relativeCoordinates(bbox, regionAroundObject);
    const bboxInScaledRegion = scaledCoordinates(bboxInRegion, regionAroundObject, modelInputBBox);
    const croppedCanvas = crop(toCanvas.getElement(), regionAroundObject);

    if (croppedCanvas !== null) {
      return [croppedCanvas, bboxInScaledRegion];
    }
  }

  return null;
}
