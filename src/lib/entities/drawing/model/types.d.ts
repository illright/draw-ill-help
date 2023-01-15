import type { BBox } from '$lib/shared/bounding-box';

export interface SingleDrawing {
	imageData: HTMLCanvasElement;
	bbox: BBox;
	regionBBox: BBox;
}
