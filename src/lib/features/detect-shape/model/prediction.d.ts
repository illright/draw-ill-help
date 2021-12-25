import type { RelativeBBox, BBox } from '$lib/shared/bounding-box';
import type { Shape } from '$lib/shared/train-data';

export interface RawPrediction {
  bbox: RelativeBBox;
  confidence: number;
  predictedClass: number;
}

export interface Prediction {
  bbox: BBox;
  className: Shape;
}
