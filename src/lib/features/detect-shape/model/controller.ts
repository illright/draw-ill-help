import ShapeDetector from './yolov5.worker?worker';

import type { BBox } from "$lib/entities/bounding-box";
let worker: Worker | undefined;
let subscriptions: Array<(id: number, object: any) => void> = [];
let markModelAsReady: (() => void) | undefined;

export const modelReady = new Promise<void>(resolve => {
  markModelAsReady = resolve;
})

export function onPredict(callback: (id: number, object: any) => void): void {
  subscriptions.push(callback);
}

export function unsubscribe(callback: (id: number, object: any) => void): void {
  subscriptions = subscriptions.filter(thatCallback => thatCallback !== callback);
}

function messageReceived(message: any) {
  if (message.data.type === 'prediction') {
    for (const callback of subscriptions) {
      callback(message.data.id, message.data.data);
    }
  } else if (message.data.type === 'model-ready') {
    markModelAsReady?.();
  }
}

export const detector = {
  initialize(): void {
    worker = new ShapeDetector();
    worker.addEventListener('message', messageReceived);
  },

  predict(image: HTMLCanvasElement, regionBBox: BBox, objectID: number): void {
    const context = image.getContext('2d');
    const imageData = context?.getImageData(0, 0, image.width, image.height);

    if (image !== undefined) {
      worker?.postMessage({ image: imageData, regionBBox: regionBBox, id: objectID });
    }
  },

  stop(): void {
    worker?.removeEventListener('message', messageReceived);
    subscriptions = [];
  }
}
