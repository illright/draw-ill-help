import { dispose, zeros, type GraphModel } from '@tensorflow/tfjs';

import { inputImageSize } from '$lib/shared/train-data';

const imagesInBatch = 1;
const imageChannels = 3;

/** Warm up a model by running it through a tensor of zeros. */
export async function warmUp(model: GraphModel): Promise<GraphModel> {
	const sampleInput = zeros([imagesInBatch, inputImageSize, inputImageSize, imageChannels]);
	const output = await model.executeAsync(sampleInput);

	sampleInput.dispose();
	dispose(output);

	return model;
}
