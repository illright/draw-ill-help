<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fabric } from 'fabric';

  import { classDrawingTools, untrack } from '$lib/features/detect-shape';
  import type { BBox } from '$lib/entities/bounding-box';

  import { autoResize, stopAutoResizing } from './resize-observer';
  import {
    syncBackgroundColor,
    syncBrushColor,
    syncBrushWidth,
    syncDrawingMode,
  } from '../model/synchronize-fabric';
  import type { CanvasEvents } from './canvas-events';

  let container: HTMLDivElement | undefined;
  let domRealCanvas: HTMLCanvasElement | undefined;
  let domOffScreenCanvas: HTMLCanvasElement | undefined;
  let fabricRealCanvas: fabric.Canvas | undefined;
  let fabricOffScreenCanvas: fabric.Canvas | undefined;

  export let drawMode = false;
  export let brushWidth = 4;
  export let brushColor = '#000';
  export let backgroundColor = '#fff';
  $: syncDrawingMode(fabricRealCanvas, drawMode);
  $: syncBrushWidth(fabricRealCanvas, brushWidth);
  $: syncBrushColor(fabricRealCanvas, brushColor);
  $: syncBackgroundColor(fabricRealCanvas, backgroundColor);

  export function clear() {
    fabricRealCanvas?.clear();
    fabricRealCanvas?.setBackgroundColor(backgroundColor, () => {});
  }

  interface PredictedObject {
    className: 'Circle' | 'Rectangle';
    bbox: BBox;
  }

  export function addPredictedObject(objectID: number, predictedObject: PredictedObject) {
    if (fabricRealCanvas !== undefined) {
      const drawing = untrack(objectID);
      if (predictedObject === null) {
        return;
      }

      fabricRealCanvas.remove(drawing);
      const size =
        predictedObject.className === 'Circle'
          ? {
              rx: predictedObject.bbox[2] / 2,
              ry: predictedObject.bbox[3] / 2,
            }
          : {
              width: predictedObject.bbox[2],
              height: predictedObject.bbox[3],
            };
      const object = new classDrawingTools[predictedObject.className]({
        left: predictedObject.bbox[0],
        top: predictedObject.bbox[1],
        ...size,
      });
      object.stroke = brushColor;
      object.strokeWidth = brushWidth;
      object.fill = 'transparent';
      fabricRealCanvas.add(object);
    }
  }

  onMount(() => {
    domOffScreenCanvas = document.createElement('canvas');
    if (domRealCanvas === undefined) {
      return;
    }

    fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
      enableRetinaScaling: false,
    });
    fabricOffScreenCanvas = new fabric.Canvas(domOffScreenCanvas, {
      skipOffscreen: false,
      enableRetinaScaling: false,
    });
    fabricRealCanvas.on('object:added', function(this: fabric.Canvas, { target: object }) {
      if (object instanceof fabric.Path) {
        if (fabricOffScreenCanvas !== undefined) {
          dispatch('object-drawn', { object, fabricCanvas: this, fabricOffScreen: fabricOffScreenCanvas })
        }
      } else if (object !== undefined) {
        object.stroke = brushColor;
      }
    });

    if (container !== undefined) {
      autoResize([fabricRealCanvas, fabricOffScreenCanvas], container);
    }
  });

  onDestroy(() => {
    stopAutoResizing();
    fabricRealCanvas?.dispose();
    fabricOffScreenCanvas?.dispose();
  });

  const dispatch = createEventDispatcher<CanvasEvents>();
</script>

<div class="h-full" bind:this={container}>
  <canvas bind:this={domRealCanvas} />
</div>
