import type { Object as FabricObject } from 'fabric/fabric-impl';

// import { detectShapes } from '$lib/features/detect-shapes';

const MODEL_INPUT_SIZE = 32;

function crop(
	sourceCanvas: HTMLCanvasElement,
	left: number,
	top: number,
	width: number,
	height: number,
) {
	const centerPoint = [left + width / 2, top + height / 2];
	const largerSide = Math.max(width, height);
	const sourcePosition = [
		centerPoint[0] - largerSide / 2,
		centerPoint[1] - largerSide / 2,
		largerSide,
		largerSide,
	] as const;

	const buffer = document.createElement('canvas');
	buffer.width = MODEL_INPUT_SIZE;
	buffer.height = MODEL_INPUT_SIZE;
	const targetPosition = [0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE] as const;

	const bufferContext = buffer.getContext('2d');
	if (bufferContext !== null) {
		bufferContext.drawImage(sourceCanvas, ...sourcePosition, ...targetPosition);
		return buffer;
	} else {
		return null;
	}
}

function getObjectBBox(object: FabricObject) {
	const { left, top, width, height } = object;
	if (left === undefined || top === undefined || width === undefined || height === undefined) {
		return undefined;
	}

	return [
		Math.max(0, left - 0.1 * width),
		Math.max(0, top - 0.1 * height),
		width * 1.2,
		height * 1.2,
	] as const;
}

export async function replayLastObject(
	object: FabricObject | undefined,
	fromCanvas: fabric.Canvas,
	toCanvas: fabric.Canvas
): Promise<void> {
	if (object === undefined) {
		return;
	}

	await new Promise((resolve) => toCanvas.loadFromJSON(fromCanvas.toJSON(), resolve));
	toCanvas.renderAll();

	const boundingBox = getObjectBBox(object);
	const croppedCanvas =
		boundingBox !== undefined ? crop(toCanvas.getElement(), ...boundingBox) : null;
	if (croppedCanvas !== null) {
		// detectShapes(croppedCanvas);
	}

	object.excludeFromExport = true;
}
