import type { BBox } from '$lib/entities/bounding-box';

export interface SingleDrawing {
  imageData: HTMLCanvasElement;
  bbox: BBox;
  regionBBox: BBox;
}
