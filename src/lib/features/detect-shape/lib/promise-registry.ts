import type { Prediction } from '../model/prediction';

// TODO: wait until ESLint resolves this false positive and remove the comment
// eslint-disable-next-line no-unused-vars
type PredictionResolution = (prediction: Prediction | null) => void;

const registry = new Map<number, PredictionResolution>();
let idCounter = 0;

/** Exchange a promise resolution for a numeric ID that can be passed through the worker. */
export function trackPromise(resolutionFunction: PredictionResolution): number {
  registry.set(idCounter, resolutionFunction);
  return idCounter++;
}

/** Resolve a previously tracked promise by ID with the given object. */
export function resolveByID(id: number, resolution: Prediction | null): void {
  const resolve = registry.get(id);
  if (resolve !== undefined) {
    resolve(resolution);
    registry.delete(id);
  }
}
