import type { fabric } from 'fabric';

export interface CanvasEvents {
  /** Fires when a user finishes a drawing. */
  'object-drawn': {
    /** The newly drawn `Path` object. */
    object: fabric.Path;
    /** A reference to the canvas that the object was drawn on. */
    fabricCanvas: fabric.Canvas;
    fabricOffScreen: fabric.Canvas;
  };
}
