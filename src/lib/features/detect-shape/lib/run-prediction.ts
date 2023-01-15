import { dispose, browser, type Tensor, type GraphModel } from '@tensorflow/tfjs';

import type { RelativeBBox } from '$lib/shared/bounding-box';

import type { PredictionRequestMessage } from '../model/messages';
import { preprocessInput, postprocessOutput } from './model-adapter';
import type { Prediction } from '../model/prediction';

const confidenceThreshold = 0.67;

type YOLOv5Output = [Tensor, Tensor, Tensor, Tensor];
type YOLOv5OutputData = [Float32Array, Float32Array, Float32Array, Int32Array];

/** Execute the model to produce a prediction. */
export async function runPrediction(
  model: GraphModel,
  request: PredictionRequestMessage
): Promise<Prediction | null> {
  const inputPixels = await browser.fromPixelsAsync(request.image);
  const inputNormalized = preprocessInput(inputPixels);

  const output = (await model.executeAsync(inputNormalized)) as YOLOv5Output;
  const [relativeBBoxes, confidences, classPredictions, [_amountOfValidPredictions]] =
    (await Promise.all(output.map((tensor: Tensor) => tensor.data()))) as YOLOv5OutputData;

  inputPixels.dispose();
  inputNormalized.dispose();
  dispose(output);

  const rawPrediction = {
    bbox: Array.from(relativeBBoxes).slice(0, 4) as RelativeBBox,
    confidence: confidences[0],
    predictedClass: classPredictions[0],
  };

  if (rawPrediction.confidence >= confidenceThreshold) {
    return postprocessOutput(rawPrediction, request.regionBBox);
  } else {
    return null;
  }
}
