import type { BBox } from '$lib/shared/bounding-box';

import type { Prediction } from './prediction';

// Worker -> Main thread
export const modelWarmedUp = 'model-warmed-up';
export const predictionFinished = 'prediction-finished';

// Main thread -> Worker
export const predictionRequest = 'prediction-request';
export const terminationRequest = 'termination-request';

/** Notification about the model being ready for predictions. */
export interface ModelWarmedUpMessage {
	type: typeof modelWarmedUp;
}

/** A result of a previously submitted prediction request. */
export interface PredictionFinishedMessage {
	type: typeof predictionFinished;
	prediction: Prediction | null;
	promiseID: number;
}

/** A prediction request from given image data. */
export interface PredictionRequestMessage {
	type: typeof predictionRequest;
	promiseID: number;
	image: ImageData;
	regionBBox: BBox;
}

/** A request for the worker to terminate itself.  */
export interface TerminationRequestMessage {
	type: typeof terminationRequest;
}

export type MessageFromWorker = ModelWarmedUpMessage | PredictionFinishedMessage;
export type MessageFromMainThread = PredictionRequestMessage | TerminationRequestMessage;
