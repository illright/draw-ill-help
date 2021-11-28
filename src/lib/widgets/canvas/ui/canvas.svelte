<script lang="ts">
  import { onMount } from 'svelte';
  import { fabric } from "fabric";

  export let tool: 'Draw' | 'Select';
  $: {
    if (fabricCanvas !== undefined) {
      fabricCanvas.isDrawingMode = tool === 'Draw';
    }
  }

  let container: HTMLDivElement;
  let domCanvas: HTMLCanvasElement;
  let fabricCanvas: fabric.Canvas;

  export function clear() {
    fabricCanvas.clear();
  }

  function enableDrawMode() {
    fabricCanvas.isDrawingMode = true;
  }

  function enableExploreMode() {
    fabricCanvas.isDrawingMode = false;
  }

  onMount(() => {
    const { width, height } = container.getBoundingClientRect();
    fabricCanvas = new fabric.Canvas(domCanvas, {
      width,
      height,
      isDrawingMode: true,
    });
  });
</script>

<div class="flex flex-col h-full" bind:this={container}>
  <canvas class="w-full" bind:this={domCanvas} />
</div>
