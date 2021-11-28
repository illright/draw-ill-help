<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fabric } from 'fabric';

  import { autoResize, stopAutoResizing } from './resize-observer';

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

	onMount(() => {
		fabricCanvas = new fabric.Canvas(domCanvas);
    autoResize(fabricCanvas, container);
	});

	onDestroy(stopAutoResizing);
</script>

<div class="h-full" bind:this={container}>
	<canvas bind:this={domCanvas} />
</div>
