<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fabric } from 'fabric';

  import { autoResize, stopAutoResizing } from './resize-observer';
	import { replayLastObject } from '../model/replay-last-object';

	export let tool: 'Draw' | 'Select';
	$: {
		if (fabricRealCanvas !== undefined) {
			fabricRealCanvas.isDrawingMode = tool === 'Draw';
		}
	}

	let container: HTMLDivElement | undefined;
	let domRealCanvas: HTMLCanvasElement | undefined;
	let domOffScreenCanvas: HTMLCanvasElement | undefined;
	let fabricRealCanvas: fabric.Canvas | undefined;
	let fabricOffScreenCanvas: fabric.Canvas | undefined;

	export function clear() {
		fabricRealCanvas?.clear();
	}

	onMount(() => {
		if (domRealCanvas === undefined || domOffScreenCanvas === undefined) {
			return;
		}

		fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
			enableRetinaScaling: false,
		});
		fabricRealCanvas.freeDrawingBrush.width = 4;
		fabricOffScreenCanvas = new fabric.Canvas(domOffScreenCanvas, {
			skipOffscreen: false,
			enableRetinaScaling: false,
		});
		fabricRealCanvas.on('object:added', e => {
			if (fabricRealCanvas !== undefined && fabricOffScreenCanvas !== undefined) {
				replayLastObject(e.target, fabricRealCanvas, fabricOffScreenCanvas);
			}
		});

		if (container !== undefined) {
			autoResize([fabricRealCanvas, fabricOffScreenCanvas], container);
		}
	});

	onDestroy(stopAutoResizing);
</script>

<div class="h-full" bind:this={container}>
	<canvas bind:this={domRealCanvas} />
</div>

<div class="sr-only">
  <canvas bind:this={domOffScreenCanvas} />
</div>
