<script lang="ts">
  import { fabric } from 'fabric';
  import { onMount, onDestroy } from 'svelte';
  import IconPencil from '~icons/bx/bx-pencil';
  import IconPointer from '~icons/bx/bx-pointer';
  import IconTrash from '~icons/bx/bx-trash';

  import { Canvas, extractLastDrawing } from '$lib/widgets/canvas';
  import { Toolbar, Tool, Action } from '$lib/widgets/toolbar';
  import { detectShape, yolov5 } from '$lib/features/detect-shapes';

  let canvas: Canvas;
  let currentTool: 'Draw' | 'Select' = 'Draw';
  let darkColorsMedia: MediaQueryList | undefined;
  let backgroundColor = '#ffffff';
  let foregroundColor = '#000000';

  $: {
    canvas?.setDrawingMode(currentTool === 'Draw');
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
    // yolov5.preload()
    darkColorsMedia = window.matchMedia('(prefers-color-scheme: dark)');
    darkColorsMedia.addEventListener('change', switchToDarkTheme);
    switchToDarkTheme(darkColorsMedia);
  });

  onDestroy(() => {
    darkColorsMedia?.removeEventListener('change', switchToDarkTheme);
  });
</script>

<div class="w-full h-screen relative">
  <Canvas
    bind:this={canvas}
    {backgroundColor}
    {foregroundColor}
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
            shape.stroke = foregroundColor;
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
