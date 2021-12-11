import { type BBox, scaleToAbsoulteBBox } from '$lib/entities/bounding-box';

import { classes } from './classes';
import { yolov5 } from './yolov5';

export async function detectShape(canvas: HTMLCanvasElement, regionBBox: BBox): Promise<void> {
  const prediction = await yolov5.predict(canvas);
  if (prediction !== null) {
    const objectBBox = scaleToAbsoulteBBox(prediction.bbox, regionBBox);
    console.log(classes[prediction.predictedClass]), console.log(objectBBox), console.log(regionBBox);
  }
}
