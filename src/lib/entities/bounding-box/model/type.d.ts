/**
 * A bounding box in XYWH format.
 *
 * The four numbers are `[left, top, width, height]`.
 */
export type BBox = [number, number, number, number];

/**
 * A relative bounding box positioned inside an absolute bounding box.
 *
 * The four numbers are `[left, top, width, height]`,
 * each number being from 0 to 1 and corresponding to the fraction
 * of the parent bounding box's respective dimension
 * (width for `left` and `width`, height for `top` and `height`).
 */
export type RelativeBBox = [number, number, number, number];
