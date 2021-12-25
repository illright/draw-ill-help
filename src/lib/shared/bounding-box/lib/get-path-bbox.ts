import type { Path } from 'fabric/fabric-impl';

import type { BBox } from './type';

/** Get a bounding box for an arbitrary `Path` object from Fabric. */
export function getPathBBox(pathObject: Path): BBox | undefined {
  const { left, top, width, height, strokeWidth } = pathObject;
  if (
    left === undefined ||
    top === undefined ||
    width === undefined ||
    height === undefined ||
    strokeWidth === undefined
  ) {
    return undefined;
  }

  return [left, top, width + strokeWidth, height + strokeWidth] as BBox;
}
