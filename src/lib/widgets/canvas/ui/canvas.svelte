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
  let fabricRealCanvas: fabric.Canvas | undefined;

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
    syncBackgroundColor(fabricRealCanvas, backgroundColor);
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
    if (domRealCanvas === undefined || container === undefined) {
      return;
    }

    fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
      enableRetinaScaling: false,
    });
    fabricRealCanvas.on('object:added', function(this: fabric.Canvas, { target: object }) {
      if (object instanceof fabric.Path) {
        dispatch('object-drawn', { object, fabricCanvas: this })
      } else if (object !== undefined) {
        object.stroke = brushColor;
      }
    });

    autoResize(fabricRealCanvas, container);
  });

  onDestroy(() => {
    stopAutoResizing();
    fabricRealCanvas?.dispose();
  });

  const dispatch = createEventDispatcher<CanvasEvents>();
</script>

<div class="h-full" bind:this={container}>
  <canvas bind:this={domRealCanvas} />
</div>
