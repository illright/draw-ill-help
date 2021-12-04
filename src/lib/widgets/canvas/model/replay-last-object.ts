import type { Object as FabricObject } from 'fabric/fabric-impl';

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
	console.log(toCanvas.getElement().toDataURL());

	object.excludeFromExport = true;
}
