import type { fabric } from 'fabric';

/** Style the object to look like it was drawn with a given brush. */
export function styleWithBrush(object: fabric.Object, brush: fabric.BaseBrush): void {
  object.set({
    stroke: brush.color,
    strokeWidth: brush.width,
    fill: 'transparent',
  });
}
