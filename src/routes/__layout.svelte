<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { yolov5 } from '$lib/features/detect-shape';
  import { discardInMemoryCanvas } from '$lib/shared/in-memory-canvas';

  import '../app.css';

  // TODO: figure out how to tell ESLint to respect TypeScript's globals
  // eslint-disable-next-line no-undef
  const basePath = vite.define.basePath;

  onMount(yolov5.initialize);
  onDestroy(yolov5.stop);
  onDestroy(discardInMemoryCanvas);
</script>

<svelte:head>
  <link rel="icon" href="{basePath}/FlatColorIconsPicture.svg" type="image/svg+xml" />
</svelte:head>

<slot />
