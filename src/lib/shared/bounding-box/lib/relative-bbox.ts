import type { BBox, RelativeBBox } from './type';

/**
 * Compute the absolute coordinates of a relative bounding box
 * from a given absolute parent bounding box.
 */
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
