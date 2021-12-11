import { dispose, loadGraphModel, zeros, tidy, browser } from '@tensorflow/tfjs';
import type { GraphModel, Tensor, Rank } from '@tensorflow/tfjs';

import type { classes } from './classes';
import type { RelativeBBox } from '$lib/entities/bounding-box';

const CONFIDENCE_THRESHOLD = 0.8;

export interface Prediction {
  bbox: RelativeBBox;
  confidence: number;
  predictedClass: keyof typeof classes;
}

type YOLOv5Output = [Tensor, Tensor, Tensor, Tensor];
type YOLOv5OutputData = [Float32Array, Float32Array, Float32Array, Int32Array];

class YOLOv5 {
  private modelUrl: string;
  private confidenceThreshold: number;
  private model: GraphModel | undefined;

  constructor(modelUrl: string, confidenceThreshold: number) {
    this.modelUrl = modelUrl;
    this.confidenceThreshold = confidenceThreshold;
  }

  private async warmUp(): Promise<void> {
    if (this.model !== undefined) {
      const sampleInput = zeros([1, 416, 416, 3]);
      const output = await this.model.executeAsync(sampleInput);

      sampleInput.dispose();
      dispose(output);
    }
  }

  async preload(): Promise<GraphModel> {
    if (this.model === undefined) {
      this.model = await loadGraphModel(this.modelUrl);
      await this.warmUp();
    }

    return this.model;
  }

  async predict(inputImage: HTMLCanvasElement): Promise<Prediction | null> {
    const model = await this.preload();
    const inputPixels = await browser.fromPixelsAsync(inputImage);
    const inputNormalized = this.preprocessInput(inputPixels);

    const output = (await model.executeAsync(inputNormalized)) as YOLOv5Output;
    const [relativeBBoxes, confidences, classPredictions, [_amountOfValidPredictions]] =
      (await Promise.all(output.map((tensor: Tensor) => tensor.data()))) as YOLOv5OutputData;

    inputPixels.dispose();
    inputNormalized.dispose();
    dispose(output);

    const relativeBBox = Array.from(relativeBBoxes).slice(0, 4);
    const confidence = confidences[0];
    const predictedClass = classPredictions[0];

    if (confidence > this.confidenceThreshold) {
      return {
        bbox: relativeBBox as RelativeBBox,
        confidence,
        predictedClass,
      };
    } else {
      return null;
    }
  }

  preprocessInput(input: Tensor<Rank.R3>) {
    return tidy<Tensor<Rank.R3>>(() => input.cast('float32').expandDims(0).div(255));
  }
}

export const yolov5 = new YOLOv5('/model.json', CONFIDENCE_THRESHOLD);
