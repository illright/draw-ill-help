<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fabric } from 'fabric';

  import { autoResize, stopAutoResizing } from './resize-observer';

  let container: HTMLDivElement | undefined;
  let domRealCanvas: HTMLCanvasElement | undefined;
  let domOffScreenCanvas: HTMLCanvasElement | undefined;
  let fabricRealCanvas: fabric.Canvas | undefined;
  let fabricOffScreenCanvas: fabric.Canvas | undefined;
  let darkColorsMedia: MediaQueryList | undefined;
  let backgroundColor = '#ffffff';
  let foregroundColor = '#000000';

  export function clear() {
    fabricRealCanvas?.clear();
    fabricRealCanvas?.setBackgroundColor(backgroundColor, () => {});
  }

  export function setDrawingMode(mode: boolean) {
    if (fabricRealCanvas !== undefined) {
      fabricRealCanvas.isDrawingMode = mode;
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
    if (domRealCanvas === undefined || domOffScreenCanvas === undefined) {
      return;
    }

    fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
      enableRetinaScaling: false,
      isDrawingMode: true,
      backgroundColor,
    });
    fabricRealCanvas.freeDrawingBrush.width = 4;
    fabricRealCanvas.freeDrawingBrush.color = foregroundColor;
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
  });
  const dispatch = createEventDispatcher<any>();
</script>

<div class="h-full" bind:this={container}>
  <canvas bind:this={domRealCanvas} />
</div>

<div class="sr-only">
  <canvas bind:this={domOffScreenCanvas} />
</div>
