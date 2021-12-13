import ShapeDetector from './yolov5.worker?worker';

import type { BBox } from "$lib/entities/bounding-box";
let worker: Worker | undefined;
let subscriptions: Array<(id: number, object: any) => void> = [];

export function onPredict(callback: (id: number, object: any) => void): void {
  subscriptions.push(callback);
}

function messageReceived(message: any) {
  console.log('was messaged');
  if (message.data.type === 'prediction') {
    for (const callback of subscriptions) {
      callback(message.data.id, message.data.data);
    }
  } else {
    console.log(message.data.type);
  }
}


export const detector = {
  initialize(): void {
    console.log('starting worker');
    worker = new ShapeDetector();
    worker.addEventListener('message', messageReceived);
  },

  predict(image: HTMLCanvasElement, regionBBox: BBox, objectID: number): void {
    console.log('predicting');
    const context = image.getContext('2d');
    const imageData = context?.getImageData(0, 0, image.width, image.height);

    if (image !== undefined) {
      worker?.postMessage({ image: imageData, regionBBox: regionBBox, id: objectID });
    }
  },

  stop(): void {
    console.log('stopping worker');
    worker?.removeEventListener('message', messageReceived);
    subscriptions = [];
  }
}
