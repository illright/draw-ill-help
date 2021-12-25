<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';
  import IconArrowBack from '~icons/bx/bx-arrow-back';

  import { Canvas } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { detector, onPredict, unsubscribe, track } from '$lib/features/detect-shape';
  import { colors } from '$lib/features/dark-mode';
  import { extractToSeparateCanvas } from '$lib/features/in-memory-canvas';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';

  onMount(() => {
    if (canvas !== undefined) {
      onPredict(canvas.addPredictedObject);
    }
  });

  onDestroy(() => {
    if (canvas !== undefined) {
      unsubscribe(canvas.addPredictedObject);
    }
  })
</script>

<div class="w-full h-screen relative">
  <Canvas
    backgroundColor={$colors.background}
    brushColor={$colors.foreground}
    drawMode={currentTool === 'Draw'}
    bind:this={canvas}

    on:object-drawn={async ({ detail: { object } }) => {
      const lastDrawing = await extractToSeparateCanvas(object);
      if (lastDrawing !== null) {
        const { imageData, regionBBox } = lastDrawing;
        detector.predict(imageData, regionBBox, track(object));
      }
    }}
  />
  <Toolbar>
    <Action actionName="Go to the home page" icon={IconArrowBack} on:click={() => goto('/')} />
    <Tool toolName="Draw" icon={IconPencil} bind:group={currentTool} />
    <Tool toolName="Select" icon={IconPointer} bind:group={currentTool} />
    <Action actionName="Clear canvas" icon={IconTrash} on:click={canvas.clear} />
  </Toolbar>
</div>
