import type { BBox } from './type';

/** Grow the bounding box by a factor, taking the center as the fixed point. */
export function expandBBox(bbox: BBox, factor: number): BBox {
	const [left, top, width, height] = bbox;

	return [
		Math.max(0, left - width * (factor - 1)),
		Math.max(0, top - height * (factor - 1)),
		width * (factor * 2 - 1),
		height * (factor * 2 - 1),
	] as BBox;
}
