import type { Path } from 'fabric/fabric-impl';

import type { BBox } from '../model/type';

export function getPathBBox(pathObject: Path) {
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
