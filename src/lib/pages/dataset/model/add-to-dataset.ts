import type { CanvasEvents } from '$lib/widgets/canvas';
import { addImage, type SampleClass } from '$lib/features/generate-dataset';
import { extractToSeparateCanvas } from '$lib/entities/drawing';

/** Amount of milliseconds before the newly drawn object disappears from the canvas. */
const timeoutBeforeExtraction = 500;

/** Add a drawing to the dataset and remove it from the canvas. */
export async function addToDataset(
  event: CustomEvent<CanvasEvents['object-drawn']>,
  label: SampleClass
): Promise<void> {
  const { detail: { object, fabricCanvas } } = event;
  const lastObject = await extractToSeparateCanvas(object);
  if (lastObject !== null) {
    const { imageData, bbox } = lastObject;
    addImage(imageData, bbox, label);
    setTimeout(() => fabricCanvas.remove(object), timeoutBeforeExtraction);
  }
}
