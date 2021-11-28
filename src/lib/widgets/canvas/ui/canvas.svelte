<script lang="ts">
  import { onMount } from 'svelte';
  import { fabric } from "fabric";

  let domCanvas: HTMLCanvasElement;
  let fabricCanvas: fabric.Canvas;

  function clearCanvas() {
    fabricCanvas.clear();
  }

  onMount(() => {
    fabricCanvas = new fabric.Canvas(domCanvas, {
      width: 1024,
      isDrawingMode: true,
    });
  });
</script>

<div class="flex flex-col h-full">
  <canvas class="w-full" bind:this={domCanvas} />
  <button on:click={clearCanvas}>Clear canvas</button>
</div>
