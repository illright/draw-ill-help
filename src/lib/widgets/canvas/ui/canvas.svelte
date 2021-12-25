<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fabric } from 'fabric';

  import { styleWithBrush } from '$lib/entities/drawing';

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

  function processNewObject(this: fabric.Canvas, { target }: fabric.IEvent) {
    if (target instanceof fabric.Path) {
      dispatch('object-drawn', { object: target, fabricCanvas: this });
    } else if (target !== undefined) {
      styleWithBrush(target, this.freeDrawingBrush);
    }
  }

  onMount(() => {
    if (domRealCanvas === undefined || container === undefined) {
      return;
    }

    fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
      enableRetinaScaling: false,
    });
    fabricRealCanvas.on('object:added', processNewObject);

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
