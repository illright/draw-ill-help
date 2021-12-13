import { dispose, loadGraphModel, zeros, tidy, browser } from '@tensorflow/tfjs';
import type { GraphModel, Tensor, Rank } from '@tensorflow/tfjs';

import { scaleToAbsoulteBBox, type BBox, type RelativeBBox } from '$lib/entities/bounding-box';

const confidenceThreshold = 0.67;
const modelURL = `${vite.define.basePath}/model.json`;

const modelReady = loadGraphModel(modelURL).then(warmUp);
modelReady.then(() => postMessage({ type: 'model-ready' }));

addEventListener('message', runPrediction);

async function warmUp(model: GraphModel) {
  const sampleInput = zeros([1, 416, 416, 3]);
  const output = await model.executeAsync(sampleInput);

  sampleInput.dispose();
  dispose(output);

  return model;
}

function preprocessInput(input: Tensor<Rank.R3>) {
  return tidy<Tensor<Rank.R3>>(() => input.cast('float32').expandDims(0).div(255));
}

async function runPrediction(event: MessageEvent<{ image: ImageData; regionBBox: BBox; id: number; }>) {
  const model = await modelReady;
  const inputPixels = await browser.fromPixelsAsync(event.data.image);
  const inputNormalized = preprocessInput(inputPixels);

  const output = (await model.executeAsync(inputNormalized)) as YOLOv5Output;
  const [relativeBBoxes, confidences, classPredictions, [_amountOfValidPredictions]] =
    (await Promise.all(output.map((tensor: Tensor) => tensor.data()))) as YOLOv5OutputData;

  inputPixels.dispose();
  inputNormalized.dispose();
  dispose(output);

  const relativeBBox = Array.from(relativeBBoxes).slice(0, 4);
  const confidence = confidences[0];
  const predictedClass = classPredictions[0];

  if (confidence > confidenceThreshold) {
    postMessage({
      type: 'prediction',
      id: event.data.id,
      data: processPrediction({
        bbox: relativeBBox as RelativeBBox,
        confidence,
        predictedClass,
      }, event.data.regionBBox),
    });
  } else {
    postMessage({
      type: 'prediction',
      id: event.data.id,
      data: null,
    });
  }
}

function processPrediction(prediction: Prediction, regionBBox: BBox) {
  const className = ['Circle', 'Rectangle'][prediction.predictedClass] as 'Circle' | 'Rectangle';
  const absoluteBBox = scaleToAbsoulteBBox(prediction.bbox, regionBBox);
  return { className, bbox: absoluteBBox };
}

export interface Prediction {
  bbox: RelativeBBox;
  confidence: number;
  predictedClass: number;
}

type YOLOv5Output = [Tensor, Tensor, Tensor, Tensor];
type YOLOv5OutputData = [Float32Array, Float32Array, Float32Array, Int32Array];
