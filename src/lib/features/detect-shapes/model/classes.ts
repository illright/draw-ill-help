import { fabric } from 'fabric';

export const classes = ['Circle', 'Rectangle'] as const;
export const classDrawingTools = {
  Circle: fabric.Ellipse,
  Rectangle: fabric.Rect
} as const;
