import type { Shape } from '$lib/shared/train-data';

export type SampleClass = Shape | 'Nothing';

export interface Sample {
	data: Blob;
	/**
	 * A bounding box in XYXY format.
	 *
	 * The four numbers are `[left, top, left + width, top + height]`.
	 */
	coordinates: [[number, number], [number, number]];
	className: SampleClass;
}
