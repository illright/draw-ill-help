import type { BBox } from '$lib/shared/bounding-box';

import ModelWorker from './yolov5.worker?worker';
import { markModelAsReady } from './model-ready';
import {
  modelWarmedUp,
  predictionFinished,
  predictionRequest,
  type PredictionRequestMessage,
  type MessageFromWorker,
} from './messages';
import { trackPromise, resolveByID } from '../lib/promise-registry';
import type { Prediction } from './prediction';

let worker: Worker | undefined;

function processMessage(event: MessageEvent<MessageFromWorker>) {
  if (event.data.type === modelWarmedUp) {
    markModelAsReady?.();
  } else if (event.data.type === predictionFinished) {
    resolveByID(event.data.promiseID, event.data.prediction);
  }
}

export const yolov5 = {
  /** Create a worker and set up communication with it. */
  initialize(): void {
    worker = new ModelWorker();
    worker.addEventListener('message', processMessage);
  },

  /** Tear down the communication channel with the worker. */
  stop(): void {
    worker?.removeEventListener('message', processMessage);
  },

  /** Submit a prediction request to the worker and track it to completion. */
  predict(image: HTMLCanvasElement, regionBBox: BBox): Promise<Prediction | null> {
    const context = image.getContext('2d');
    const imageData = context?.getImageData(0, 0, image.width, image.height);

    return new Promise<Prediction | null>((resolve, reject) => {
      const promiseID = trackPromise(resolve);

      if (image !== undefined && worker !== undefined) {
        worker.postMessage({
          type: predictionRequest,
          image: imageData,
          regionBBox,
          promiseID,
        } as PredictionRequestMessage);
      } else {
        reject();
      }
    });
  },
};
