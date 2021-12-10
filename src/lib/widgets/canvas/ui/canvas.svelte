<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { fabric } from 'fabric';

	import { autoResize, stopAutoResizing } from './resize-observer';

	let container: HTMLDivElement | undefined;
	let domRealCanvas: HTMLCanvasElement | undefined;
	let domOffScreenCanvas: HTMLCanvasElement | undefined;
	let fabricRealCanvas: fabric.Canvas | undefined;
	let fabricOffScreenCanvas: fabric.Canvas | undefined;

	export function clear() {
		fabricRealCanvas?.clear();
	}

	export function setDrawingMode(mode: boolean) {
		if (fabricRealCanvas !== undefined) {
			fabricRealCanvas.isDrawingMode = mode;
		}
	}

	onMount(() => {
		if (domRealCanvas === undefined || domOffScreenCanvas === undefined) {
			return;
		}

		fabricRealCanvas = new fabric.Canvas(domRealCanvas, {
			enableRetinaScaling: false,
			isDrawingMode: true
		});
		fabricRealCanvas.freeDrawingBrush.width = 4;
		fabricOffScreenCanvas = new fabric.Canvas(domOffScreenCanvas, {
			skipOffscreen: false,
			enableRetinaScaling: false
		});
		fabricRealCanvas.on('object:added', (e) => {
			dispatch('object-added', { originalEvent: e, fabricRealCanvas, fabricOffScreenCanvas });
		});

		if (container !== undefined) {
			autoResize([fabricRealCanvas, fabricOffScreenCanvas], container);
		}
	});

	onDestroy(stopAutoResizing);
	const dispatch = createEventDispatcher<any>();
</script>

<div class="h-full" bind:this={container}>
	<canvas bind:this={domRealCanvas} />
</div>

<div class="sr-only">
	<canvas bind:this={domOffScreenCanvas} />
</div>
