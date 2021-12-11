<script lang="ts">
  import { fabric } from 'fabric';
  import { onMount } from 'svelte';
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';

  import { Canvas, extractLastDrawing } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { detectShape, yolov5 } from '$lib/features/detect-shapes';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';

  $: {
    canvas?.setDrawingMode(currentTool === 'Draw');
  }

  onMount(() => yolov5.preload());
</script>

<div class="w-full h-screen relative">
  <Canvas
    bind:this={canvas}
    on:object-added={async ({ detail }) => {
      const object = detail.originalEvent.target;
      if (!(object instanceof fabric.Path)) {
        return;
      }

      if (detail.fabricRealCanvas !== undefined && detail.fabricOffScreenCanvas !== undefined) {
        const lastDrawing = await extractLastDrawing(object, detail.fabricRealCanvas, detail.fabricOffScreenCanvas);
        if (lastDrawing !== null) {
          const [image, _bbox, regionBBox] = lastDrawing;
          const shape = await detectShape(image, regionBBox);

          if (shape !== null) {
            detail.fabricRealCanvas.add(shape);
            detail.fabricRealCanvas.remove(object);
            return;
          }
        }
        object.excludeFromExport = true;
      }
    }}
  />
  <Toolbar>
    <Tool toolName="Draw" icon={IconPencil} bind:group={currentTool} />
    <Tool toolName="Select" icon={IconPointer} bind:group={currentTool} />
    <Action actionName="Clear canvas" icon={IconTrash} on:click={canvas.clear} />
  </Toolbar>
</div>
