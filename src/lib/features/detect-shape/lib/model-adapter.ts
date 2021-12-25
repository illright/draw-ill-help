import { tidy, type Tensor, type Rank } from '@tensorflow/tfjs';

import { scaleToAbsoulteBBox, type BBox } from '$lib/shared/bounding-box';
import { classOrder } from '$lib/shared/train-data';

import type { RawPrediction, Prediction } from '../model/prediction';

/** Convert an image into a batch of a single image and normalize. */
export function preprocessInput(input: Tensor<Rank.R3>): Tensor<Rank.R3> {
  return tidy(() => input.cast('float32').expandDims(0).div(255));
}

/** Convert a class index into a label and scale coordinates to absolute values. */
export function postprocessOutput(prediction: RawPrediction, regionBBox: BBox): Prediction {
  const className = classOrder[prediction.predictedClass];
  const absoluteBBox = scaleToAbsoulteBBox(prediction.bbox, regionBBox);
  return { className, bbox: absoluteBBox };
}
