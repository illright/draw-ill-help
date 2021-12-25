<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fabric } from 'fabric';

  import { autoResize, stopAutoResizing } from './resize-observer';
  import { classDrawingTools, untrack } from '$lib/features/detect-shape';
  import type { BBox } from '$lib/entities/bounding-box';

  let container: HTMLDivElement | undefined;
  let domRealCanvas: HTMLCanvasElement | undefined;
  let domOffScreenCanvas: HTMLCanvasElement | undefined;
  let fabricRealCanvas: fabric.Canvas | undefined;
  let fabricOffScreenCanvas: fabric.Canvas | undefined;
  let darkColorsMedia: MediaQueryList | undefined;
  let backgroundColor = '#ffffff';
  let foregroundColor = '#000000';

  export let drawMode = false;
  export let brushWidth = 4;

  export function clear() {
    fabricRealCanvas?.clear();
    fabricRealCanvas?.setBackgroundColor(backgroundColor, () => {});
  }

  $: {
    if (fabricRealCanvas !== undefined) {
      fabricRealCanvas.isDrawingMode = drawMode;
    }
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
      object.stroke = foregroundColor;
      object.strokeWidth = brushWidth;
      object.fill = 'transparent';
      fabricRealCanvas.add(object);
    }
  }

  function switchToDarkTheme(e: MediaQueryListEvent | MediaQueryList) {
    const html = document.querySelector('html');

    if (html !== null) {
      const cssVars = getComputedStyle(html);

      if (e.matches) {
        backgroundColor = cssVars.getPropertyValue('--canvas-dark-bg');
        foregroundColor = cssVars.getPropertyValue('--canvas-dark-fg');
      } else {
        backgroundColor = cssVars.getPropertyValue('--canvas-light-bg');
        foregroundColor = cssVars.getPropertyValue('--canvas-light-fg');
      }
    }
  }

  onMount(() => {
    darkColorsMedia = window.matchMedia('(prefers-color-scheme: dark)');
    darkColorsMedia.addEventListener('change', switchToDarkTheme);
    switchToDarkTheme(darkColorsMedia);
    if (domRealCanvas === undefined) {
      return;
    }

    fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
      enableRetinaScaling: false,
      isDrawingMode: drawMode,
      backgroundColor,
    });
    fabricRealCanvas.freeDrawingBrush.width = brushWidth;
    fabricRealCanvas.freeDrawingBrush.color = foregroundColor;
    domOffScreenCanvas = document.createElement('canvas');
    fabricOffScreenCanvas = new fabric.Canvas(domOffScreenCanvas, {
      skipOffscreen: false,
      enableRetinaScaling: false,
    });
    fabricRealCanvas.on('object:added', ({ target: newObject }) => {
      if (newObject instanceof fabric.Path) {
        if (fabricRealCanvas !== undefined && fabricOffScreenCanvas !== undefined) {
          dispatch('object-drawn', {
            object: newObject,
            fabricReal: fabricRealCanvas,
            fabricOffScreen: fabricOffScreenCanvas,
          });
        }
      } else {
        if (newObject !== undefined) {
          newObject.stroke = foregroundColor;
        }
      }
    });

    if (container !== undefined) {
      autoResize([fabricRealCanvas, fabricOffScreenCanvas], container);
    }
  });

  $: {
    if (fabricRealCanvas !== undefined) {
      fabricRealCanvas.freeDrawingBrush.color = foregroundColor;
      fabricRealCanvas.setBackgroundColor(backgroundColor, () => {});
    }
  }

  onDestroy(() => {
    darkColorsMedia?.removeEventListener('change', switchToDarkTheme);
    stopAutoResizing();
    domOffScreenCanvas?.remove()
  });
  const dispatch = createEventDispatcher<any>();
</script>

<div class="h-full" bind:this={container}>
  <canvas bind:this={domRealCanvas} />
</div>
