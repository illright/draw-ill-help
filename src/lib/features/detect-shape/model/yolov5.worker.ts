import { loadGraphModel } from '@tensorflow/tfjs';

import {
  modelWarmedUp,
  predictionFinished,
  predictionRequest,
  terminationRequest,
  type MessageFromMainThread,
  type PredictionFinishedMessage,
} from './messages';
import { runPrediction } from './run-prediction';
import { warmUp } from '../lib/warm-up-model';

const modelURL = `${vite.define.basePath}/model.json`;

const modelReady = loadGraphModel(modelURL).then(warmUp);
modelReady.then(() => postMessage({ type: modelWarmedUp }));

async function processMessage(event: MessageEvent<MessageFromMainThread>) {
  const model = await modelReady;

  if (event.data.type === predictionRequest) {
    const result = await runPrediction(model, event.data);
    postMessage({
      type: predictionFinished,
      promiseID: event.data.promiseID,
      prediction: result,
    } as PredictionFinishedMessage);
  } else if (event.data.type === terminationRequest) {
    model.dispose();
    removeEventListener('message', processMessage);
    self.close();
  }
}

addEventListener('message', processMessage);
