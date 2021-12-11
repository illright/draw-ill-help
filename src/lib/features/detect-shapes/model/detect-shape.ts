import type { fabric } from 'fabric';

import { type BBox, scaleToAbsoulteBBox } from '$lib/entities/bounding-box';

import { classes, classDrawingTools } from './classes';
import { yolov5 } from './yolov5';

export async function detectShape(canvas: HTMLCanvasElement, regionBBox: BBox): Promise<fabric.Object | null> {
  const prediction = await yolov5.predict(canvas);
  if (prediction !== null) {
    const className = classes[prediction.predictedClass] as 'Circle' | 'Rectangle';
    const [left, top, width, height] = scaleToAbsoulteBBox(prediction.bbox, regionBBox);
    const size = className === 'Circle' ? {
      rx: width / 2,
      ry: height / 2,
    } : {
      width,
      height,
    }
    const correctedObject = new classDrawingTools[className]({
      left,
      top,
      ...size,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 4,
    });
    return correctedObject;
  }

  return null;
}
