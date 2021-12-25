<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { detector } from '$lib/features/detect-shape';
  import { discardInMemoryCanvas } from '$lib/features/in-memory-canvas';

  import '../app.css';

  const basePath = vite.define.basePath;

  onMount(detector.initialize);
  onDestroy(discardInMemoryCanvas);
</script>

<svelte:head>
  <link rel="icon" href="{basePath}/FlatColorIconsPicture.svg" type="image/svg+xml">
</svelte:head>

<slot />
