<script lang="ts">
  import { onMount } from 'svelte';
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';

  import { Canvas, extractLastDrawing } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { detector, onPredict, track } from '$lib/features/detect-shape';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';

  $: {
    canvas?.setDrawingMode(currentTool === 'Draw');
  }

  onMount(() => {
    if (canvas !== undefined) {
      onPredict(canvas.addPredictedObject);
    }
  });
</script>

<div class="w-full h-screen relative">
  <Canvas
    bind:this={canvas}
    on:object-drawn={async ({ detail: { object, fabricOffScreen } }) => {
      const lastDrawing = await extractLastDrawing(object, fabricOffScreen);
      if (lastDrawing !== null) {
        const [image, _bbox, regionBBox] = lastDrawing;
        detector.predict(image, regionBBox, track(object));
      }
    }}
  />
  <Toolbar>
    <Tool toolName="Draw" icon={IconPencil} bind:group={currentTool} />
    <Tool toolName="Select" icon={IconPointer} bind:group={currentTool} />
    <Action actionName="Clear canvas" icon={IconTrash} on:click={canvas.clear} />
  </Toolbar>
</div>
