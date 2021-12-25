import type { BBox } from './type';

/**
 * Get the bounding box of a concentric square
 * that a given bounding box can be inscribed into.
 */
export function inscribeInSquare(bbox: BBox): BBox {
  const [left, top, width, height] = bbox;
  const centerPoint = [left + width / 2, top + height / 2];
  const largerSide = Math.max(width, height);
  return [
    centerPoint[0] - largerSide / 2,
    centerPoint[1] - largerSide / 2,
    largerSide,
    largerSide,
  ] as BBox;
}
