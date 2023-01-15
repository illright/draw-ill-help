import { fabric } from 'fabric';

import type { Prediction } from '../model/prediction';

const classDrawingTools = {
	Circle: fabric.Ellipse,
	Rectangle: fabric.Rect,
} as const;

/** Create a `fabric` object from a predicted class and bounding box. */
export function drawFromPrediction(prediction: Prediction): fabric.Ellipse | fabric.Rect {
	const [left, top, width, height] = prediction.bbox;
	const size =
		prediction.className === 'Circle'
			? {
					rx: width / 2,
					ry: height / 2,
			  }
			: {
					width,
					height,
			  };
	return new classDrawingTools[prediction.className]({
		left,
		top,
		...size,
	});
}
