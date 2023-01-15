import { extractToSeparateCanvas } from '$lib/entities/drawing';
import { yolov5, drawFromPrediction } from '$lib/features/detect-shape';
import type { CanvasEvents } from '$lib/widgets/canvas';

/**
 * Try to correct a drawing and replace it on the canvas.
 *
 * If YOLOv5 doesn't recognize the drawing, leave it on the canvas.
 */
export async function tryToCorrect({
	detail: { object, fabricCanvas },
}: CustomEvent<CanvasEvents['object-drawn']>): Promise<void> {
	const lastDrawing = await extractToSeparateCanvas(object);
	if (lastDrawing === null) {
		return;
	}

	const { imageData, regionBBox } = lastDrawing;
	try {
		const predictedShape = await yolov5.predict(imageData, regionBBox);
		if (predictedShape !== null) {
			fabricCanvas.remove(object);
			fabricCanvas.add(drawFromPrediction(predictedShape));
		}
	} catch {
		console.error('Malformed prediction request or the worker failed to load.');
	}
}
