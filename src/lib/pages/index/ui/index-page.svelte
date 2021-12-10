<script lang="ts">
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';

  import { Canvas, extractLastDrawing } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';

  $: {
    canvas?.setDrawingMode(currentTool === 'Draw');
  }
</script>

<div class="w-full h-screen relative">
  <Canvas
    bind:this={canvas}
    on:object-added={async ({ detail }) => {
      const object = detail.originalEvent.target;
      if (detail.fabricRealCanvas !== undefined && detail.fabricOffScreenCanvas !== undefined) {
        await extractLastDrawing(object, detail.fabricRealCanvas, detail.fabricOffScreenCanvas);
        object.excludeFromExport = true;

        // make predictions here
      }
    }}
  />
  <Toolbar>
    <Tool toolName="Draw" icon={IconPencil} bind:group={currentTool} />
    <Tool toolName="Select" icon={IconPointer} bind:group={currentTool} />
    <Action actionName="Clear canvas" icon={IconTrash} on:click={canvas.clear} />
  </Toolbar>
</div>
