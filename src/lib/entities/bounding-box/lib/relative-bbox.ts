import type { BBox, RelativeBBox } from "../model/type";

export function scaleToAbsoulteBBox(relativeBBox: RelativeBBox, absoluteParent: BBox): BBox {
  const [leftRel, topRel, widthRel, heightRel] = relativeBBox;
  const [parentLeft, parentTop, parentWidth, parentHeight] = absoluteParent;

  return [
    parentLeft + parentWidth * leftRel,
    parentTop + parentHeight * topRel,
    parentWidth * widthRel,
    parentHeight * heightRel,
  ];
}
